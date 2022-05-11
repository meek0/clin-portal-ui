import { Spin } from 'antd';
import { SuggestionType } from 'api/arranger/models';
import FilterList, { TCustomFilterMapper } from 'components/uiKit/FilterList';
import { FilterInfo } from 'components/uiKit/FilterList/types';
import { ExtendedMappingResults } from 'graphql/models';
import intl from 'react-intl-universal';
import VariantGeneSearch from './components/VariantGeneSearch';
import { VARIANT_QB_ID } from './utils/constant';
import DiseaseIcon from 'components/icons/DiseaseIcon';
import { ISidebarMenuItem } from '@ferlab/ui/core/components/SidebarMenu';
import RqdmIcon from 'components/icons/RqdmIcon';
import { INDEXES } from 'graphql/constants';
import LineStyleIcon from 'components/icons/LineStyleIcon';
import GeneIcon from 'components/icons/GeneIcon';
import FrequencyIcon from 'components/icons/FrequencyIcon';

import styles from './index.module.scss';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import OccurenceIcon from 'components/icons/OccurenceIcon';
import { UserOutlined } from '@ant-design/icons';

export enum FilterTypes {
  Variant,
  Gene,
  Pathogenicity,
  Frequency,
  Occurrence,
  Rqdm,
  VariantRqdm,
  Patient,
}

export type IFilterMapping = (filters: ISqonGroupFilter) => ISqonGroupFilter;

const filterGroups: {
  [type: string]: FilterInfo;
} = {
  [FilterTypes.Patient]: {
    groups: [
      {
        facets: ['donors__analysis_code', 'donors__affected_status', 'donors__gender'],
      },
    ],
  },
  [FilterTypes.Rqdm]: {
    defaultOpenFacets: ['panels'],
    groups: [
      {
        title: intl.get('screen.patientvariant.filter.grouptitle.genepanel'),
        facets: ['panels'],
      },
    ],
  },
  [FilterTypes.VariantRqdm]: {
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
          'donors__zygosity',
          'donors__transmission',
          'donors__is_possibly_hc'
        ],
      },
    ],
  },
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
      {
        facets: [
          'consequences__biotype',
          'gene_external_reference',
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
      key={index + type}
      index={index}
      queryBuilderId={VARIANT_QB_ID}
      extendedMappingResults={mappingResults}
      filterInfo={filterGroups[type]}
      filterMapper={filterMapper}
    />
  );
};

const geneFacetsConfig = (
  variantMappingResults: ExtendedMappingResults,
  filterMapper: IFilterMapping,
): ISidebarMenuItem => ({
  key: 'category_genomic',
  title: intl.get('screen.patientvariant.category_genomic'),
  icon: <GeneIcon className={styles.sideMenuIcon} />,
  panelContent: filtersContainer(
    variantMappingResults,
    FilterTypes.Gene,
    INDEXES.VARIANT,
    filterMapper,
  ),
});

const frequencyFacetsConfig = (
  variantMappingResults: ExtendedMappingResults,
  filterMapper: IFilterMapping,
): ISidebarMenuItem => ({
  key: 'category_cohort',
  title: intl.get('screen.patientvariant.category_cohort'),
  icon: <FrequencyIcon className={styles.sideMenuIcon} />,
  panelContent: filtersContainer(
    variantMappingResults,
    FilterTypes.Frequency,
    INDEXES.VARIANT,
    filterMapper,
  ),
});

const pathogenicityFacetsConfig = (
  variantMappingResults: ExtendedMappingResults,
  filterMapper: IFilterMapping,
): ISidebarMenuItem => ({
  key: 'category_pathogenicity',
  title: intl.get('screen.patientvariant.category_pathogenicity'),
  icon: <DiseaseIcon className={styles.sideMenuIcon} />,
  panelContent: filtersContainer(
    variantMappingResults,
    FilterTypes.Pathogenicity,
    INDEXES.VARIANT,
    filterMapper,
  ),
});

export const getMenuItems = (
  isInPatientContext: boolean,
  variantMappingResults: ExtendedMappingResults,
  filterMapper: IFilterMapping,
): ISidebarMenuItem[] => {
  if (isInPatientContext) {
    return [
      {
        key: 'rqdm',
        title: intl.get('screen.patientvariant.category_rqdm'),
        icon: <RqdmIcon className={styles.sideMenuIcon} />,
        panelContent: filtersContainer(
          variantMappingResults,
          FilterTypes.Rqdm,
          INDEXES.VARIANT,
          filterMapper,
        ),
      },
      {
        key: 'category_variant',
        title: intl.get('screen.patientvariant.category_variant'),
        icon: <LineStyleIcon className={styles.sideMenuIcon} />,
        panelContent: filtersContainer(
          variantMappingResults,
          FilterTypes.Variant,
          INDEXES.VARIANT,
          filterMapper,
        ),
      },
      geneFacetsConfig(variantMappingResults, filterMapper),
      frequencyFacetsConfig(variantMappingResults, filterMapper),
      pathogenicityFacetsConfig(variantMappingResults, filterMapper),
      {
        key: 'category_occurrence',
        title: intl.get('screen.patientvariant.category_occurrence'),
        icon: <OccurenceIcon className={styles.sideMenuIcon} />,
        panelContent: filtersContainer(
          variantMappingResults,
          FilterTypes.Occurrence,
          INDEXES.VARIANT,
          filterMapper,
        ),
      },
    ];
  }

  return [
    {
      key: 'patient',
      title: intl.get('screen.patientvariant.category_patient'),
      icon: <UserOutlined className={styles.sideMenuIcon} />,
      panelContent: filtersContainer(
        variantMappingResults,
        FilterTypes.Patient,
        INDEXES.VARIANT,
        filterMapper,
      ),
    },
    {
      key: 'category_variant',
      title: intl.get('screen.patientvariant.category_variant'),
      icon: <LineStyleIcon className={styles.sideMenuIcon} />,
      panelContent: filtersContainer(
        variantMappingResults,
        FilterTypes.VariantRqdm,
        INDEXES.VARIANT,
        filterMapper,
      ),
    },
    geneFacetsConfig(variantMappingResults, filterMapper),
    frequencyFacetsConfig(variantMappingResults, filterMapper),
    pathogenicityFacetsConfig(variantMappingResults, filterMapper),
  ];
};
