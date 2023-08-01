import { removeUnderscoreAndCapitalize } from '@ferlab/ui/core/utils/stringUtils';

import { TABLE_EMPTY_PLACE_HOLDER } from './constants';

export const formatFilters = (filters?: string[]): string =>
  (filters || [])
    .filter((e) => !!e?.trim())
    .map((e) => removeUnderscoreAndCapitalize(e))
    .join(', ') || TABLE_EMPTY_PLACE_HOLDER;
