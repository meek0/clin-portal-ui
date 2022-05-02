export enum STATIC_ROUTES {
  HOME = '/',
  ERROR = '/error',
  PRESCRIPTION_SEARCH = '/prescription/search',
  ARCHIVE_EXPLORATION = '/archive-exploration',
  VARIANT_EXPLORATION = '/variant-exploration',
}

export enum DYNAMIC_ROUTES {
  ERROR = '/error/:status?',
  VARIANT_ENTITY = '/variant/entity/:locus/:tabid?',
  PRESCRIPTION_ENTITY = '/prescription/entity/:id',
}