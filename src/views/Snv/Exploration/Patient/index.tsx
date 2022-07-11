import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useParams } from 'react-router';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { FhirApi } from 'api/fhir';
import { ServiceRequestEntity } from 'api/fhir/models';
import { INDEXES } from 'graphql/constants';
import { GraphqlBackend } from 'providers';
import ApolloProvider from 'providers/ApolloProvider';
import { wrapSqonWithDonorIdAndSrId } from 'views/Snv/utils/helper';

import patientHeaderExtra from 'components/Variant/PatientHeaderExtra';
import useGetExtendedMappings from 'hooks/graphql/useGetExtendedMappings';

import VariantSearchLayout from '../components/VariantSearchLayout';

import { getMenuItems } from './facets';
import PageContent from './PageContent';

const SnvExplorationPatient = () => {
  const { patientid, prescriptionid } = useParams<{ patientid: string; prescriptionid: string }>();
  const variantMappingResults = useGetExtendedMappings(INDEXES.VARIANT);
  const [headerLoading, setHeaderLoading] = useState(false);
  const [prescription, setPrescription] = useState<ServiceRequestEntity>();
  const filterMapper = (filters: ISqonGroupFilter) =>
    wrapSqonWithDonorIdAndSrId(filters, patientid /** prescriptionid */);

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

const SnvExplorationPatientWrapper = () => (
  <ApolloProvider backend={GraphqlBackend.ARRANGER}>
    <SnvExplorationPatient />
  </ApolloProvider>
);

export default SnvExplorationPatientWrapper;
