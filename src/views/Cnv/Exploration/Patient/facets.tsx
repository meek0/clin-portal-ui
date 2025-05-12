import intl from 'react-intl-universal';
import { SafetyCertificateOutlined } from '@ant-design/icons';
import { RangeOperators } from '@ferlab/ui/core/data/sqon/operators';
import { SuggestionType } from 'api/arranger/models';
import { INDEXES } from 'graphql/constants';
import { ExtendedMappingResults } from 'graphql/models';
import { CNV_VARIANT_PATIENT_QB_ID, FilterTypes } from 'views/Cnv/utils/constant';

import GenesUploadIds from 'components/GeneUploadIds';
import FamiliesIcon from 'components/icons/FamiliesIcon';
import FrequencyIcon from 'components/icons/FrequencyIcon';
import GeneIcon from 'components/icons/GeneIcon';
import LineStyleIcon from 'components/icons/LineStyleIcon';
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
    groups: [
      {
        facets: ['genes__panels'],
      },
    ],
    defaultOpenFacets: ['genes__panels'],
  },
  [FilterTypes.Variant]: {
    groups: [
      {
        facets: ['type', 'cn', 'reflen', 'chromosome', 'start', 'end'],
        defaults: {
          cn: {
            operator: RangeOperators['>='],
          },
          reflen: {
            operator: RangeOperators['>='],
          },
          start: {
            operator: RangeOperators['>='],
          },
          end: {
            operator: RangeOperators['<='],
          },
        },
      },
    ],
  },
  [FilterTypes.Gene]: {
    customSearches: () => [
      <VariantGeneSearch
        key="genes"
        index={INDEXES.CNV}
        fields={{
          [SuggestionType.GENES]: 'genes.symbol',
          [SuggestionType.VARIANTS]: '',
        }}
        type={SuggestionType.GENES}
        queryBuilderId={CNV_VARIANT_PATIENT_QB_ID}
      />,
      <GenesUploadIds
        key="genes_upload_ids"
        field="genes.symbol"
        queryBuilderId={CNV_VARIANT_PATIENT_QB_ID}
      />,
    ],
    groups: [
      {
        facets: ['genes__location'],
      },
      {
        title: intl.get('screen.patientsnv.filter.grouptitle.genepanel'),
        facets: [
          'genes__panels',
          'genes__hpo__hpo_term_label',
          'genes__orphanet__panel',
          'genes__omim__name',
          'genes__ddd__disease_name',
          'genes__cosmic__tumour_types_germline',
        ],
      },
    ],
    defaultOpenFacets: ['genes__panels'],
  },
  [FilterTypes.Frequency]: {
    groups: [
      {
        title: intl.get('screen.patientsnv.filter.grouptitle.rqdmpatient'),
        facets: ['frequency_RQDM__pf'],
        defaults: {
          frequency_RQDM__pf: {
            operator: RangeOperators['<='],
          },
        },
        tooltips: ['transmission'],
      },
      {
        title: intl.get('screen.patientsnv.filter.grouptitle.publiccohorts'),
        facets: [
          'cluster__external_frequencies__gnomad_exomes_4__sf',
          'cluster__external_frequencies__gnomad_exomes_4__sc',
        ],
        defaults: {
          cluster__external_frequencies__gnomad_exomes_4__sf: {
            operator: RangeOperators['<='],
          },
          cluster__external_frequencies__gnomad_exomes_4__sc: {
            operator: RangeOperators['<='],
          },
        },
        tooltips: [
          'cluster__external_frequencies__gnomad_exomes_4__sf',
          'cluster__external_frequencies__gnomad_exomes_4__sc',
        ],
      },
    ],
  },
  [FilterTypes.ParentalAnalysis]: {
    groups: [
      {
        facets: ['parental_origin', 'transmission'],
        tooltips: ['transmission'],
      },
    ],
  },
  [FilterTypes.Metric]: {
    groups: [
      {
        facets: ['filters', 'qual', 'pe', 'sm'],
        tooltips: ['pe', 'sm'],
        defaults: {
          qual: {
            operator: RangeOperators['>='],
          },
          pe: {
            operator: RangeOperators['<'],
          },
          sm: {
            operator: RangeOperators['<'],
          },
        },
      },
    ],
  },
};

export const getMenuItems = (
  variantMappingResults: ExtendedMappingResults,
  filterMapper?: TCustomFilterMapper,
) => [
  {
    key: 'rqdm',
    title: intl.get('screen.patientsnv.category_rqdm'),
    icon: <RqdmIcon className={styles.sideMenuIcon} />,
    panelContent: filtersContainer(
      variantMappingResults,
      INDEXES.CNV,
      CNV_VARIANT_PATIENT_QB_ID,
      filterGroups[FilterTypes.Rqdm],
      filterMapper,
    ),
  },
  {
    key: 'category_variant',
    title: intl.get('screen.patientcnv.category_variant'),
    icon: <LineStyleIcon className={styles.sideMenuIcon} />,
    panelContent: filtersContainer(
      variantMappingResults,
      INDEXES.CNV,
      CNV_VARIANT_PATIENT_QB_ID,
      filterGroups[FilterTypes.Variant],
      filterMapper,
    ),
  },
  {
    key: 'category_genomic',
    title: intl.get('screen.patientcnv.category_genomic'),
    icon: <GeneIcon className={styles.sideMenuIcon} />,
    panelContent: filtersContainer(
      variantMappingResults,
      INDEXES.CNV,
      CNV_VARIANT_PATIENT_QB_ID,
      filterGroups[FilterTypes.Gene],
      filterMapper,
    ),
  },
  {
    key: 'category_cohort',
    title: intl.get('screen.patientsnv.category_cohort'),
    icon: <FrequencyIcon className={styles.sideMenuIcon} />,
    panelContent: filtersContainer(
      variantMappingResults,
      INDEXES.CNV,
      CNV_VARIANT_PATIENT_QB_ID,
      filterGroups[FilterTypes.Frequency],
      filterMapper,
    ),
  },
  {
    key: 'category_parentalAnalyis',
    title: intl.get('screen.patientsnv.category_parental_analysis'),
    icon: <FamiliesIcon className={styles.sideMenuIcon} />,
    panelContent: filtersContainer(
      variantMappingResults,
      INDEXES.CNV,
      CNV_VARIANT_PATIENT_QB_ID,
      filterGroups[FilterTypes.ParentalAnalysis],
      filterMapper,
    ),
  },
  {
    key: 'category_metric',
    title: intl.get('screen.patientsnv.category_metricQC'),
    icon: <SafetyCertificateOutlined />,
    panelContent: filtersContainer(
      variantMappingResults,
      INDEXES.CNV,
      CNV_VARIANT_PATIENT_QB_ID,
      filterGroups[FilterTypes.Metric],
      filterMapper,
    ),
  },
];
