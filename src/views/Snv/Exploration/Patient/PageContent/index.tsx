import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { resetSearchAfterQueryConfig, tieBreaker } from '@ferlab/ui/core/components/ProTable/utils';
import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { SortDirection } from '@ferlab/ui/core/graphql/constants';
import { Tabs } from 'antd';
import { ExtendedMappingResults } from 'graphql/models';
import { useVariants } from 'graphql/variants/actions';
import { VariantType } from 'graphql/variants/models';
import { VARIANT_QUERY } from 'graphql/variants/queries';
import { cloneDeep } from 'lodash';
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
import { resolveSyntheticSqonWithReferences } from 'utils/query';
import {
  SNV_EXPLORATION_PATIENT_FILTER_TAG,
  SNV_EXPLORATION_PATIENT_TN_FILTER_TAG,
  SNV_EXPLORATION_PATIENT_TO_FILTER_TAG,
} from 'utils/queryBuilder';

import VariantsTab from './tabs/Variants';

type OwnProps = {
  variantMapping: ExtendedMappingResults;
  patientId?: string;
  prescriptionId?: string;
  variantSection?: VariantSection;
};

const PageContent = ({ variantMapping, patientId, prescriptionId, variantSection }: OwnProps) => {
  const { queryList, activeQuery } = useQueryBuilderState(getQueryBuilderID(variantSection));
  const [variantQueryConfig, setVariantQueryConfig] = useState({
    ...DEFAULT_QUERY_CONFIG,
    size: DEFAULT_PAGE_SIZE,
  });
  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX);

  const getVariantResolvedSqon = (query: ISyntheticSqon) =>
    wrapSqonWithDonorIdAndSrId(
      cloneDeep(resolveSyntheticSqonWithReferences(queryList, query, variantMapping)),
      patientId,
      prescriptionId,
      variantSection,
    );

  const queryVariables = {
    first: variantQueryConfig.size,
    offset: DEFAULT_OFFSET,
    searchAfter: variantQueryConfig.searchAfter,
    sqon: getVariantResolvedSqon(activeQuery),
    sort: tieBreaker({
      sort: variantQueryConfig.sort,
      defaultSort: DEFAULT_SORT_QUERY,
      field: 'hgvsg',
      order: variantQueryConfig.operations?.previous ? SortDirection.Desc : SortDirection.Asc,
    }),
  };

  const variantResults = useVariants(queryVariables, variantQueryConfig.operations);
  const variantResultsWithDonors = {
    ...variantResults,
    data: variantResults?.data?.filter((v) => (v.donors?.hits?.edges || []).length > 0),
  };

  useEffect(() => {
    setVariantQueryConfig({
      ...variantQueryConfig,
      searchAfter: undefined,
    });
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

  const activeQuerySnapshot = JSON.stringify(activeQuery);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [downloadTriggered, setDownloadTriggered] = useState(false);

  useEffect(() => {
    setVariantQueryConfig({
      ...variantQueryConfig,
      searchAfter: undefined,
    });

    setPageIndex(DEFAULT_PAGE_INDEX);
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

  return (
    <VariantContentLayout
      queryBuilderId={getQueryBuilderID(variantSection)}
      savedFilterTag={getSavedFilterID()}
      variantMapping={variantMapping}
      activeQuery={activeQuery}
      variantResults={variantResultsWithDonors}
      getVariantResolvedSqon={getVariantResolvedSqon}
      variantSection={variantSection}
    >
      <Tabs type="card" activeKey={'variants'}>
        <Tabs.TabPane
          tab={intl.get('screen.patientsnv.results.table.variants') || 'Variants'}
          key="variants"
        >
          <VariantsTab
            queryBuilderId={getQueryBuilderID(variantSection)}
            results={variantResultsWithDonors}
            setQueryConfig={setVariantQueryConfig}
            queryConfig={variantQueryConfig}
            patientId={patientId!}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            setVariantType={setVariantType}
            setDownloadTriggered={setDownloadTriggered}
            setSelectedRows={setSelectedRows}
            variantSection={variantSection}
          />
          <DownloadTSVWrapper
            queryVariables={queryVariables}
            triggered={downloadTriggered}
            setTriggered={setDownloadTriggered}
            total={variantResultsWithDonors.total}
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
                    undefined,
                    undefined,
                    true,
                    false,
                    variantSection,
                  ).filter((h) => h.key !== 'actions')
                : []
            }
            queryKey={'Variants'}
            columnKey={VARIANT_KEY}
            patientId={patientId}
          />
        </Tabs.TabPane>
      </Tabs>
    </VariantContentLayout>
  );
};

export default PageContent;
