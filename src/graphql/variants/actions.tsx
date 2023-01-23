import { IQueryOperationsConfig, IQueryResults } from '@ferlab/ui/core/graphql/types';
import { computeSearchAfter, hydrateResults } from '@ferlab/ui/core/graphql/utils';
import { QueryVariable } from 'graphql/queries';

import useLazyResultQuery from 'hooks/graphql/useLazyResultQuery';

import { IVariantResultTree, VariantEntity } from './models';
import { VARIANT_QUERY } from './queries';

export const useVariants = (
  variables?: QueryVariable,
  operations?: IQueryOperationsConfig,
): IQueryResults<VariantEntity[]> => {
  const { loading, result } = useLazyResultQuery<IVariantResultTree>(VARIANT_QUERY, {
    variables,
  });

  return {
    loading,
    data: hydrateResults(result?.Variants?.hits?.edges || [], operations?.previous),
    total: result?.Variants?.hits?.total || 0,
    searchAfter: computeSearchAfter(result?.Variants?.hits?.edges || [], operations),
  };
};
