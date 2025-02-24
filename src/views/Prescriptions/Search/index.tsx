import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useLocation } from 'react-router-dom';
import { MedicineBoxOutlined, SolutionOutlined } from '@ant-design/icons';
import ProLabel from '@ferlab/ui/core/components/ProLabel';
import { tieBreaker } from '@ferlab/ui/core/components/ProTable/utils';
import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { BooleanOperators } from '@ferlab/ui/core/data/sqon/operators';
import { ISqonGroupFilter, ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { SortDirection } from '@ferlab/ui/core/graphql/constants';
import { Input, Space, Tabs } from 'antd';
import { GqlResults } from 'graphql/models';
import { usePrescription, usePrescriptionMapping } from 'graphql/prescriptions/actions';
import { AnalysisResult } from 'graphql/prescriptions/models/Prescription';
import {
  setPrescriptionStatusInActiveQuery,
  useSequencingRequests,
} from 'graphql/sequencing/actions';
import { cloneDeep } from 'lodash';
import { GraphqlBackend } from 'providers';
import ApolloProvider from 'providers/ApolloProvider';
import Sidebar from 'views/Prescriptions/Search/components/Sidebar';
import PrescriptionsTable from 'views/Prescriptions/Search/components/table/PrescriptionTable';
import SequencingsTable from 'views/Prescriptions/Search/components/table/SequencingTable';
import {
  DEFAULT_OFFSET,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  DEFAULT_QUERY_CONFIG,
  DEFAULT_SORT_QUERY,
  PRESCRIPTION_QB_ID,
  PRESCRIPTION_SCROLL_ID,
  TableSearchParams,
  TableTabs,
} from 'views/Prescriptions/Search/utils/contstant';
import { commonPrescriptionFilterFields } from 'views/Prescriptions/utils/constant';

import ContentWithHeader from 'components/Layout/ContentWithHeader';
import ScrollContentWithFooter from 'components/Layout/ScrollContentWithFooter';
import { resolveSyntheticSqonWithReferences } from 'utils/query';

import { downloadAsTSV } from '../utils/export';

import { prescriptionsColumns } from './components/table/PrescriptionTable/columns';
import { sequencingsColumns } from './components/table/SequencingTable/columns';

import styles from './index.module.css';

const adjustSqon = (sqon: ISyntheticSqon) => {
  let replaced = JSON.stringify(sqon).replace('sequencing_requests.status', 'status');
  replaced = replaced.replace('sequencing_requests.task_runname', 'task_runname');
  replaced = replaced.replace('sequencing_requests.patient_relationship', 'patient_relationship');
  replaced = replaced.replace(
    'sequencing_requests.patient_disease_status',
    'patient_disease_status',
  );
  const adjustedSqon = JSON.parse(replaced);
  return removeDraftFromSqon(adjustedSqon);
};

const removeDraftFromSqon = (sqon: ISyntheticSqon) => {
  sqon.content?.push({ content: { field: 'status', value: ['draft'] }, op: 'not-in' });
  return sqon;
};

const removeDraftFromAggregations = (results: GqlResults<AnalysisResult>) => {
  for (const key of ['status', 'sequencing_requests__status']) {
    if (!results.aggregations[key]) continue;
    const satusBuckets = results.aggregations[key].buckets.filter(
      (bucket) => bucket.key !== 'draft',
    );
    const aggregationsStatus = { ...results.aggregations[key], buckets: satusBuckets };
    results.aggregations = { ...results.aggregations, [key]: aggregationsStatus };
  }
  return results;
};

const generateSearchFilter = (search: string) =>
  generateQuery({
    operator: BooleanOperators.or,
    newFilters: commonPrescriptionFilterFields.map((key) =>
      generateValueFilter({
        field: key,
        value: [`${search}*`],
      }),
    ),
  });

const generateMultipleQuery = (searchValue: string, activeQuery: ISyntheticSqon) => {
  const searchQuery = generateSearchFilter(searchValue);
  const newQuery: any = activeQuery;
  newQuery.content = [cloneDeep(searchQuery), cloneDeep(activeQuery)];
  return activeQuery;
};

const PrescriptionSearch = (): React.ReactElement => {
  const extendedMapping = usePrescriptionMapping();
  const { queryList, activeQuery } = useQueryBuilderState(PRESCRIPTION_QB_ID);
  const [prescriptionPageIndex, setPrescriptionPageIndex] = useState(DEFAULT_PAGE_INDEX);
  const [sequencingPageIndex, setSequencingPageIndex] = useState(DEFAULT_PAGE_INDEX);
  const [prescriptionQueryConfig, setPrescriptionQueryConfig] = useState({
    ...DEFAULT_QUERY_CONFIG,
    size: DEFAULT_PAGE_SIZE,
  });
  const [sequencingQueryConfig, setSequencingQueryConfig] = useState({
    ...DEFAULT_QUERY_CONFIG,
    size: DEFAULT_PAGE_SIZE,
  });
  const [searchValue, setSearchValue] = useState('');
  const [activeTab, setActiveTab] = useState(TableTabs.Prescriptions);
  const [downloadPrescriptionKeys, setDownloadPrescriptionKeys] = useState<string[]>([]);
  const [downloadSequencingKeys, setDownloadSequencingKeys] = useState<string[]>([]);
  const sequencingActiveQuery = setPrescriptionStatusInActiveQuery(activeQuery);
  const location = useLocation();

  const sequencingsQueryVariables = {
    first: sequencingQueryConfig.size,
    offset: DEFAULT_OFFSET,
    searchAfter: sequencingQueryConfig.searchAfter,
    sqon: adjustSqon(
      resolveSyntheticSqonWithReferences(
        queryList,
        searchValue.length === 0
          ? sequencingActiveQuery
          : generateMultipleQuery(searchValue, sequencingActiveQuery),
      ),
    ),
    sort: tieBreaker({
      sort: sequencingQueryConfig.sort,
      defaultSort: DEFAULT_SORT_QUERY,
      field: '_id',
      order: sequencingQueryConfig.operations?.previous ? SortDirection.Asc : SortDirection.Desc,
    }),
  };

  const sequencings = useSequencingRequests(
    sequencingsQueryVariables,
    sequencingQueryConfig.operations,
  );

  const prescriptionsQueryVariables = {
    first: prescriptionQueryConfig.size,
    offset: DEFAULT_OFFSET,
    searchAfter: prescriptionQueryConfig.searchAfter,
    sqon: removeDraftFromSqon(
      resolveSyntheticSqonWithReferences(
        queryList,
        searchValue.length === 0 ? activeQuery : generateMultipleQuery(searchValue, activeQuery),
      ),
    ),
    sort: tieBreaker({
      sort: prescriptionQueryConfig.sort,
      defaultSort: DEFAULT_SORT_QUERY,
      field: '_id',
      order: prescriptionQueryConfig.operations?.previous ? SortDirection.Asc : SortDirection.Desc,
    }),
  };

  const prescriptions = removeDraftFromAggregations(
    usePrescription(prescriptionsQueryVariables, prescriptionQueryConfig.operations),
  );

  // query is always done, unfortunately but response size is limited if nothing to download
  const prescriptionsToDownload = usePrescription({
    ...prescriptionsQueryVariables,
    searchAfter: undefined,
    first: downloadPrescriptionKeys.length > 0 ? prescriptions.total : 0,
  });

  // query is always done, unfortunately but response size is limited if nothing to download
  const sequencingsToDownload = useSequencingRequests({
    ...sequencingsQueryVariables,
    searchAfter: undefined,
    first: downloadSequencingKeys.length > 0 ? sequencings.total : 0,
  });

  const changeTab = (key: string) => setActiveTab(key as TableTabs);

  useEffect(() => {
    if (
      prescriptionQueryConfig.firstPageFlag !== undefined ||
      prescriptionQueryConfig.searchAfter === undefined
    ) {
      return;
    }

    setPrescriptionQueryConfig({
      ...prescriptionQueryConfig,
      firstPageFlag: prescriptionQueryConfig.searchAfter,
    });
  }, [prescriptionQueryConfig]);

  useEffect(() => {
    if (
      sequencingQueryConfig.firstPageFlag !== undefined ||
      sequencingQueryConfig.searchAfter === undefined
    ) {
      return;
    }

    setSequencingQueryConfig({
      ...sequencingQueryConfig,
      firstPageFlag: sequencingQueryConfig.searchAfter,
    });
  }, [sequencingQueryConfig]);

  useEffect(() => {
    setPrescriptionQueryConfig({
      ...prescriptionQueryConfig,
      sort: DEFAULT_SORT_QUERY,
      searchAfter: undefined,
      firstPageFlag: undefined,
      operations: undefined,
    });
    setPrescriptionPageIndex(DEFAULT_PAGE_INDEX);
    setSequencingQueryConfig({
      ...sequencingQueryConfig,
      sort: DEFAULT_SORT_QUERY,
      searchAfter: undefined,
      firstPageFlag: undefined,
      operations: undefined,
    });
    setSequencingPageIndex(DEFAULT_PAGE_INDEX);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  useEffect(() => {
    // download only when both prescriptionsToDownload and something to download
    if (
      downloadPrescriptionKeys.length > 0 &&
      !prescriptionsToDownload.loading &&
      prescriptionsToDownload.data.length > 0
    ) {
      downloadAsTSV(
        prescriptionsToDownload.data,
        downloadPrescriptionKeys,
        'prescription_id',
        prescriptionsColumns(),
        'PR',
        {},
        undefined,
        true,
      );
      setDownloadPrescriptionKeys([]); // reset download
    }
  }, [downloadPrescriptionKeys, prescriptionsToDownload]);

  useEffect(() => {
    // download only when both sequencingsToDownload and something to download
    if (
      downloadSequencingKeys.length > 0 &&
      !sequencingsToDownload.loading &&
      sequencingsToDownload.data.length > 0
    ) {
      downloadAsTSV(
        sequencingsToDownload.data,
        downloadSequencingKeys,
        'request_id',
        sequencingsColumns(),
        'RQ',
        {},
        undefined,
        true,
      );
      setDownloadSequencingKeys([]); // reset download
    }
  }, [downloadSequencingKeys, sequencingsToDownload]);

  const searchPrescription = (value: any) => {
    if (value.target.value) {
      setSearchValue(value.target.value);
    } else {
      setSearchValue('');
    }
  };

  useEffect(() => {
    if (location.search) {
      const searchParams = new URLSearchParams(location.search);
      const tab = searchParams.get(TableSearchParams.Tab);
      const searchBoxParamVal = searchParams.get(TableSearchParams.SearchBox);

      if (tab && Object.values<string>(TableTabs).includes(tab)) {
        // change tab
        setActiveTab(tab as TableTabs);
      }

      if (searchBoxParamVal) {
        // change search box value
        setSearchValue(decodeURIComponent(searchBoxParamVal));
      }
    }
  }, [location]);

  return (
    <ContentWithHeader
      className={styles.prescriptionLayout}
      headerProps={{
        icon: <MedicineBoxOutlined />,
        title: intl.get('screen.patientsearch.title'),
      }}
    >
      <Sidebar
        queryBuilderId={PRESCRIPTION_QB_ID}
        isLoading={prescriptions.loading}
        aggregations={prescriptions.aggregations}
        extendedMapping={extendedMapping}
        filters={activeQuery as ISqonGroupFilter}
      />
      <ScrollContentWithFooter scrollId={PRESCRIPTION_SCROLL_ID}>
        <Space direction="vertical" size="middle" className={styles.patientContentContainer}>
          <div className={styles.patientContentHeader}>
            <ProLabel title={intl.get('home.prescription.search.box.label')} colon />
            <Input
              onChange={searchPrescription}
              data-cy="PrescriptionsSearch"
              allowClear
              value={searchValue}
            />
          </div>
          <Tabs
            type="card"
            activeKey={activeTab}
            onTabClick={changeTab}
            items={[
              {
                key: TableTabs.Prescriptions,
                label: (
                  <>
                    <MedicineBoxOutlined />
                    {intl.get('screen.patient.tab.prescriptions')}{' '}
                    {prescriptions?.total && ` (${prescriptions?.total})`}
                  </>
                ),
                children: (
                  <PrescriptionsTable
                    results={prescriptions}
                    queryConfig={prescriptionQueryConfig}
                    setQueryConfig={setPrescriptionQueryConfig}
                    setDownloadKeys={setDownloadPrescriptionKeys}
                    loading={prescriptions.loading}
                    pageIndex={prescriptionPageIndex}
                    setPageIndex={setPrescriptionPageIndex}
                  />
                ),
              },
              {
                key: TableTabs.Requests,
                label: (
                  <>
                    <SolutionOutlined />
                    {intl.get('screen.patient.tab.requests')}{' '}
                    {sequencings?.total && ` (${sequencings?.total})`}
                  </>
                ),
                children: (
                  <SequencingsTable
                    results={sequencings}
                    queryConfig={sequencingQueryConfig}
                    setQueryConfig={setSequencingQueryConfig}
                    setDownloadKeys={setDownloadSequencingKeys}
                    loading={sequencings.loading}
                    pageIndex={sequencingPageIndex}
                    setPageIndex={setSequencingPageIndex}
                  />
                ),
              },
            ]}
          />
        </Space>
      </ScrollContentWithFooter>
    </ContentWithHeader>
  );
};

const PatientSearchWrapper = () => (
  <ApolloProvider backend={GraphqlBackend.ARRANGER}>
    <PrescriptionSearch />
  </ApolloProvider>
);

export default PatientSearchWrapper;
