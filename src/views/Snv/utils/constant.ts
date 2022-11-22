import { IQueryConfig } from 'utils/searchPageTypes';

export const SNV_VARIANT_PATIENT_QB_ID = 'patient-variant-repo';
export const VARIANT_RQDM_QB_ID = 'rqdm-variant-repo';

export const DEFAULT_PAGE_INDEX = 1;
export const DEFAULT_PAGE_SIZE = 10;

export const SCROLL_WRAPPER_ID = 'snv-scroll-wrapper';

export const DEFAULT_PAGING_CONFIG = {
  index: DEFAULT_PAGE_INDEX,
  size: DEFAULT_PAGE_SIZE,
};

export const DEFAULT_QUERY_CONFIG: IQueryConfig = {
  pageIndex: DEFAULT_PAGE_INDEX,
  size: DEFAULT_PAGE_SIZE,
  sort: [],
};

export enum FilterTypes {
  Rqdm,
  Variant,
  Gene,
  Pathogenicity,
  Frequency,
  Occurrence,
  Patient,
}
