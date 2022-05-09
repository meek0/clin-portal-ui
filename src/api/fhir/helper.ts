import { getPositionAt } from 'utils/helper';

export const FHIR_TASK_ID_PREFIX = 'Task/';
export const FHIR_PATIENT_ID_PREFIX = 'Patient/';
export const FHIR_SR_ID_PREFIX = 'ServiceRequest/';

export const extractTaskId = (taskId: string) =>
  taskId.substring(FHIR_TASK_ID_PREFIX.length, getPositionAt(taskId, '/', 2));

export const extractPatientId = (patientId: string) =>
  patientId.substring(FHIR_PATIENT_ID_PREFIX.length);

export const extractServiceRequestId = (srId: string) => srId.substring(FHIR_SR_ID_PREFIX.length);
