import React, { useState } from 'react';
import QueryBuilder from '@ferlab/ui/core/components/QueryBuilder';
import { Space } from 'antd';
import GenericFilters from 'components/uiKit/FilterList/GenericFilters';
import { INDEXES } from 'graphql/constants';
import { dotToUnderscore } from '@ferlab/ui/core/data/arranger/formatting';
import { ISqonGroupFilter, ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { ExtendedMapping, ExtendedMappingResults, IQueryResults } from 'graphql/models';
import intl from 'react-intl-universal';
import LineStyleIcon from 'components/icons/LineStyleIcon';
import { isEmptySqon } from '@ferlab/ui/core/data/sqon/utils';
import { IVariantResultTree, VariantEntity } from 'graphql/variants/models';
import { getQueryBuilderDictionary } from 'utils/translation';
import { ArrangerApi } from 'api/arranger';
import { GET_VARIANT_COUNT } from 'graphql/variants/queries';

import styles from './index.module.scss';

interface OwnProps {
  queryBuilderId: string;
  activeQuery: ISyntheticSqon;
  variantResults: IQueryResults<VariantEntity[]>;
  variantMapping: ExtendedMappingResults;
  children: React.ReactElement;
  getVariantResolvedSqon: (query: ISyntheticSqon) => ISqonGroupFilter;
}

const VariantContentLayout = ({
  queryBuilderId,
  activeQuery,
  variantResults,
  variantMapping,
  getVariantResolvedSqon,
  children,
}: OwnProps) => {
  const [selectedFilterContent, setSelectedFilterContent] = useState<
    React.ReactElement | undefined
  >(undefined);

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
        id={queryBuilderId}
        className="variant-patient-repo__query-builder"
        headerConfig={{
          showHeader: true,
          showTools: false,
          collapseProps: {
            headerBorderOnly: true,
          },
          defaultTitle: intl.get('querybuilder.variant.filter.defaultTitle'),
        }}
        facetFilterConfig={{
          enable: true,
          onFacetClick: (filter) => {
            const field = filter.content.field;
            setSelectedFilterContent(
              <GenericFilters
                queryBuilderId={queryBuilderId}
                index={INDEXES.VARIANT}
                field={dotToUnderscore(field)}
                sqon={getVariantResolvedSqon(activeQuery)}
                extendedMappingResults={variantMapping}
              />,
            );
          },
          selectedFilterContent: selectedFilterContent,
          blacklistedFacets: ['consequences.symbol', 'locus'],
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
      {children}
    </Space>
  );
};

export default VariantContentLayout;
