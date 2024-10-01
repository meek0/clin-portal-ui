import intl from 'react-intl-universal';
import { PriorityOptions } from 'views/Prescriptions/components/PriorityTag';
import { StatusOptions } from 'views/Prescriptions/components/StatusTag';

export const getPrescriptionStatusDictionnary = () => ({
  [StatusOptions.Active]: intl.get('filters.options.status.active'),
  [StatusOptions.OnHold]: intl.get('filters.options.status.on-hold'),
  [StatusOptions.Completed]: intl.get('filters.options.status.completed'),
});

export const prescriptionPriorityDictionnary = () => ({
  text: {
    [PriorityOptions.Asap]: intl.get('filters.options.priority.asap'),
    [PriorityOptions.Routine]: intl.get('filters.options.priority.routine'),
  },
  tooltip: {
    [PriorityOptions.Asap]: intl.get('filters.options.priority.asap.tooltip'),
    [PriorityOptions.Routine]: intl.get('filters.options.priority.routine.tooltip'),
  },
});

export const TaskColorMap: Record<any, string> = {
  GEBA: 'green',
  TEBA: 'blue',
  TNEBA: 'red',
};

export const commonPrescriptionFilterFields = [
  'prescription_id',
  'patient_mrn',
  'patient_id',
  'sequencing_requests.request_id',
  'sequencing_requests.prescription_id',
  'sequencing_requests.sample',
  'sequencing_requests.patient_mrn',
  'sequencing_requests.patient_id',
  'sequencing_requests.task_runname',
  'request_id',
  'sample',
];
