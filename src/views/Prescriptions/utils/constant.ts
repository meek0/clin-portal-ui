import intl from 'react-intl-universal';

import { StatusOptions } from '../components/StatusTag';

export const getPrescriptionStatusDictionnary = () => ({
  [StatusOptions.Active]: intl.get('filters.options.status.active'),
  [StatusOptions.OnHold]: intl.get('filters.options.status.on-hold'),
  [StatusOptions.Completed]: intl.get('filters.options.status.completed'),
});

export const commonPrescriptionFilterFields = [
  'prescription_id',
  'patient_mrn',
  'patient_id',
  'mother_id',
  'father_id',
  'sequencing_requests.request_id',
  'sequencing_requests.sample',
  'request_id',
  'sample',
];
