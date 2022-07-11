import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useParams } from 'react-router';
import { FhirApi } from 'api/fhir';
import { ServiceRequestEntity } from 'api/fhir/models';
import { INDEXES } from 'graphql/constants';
import { GraphqlBackend } from 'providers';
import ApolloProvider from 'providers/ApolloProvider';

import patientHeaderExtra from 'components/Variant/PatientHeaderExtra';
import useGetExtendedMappings from 'hooks/graphql/useGetExtendedMappings';

import VariantSearchLayout from '../components/VariantSearchLayout';

import PageContent from './components/PageContent';

const CnvExplorationPatient = () => {
  const { patientid, prescriptionid } = useParams<{ patientid: string; prescriptionid: string }>();
  const [headerLoading, setHeaderLoading] = useState(false);
  const [prescription, setPrescription] = useState<ServiceRequestEntity>();
  const variantMappingResults = useGetExtendedMappings(INDEXES.CNV);

  useEffect(() => {
    setHeaderLoading(true);
    FhirApi.fetchServiceRequestEntity(prescriptionid)
      .then(({ data }) => setPrescription(data?.data.ServiceRequest))
      .finally(() => setHeaderLoading(false));
  }, [prescriptionid]);

  return (
    <VariantSearchLayout
      contentHeaderProps={{
        title: intl.get('screen.variantsearch.title'),
        extra: patientHeaderExtra(patientid, prescriptionid, prescription),
        loading: headerLoading,
      }}
      menuItems={[]}
    >
      <PageContent
        variantMapping={variantMappingResults}
        patientId={patientid}
        prescriptionId={prescriptionid}
      />
    </VariantSearchLayout>
  );
};

const CnvExplorationPatientWrapper = () => (
  <ApolloProvider backend={GraphqlBackend.ARRANGER}>
    <CnvExplorationPatient />
  </ApolloProvider>
);

export default CnvExplorationPatientWrapper;
