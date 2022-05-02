import { ReactElement } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphqlBackend, GraphqlProvider } from 'providers';
import { appendBearerIfToken } from 'utils/helper';
import { useRpt } from 'hooks/useRpt';
import EnvironmentVariables from 'utils/EnvVariables';

export const ARRANGER_API = EnvironmentVariables.configFor('ARRANGER_API');
export const PROJECT_ID = EnvironmentVariables.configFor('ARRANGER_PROJECT_ID');
export const FHIR_API = EnvironmentVariables.configFor('FHIR_API');

export const ARRANGER_API_PROJECT_URL = `${ARRANGER_API}/${PROJECT_ID}/graphql`;

const fhirLink = createHttpLink({
  uri: `${FHIR_API}/$graphql`,
});

const arrangerLink = createHttpLink({
  uri: ARRANGER_API_PROJECT_URL,
});

const getAuthLink = (token: string) =>
  setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: appendBearerIfToken(token),
    },
  }));

const backendUrl = (backend: GraphqlBackend) =>
  backend === GraphqlBackend.FHIR ? fhirLink : arrangerLink;

const Provider = ({ children, backend = GraphqlBackend.FHIR }: GraphqlProvider): ReactElement => {
  const { loading, rpt } = useRpt();
  if (loading) {
    return <></>;
  }
  const header = getAuthLink(rpt);

  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache: new InMemoryCache({ addTypename: false }),
    link: header.concat(backendUrl(backend)),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Provider;
