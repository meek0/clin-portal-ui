import intl from 'react-intl-universal';
import { SafetyCertificateOutlined, StarOutlined } from '@ant-design/icons';
import QueriesSidebar from '@ferlab/ui/core/components/CustomPill/QueriesSidebar';
import { ISavedFilter } from '@ferlab/ui/core/components/QueryBuilder/types';
import { IDictionary } from '@ferlab/ui/core/components/QueryBuilder/types';
import { ISidebarMenuItem } from '@ferlab/ui/core/components/SidebarMenu';
import { RangeOperators } from '@ferlab/ui/core/data/sqon/operators';
import { SuggestionType } from 'api/arranger/models';
import { fetchFiltersByCustomPill } from 'api/customPill/customPill.utils';
import { TUserSavedFilter } from 'api/savedFilter/models';
import { INDEXES } from 'graphql/constants';
import { ExtendedMappingResults } from 'graphql/models';
import { CNV_VARIANT_PATIENT_QB_ID, FilterTypes } from 'views/Cnv/utils/constant';
import { VariantSection } from 'views/Prescriptions/Entity/Tabs/Variants/components/VariantSectionNav';
import { QUERY_EDITION_QB_ID } from 'views/Snv/utils/constant';

import GenesUploadIds from 'components/GeneUploadIds';
import DiseaseIcon from 'components/icons/DiseaseIcon';
import FamiliesIcon from 'components/icons/FamiliesIcon';
import FrequencyIcon from 'components/icons/FrequencyIcon';
import GeneIcon from 'components/icons/GeneIcon';
import LineStyleIcon from 'components/icons/LineStyleIcon';
import RqdmIcon from 'components/icons/RqdmIcon';
import { TCustomFilterMapper } from 'components/uiKit/FilterList';
import { FilterInfo } from 'components/uiKit/FilterList/types';
import VariantGeneSearch from 'components/VariantGeneSearch';
import { getQueriesSidebarDictionary } from 'utils/customPill';
import { CNV_EXPLORATION_PATIENT_FILTER_TAG } from 'utils/queryBuilder';

import { filtersContainer } from '../components/filtersContainer';

import styles from '../facets.module.css';

