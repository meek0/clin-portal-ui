import intl from 'react-intl-universal';
import { ISidebarMenuItem } from '@ferlab/ui/core/components/SidebarMenu';
import { RangeOperators } from '@ferlab/ui/core/data/sqon/operators';
import { SuggestionType } from 'api/arranger/models';
import { INDEXES } from 'graphql/constants';
import { ExtendedMappingResults } from 'graphql/models';
import { VariantType } from 'graphql/variants/models';
import { VariantSection } from 'views/Prescriptions/Entity/Tabs/Variants/components/VariantSectionNav';
import {
  FilterTypes,
  GeneSearchFieldsMapping,
  getQueryBuilderID,
  SNV_VARIANT_PATIENT_QB_ID,
  SNV_VARIANT_PATIENT_TN_QB_ID,
  SNV_VARIANT_PATIENT_TO_QB_ID,
} from 'views/Snv/utils/constant';

import GenesUploadIds from 'components/GeneUploadIds';
import DiseaseIcon from 'components/icons/DiseaseIcon';
import FrequencyIcon from 'components/icons/FrequencyIcon';
import GeneIcon from 'components/icons/GeneIcon';
import LineStyleIcon from 'components/icons/LineStyleIcon';
import OccurenceIcon from 'components/icons/OccurenceIcon';
import RqdmIcon from 'components/icons/RqdmIcon';
import { TCustomFilterMapper } from 'components/uiKit/FilterList';
import { FilterInfo } from 'components/uiKit/FilterList/types';
import VariantGeneSearch from 'components/VariantGeneSearch';

import { filtersContainer } from '../components/filtersContainer';

