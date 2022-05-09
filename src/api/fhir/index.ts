import { sendRequestWithRpt } from 'api';
import { Rpt } from 'auth/types';
import { Bundle, Patient, PractitionerRole } from './models';
import { getFhirPractitionerId } from 'auth/keycloak';
import EnvironmentVariables from 'utils/EnvVariables';
import { FHIR_GRAPHQL_URL } from 'providers/ApolloProvider';
import { PatientTaskResults } from 'graphql/patients/models/Patient';
import { SEARCH_PATIENT_FILES_QUERY } from 'graphql/patients/queries';

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

const searchPatientFiles = (searchValue: string) =>
  sendRequestWithRpt<{ data: { taskList: PatientTaskResults } }>({
    method: 'POST',
    url: FHIR_GRAPHQL_URL,
    data: {
      query: SEARCH_PATIENT_FILES_QUERY(searchValue).loc?.source.body,
      variables: {
        searchValue,
      },
    },
  });

export const FhirApi = {
  searchPatient,
  searchPractitionerRole,
  searchPatientFiles,
};
