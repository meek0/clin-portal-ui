import SidebarMenu, { ISidebarMenuItem } from '@ferlab/ui/core/components/SidebarMenu';
import intl from 'react-intl-universal';
import PageContent from 'views/Variants/Exploration';
import ApolloProvider from 'providers/ApolloProvider';
import { Spin } from 'antd';
import { ExtendedMappingResults } from 'graphql/models';
import FilterList, { TCustomFilterMapper } from 'components/uiKit/FilterList';
import { FilterInfo } from 'components/uiKit/FilterList/types';
import { GraphqlBackend } from 'providers';
import useGetExtendedMappings from 'hooks/graphql/useGetExtendedMappings';
import { INDEXES } from 'graphql/constants';
import LineStyleIcon from 'components/icons/LineStyleIcon';
import GeneIcon from 'components/icons/GeneIcon';
import DiseaseIcon from 'components/icons/DiseaseIcon';
import FrequencyIcon from 'components/icons/FrequencyIcon';
import OccurenceIcon from 'components/icons/OccurenceIcon';
import { SCROLL_WRAPPER_ID, VARIANT_QB_ID } from './utils/constant';
import ScrollContentWithFooter from 'components/Layout/ScrollContentWithFooter';
import VariantGeneSearch from './components/VariantGeneSearch';
import { SuggestionType } from 'graphql/variants/models';
import ContentWithHeader from 'components/Layout/ContentWithHeader';

import styles from './index.module.scss';

interface OwnProps {
  tab?: string;
}

enum FilterTypes {
  Variant,
  Gene,
  Pathogenicity,
  Frequency,
  Occurrence,
}

const filterGroups: {
  [type: string]: FilterInfo;
} = {
  [FilterTypes.Variant]: {
    customSearches: [
      <VariantGeneSearch
        key="variants"
        type={SuggestionType.VARIANTS}
        queryBuilderId={VARIANT_QB_ID}
      />,
    ],
    groups: [
      {
        facets: [
          'variant_class',
          'consequences__consequences',
          'variant_external_reference',
          'chromosome',
          'start',
        ],
      },
    ],
  },
  [FilterTypes.Gene]: {
    customSearches: [
      <VariantGeneSearch key="genes" type={SuggestionType.GENES} queryBuilderId={VARIANT_QB_ID} />,
    ],
    groups: [
      { facets: ['consequences__biotype', 'gene_external_reference'] },
      {
        title: intl.get('screen.patientvariant.filter.grouptitle.genepanel'),
        facets: [
          'panels',
          'genes__hpo__hpo_term_label',
          'genes__orphanet__panel',
          'genes__omim__name',
          'genes__ddd__disease_name',
          'genes__cosmic__tumour_types_germline',
        ],
      },
    ],
  },
  [FilterTypes.Pathogenicity]: {
    groups: [
      {
        facets: [
          'clinvar__clin_sig',
          'varsome__acmg__verdict__verdict',
          'varsome__acmg__classifications__name',
          'consequences__vep_impact',
        ],
      },
      {
        title: 'Prédictions',
        facets: [
          'consequences__predictions__sift_pred',
          'consequences__predictions__polyphen2_hvar_pred',
          'consequences__predictions__fathmm_pred',
          'consequences__predictions__cadd_score',
          'consequences__predictions__dann_score',
          'consequences__predictions__lrt_pred',
          'consequences__predictions__revel_rankscore',
        ],
      },
    ],
  },
  [FilterTypes.Frequency]: {
    groups: [
      {
        title: intl.get('screen.patientvariant.filter.grouptitle.rqdmpatient'),
        facets: [
          'frequency_RQDM__total__af',
          'frequency_RQDM__affected__af',
          'frequency_RQDM__non_affected__af',
        ],
      },
      {
        title: intl.get('screen.patientvariant.filter.grouptitle.publiccohorts'),
        facets: [
          'external_frequencies__gnomad_genomes_2_1_1__af',
          'external_frequencies__gnomad_genomes_3_0__af',
          'external_frequencies__gnomad_genomes_3_1_1__af',
          'external_frequencies__gnomad_exomes_2_1_1__af',
          'external_frequencies__topmed_bravo__af',
          'external_frequencies__thousand_genomes__af',
        ],
      },
    ],
  },
  [FilterTypes.Occurrence]: {
    groups: [
      {
        facets: [
          'donors__zygosity',
          'donors__transmission',
          'donors__parental_origin',
          'donors__is_hc',
          'donors__is_possibly_hc',
        ],
      },
      {
        title: intl.get('screen.patientvariant.category_metric'),
        facets: [
          'donors__filters',
          'donors__qd',
          'donors__ad_alt',
          'donors__ad_total',
          'donors__ad_ratio',
          'donors__gq',
        ],
      },
    ],
  },
};

