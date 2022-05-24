import { sendRequestWithRpt } from 'api';
import { getFhirPractitionerId } from 'auth/keycloak';
import { Rpt } from 'auth/types';
import { PatientTaskResults } from 'graphql/patients/models/Patient';
import { SEARCH_PATIENT_FILES_QUERY } from 'graphql/patients/queries';
import { FHIR_GRAPHQL_URL } from 'providers/ApolloProvider';

import EnvironmentVariables from 'utils/EnvVariables';
import { downloadFile } from 'utils/helper';

import { Bundle, Patient, PractitionerRole, ServiceRequestCode } from './models';

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

const downloadFileMetadata = (taskId: string, filename: string) =>
  sendRequestWithRpt<any>({
    method: 'GET',
    url: `${FHIR_API_URL}/Task?_id=${taskId}&_include=Task:input_specimen&_include=Task:output-documentreference&_pretty=true`,
    responseType: 'blob',
  }).then((response: { data: Blob }) => {
    downloadFile(response.data, filename);
  });

const fetchServiceRequestCodes = () =>
  sendRequestWithRpt<ServiceRequestCode>({
    method: 'GET',
    url: `${FHIR_API_URL}/CodeSystem/analysis-request-code`,
  });

const getFileURL = async (fileUrl: string) =>
  sendRequestWithRpt<{ url: string }>({
    url: `${fileUrl}?format=json`,
  });

export const FhirApi = {
  searchPatient,
  searchPractitionerRole,
  searchPatientFiles,
  downloadFileMetadata,
  fetchServiceRequestCodes,
  getFileURL,
};
