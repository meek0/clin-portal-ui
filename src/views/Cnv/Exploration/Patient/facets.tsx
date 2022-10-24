import { INDEXES } from 'graphql/constants';
import { ExtendedMappingResults } from 'graphql/models';
import { CNV_VARIANT_PATIENT_QB_ID } from 'views/Cnv/utils/constant';

import { TCustomFilterMapper } from 'components/uiKit/FilterList';
import { FilterInfo } from 'components/uiKit/FilterList/types';

import { filtersContainer } from '../components/filtersContainer';

const filterInfo: FilterInfo = {
  groups: [
    {
      facets: ['genes__panels', 'type', 'filters', 'qual'],
    },
  ],
  defaultOpenFacets: ['genes__panels', 'type', 'filters', 'qual'],
};

export const getFilters = (
  variantMappingResults: ExtendedMappingResults,
  filterMapper: TCustomFilterMapper,
): React.ReactNode =>
  filtersContainer(
    variantMappingResults,
    INDEXES.CNV,
    CNV_VARIANT_PATIENT_QB_ID,
    filterInfo,
    filterMapper,
  );
