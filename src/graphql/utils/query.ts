import { useEffect, useState } from 'react';
import {
  ApolloError,
  DocumentNode,
  OperationVariables,
  QueryHookOptions,
  TypedDocumentNode,
  useQuery,
} from '@apollo/client';

export type Hits<T> = {
  edges: {
    node: T;
  }[];
};

export interface IBaseQueryResults<TData> {
  error: ApolloError | undefined;
  result: TData | undefined;
  loading: boolean;
}

export const useLazyResultQuery = <
  TData = any,
  TVariables extends OperationVariables = OperationVariables,
>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: QueryHookOptions<TData, TVariables>,
  maxRetries: number = 3,
): IBaseQueryResults<TData> => {
  const [retryCount, setRetryCount] = useState(0);
  const [skip, setSkip] = useState(false);

  const { data, error, loading, previousData, refetch } = useQuery<TData, TVariables>(query, {
    ...options,
    skip,
  });

  useEffect(() => {
    if (error && retryCount < maxRetries) {
      setRetryCount(retryCount + 1);
      refetch();
      const queryName = (query?.definitions as any)?.[0]?.name?.value;
      console.warn(`useLazyResultQuery (utils) retrying query ${queryName} ${retryCount} times`);
    } else if (retryCount >= maxRetries) {
      setSkip(true);
    }
  }, [error, retryCount, maxRetries, refetch, query]);

  const result = data && !loading ? data : previousData;
  return { error, loading, result: error ? undefined : result };
};

/**
 * This hook will perform the query only on component load.
 * This can be usefull for example when working with antd/tabs
 *
 * see example here: /views/screens/variant/Entity/index.tsx
 */
export const useLazyResultQueryOnLoadOnly = <
  TData = any,
  TVariables extends OperationVariables = OperationVariables,
>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: QueryHookOptions<TData, TVariables>,
) => {
  const [customOptions, setCustomOptions] = useState<{
    skip?: boolean;
    dataToReturn?: any;
  }>({});
  const { loading, result, error } = useLazyResultQuery(query, {
    ...options,
    skip: options?.skip || customOptions.skip,
  });

  useEffect(() => {
    if (result) {
      setCustomOptions({
        skip: true,
        dataToReturn: result,
      });
    }
  }, [result]);

  return {
    loading,
    data: options?.skip || customOptions?.skip ? customOptions.dataToReturn : result,
    error,
  };
};

export const extractHits = <T>(hits: Hits<T> | null | undefined): T[] | null =>
  hits?.edges?.map((edge) => edge.node) ?? null;
