import QueryBuilder from '@ferlab/ui/core/components/QueryBuilder';
import intl from 'react-intl-universal';
import { ExtendedMapping, ExtendedMappingResults } from 'graphql/models';
import { getQueryBuilderDictionary } from 'utils/translation';
import { Space, Tabs } from 'antd';
import { isEmptySqon, resolveSyntheticSqon } from '@ferlab/ui/core/data/sqon/utils';
import { ReactElement, useEffect, useState } from 'react';
import GenericFilters from 'components/uiKit/FilterList/GenericFilters';
import { dotToUnderscore } from '@ferlab/ui/core/data/arranger/formatting';
import { INDEXES } from 'graphql/constants';
import { ArrangerApi } from 'api/arranger';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  DEFAULT_QUERY_CONFIG,
  VARIANT_QB_ID,
} from 'views/Variants/utils/constant';
import LineStyleIcon from 'components/icons/LineStyleIcon';
import { useVariants } from 'graphql/variants/actions';
import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { GET_VARIANT_COUNT } from 'graphql/variants/queries';
import { IVariantResultTree } from 'graphql/variants/models';
import VariantsTab from './tabs/Variants';
import { useParams } from 'react-router-dom';
import { wrapSqonWithDonorId } from 'views/Variants/utils/helper';
import { cloneDeep } from 'lodash';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';

import styles from './index.module.scss';

type OwnProps = {
  variantMapping: ExtendedMappingResults;
};

const PageContent = ({ variantMapping }: OwnProps) => {
  const { patientid } = useParams<{ patientid: string }>();
  const { queryList, activeQuery } = useQueryBuilderState(VARIANT_QB_ID);
  const [selectedFilterContent, setSelectedFilterContent] = useState<ReactElement | undefined>(
    undefined,
  );

  const getVariantResolvedSqon = (query: ISyntheticSqon) =>
    wrapSqonWithDonorId(cloneDeep(resolveSyntheticSqon(queryList, query, 'donors')), patientid);

  const [variantQueryConfig, setVariantQueryConfig] = useState(DEFAULT_QUERY_CONFIG);

  const variantResolvedSqon = getVariantResolvedSqon(activeQuery);

  const variantResults = useVariants({
    first: DEFAULT_PAGE_SIZE,
    offset: DEFAULT_PAGE_SIZE * (DEFAULT_PAGE_INDEX - 1),
    sqon: variantResolvedSqon,
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

  const facetTransResolver = (key: string) => {
    if (key === 'locus') return 'Variant';
    const title = intl.get(`filters.group.${key}`);

    return title
      ? title
      : variantMapping?.data?.find((mapping: ExtendedMapping) => key === mapping.field)
          ?.displayName || key;
  };

  return (
    <Space direction="vertical" size={24} className={styles.variantPageContent}>
      <QueryBuilder
        id={VARIANT_QB_ID}
        className="variant-repo__query-builder"
        headerConfig={{
          showHeader: true,
          showTools: false,
          collapseProps: {
            headerBorderOnly: true
          },
          defaultTitle: intl.get('querybuilder.variant.filter.defaultTitle'),
        }}
        facetFilterConfig={{
          enable: true,
          onFacetClick: (filter) => {
            const field = filter.content.field;
            setSelectedFilterContent(
              <GenericFilters
                queryBuilderId={VARIANT_QB_ID}
                index={INDEXES.VARIANT}
                field={dotToUnderscore(field)}
                sqon={variantResolvedSqon}
                extendedMappingResults={variantMapping}
              />,
            );
          },
          selectedFilterContent: selectedFilterContent,
          blacklistedFacets: ['locus'],
        }}
        enableCombine
        enableShowHideLabels
        IconTotal={<LineStyleIcon width="18" height="18" />}
        currentQuery={isEmptySqon(activeQuery) ? {} : activeQuery}
        total={variantResults.total}
        dictionary={getQueryBuilderDictionary(facetTransResolver)}
        getResolvedQueryForCount={(sqon) => getVariantResolvedSqon(sqon)}
        fetchQueryCount={async (sqon) => {
          const { data } = await ArrangerApi.graphqlRequest<{ data: IVariantResultTree }>({
            query: GET_VARIANT_COUNT.loc?.source.body,
            variables: {
              sqon: getVariantResolvedSqon(sqon),
            },
          });

          return data?.data?.Variants.hits.total ?? 0;
        }}
      />
      <Tabs type="card" activeKey={'variants'}>
        <Tabs.TabPane
          tab={intl.get('screen.patientvariant.results.table.variants') || 'Variants'}
          key="variants"
        >
          <VariantsTab
            results={variantResults}
            setQueryConfig={setVariantQueryConfig}
            queryConfig={variantQueryConfig}
            patientId={patientid}
            sqon={variantResolvedSqon}
          />
        </Tabs.TabPane>
      </Tabs>
    </Space>
  );
};

export default PageContent;
