import { GqlResults, hydrateResults } from 'graphql/models';
import { QueryVariable } from 'graphql/queries';
import { useLazyResultQuery } from 'graphql/utils/query';

import { SequencingResult } from './models';
import { SEQUENCING_QUERY } from './queries';

export const useSequencingRequests = (variables: QueryVariable): GqlResults<SequencingResult> => {
  const { loading, result } = useLazyResultQuery<any>(SEQUENCING_QUERY, {
    variables: variables,
  });
  const sequencings = result?.Sequencings;
  return {
    aggregations: sequencings?.aggregations || {},
    data: hydrateResults(sequencings?.hits?.edges || []),
    loading,
    total: sequencings?.hits.total,
  };
};
