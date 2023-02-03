import { DocumentNode } from '@apollo/client';
import { hydrateResults, IQueryResults } from 'graphql/models';
import { QueryVariable } from 'graphql/queries';

import useLazyResultQuery from 'hooks/graphql/useLazyResultQuery';

import { IVariantResultTree, VariantEntity } from './models';
import { VARIANT_QUERY, VARIANT_QUERY_TSV } from './queries';

export const useVariants = (
  variables?: QueryVariable,
  query: DocumentNode = VARIANT_QUERY,
): IQueryResults<VariantEntity[]> => {
  const { error, loading, result } = useLazyResultQuery<IVariantResultTree>(query, {
    variables,
  });
  return {
    error,
    loading,
    data: hydrateResults(result?.cnv?.hits?.edges || []),
    total: result?.cnv?.hits?.total || 0,
  };
};

export const useVariantsTSV = (variables?: QueryVariable): IQueryResults<VariantEntity[]> =>
  useVariants(variables, VARIANT_QUERY_TSV);
