import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { resolveSyntheticSqon } from '@ferlab/ui/core/data/sqon/utils';
import { Tabs } from 'antd';
import { ExtendedMappingResults } from 'graphql/models';
import { useVariants } from 'graphql/variants/actions';
import { cloneDeep } from 'lodash';
import VariantContentLayout from 'views/Cnv/Exploration/components/VariantContentLayout';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_QUERY_CONFIG,
  VARIANT_PATIENT_QB_ID,
} from 'views/Cnv/utils/constant';
import { wrapSqonWithDonorIdAndSrId } from 'views/Cnv/utils/helper';

import VariantsTab from './tabs/Variants';

type OwnProps = {
  variantMapping: ExtendedMappingResults;
  patientId?: string;
  prescriptionId?: string;
};

const PageContent = ({ variantMapping, patientId }: OwnProps) => {
  const { queryList, activeQuery } = useQueryBuilderState(VARIANT_PATIENT_QB_ID);
  const [variantQueryConfig, setVariantQueryConfig] = useState(DEFAULT_QUERY_CONFIG);

  const getVariantResolvedSqon = (query: ISyntheticSqon) => {
    console.log('query', query);
    const wrappedQuery = wrapSqonWithDonorIdAndSrId(
      cloneDeep(resolveSyntheticSqon(queryList, query, 'donors')),
      patientId,
      /** prescriptionId Need to fix bug in ETL */
    );
    console.log('wrappedQuery', wrappedQuery);
    return wrappedQuery;
  };

  const variantResults = useVariants({
    first: variantQueryConfig.size,
    offset: variantQueryConfig.size * (variantQueryConfig.pageIndex - 1),
    sqon: getVariantResolvedSqon(activeQuery),
    sort: [
      { field: 'max_impact_score', order: 'desc' },
      { field: 'hgvsg', order: 'asc' },
    ],
  });
  console.log('variantResults', variantResults);

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
          tab={intl.get('screen.patientcnv.results.table.variants') || 'Variants'}
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
