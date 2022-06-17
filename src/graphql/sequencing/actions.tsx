import { ISyntheticSqon, IValueFilter } from '@ferlab/ui/core/data/sqon/types';
import { GqlResults, hydrateResults } from 'graphql/models';
import { QueryVariable } from 'graphql/queries';
import { useLazyResultQuery } from 'graphql/utils/query';
import cloneDeep from 'lodash/cloneDeep';

import { SequencingResult } from './models';
import { SEQUENCING_QUERY } from './queries';

export const setPrescriptionStatusInActiveQuery = (activeQuery: ISyntheticSqon): ISyntheticSqon => {
  const newActiveQuery = cloneDeep(activeQuery);

  return {
    ...newActiveQuery,
    content: newActiveQuery.content.map((c) => {
      if (!(c as IValueFilter)) {
        return c;
      }

      const contentTmp: IValueFilter = c as IValueFilter;
      if (contentTmp.content.field === 'status') {
        contentTmp.content.field = 'prescription_status';
      }
      return contentTmp;
    }),
  };
};

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
