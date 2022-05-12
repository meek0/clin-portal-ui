import intl from 'react-intl-universal';
import ApolloProvider from 'providers/ApolloProvider';
import { GraphqlBackend } from 'providers';
import useGetExtendedMappings from 'hooks/graphql/useGetExtendedMappings';
import { INDEXES } from 'graphql/constants';
import { getMenuItems } from './facets';
import VariantSearchLayout from '../components/VariantSearchLayout';
import PageContent from './PageContent';

const VariantExplorationRqdm = () => {
  const variantMappingResults = useGetExtendedMappings(INDEXES.VARIANT);

  return (
    <VariantSearchLayout
      contentHeaderProps={{
        title: intl.get('screen.variantsearch.rqdm.title'),
      }}
      menuItems={getMenuItems(variantMappingResults)}
    >
      <PageContent variantMapping={variantMappingResults} />
    </VariantSearchLayout>
  );
};

const VariantExplorationRqdmWrapper = () => (
  <ApolloProvider backend={GraphqlBackend.ARRANGER}>
    <VariantExplorationRqdm />
  </ApolloProvider>
);

export default VariantExplorationRqdmWrapper;
