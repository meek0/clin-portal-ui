import intl from 'react-intl-universal';
import { ExtendedMappingResults } from 'graphql/models';
import { Tabs } from 'antd';
import { resolveSyntheticSqon } from '@ferlab/ui/core/data/sqon/utils';
import { useEffect, useState } from 'react';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_QUERY_CONFIG,
  VARIANT_PATIENT_QB_ID,
} from 'views/Variants/utils/constant';
import { useVariants } from 'graphql/variants/actions';
import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { wrapSqonWithDonorIdAndSrId } from 'views/Variants/utils/helper';
import { cloneDeep } from 'lodash';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import VariantsTab from './tabs/Variants';
import VariantContentLayout from '../../components/VariantContentLayout';

type OwnProps = {
  variantMapping: ExtendedMappingResults;
  patientId?: string;
  prescriptionId?: string;
};

const PageContent = ({ variantMapping, patientId, prescriptionId }: OwnProps) => {
  const { queryList, activeQuery } = useQueryBuilderState(VARIANT_PATIENT_QB_ID);
  const [variantQueryConfig, setVariantQueryConfig] = useState(DEFAULT_QUERY_CONFIG);

  const getVariantResolvedSqon = (query: ISyntheticSqon) =>
    wrapSqonWithDonorIdAndSrId(
      cloneDeep(resolveSyntheticSqon(queryList, query, 'donors')),
      patientId,
      /** prescriptionId Need to fix bug in ETL */
    );

  const variantResults = useVariants({
    first: variantQueryConfig.size,
    offset: variantQueryConfig.size * (variantQueryConfig.pageIndex - 1),
    sqon: getVariantResolvedSqon(activeQuery),
    sort: [
      { field: 'max_impact_score', order: 'desc' },
      { field: 'hgvsg', order: 'asc' },
    ],
  });

  useEffect(() => {
    setVariantQueryConfig({
      ...variantQueryConfig,
      pageIndex: DEFAULT_PAGE_INDEX,
    });
    // eslint-disable-next-line
  }, [JSON.stringify(activeQuery)]);

  return (
    <VariantContentLayout
      queryBuilderId={VARIANT_PATIENT_QB_ID}
      variantMapping={variantMapping}
      activeQuery={activeQuery}
      variantResults={variantResults}
      getVariantResolvedSqon={getVariantResolvedSqon}
    >
      <Tabs type="card" activeKey={'variants'}>
        <Tabs.TabPane
          tab={intl.get('screen.patientvariant.results.table.variants') || 'Variants'}
          key="variants"
        >
          <VariantsTab
            results={variantResults}
            setQueryConfig={setVariantQueryConfig}
            queryConfig={variantQueryConfig}
            patientId={patientId!}
          />
        </Tabs.TabPane>
      </Tabs>
    </VariantContentLayout>
  );
};

export default PageContent;
