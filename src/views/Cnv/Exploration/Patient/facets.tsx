import intl from 'react-intl-universal';
import { RangeOperators } from '@ferlab/ui/core/data/sqon/operators';
import { SuggestionType } from 'api/arranger/models';
import { INDEXES } from 'graphql/constants';
import { ExtendedMappingResults } from 'graphql/models';
import { CNV_VARIANT_PATIENT_QB_ID, FilterTypes } from 'views/Cnv/utils/constant';

import GenesUploadIds from 'components/GeneUploadIds';
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
        facets: ['type', 'reflen', 'chromosome', 'start', 'end'],
        defaults: {
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
    ],
  },
  [FilterTypes.Occurrence]: {
    groups: [
      {
        title: intl.get('screen.patientsnv.category_parental_analysis'),
        facets: ['parental_origin', 'transmission'],
        tooltips: ['transmission'],
      },
      {
        facets: ['filters', 'qual'],
        defaults: {
          qual: {
            operator: RangeOperators['>='],
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
    key: 'category_occurrence',
    title: intl.get('screen.patientsnv.category_occurrence'),
    icon: <OccurenceIcon className={styles.sideMenuIcon} />,
    panelContent: filtersContainer(
      variantMappingResults,
      INDEXES.CNV,
      CNV_VARIANT_PATIENT_QB_ID,
      filterGroups[FilterTypes.Occurrence],
      filterMapper,
    ),
  },
];
