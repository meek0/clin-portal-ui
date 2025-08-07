import React, { useState } from 'react';
import intl from 'react-intl-universal';
import QueryBuilder from '@ferlab/ui/core/components/QueryBuilder';
import { ISidebarMenuItem } from '@ferlab/ui/core/components/SidebarMenu';
import { dotToUnderscore } from '@ferlab/ui/core/data/arranger/formatting';
import { ISqonGroupFilter, ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { isEmptySqon } from '@ferlab/ui/core/data/sqon/utils';
import { Space } from 'antd';
import { ArrangerApi } from 'api/arranger';
import { CustomPillApi } from 'api/customPill';
import { fetchFiltersByCustomPill, fetchSavedFilterById } from 'api/customPill/customPill.utils';
import { IVariantResultTree, VariantEntity } from 'graphql/cnv/models';
import { GET_VARIANT_COUNT } from 'graphql/cnv/queries';
import { INDEXES } from 'graphql/constants';
import { ExtendedMapping, ExtendedMappingResults, IQueryResults } from 'graphql/models';
import { QUERY_EDITION_QB_ID } from 'views/Snv/utils/constant';

import LineStyleIcon from 'components/icons/LineStyleIcon';
import GenericFilters from 'components/uiKit/FilterList/GenericFilters';
import useCustomPillsActions from 'hooks/useCustomPillsActions';
import useQBStateWithSavedFilters from 'hooks/useQBStateWithSavedFilters';
import useSavedFiltersActions from 'hooks/useSavedFiltersActions';
import { useGlobals } from 'store/global';
import { CNV_EXPLORATION_PATIENT_FILTER_TAG } from 'utils/queryBuilder';
import { getQueryBuilderDictionary } from 'utils/translation';

import styles from './index.module.css';

interface OwnProps {
  queryBuilderId: string;
  savedFilterTag: string;
  activeQuery: ISyntheticSqon;
  variantResults: IQueryResults<VariantEntity[]>;
  variantMapping: ExtendedMappingResults;
  children: React.ReactElement;
  getVariantResolvedSqon: (query: ISyntheticSqon) => ISqonGroupFilter;
  menuItemsCustomPill: ISidebarMenuItem[];
}

const VariantContentLayout = ({
  queryBuilderId,
  savedFilterTag,
  activeQuery,
  variantResults,
  variantMapping,
  getVariantResolvedSqon,
  children,
  menuItemsCustomPill,
}: OwnProps) => {
  const { getAnalysisNameByCode } = useGlobals();
  const [selectedFilterContent, setSelectedFilterContent] = useState<
    React.ReactElement | undefined
  >(undefined);
  const { selectedSavedFilter, savedFilterList } = useQBStateWithSavedFilters(
    queryBuilderId,
    savedFilterTag,
  );
  const { handleOnDeleteFilter, handleOnSaveFilter, handleOnShareFilter, handleOnUpdateFilter } =
    useSavedFiltersActions(savedFilterTag);

  const { handleOnCreateCustomPill, handleOnUpdateCustomPill } =
    useCustomPillsActions(savedFilterTag);

  const facetTransResolver = (key: string) => {
    const title = intl
      .get(`${INDEXES.CNV}.filters.group.${key}`)
      .defaultMessage(intl.get(`filters.group.${key}`));

    return title
      ? title
      : variantMapping?.data?.find((mapping: ExtendedMapping) => key === mapping.field)
          ?.displayName || key;
  };

  return (
    <Space direction="vertical" size={24} className={styles.variantPageContent}>
      <QueryBuilder
        id={queryBuilderId}
        scrollQueryContainer={true}
        className="variant-patient-repo__query-builder"
        customPillConfig={{
          createCustomPill: handleOnCreateCustomPill,
          tag: CNV_EXPLORATION_PATIENT_FILTER_TAG,
          editPill: handleOnUpdateCustomPill,
          getFiltersByPill: fetchFiltersByCustomPill,
          getPillById: fetchSavedFilterById,
          editMenuItems: menuItemsCustomPill,
          queryEditionQBId: QUERY_EDITION_QB_ID,
          validateName: CustomPillApi.validateName,
        }}
        headerConfig={{
          showHeader: true,
          showTools: true,
          options: {
            enableEditTitle: true,
            enableDuplicate: true,
            enableFavoriteFilter: false,
            enableShare: true,
            enableUndoChanges: true,
          },
          selectedSavedFilter: selectedSavedFilter,
          savedFilters: savedFilterList,
          onShareFilter: handleOnShareFilter,
          onUpdateFilter: handleOnUpdateFilter,
          onSaveFilter: handleOnSaveFilter,
          onDeleteFilter: handleOnDeleteFilter,
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
                index={INDEXES.CNV}
                field={dotToUnderscore(field)}
                sqon={getVariantResolvedSqon(activeQuery)}
                extendedMappingResults={variantMapping}
              />,
            );
          },
          selectedFilterContent: selectedFilterContent,
          blacklistedFacets: ['genes.symbol'],
        }}
        filterQueryToIgnore={['flags']}
        enableCombine
        enableShowHideLabels
        IconTotal={<LineStyleIcon width="18" height="18" />}
        currentQuery={isEmptySqon(activeQuery) ? {} : activeQuery}
        total={variantResults.total}
        dictionary={getQueryBuilderDictionary(facetTransResolver, getAnalysisNameByCode)}
        getResolvedQueryForCount={(sqon) => getVariantResolvedSqon(sqon)}
        fetchQueryCount={async (sqon) => {
          const { data } = await ArrangerApi.graphqlRequest<{ data: IVariantResultTree }>({
            query: GET_VARIANT_COUNT.loc?.source.body,
            variables: {
              sqon: getVariantResolvedSqon(sqon),
            },
          });

          return data?.data?.cnv.hits.total ?? 0;
        }}
      />
      {children}
    </Space>
  );
};

export default VariantContentLayout;
