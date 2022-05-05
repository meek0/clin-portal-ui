import { sendRequestWithRpt } from 'api';
import { Rpt } from 'auth/types';
import { Bundle, Patient, PractitionerRole } from './models';
import { getFhirPractitionerId } from 'auth/keycloak';
import EnvironmentVariables from 'utils/EnvVariables';
import { FHIR_GRAPHQL_URL } from 'providers/ApolloProvider';
import { PatientFileResults } from 'graphql/patients/models/Patient';

const FHIR_API_URL = EnvironmentVariables.configFor('FHIR_API');

const searchPatient = (rpt: Rpt, ramq: string) =>
  sendRequestWithRpt<Bundle<Patient>>({
    method: 'GET',
    url: `${FHIR_API_URL}/Patient`,
    params: {
      identifier: ramq,
    },
  });

const searchPractitionerRole = () =>
  sendRequestWithRpt<Bundle<PractitionerRole>>({
    method: 'GET',
    url: `${FHIR_API_URL}/PractitionerRole`,
    params: {
      practitioner: getFhirPractitionerId(),
      _include: 'PractitionerRole:practitioner',
    },
  });

const searchPatientFiles = (data: { query: any; variables: any }) =>
  sendRequestWithRpt<PatientFileResults>({
    method: 'POST',
    url: FHIR_GRAPHQL_URL,
    data,
  });

export const FhirApi = {
  searchPatient,
  searchPractitionerRole,
  searchPatientFiles,
};
