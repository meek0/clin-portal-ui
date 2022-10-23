import { IQueryConfig } from 'utils/searchPageTypes';

export const CNV_VARIANT_PATIENT_QB_ID = 'patient-cnv-repo';

export const DEFAULT_PAGE_INDEX = 1;
export const DEFAULT_PAGE_SIZE = 20;

export const SCROLL_WRAPPER_ID = 'cnv-scroll-wrapper';

export const DEFAULT_QUERY_CONFIG: IQueryConfig = {
  pageIndex: DEFAULT_PAGE_INDEX,
  size: DEFAULT_PAGE_SIZE,
  sort: [
    { field: 'sort_chromosome', order: 'asc' },
    { field: 'start', order: 'asc' },
  ],
};