import styles from '../facets.module.css';

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
  [FilterTypes.Variant_germline]: {
    customSearches: () => [
      <VariantGeneSearch
        key="variants"
        index={INDEXES.VARIANT}
        fields={GeneSearchFieldsMapping}
        type={SuggestionType.VARIANTS}
        queryBuilderId={SNV_VARIANT_PATIENT_QB_ID}
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
        defaults: {
          start: {
            operator: RangeOperators.between,
          },
        },
        intervalDecimal: {
          start: 0,
        },
      },
    ],
  },
  [FilterTypes.Variant_somatic_to]: {
    customSearches: () => [
      <VariantGeneSearch
        key="variants"
        index={INDEXES.VARIANT}
        fields={GeneSearchFieldsMapping}
        type={SuggestionType.VARIANTS}
        queryBuilderId={SNV_VARIANT_PATIENT_TO_QB_ID}
      />,
    ],
    groups: [
      {
        facets: [
          'variant_class',
          'donors__all_analyses',
          'consequences__consequences',
          'variant_external_reference',
          'chromosome',
          'start',
        ],
        defaults: {
          start: {
            operator: RangeOperators.between,
          },
        },
        intervalDecimal: {
          start: 0,
        },
      },
    ],
  },
  [FilterTypes.Variant_somatic_tn]: {
    customSearches: () => [
      <VariantGeneSearch
        key="variants"
        index={INDEXES.VARIANT}
        fields={GeneSearchFieldsMapping}
        type={SuggestionType.VARIANTS}
        queryBuilderId={SNV_VARIANT_PATIENT_TN_QB_ID}
      />,
    ],
    groups: [
      {
        facets: [
          'variant_class',
          'donors__all_analyses',
          'consequences__consequences',
          'variant_external_reference',
          'chromosome',
          'start',
        ],
        defaults: {
          start: {
            operator: RangeOperators.between,
          },
        },
        intervalDecimal: {
          start: 0,
        },
      },
    ],
  },
  [FilterTypes.Gene_germline]: {
    customSearches: () => [
      <VariantGeneSearch
        key="genes"
        index={INDEXES.VARIANT}
        fields={GeneSearchFieldsMapping}
        type={SuggestionType.GENES}
        queryBuilderId={SNV_VARIANT_PATIENT_QB_ID}
      />,
      <GenesUploadIds
        key="geneIds"
        field="consequences.symbol_id_1"
        queryBuilderId={SNV_VARIANT_PATIENT_QB_ID}
      />,
    ],
    groups: [
      {
        facets: [
          'consequences__biotype',
          'gene_external_reference',
          'genes__gnomad__pli',
          'genes__gnomad__loeuf',
          'genes__omim__inheritance_code',
        ],
        defaults: {
          genes__gnomad__pli: {
            operator: RangeOperators['>='],
          },
        },
      },
      {
        title: intl.get('screen.patientsnv.filter.grouptitle.genepanel'),
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
  [FilterTypes.Gene_somatic_to]: {
    customSearches: () => [
      <VariantGeneSearch
        key="genes"
        index={INDEXES.VARIANT}
        fields={GeneSearchFieldsMapping}
        type={SuggestionType.GENES}
        queryBuilderId={SNV_VARIANT_PATIENT_TO_QB_ID}
      />,
      <GenesUploadIds
        key="geneIds"
        field="consequences.symbol_id_1"
        queryBuilderId={SNV_VARIANT_PATIENT_TO_QB_ID}
      />,
    ],
    groups: [
      {
        facets: [
          'consequences__biotype',
          'gene_external_reference',
          'genes__gnomad__pli',
          'genes__gnomad__loeuf',
          'genes__omim__inheritance_code',
        ],
        defaults: {
          genes__gnomad__pli: {
            operator: RangeOperators['>='],
          },
        },
      },
      {
        title: intl.get('screen.patientsnv.filter.grouptitle.genepanel'),
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
  [FilterTypes.Gene_somatic_tn]: {
    customSearches: () => [
      <VariantGeneSearch
        key="genes"
        index={INDEXES.VARIANT}
        fields={GeneSearchFieldsMapping}
        type={SuggestionType.GENES}
        queryBuilderId={SNV_VARIANT_PATIENT_TN_QB_ID}
      />,
      <GenesUploadIds
        key="geneIds"
        field="consequences.symbol_id_1"
        queryBuilderId={SNV_VARIANT_PATIENT_TN_QB_ID}
      />,
    ],
    groups: [
      {
        facets: [
          'consequences__biotype',
          'gene_external_reference',
          'genes__gnomad__pli',
          'genes__gnomad__loeuf',
          'genes__omim__inheritance_code',
        ],
        defaults: {
          genes__gnomad__pli: {
            operator: RangeOperators['>='],
          },
        },
      },
      {
        title: intl.get('screen.patientsnv.filter.grouptitle.genepanel'),
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
  [FilterTypes.Pathogenicity_germline]: {
    groups: [
      {
        facets: ['clinvar__clin_sig', 'consequences__vep_impact'],
      },
      {
        title: intl.get('exomiser'),
        facets: [
          'donors__exomiser__gene_combined_score',
          'donors__exomiser__acmg_classification',
          'donors__exomiser__acmg_evidence',
        ],
        defaults: {
          donors__exomiser__gene_combined_score: {
            operator: RangeOperators['>='],
          },
        },
        tooltips: ['donors__exomiser__gene_combined_score'],
      },
      {
        title: intl.get('franklin.filter.groupTitle'),
        facets: [
          'donors__franklin_combined_score',
          'franklin_max__acmg_classification',
          'franklin_max__acmg_evidence',
        ],
        defaults: {
          donors__franklin_combined_score: {
            operator: RangeOperators['>='],
          },
        },
        tooltips: ['donors__franklin_combined_score'],
      },
      {
        title: intl.get('predictions'),
        facets: [
          'consequences__predictions__cadd_phred',
          'consequences__predictions__cadd_score',
          'consequences__predictions__dann_score',
          'consequences__predictions__fathmm_pred',
          'consequences__predictions__lrt_pred',
          'consequences__predictions__polyphen2_hvar_pred',
          'consequences__predictions__sift_pred',
          'genes__spliceai__ds',
          'consequences__predictions__revel_score',
        ],
        defaults: {
          consequences__predictions__cadd_phred: {
            operator: RangeOperators['>='],
          },
          consequences__predictions__cadd_score: {
            operator: RangeOperators['>='],
          },
          consequences__predictions__dann_score: {
            operator: RangeOperators['>='],
          },
          genes__spliceai__ds: {
            operator: RangeOperators['>='],
          },
          consequences__predictions__revel_score: {
            operator: RangeOperators['>='],
          },
        },
        tooltips: [
          'consequences__predictions__cadd_phred',
          'consequences__predictions__cadd_score',
          'consequences__predictions__dann_score',
        ],
      },
      {
        title: intl.get('oncology'),
        facets: ['cmc__sample_mutated', 'cmc__sample_ratio', 'cmc__tier'],
        defaults: {
          cmc__sample_mutated: {
            operator: RangeOperators['>='],
          },
          cmc__sample_ratio: {
            operator: RangeOperators['>='],
          },
        },
        tooltips: ['cmc__sample_mutated', 'cmc__sample_ratio', 'cmc__tier', 'hotspot'],
      },
    ],
  },
  [FilterTypes.Pathogenicity_somatic_to]: {
    groups: [
      {
        facets: ['clinvar__clin_sig', 'consequences__vep_impact'],
      },
      {
        title: intl.get('predictions'),
        facets: [
          'consequences__predictions__cadd_phred',
          'consequences__predictions__cadd_score',
          'consequences__predictions__dann_score',
          'consequences__predictions__fathmm_pred',
          'consequences__predictions__lrt_pred',
          'consequences__predictions__polyphen2_hvar_pred',
          'consequences__predictions__sift_pred',
          'genes__spliceai__ds',
          'consequences__predictions__revel_score',
        ],
        defaults: {
          consequences__predictions__cadd_phred: {
            operator: RangeOperators['>='],
          },
          consequences__predictions__cadd_score: {
            operator: RangeOperators['>='],
          },
          consequences__predictions__dann_score: {
            operator: RangeOperators['>='],
          },
          genes__spliceai__ds: {
            operator: RangeOperators['>='],
          },
          consequences__predictions__revel_score: {
            operator: RangeOperators['>='],
          },
        },
        tooltips: [
          'consequences__predictions__cadd_phred',
          'consequences__predictions__cadd_score',
          'consequences__predictions__dann_score',
        ],
      },
      {
        title: intl.get('oncology'),
        facets: ['cmc__sample_mutated', 'cmc__sample_ratio', 'cmc__tier', 'hotspot'],
        defaults: {
          cmc__sample_mutated: {
            operator: RangeOperators['>='],
          },
          cmc__sample_ratio: {
            operator: RangeOperators['>='],
          },
        },
        tooltips: ['cmc__sample_mutated', 'cmc__sample_ratio', 'cmc__tier', 'hotspot'],
      },
    ],
  },
  [FilterTypes.Pathogenicity_somatic_tn]: {
    groups: [
      {
        facets: ['clinvar__clin_sig', 'consequences__vep_impact'],
      },
      {
        title: intl.get('predictions'),
        facets: [
          'consequences__predictions__cadd_phred',
          'consequences__predictions__cadd_score',
          'consequences__predictions__dann_score',
          'consequences__predictions__fathmm_pred',
          'consequences__predictions__lrt_pred',
          'consequences__predictions__polyphen2_hvar_pred',
          'consequences__predictions__sift_pred',
          'genes__spliceai__ds',
          'consequences__predictions__revel_score',
        ],
        defaults: {
          consequences__predictions__cadd_phred: {
            operator: RangeOperators['>='],
          },
          consequences__predictions__cadd_score: {
            operator: RangeOperators['>='],
          },
          consequences__predictions__dann_score: {
            operator: RangeOperators['>='],
          },
          genes__spliceai__ds: {
            operator: RangeOperators['>='],
          },
          consequences__predictions__revel_score: {
            operator: RangeOperators['>='],
          },
        },
        tooltips: [
          'consequences__predictions__cadd_phred',
          'consequences__predictions__cadd_score',
          'consequences__predictions__dann_score',
        ],
      },
      {
        title: intl.get('oncology'),
        facets: ['cmc__sample_mutated', 'cmc__sample_ratio', 'cmc__tier', 'hotspot'],
        defaults: {
          cmc__sample_mutated: {
            operator: RangeOperators['>='],
          },
          cmc__sample_ratio: {
            operator: RangeOperators['>='],
          },
        },
        tooltips: ['cmc__sample_mutated', 'cmc__sample_ratio', 'cmc__tier', 'hotspot'],
      },
    ],
  },
  [FilterTypes.Frequency_germline]: {
    groups: [
      {
        title: intl.get('screen.patientsnv.filter.grouptitle.rqdmpatient'),
        facets: [
          'frequency_RQDM__total__af',
          'frequency_RQDM__affected__af',
          'frequency_RQDM__non_affected__af',
        ],
        defaults: {
          frequency_RQDM__affected__af: {
            operator: RangeOperators['>='],
          },
        },
        tooltips: [
          'frequency_RQDM__total__af',
          'frequency_RQDM__affected__af',
          'frequency_RQDM__non_affected__af',
        ],
      },
      {
        title: intl.get('screen.patientsnv.filter.grouptitle.publiccohorts'),
        facets: [
          'external_frequencies__gnomad_exomes_2_1_1__af',
          'external_frequencies__gnomad_genomes_2_1_1__af',
          'external_frequencies__gnomad_genomes_3_0__af',
          'external_frequencies__gnomad_genomes_3_1_1__af',
          'external_frequencies__gnomad_genomes_3_1_1__ac',
          'external_frequencies__gnomad_joint_4__af',
          'external_frequencies__gnomad_joint_4__ac',
          'external_frequencies__topmed_bravo__af',
          'external_frequencies__thousand_genomes__af',
        ],
        defaults: {
          external_frequencies__gnomad_exomes_2_1_1__af: {
            operator: RangeOperators['<='],
          },
          external_frequencies__gnomad_genomes_2_1_1__af: {
            operator: RangeOperators['<='],
          },
          external_frequencies__gnomad_genomes_3_0__af: {
            operator: RangeOperators['<='],
          },
          external_frequencies__gnomad_genomes_3_1_1__af: {
            operator: RangeOperators['<='],
          },
          external_frequencies__gnomad_genomes_3_1_1__ac: {
            operator: RangeOperators['<='],
          },
          external_frequencies__gnomad_joint_4__af: {
            operator: RangeOperators['<='],
          },
          external_frequencies__gnomad_joint_4__ac: {
            operator: RangeOperators['<='],
          },
          external_frequencies__topmed_bravo__af: {
            operator: RangeOperators['<='],
          },
          external_frequencies__thousand_genomes__af: {
            operator: RangeOperators['<='],
          },
        },
        tooltips: [
          'external_frequencies__gnomad_genomes_2_1_1__af',
          'external_frequencies__gnomad_genomes_3_0__af',
          'external_frequencies__gnomad_genomes_3_1_1__af',
          'external_frequencies__gnomad_joint_4__af',
          'external_frequencies__topmed_bravo__af',
          'external_frequencies__thousand_genomes__af',
        ],
      },
    ],
  },
  [FilterTypes.Frequency_somatic_to]: {
    groups: [
      {
        title: intl.get('screen.patientsnv.filter.grouptitle.rqdmpatient'),
        facets: [
          'freq_rqdm_tumor_only__pf',
          'frequency_RQDM__total__af',
          'frequency_RQDM__affected__af',
          'frequency_RQDM__non_affected__af',
        ],
        defaults: {
          frequency_RQDM__affected__af: {
            operator: RangeOperators['>='],
          },
        },
        tooltips: [
          'freq_rqdm_tumor_only__pf',
          'frequency_RQDM__total__af',
          'frequency_RQDM__affected__af',
          'frequency_RQDM__non_affected__af',
        ],
      },
      {
        title: intl.get('screen.patientsnv.filter.grouptitle.publiccohorts'),
        facets: [
          'external_frequencies__gnomad_exomes_2_1_1__af',
          'external_frequencies__gnomad_genomes_2_1_1__af',
          'external_frequencies__gnomad_genomes_3_0__af',
          'external_frequencies__gnomad_genomes_3_1_1__af',
          'external_frequencies__gnomad_genomes_3_1_1__ac',
          'external_frequencies__gnomad_joint_4__af',
          'external_frequencies__gnomad_joint_4__ac',
          'external_frequencies__topmed_bravo__af',
          'external_frequencies__thousand_genomes__af',
        ],
        defaults: {
          external_frequencies__gnomad_exomes_2_1_1__af: {
            operator: RangeOperators['<='],
          },
          external_frequencies__gnomad_genomes_2_1_1__af: {
            operator: RangeOperators['<='],
          },
          external_frequencies__gnomad_genomes_3_0__af: {
            operator: RangeOperators['<='],
          },
          external_frequencies__gnomad_genomes_3_1_1__af: {
            operator: RangeOperators['<='],
          },
          external_frequencies__gnomad_genomes_3_1_1__ac: {
            operator: RangeOperators['<='],
          },
          external_frequencies__gnomad_joint_4__af: {
            operator: RangeOperators['<='],
          },
          external_frequencies__gnomad_joint_4__ac: {
            operator: RangeOperators['<='],
          },
          external_frequencies__topmed_bravo__af: {
            operator: RangeOperators['<='],
          },
          external_frequencies__thousand_genomes__af: {
            operator: RangeOperators['<='],
          },
        },
        tooltips: [
          'external_frequencies__gnomad_genomes_2_1_1__af',
          'external_frequencies__gnomad_genomes_3_0__af',
          'external_frequencies__gnomad_genomes_3_1_1__af',
          'external_frequencies__gnomad_joint_4__af',
          'external_frequencies__topmed_bravo__af',
          'external_frequencies__thousand_genomes__af',
        ],
      },
    ],
  },
  [FilterTypes.Frequency_somatic_tn]: {
    groups: [
      {
        title: intl.get('screen.patientsnv.filter.grouptitle.rqdmpatient'),
        facets: [
          'freq_rqdm_tumor_normal__pf',
          'frequency_RQDM__total__af',
          'frequency_RQDM__affected__af',
          'frequency_RQDM__non_affected__af',
        ],
        defaults: {
          frequency_RQDM__affected__af: {
            operator: RangeOperators['>='],
          },
        },
        tooltips: [
          'freq_rqdm_tumor_normal__pf',
          'frequency_RQDM__total__af',
          'frequency_RQDM__affected__af',
          'frequency_RQDM__non_affected__af',
        ],
      },
      {
        title: intl.get('screen.patientsnv.filter.grouptitle.publiccohorts'),
        facets: [
          'external_frequencies__gnomad_exomes_2_1_1__af',
          'external_frequencies__gnomad_genomes_2_1_1__af',
          'external_frequencies__gnomad_genomes_3_0__af',
          'external_frequencies__gnomad_genomes_3_1_1__af',
          'external_frequencies__gnomad_genomes_3_1_1__ac',
          'external_frequencies__gnomad_joint_4__af',
          'external_frequencies__gnomad_joint_4__ac',
          'external_frequencies__topmed_bravo__af',
          'external_frequencies__thousand_genomes__af',
        ],
        defaults: {
          external_frequencies__gnomad_exomes_2_1_1__af: {
            operator: RangeOperators['<='],
          },
          external_frequencies__gnomad_genomes_2_1_1__af: {
            operator: RangeOperators['<='],
          },
          external_frequencies__gnomad_genomes_3_0__af: {
            operator: RangeOperators['<='],
          },
          external_frequencies__gnomad_genomes_3_1_1__af: {
            operator: RangeOperators['<='],
          },
          external_frequencies__gnomad_genomes_3_1_1__ac: {
            operator: RangeOperators['<='],
          },
          external_frequencies__gnomad_joint_4__af: {
            operator: RangeOperators['<='],
          },
          external_frequencies__gnomad_joint_4__ac: {
            operator: RangeOperators['<='],
          },
          external_frequencies__topmed_bravo__af: {
            operator: RangeOperators['<='],
          },
          external_frequencies__thousand_genomes__af: {
            operator: RangeOperators['<='],
          },
        },
        tooltips: [
          'external_frequencies__gnomad_genomes_2_1_1__af',
          'external_frequencies__gnomad_genomes_3_0__af',
          'external_frequencies__gnomad_genomes_3_1_1__af',
          'external_frequencies__gnomad_joint_4__af',
          'external_frequencies__topmed_bravo__af',
          'external_frequencies__thousand_genomes__af',
        ],
      },
    ],
  },
  [FilterTypes.Occurrence_germline]: {
    groups: [
      {
        facets: ['donors__zygosity'],
      },
      {
        title: intl.get('screen.patientsnv.category_parental_analysis'),
        facets: [
          'donors__mother_zygosity',
          'donors__father_zygosity',
          'donors__parental_origin',
          'donors__transmission',
          'donors__is_hc',
          'donors__is_possibly_hc',
        ],
        tooltips: ['donors__transmission'],
      },
      {
        title: intl.get('screen.patientsnv.category_metric'),
        facets: [
          'donors__filters',
          'donors__qd',
          'donors__ad_alt',
          'donors__ad_total',
          'donors__ad_ratio',
          'donors__gq',
        ],
        defaults: {
          donors__sq: {
            operator: RangeOperators['>='],
          },
          donors__ad_alt: {
            operator: RangeOperators['>='],
          },
          donors__qd: {
            operator: RangeOperators['>='],
          },
          donors__gq: {
            operator: RangeOperators['>='],
          },
          donors__ad_total: {
            operator: RangeOperators['>='],
          },
          donors__ad_ratio: {
            operator: RangeOperators['>='],
          },
        },
        tooltips: [
          'donors__qd',
          'donors__ad_alt',
          'donors__ad_total',
          'donors__ad_ratio',
          'donors__gq',
        ],
      },
    ],
  },
  [FilterTypes.Occurrence_somatic_to]: {
    groups: [
      {
        facets: ['donors__zygosity'],
      },
      {
        title: intl.get('screen.patientsnv.category_metric'),
        facets: [
          'donors__filters',
          'donors__qd',
          'donors__ad_alt',
          'donors__ad_total',
          'donors__ad_ratio',
          'donors__sq',
        ],
        defaults: {
          donors__sq: {
            operator: RangeOperators['>='],
          },
          donors__ad_alt: {
            operator: RangeOperators['>='],
          },
          donors__qd: {
            operator: RangeOperators['>='],
          },
          donors__gq: {
            operator: RangeOperators['>='],
          },
          donors__ad_total: {
            operator: RangeOperators['>='],
          },
          donors__ad_ratio: {
            operator: RangeOperators['>='],
          },
        },
        tooltips: ['donors__qd', 'donors__ad_alt', 'donors__ad_total', 'donors__ad_ratio'],
      },
    ],
  },
  [FilterTypes.Occurrence_somatic_tn]: {
    groups: [
      {
        facets: ['donors__zygosity'],
      },
      {
        title: intl.get('screen.patientsnv.category_metric'),
        facets: [
          'donors__filters',
          'donors__qd',
          'donors__ad_alt',
          'donors__ad_total',
          'donors__ad_ratio',
          'donors__sq',
        ],
        defaults: {
          donors__sq: {
            operator: RangeOperators['>='],
          },
          donors__ad_alt: {
            operator: RangeOperators['>='],
          },
          donors__qd: {
            operator: RangeOperators['>='],
          },
          donors__gq: {
            operator: RangeOperators['>='],
          },
          donors__ad_total: {
            operator: RangeOperators['>='],
          },
          donors__ad_ratio: {
            operator: RangeOperators['>='],
          },
        },
        tooltips: ['donors__qd', 'donors__ad_alt', 'donors__ad_total', 'donors__ad_ratio'],
      },
    ],
  },
};

export const getMenuItems = (
  variantMappingResults: ExtendedMappingResults,
  filterMapper: TCustomFilterMapper,
  variantType: VariantType = VariantType.GERMLINE,
  variantSection?: VariantSection,
): ISidebarMenuItem[] => {
  const [filterVariantType, filterGeneType, filterFrequencyType, filterOccType, filterPathType] =
    variantType === VariantType.GERMLINE
      ? [
          FilterTypes.Variant_germline,
          FilterTypes.Gene_germline,
          FilterTypes.Frequency_germline,
          FilterTypes.Occurrence_germline,
          FilterTypes.Pathogenicity_germline,
        ]
      : variantSection === VariantSection.SNVTO
      ? [
          FilterTypes.Variant_somatic_to,
          FilterTypes.Gene_somatic_to,
          FilterTypes.Frequency_somatic_to,
          FilterTypes.Occurrence_somatic_to,
          FilterTypes.Pathogenicity_somatic_to,
        ]
      : [
          FilterTypes.Variant_somatic_tn,
          FilterTypes.Gene_somatic_tn,
          FilterTypes.Frequency_somatic_tn,
          FilterTypes.Occurrence_somatic_tn,
          FilterTypes.Pathogenicity_somatic_tn,
        ];

  return [
    {
      key: 'rqdm',
      title: intl.get('screen.patientsnv.category_rqdm'),
      icon: <RqdmIcon className={styles.sideMenuIcon} />,
      panelContent: filtersContainer(
        variantMappingResults,
        INDEXES.VARIANT,
        getQueryBuilderID(variantSection),
        filterGroups[FilterTypes.Rqdm],
        filterMapper,
      ),
    },
    {
      key: 'category_variant',
      title: intl.get('screen.patientsnv.category_variant'),
      icon: <LineStyleIcon className={styles.sideMenuIcon} />,
      panelContent: filtersContainer(
        variantMappingResults,
        INDEXES.VARIANT,
        getQueryBuilderID(variantSection),
        filterGroups[filterVariantType],
        filterMapper,
      ),
    },
    {
      key: 'category_genomic',
      title: intl.get('screen.patientsnv.category_genomic'),
      icon: <GeneIcon className={styles.sideMenuIcon} />,
      panelContent: filtersContainer(
        variantMappingResults,
        INDEXES.VARIANT,
        getQueryBuilderID(variantSection),
        filterGroups[filterGeneType],
        filterMapper,
      ),
    },
    {
      key: 'category_cohort',
      title: intl.get('screen.patientsnv.category_cohort'),
      icon: <FrequencyIcon className={styles.sideMenuIcon} />,
      panelContent: filtersContainer(
        variantMappingResults,
        INDEXES.VARIANT,
        getQueryBuilderID(variantSection),
        filterGroups[filterFrequencyType],
        filterMapper,
      ),
    },
    {
      key: 'category_pathogenicity',
      title: intl.get('screen.patientsnv.category_pathogenicity'),
      icon: <DiseaseIcon className={styles.sideMenuIcon} />,
      panelContent: filtersContainer(
        variantMappingResults,
        INDEXES.VARIANT,
        getQueryBuilderID(variantSection),
        filterGroups[filterPathType],
        filterMapper,
      ),
    },
    {
      key: 'category_occurrence',
      title: intl.get('screen.patientsnv.category_occurrence'),
      icon: <OccurenceIcon className={styles.sideMenuIcon} />,
      panelContent: filtersContainer(
        variantMappingResults,
        INDEXES.VARIANT,
        getQueryBuilderID(variantSection),
        filterGroups[filterOccType],
        filterMapper,
      ),
    },
  ];
};