const getFilterGroups = (
  isCustomPills?: boolean,
): {
  [type: string]: FilterInfo;
} => ({
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
        facets: ['type', 'cn', 'reflen', 'chromosome', 'start', 'end', 'snv_count'],
        tooltips: ['snv_count'],
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
          snv_count: {
            operator: RangeOperators['>='],
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
        queryBuilderId={isCustomPills ? QUERY_EDITION_QB_ID : CNV_VARIANT_PATIENT_QB_ID}
      />,
      <GenesUploadIds
        key="genes_upload_ids"
        field="genes.symbol"
        queryBuilderId={isCustomPills ? QUERY_EDITION_QB_ID : CNV_VARIANT_PATIENT_QB_ID}
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
        facets: [
          'cluster__frequency_RQDM__som__pf',
          'cluster__frequency_RQDM__germ__total__pf',
          'cluster__frequency_RQDM__germ__affected__pf',
          'cluster__frequency_RQDM__germ__non_affected__pf',
        ],
        defaults: {
          cluster__frequency_RQDM__som__pf: {
            operator: RangeOperators['<='],
          },
          cluster__frequency_RQDM__germ__total__pf: {
            operator: RangeOperators['<='],
          },
          cluster__frequency_RQDM__germ__affected__pf: {
            operator: RangeOperators['<='],
          },
          cluster__frequency_RQDM__germ__non_affected__pf: {
            operator: RangeOperators['<='],
          },
        },
        tooltips: [
          'cluster__frequency_RQDM__som__pf',
          'cluster__frequency_RQDM__germ__total__pf',
          'cluster__frequency_RQDM__germ__affected__pf',
          'cluster__frequency_RQDM__germ__non_affected__pf',
        ],
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
  [FilterTypes.Pathogenicity]: {
    groups: [
      {
        title: intl.get('exomiser'),
        facets: ['exomiser__variant_score_category', 'exomiser__acmg_classification'],
        tooltips: ['exomiser__variant_score_category', 'exomiser__acmg_classification'],
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
});

interface IGetMenuItems {
  variantMappingResults: ExtendedMappingResults;
  filterMapper?: TCustomFilterMapper;
  customPillConfig?: {
    customPills: TUserSavedFilter[];
    hasCustomPillError: boolean;
    isLoading: boolean;
    menuItemsEditionPill: ISidebarMenuItem[];
    deleteCustomPill: (id: string, queryBuilderId: string) => any;
    duplicateCustomPill: (queryPill: ISavedFilter) => any;
    editCustomPill: (queryPill: ISavedFilter, tag: string, queryBuilderId: string) => any;
    learnMoreLink?: string;
    queryDictionary: IDictionary;
    validateName: (title: string, tag: string) => any;
    variantSection?: VariantSection;
  };
  isCustomPillMenuEdition: boolean;
}

export const getMenuItems = ({
  variantMappingResults,
  filterMapper,
  customPillConfig,
  isCustomPillMenuEdition = false,
}: IGetMenuItems) => {
  const menuItems = [];

  if (!isCustomPillMenuEdition && customPillConfig) {
    menuItems.push({
      key: 'custom_pill',
      title: intl.get('screen.patientsnv.category_queries'),
      icon: <StarOutlined className={styles.sideMenuIcon} />,
      panelContent: (
        <QueriesSidebar
          customPills={customPillConfig.customPills}
          hasError={customPillConfig.hasCustomPillError}
          isLoading={customPillConfig.isLoading}
          dictionary={getQueriesSidebarDictionary()}
          learnMoreLink={customPillConfig.learnMoreLink}
          queryBuilderId={CNV_VARIANT_PATIENT_QB_ID}
          queryDictionary={customPillConfig.queryDictionary}
          queryEditionQBId={QUERY_EDITION_QB_ID}
          editMenuItems={customPillConfig.menuItemsEditionPill}
          tag={CNV_EXPLORATION_PATIENT_FILTER_TAG}
          editPill={customPillConfig.editCustomPill}
          duplicatePill={customPillConfig.duplicateCustomPill}
          deletePill={customPillConfig.deleteCustomPill}
          getFiltersByPill={fetchFiltersByCustomPill}
          validateName={customPillConfig.validateName}
        />
      ),
      followedByDivider: true,
    });
  }

  menuItems.push(
    {
      key: 'rqdm',
      title: intl.get('screen.patientsnv.category_rqdm'),
      icon: <RqdmIcon className={styles.sideMenuIcon} />,
      panelContent: filtersContainer(
        variantMappingResults,
        INDEXES.CNV,
        isCustomPillMenuEdition ? QUERY_EDITION_QB_ID : CNV_VARIANT_PATIENT_QB_ID,
        getFilterGroups(isCustomPillMenuEdition)[FilterTypes.Rqdm],
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
        isCustomPillMenuEdition ? QUERY_EDITION_QB_ID : CNV_VARIANT_PATIENT_QB_ID,
        getFilterGroups(isCustomPillMenuEdition)[FilterTypes.Variant],
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
        isCustomPillMenuEdition ? QUERY_EDITION_QB_ID : CNV_VARIANT_PATIENT_QB_ID,
        getFilterGroups(isCustomPillMenuEdition)[FilterTypes.Gene],
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
        isCustomPillMenuEdition ? QUERY_EDITION_QB_ID : CNV_VARIANT_PATIENT_QB_ID,
        getFilterGroups(isCustomPillMenuEdition)[FilterTypes.Frequency],
        filterMapper,
      ),
    },
    {
      key: 'category_pathogenicity',
      title: intl.get('screen.patientsnv.category_pathogenicity'),
      icon: <DiseaseIcon className={styles.sideMenuIcon} />,
      panelContent: filtersContainer(
        variantMappingResults,
        INDEXES.CNV,
        isCustomPillMenuEdition ? QUERY_EDITION_QB_ID : CNV_VARIANT_PATIENT_QB_ID,
        getFilterGroups(isCustomPillMenuEdition)[FilterTypes.Pathogenicity],
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
        isCustomPillMenuEdition ? QUERY_EDITION_QB_ID : CNV_VARIANT_PATIENT_QB_ID,
        getFilterGroups(isCustomPillMenuEdition)[FilterTypes.ParentalAnalysis],
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
        isCustomPillMenuEdition ? QUERY_EDITION_QB_ID : CNV_VARIANT_PATIENT_QB_ID,
        getFilterGroups(isCustomPillMenuEdition)[FilterTypes.Metric],
        filterMapper,
      ),
    },
  );

  return menuItems;
};
