import { useState } from 'react';
import intl from 'react-intl-universal';
import { useParams } from 'react-router';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { INDEXES } from 'graphql/constants';
import { GraphqlBackend } from 'providers';
import ApolloProvider from 'providers/ApolloProvider';
import { wrapSqonWithDonorIdAndSrId } from 'views/Variants/utils/helper';

import useGetExtendedMappings from 'hooks/graphql/useGetExtendedMappings';

import VariantSearchLayout from '../components/VariantSearchLayout';

import { getMenuItems } from './facets';
import Header from './header';
import PageContent from './PageContent';

const VariantExplorationPatient = () => {
  const { patientid, prescriptionid } = useParams<{ patientid: string; prescriptionid: string }>();
  const variantMappingResults = useGetExtendedMappings(INDEXES.VARIANT);
  const [headerLoading, setHeaderLoading] = useState(false);

  const filterMapper = (filters: ISqonGroupFilter) =>
    wrapSqonWithDonorIdAndSrId(filters, patientid /** prescriptionid */);

  return (
    <VariantSearchLayout
      contentHeaderProps={{
        title: intl.get('screen.variantsearch.title'),
        extra: [
          <Header
            key="header"
            prescriptionid={prescriptionid}
            patientid={patientid}
            setLoadingCb={setHeaderLoading}
          />,
        ],
        loading: headerLoading,
      }}
      menuItems={getMenuItems(variantMappingResults, filterMapper)}
    >
      <PageContent
        variantMapping={variantMappingResults}
        patientId={patientid}
        prescriptionId={prescriptionid}
      />
    </VariantSearchLayout>
  );
};

const VariantExplorationPatientWrapper = () => (
  <ApolloProvider backend={GraphqlBackend.ARRANGER}>
    <VariantExplorationPatient />
  </ApolloProvider>
);

export default VariantExplorationPatientWrapper;