const filtersContainer = (
  mappingResults: ExtendedMappingResults,
  type: FilterTypes,
  index: string,
  filterMapper?: TCustomFilterMapper,
): React.ReactNode => {
  if (mappingResults.loading) {
    return <Spin className={styles.filterLoader} spinning />;
  }

  return (
    <FilterList
      key={index}
      index={index}
      queryBuilderId={VARIANT_QB_ID}
      extendedMappingResults={mappingResults}
      filterInfo={filterGroups[type]}
      filterMapper={filterMapper}
    />
  );
};

const VariantExploration = (props: OwnProps) => {
  const variantMappingResults = useGetExtendedMappings(INDEXES.VARIANT);

  const menuItems: ISidebarMenuItem[] = [
    {
      key: '1',
      title: intl.get('screen.patientvariant.category_variant'),
      icon: <LineStyleIcon className={styles.sideMenuIcon} />,
      panelContent: filtersContainer(variantMappingResults, FilterTypes.Variant, INDEXES.VARIANT),
    },
    {
      key: '2',
      title: intl.get('screen.patientvariant.category_genomic'),
      icon: <GeneIcon className={styles.sideMenuIcon} />,
      panelContent: filtersContainer(variantMappingResults, FilterTypes.Gene, INDEXES.VARIANT),
    },
    {
      key: '3',
      title: intl.get('screen.patientvariant.category_cohort'),
      icon: <FrequencyIcon className={styles.sideMenuIcon} />,
      panelContent: filtersContainer(variantMappingResults, FilterTypes.Frequency, INDEXES.VARIANT),
    },
    {
      key: '4',
      title: intl.get('screen.patientvariant.category_pathogenicity'),
      icon: <DiseaseIcon className={styles.sideMenuIcon} />,
      panelContent: filtersContainer(
        variantMappingResults,
        FilterTypes.Pathogenicity,
        INDEXES.VARIANT,
      ),
    },
    {
      key: '5',
      title: intl.get('screen.patientvariant.category_occurrence'),
      icon: <OccurenceIcon className={styles.sideMenuIcon} />,
      panelContent: filtersContainer(
        variantMappingResults,
        FilterTypes.Occurrence,
        INDEXES.VARIANT,
      ),
    },
  ];

  return (
    <ContentWithHeader
      headerProps={{ title: intl.get('screen.variantsearch.title') }}
      className={styles.variantLayout}
    >
      <SidebarMenu className={styles.sideMenu} menuItems={menuItems} />
      <ScrollContentWithFooter scrollId={SCROLL_WRAPPER_ID}>
        <PageContent variantMapping={variantMappingResults} />
      </ScrollContentWithFooter>
    </ContentWithHeader>
  );
};

const VariantExplorationWrapper = (props: OwnProps) => (
  <ApolloProvider backend={GraphqlBackend.ARRANGER}>
    <VariantExploration {...props} />
  </ApolloProvider>
);

export default VariantExplorationWrapper;
