import { SuggestionType } from 'api/arranger/models';
import { TCustomFilterMapper } from 'components/uiKit/FilterList';
import { FilterInfo } from 'components/uiKit/FilterList/types';
import { ExtendedMappingResults } from 'graphql/models';
import intl from 'react-intl-universal';
import DiseaseIcon from 'components/icons/DiseaseIcon';
import { ISidebarMenuItem } from '@ferlab/ui/core/components/SidebarMenu';
import RqdmIcon from 'components/icons/RqdmIcon';
import { INDEXES } from 'graphql/constants';
import LineStyleIcon from 'components/icons/LineStyleIcon';
import GeneIcon from 'components/icons/GeneIcon';
import FrequencyIcon from 'components/icons/FrequencyIcon';
import OccurenceIcon from 'components/icons/OccurenceIcon';
import { FilterTypes, VARIANT_PATIENT_QB_ID } from 'views/Variants/utils/constant';
import { filtersContainer } from '../components/filtersContainer';
import VariantGeneSearch from 'views/Variants/components/VariantGeneSearch';

import styles from '../facets.module.scss';

const filterGroups: {
  [type: string]: FilterInfo;
} = {
  [FilterTypes.Rqdm]: {
    defaultOpenFacets: ['panels'],
    groups: [
      {
        facets: ['panels'],
      },
    ],
  },
  [FilterTypes.Variant]: {
    customSearches: [
      <VariantGeneSearch
        key="variants"
        type={SuggestionType.VARIANTS}
        queryBuilderId={VARIANT_PATIENT_QB_ID}
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
      <VariantGeneSearch
        key="genes"
        type={SuggestionType.GENES}
        queryBuilderId={VARIANT_PATIENT_QB_ID}
      />,
    ],
    groups: [
      {
        facets: ['consequences__biotype', 'gene_external_reference'],
      },
      {
        title: intl.get('screen.patientvariant.filter.grouptitle.genepanel'),
        facets: [
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

export const getMenuItems = (
  variantMappingResults: ExtendedMappingResults,
  filterMapper: TCustomFilterMapper,
): ISidebarMenuItem[] => [
  {
    key: 'rqdm',
    title: intl.get('screen.patientvariant.category_rqdm'),
    icon: <RqdmIcon className={styles.sideMenuIcon} />,
    panelContent: filtersContainer(
      variantMappingResults,
      INDEXES.VARIANT,
      VARIANT_PATIENT_QB_ID,
      filterGroups[FilterTypes.Rqdm],
      filterMapper,
    ),
  },
  {
    key: 'category_variant',
    title: intl.get('screen.patientvariant.category_variant'),
    icon: <LineStyleIcon className={styles.sideMenuIcon} />,
    panelContent: filtersContainer(
      variantMappingResults,
      INDEXES.VARIANT,
      VARIANT_PATIENT_QB_ID,
      filterGroups[FilterTypes.Variant],
      filterMapper,
    ),
  },
  {
    key: 'category_genomic',
    title: intl.get('screen.patientvariant.category_genomic'),
    icon: <GeneIcon className={styles.sideMenuIcon} />,
    panelContent: filtersContainer(
      variantMappingResults,
      INDEXES.VARIANT,
      VARIANT_PATIENT_QB_ID,
      filterGroups[FilterTypes.Gene],
      filterMapper,
    ),
  },
  {
    key: 'category_cohort',
    title: intl.get('screen.patientvariant.category_cohort'),
    icon: <FrequencyIcon className={styles.sideMenuIcon} />,
    panelContent: filtersContainer(
      variantMappingResults,
      INDEXES.VARIANT,
      VARIANT_PATIENT_QB_ID,
      filterGroups[FilterTypes.Frequency],
      filterMapper,
    ),
  },
  {
    key: 'category_pathogenicity',
    title: intl.get('screen.patientvariant.category_pathogenicity'),
    icon: <DiseaseIcon className={styles.sideMenuIcon} />,
    panelContent: filtersContainer(
      variantMappingResults,
      INDEXES.VARIANT,
      VARIANT_PATIENT_QB_ID,
      filterGroups[FilterTypes.Pathogenicity],
      filterMapper,
    ),
  },
  {
    key: 'category_occurrence',
    title: intl.get('screen.patientvariant.category_occurrence'),
    icon: <OccurenceIcon className={styles.sideMenuIcon} />,
    panelContent: filtersContainer(
      variantMappingResults,
      INDEXES.VARIANT,
      VARIANT_PATIENT_QB_ID,
      filterGroups[FilterTypes.Occurrence],
      filterMapper,
    ),
  },
];
