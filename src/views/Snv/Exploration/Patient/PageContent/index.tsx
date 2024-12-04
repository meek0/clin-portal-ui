import { Key, useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { resetSearchAfterQueryConfig, tieBreaker } from '@ferlab/ui/core/components/ProTable/utils';
import useQueryBuilderState, {
  updateQueryByTableFilter,
} from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { SortDirection } from '@ferlab/ui/core/graphql/constants';
import { Tabs } from 'antd';
import { extractOrganizationId } from 'api/fhir/helper';
import { ExtendedMappingResults } from 'graphql/models';
import { useVariants } from 'graphql/variants/actions';
import { VariantType } from 'graphql/variants/models';
import { VARIANT_QUERY } from 'graphql/variants/queries';
import { cloneDeep } from 'lodash';
import { TVariantFilter } from 'views/Cnv/Exploration/variantColumns';
import { usePrescriptionEntityContext } from 'views/Prescriptions/Entity/context';
import { VariantSection } from 'views/Prescriptions/Entity/Tabs/Variants/components/VariantSectionNav';
import { MAX_VARIANTS_WITH_DONORS_DOWNLOAD, VARIANT_KEY } from 'views/Prescriptions/utils/export';
import VariantContentLayout from 'views/Snv/Exploration/components/VariantContentLayout';
import { getVariantColumns } from 'views/Snv/Exploration/variantColumns';
import {
  DEFAULT_OFFSET,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  DEFAULT_QUERY_CONFIG,
  DEFAULT_SORT_QUERY,
  getQueryBuilderID,
} from 'views/Snv/utils/constant';
import { wrapSqonWithDonorIdAndSrId } from 'views/Snv/utils/helper';

import DownloadTSVWrapper from 'components/Download';
import { useRpt } from 'hooks/useRpt';
import { resolveSyntheticSqonWithReferences } from 'utils/query';
import {
  SNV_EXPLORATION_PATIENT_FILTER_TAG,
  SNV_EXPLORATION_PATIENT_TN_FILTER_TAG,
  SNV_EXPLORATION_PATIENT_TO_FILTER_TAG,
} from 'utils/queryBuilder';

import { flagFilterQuery, noFlagQuery } from '../../components/Flag/FlagFilter';
import { getNoteQuery } from '../../components/Note/NoteFilter';

import VariantsTab from './tabs/Variants';

type OwnProps = {
  variantMapping: ExtendedMappingResults;
  patientId?: string;
  prescriptionId?: string;
  variantSection?: VariantSection;
};

const PageContent = ({ variantMapping, patientId, prescriptionId, variantSection }: OwnProps) => {
  const { decodedRpt } = useRpt();
  const { queryList, activeQuery } = useQueryBuilderState(getQueryBuilderID(variantSection));
  const [variantQueryConfig, setVariantQueryConfig] = useState({
    ...DEFAULT_QUERY_CONFIG,
    size: DEFAULT_PAGE_SIZE,
  });
  const [filtersList, setFilterList] = useState<TVariantFilter>({
    flags: [],
    note: [],
  });
  const [isClear, setIsClear] = useState<boolean>(false);

  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX);

  const getVariantResolvedSqon = (query: ISyntheticSqon) =>
    wrapSqonWithDonorIdAndSrId(
      cloneDeep(resolveSyntheticSqonWithReferences(queryList, query, variantMapping)),
      patientId,
      prescriptionId,
      variantSection,
    );

  const sqon = getVariantResolvedSqon(activeQuery);
  const hasFlags = filtersList.flags.length > 0;
  const hasNote = filtersList.note.length > 0;

  const getFilterSqon = () => {
    const sqonList: any[] = [];
    if (sqon) {
      sqonList.push(sqon);
      if (hasFlags) {
        filtersList.flags.includes('none')
          ? sqonList.push(noFlagQuery(filtersList.flags))
          : sqonList.push(flagFilterQuery(filtersList.flags));
      }
      if (hasNote) {
        sqonList.push(getNoteQuery(filtersList.note));
      }
      return {
        content: sqonList,
        op: 'and',
      };
    } else
      return {
        content: [],
        op: 'and',
      };
  };

  const queryVariables = {
    first: variantQueryConfig.size,
    offset: DEFAULT_OFFSET,
    searchAfter: variantQueryConfig.searchAfter,
    sqon: sqon,
    sort: tieBreaker({
      sort: variantQueryConfig.sort,
      defaultSort: DEFAULT_SORT_QUERY,
      field: 'hgvsg',
      order: variantQueryConfig.operations?.previous ? SortDirection.Desc : SortDirection.Asc,
    }),
  };

  const queryVariablesFilter = {
    first: variantQueryConfig.size,
    offset: DEFAULT_OFFSET,
    searchAfter: variantQueryConfig.searchAfter,
    //sqon: sqonwithFlag,
    sqon: getFilterSqon(),
    sort: tieBreaker({
      sort: variantQueryConfig.sort,
      defaultSort: DEFAULT_SORT_QUERY,
      field: 'hgvsg',
      order: variantQueryConfig.operations?.previous ? SortDirection.Desc : SortDirection.Asc,
    }),
  };
  const variantResultsWithFilter = useVariants(queryVariablesFilter, variantQueryConfig.operations);
  const variantResultsWithDonorsWithFilter = {
    ...variantResultsWithFilter,
    data: variantResultsWithFilter?.data?.filter((v) => (v.donors?.hits?.edges || []).length > 0),
  };

  useEffect(() => {
    setVariantQueryConfig({
      ...variantQueryConfig,
      searchAfter: undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variantSection]);

  useEffect(() => {
    if (
      variantQueryConfig.firstPageFlag !== undefined ||
      variantQueryConfig.searchAfter === undefined
    ) {
      return;
    }

    setVariantQueryConfig({
      ...variantQueryConfig,
      firstPageFlag: variantQueryConfig.searchAfter,
    });
  }, [variantQueryConfig]);

  useEffect(() => {
    if (
      variantQueryConfig.firstPageFlag !== undefined ||
      variantQueryConfig.searchAfter === undefined
    ) {
      return;
    }

    setVariantQueryConfig({
      ...variantQueryConfig,
      firstPageFlag: variantQueryConfig.searchAfter,
    });
  }, [variantQueryConfig]);

  const handleFilterList = (columnKeys: Key[], filter?: string) => {
    if (columnKeys.length > 0) {
      setIsClear(true);
      const keytoString: string[] = columnKeys.map((key) => key.toString());
      if (filter === 'flags') {
        setFilterList({ flags: keytoString, note: filtersList.note });
      } else {
        setFilterList({ flags: filtersList.flags, note: keytoString });
      }
    } else {
      if (filter) {
        if (filter === 'flags') {
          setFilterList({ flags: [], note: filtersList.note });
        } else {
          setFilterList({ flags: filtersList.flags, note: [] });
        }
      } else {
        setFilterList({ flags: [], note: [] });
        setIsClear(false);
      }
    }
  };

  const activeQuerySnapshot = JSON.stringify(activeQuery);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [downloadTriggered, setDownloadTriggered] = useState(false);
  const { prescription } = usePrescriptionEntityContext();
  //Reset flags filter on resfresh
  useEffect(() => {
    setFilterList({ flags: [], note: [] });
    updateQueryByTableFilter({
      queryBuilderId: getQueryBuilderID(variantSection as VariantSection),
      field: 'flags',
      selectedFilters: [],
    });
  }, []);

  //Reset Flag filter on clearFilter
  useEffect(() => {
    if (filtersList.flags.length === 0) {
      setIsClear(false);
      resetSearchAfterQueryConfig(
        {
          ...DEFAULT_QUERY_CONFIG,
          size: variantQueryConfig.size || DEFAULT_PAGE_SIZE,
        },
        setVariantQueryConfig,
      );
      updateQueryByTableFilter({
        queryBuilderId: getQueryBuilderID(variantSection as VariantSection),
        field: 'flags',
        selectedFilters: [],
      });
    }
  }, [filtersList]);

  useEffect(() => {
    setVariantQueryConfig({
      ...variantQueryConfig,
      searchAfter: undefined,
    });
    setPageIndex(DEFAULT_PAGE_INDEX);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeQuerySnapshot]);

  useEffect(() => {
    resetSearchAfterQueryConfig(
      {
        ...DEFAULT_QUERY_CONFIG,
        size: variantQueryConfig.size || DEFAULT_PAGE_SIZE,
      },
      setVariantQueryConfig,
    );
    setPageIndex(DEFAULT_PAGE_INDEX);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeQuerySnapshot]);

  const [variantType, setVariantType] = useState<VariantType | null>(null);
  const getSavedFilterID = () => {
    switch (variantSection) {
      case VariantSection.SNV:
        return SNV_EXPLORATION_PATIENT_FILTER_TAG;
      case VariantSection.SNVTO:
        return SNV_EXPLORATION_PATIENT_TO_FILTER_TAG;
      case VariantSection.SNVTN:
        return SNV_EXPLORATION_PATIENT_TN_FILTER_TAG;
      default:
        return SNV_EXPLORATION_PATIENT_FILTER_TAG;
    }
  };

  const isSameLDM = () => {
    const org = decodedRpt?.fhir_organization_id;
    const getOrganizationReference = prescription?.performer?.find((r) =>
      r.reference.includes('Organization'),
    )?.reference;
    return org?.includes(extractOrganizationId(getOrganizationReference!));
  };

  return (
    <VariantContentLayout
      queryBuilderId={getQueryBuilderID(variantSection)}
      savedFilterTag={getSavedFilterID()}
      variantMapping={variantMapping}
      activeQuery={activeQuery}
      variantResults={variantResultsWithDonorsWithFilter}
      getVariantResolvedSqon={getVariantResolvedSqon}
      variantSection={variantSection}
    >
      <Tabs
        type="card"
        activeKey={'variants'}
        items={[
          {
            label: intl.get('screen.patientsnv.results.table.variants') || 'Variants',
            key: 'variants',
            children: (
              <>
                <VariantsTab
                  queryBuilderId={getQueryBuilderID(variantSection)}
                  results={variantResultsWithDonorsWithFilter}
                  setQueryConfig={setVariantQueryConfig}
                  queryConfig={variantQueryConfig}
                  patientId={patientId!}
                  pageIndex={pageIndex}
                  setPageIndex={setPageIndex}
                  setVariantType={setVariantType}
                  setDownloadTriggered={setDownloadTriggered}
                  setSelectedRows={setSelectedRows}
                  variantSection={variantSection}
                  isSameLDM={isSameLDM()}
                  setFilterList={handleFilterList}
                  filtersList={filtersList}
                  isClear={isClear}
                />
                <DownloadTSVWrapper
                  queryVariables={queryVariables}
                  triggered={downloadTriggered}
                  setTriggered={setDownloadTriggered}
                  total={variantResultsWithDonorsWithFilter.total}
                  prefix={'SNV'}
                  operations={variantQueryConfig.operations}
                  query={VARIANT_QUERY}
                  maxAllowed={MAX_VARIANTS_WITH_DONORS_DOWNLOAD}
                  data={selectedRows}
                  columns={
                    variantType
                      ? getVariantColumns(
                          getQueryBuilderID(variantSection),
                          variantType,
                          patientId,
                          true,
                          false,
                          variantSection,
                          isSameLDM(),
                        ).filter((h) => h.key !== 'actions')
                      : []
                  }
                  queryKey={'Variants'}
                  columnKey={VARIANT_KEY}
                  patientId={patientId}
                />
              </>
            ),
          },
        ]}
      />
    </VariantContentLayout>
  );
};

export default PageContent;
