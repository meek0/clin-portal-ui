import { ApolloError } from '@apollo/client';
import { BooleanOperators, TermOperators } from '@ferlab/ui/core/data/sqon/operators';
import { ExtendedMappingResults, GqlResults, hydrateResults } from 'graphql/models';
import { PrescriptionResult } from 'graphql/prescriptions/models/Prescription';
import { INDEX_EXTENDED_MAPPING, QueryVariable } from 'graphql/queries';
import { useLazyResultQuery, useLazyResultQueryOnLoadOnly } from 'graphql/utils/query';

import { PRESCRIPTIONS_QUERY, PRESCRIPTIONS_ENTITY_QUERY } from './queries';

export const usePrescription = (variables: QueryVariable): GqlResults<PrescriptionResult> => {
  const { loading, result } = useLazyResultQuery<any>(PRESCRIPTIONS_QUERY, {
    variables: variables,
  });
  const prescriptions = result?.Prescriptions;
  return {
    aggregations: prescriptions?.aggregations || {},
    data: hydrateResults(prescriptions?.hits?.edges || []),
    loading,
    total: prescriptions?.hits.total,
  };
};

export const usePrescriptionEntity = (
  id: string,
): {
  prescription: PrescriptionResult | undefined;
  loading: boolean;
  error: ApolloError | undefined;
} => {
  const { loading, data, error } = useLazyResultQueryOnLoadOnly<any>(PRESCRIPTIONS_ENTITY_QUERY, {
    skip: !id,
    variables: {
      sqon: {
        content: [
          {
            content: {
              field: 'cid',
              value: id,
            },
            op: TermOperators.in,
          },
        ],
        op: BooleanOperators.and,
      },
    },
  });

  return {
    prescription: data?.Prescriptions?.hits?.edges[0]?.node,
    loading,
    error,
  };
};

export const usePrescriptionMapping = (): ExtendedMappingResults => {
  const { loading, result } = useLazyResultQuery<any>(INDEX_EXTENDED_MAPPING('Prescriptions'), {
    variables: [],
  });

  return {
    data: result?.Prescriptions.extended || [],
    loading: loading,
  };
};
