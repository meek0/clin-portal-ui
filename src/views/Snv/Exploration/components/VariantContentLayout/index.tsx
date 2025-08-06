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
import { INDEXES } from 'graphql/constants';
import { ExtendedMapping, ExtendedMappingResults, IQueryResults } from 'graphql/models';
import { IVariantResultTree, VariantEntity } from 'graphql/variants/models';
import { GET_VARIANT_COUNT } from 'graphql/variants/queries';
import { VariantSection } from 'views/Prescriptions/Entity/Tabs/Variants/components/VariantSectionNav';
import { QUERY_EDITION_QB_ID } from 'views/Snv/utils/constant';

import LineStyleIcon from 'components/icons/LineStyleIcon';
import GenericFilters from 'components/uiKit/FilterList/GenericFilters';
import useCustomPillsActions from 'hooks/useCustomPillsActions';
import useQBStateWithSavedFilters from 'hooks/useQBStateWithSavedFilters';
import useSavedFiltersActions from 'hooks/useSavedFiltersActions';
import { useGlobals } from 'store/global';
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
  variantSection?: VariantSection;
  menuItemsCustomPill: ISidebarMenuItem[];
}

const VariantContentLayout = ({
  queryBuilderId,
  savedFilterTag,
  activeQuery,
  variantResults,
  variantMapping,
  getVariantResolvedSqon,
  variantSection,
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
    useSavedFiltersActions(savedFilterTag, variantSection);

  const { handleOnCreateCustomPill, handleOnUpdateCustomPill } =
    useCustomPillsActions(savedFilterTag);

  const facetTransResolver = (key: string) => {
    if (key === 'locus') return 'Variant';
    if (key === 'freq_rqdm_tumor_normal.pf')
      return intl.get('filters.group.freq_rqdm_tumor_normal.pf.query');
    if (key === 'freq_rqdm_tumor_only.pf')
      return intl.get('filters.group.freq_rqdm_tumor_only.pf.query');
    const title = intl
      .get(`${INDEXES.VARIANT}.filters.group.${key}`)
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
        className="variant-patient-repo__query-builder"
        customPillConfig={
          variantSection === VariantSection.SNVTO ||
          variantSection === VariantSection.SNVTN ||
          variantSection === VariantSection.SNV ||
          !variantSection // RQDM
            ? {
                createCustomPill: handleOnCreateCustomPill,
                tag: savedFilterTag,
                editPill: handleOnUpdateCustomPill,
                getFiltersByPill: fetchFiltersByCustomPill,
                getPillById: fetchSavedFilterById,
                editMenuItems: menuItemsCustomPill,
                queryEditionQBId: QUERY_EDITION_QB_ID,
                validateName: CustomPillApi.validateName,
              }
            : undefined
        }
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
        filterQueryToIgnore={['flags']}
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
          blacklistedFacets: ['consequences.symbol', 'locus', 'consequences.symbol_id_1'],
        }}
        enableCombine
        scrollQueryContainer={true}
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
          return data?.data?.Variants.hits.total ?? 0;
        }}
      />
      {children}
    </Space>
  );
};

export default VariantContentLayout;
