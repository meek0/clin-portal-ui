import { hydrateResults, IQueryResults } from 'graphql/models';
import { QueryVariable } from 'graphql/queries';

import useLazyResultQuery from 'hooks/graphql/useLazyResultQuery';

import { IVariantResultTree, VariantEntity } from './models';
import { VARIANT_QUERY } from './queries';

export const useVariants = (variables?: QueryVariable): IQueryResults<VariantEntity[]> => {
  const { loading, result } = useLazyResultQuery<IVariantResultTree>(VARIANT_QUERY, {
    variables,
  });
  return {
    loading,
    data: hydrateResults(result?.cnv?.hits?.edges || []),
    total: result?.cnv?.hits?.total || 0,
  };
};
