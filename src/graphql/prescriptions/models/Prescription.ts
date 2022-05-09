import { ArrangerNodeData, ArrangerResultsTree } from 'graphql/models';
import { HealthProfessional, Organization, PatientResult } from 'graphql/patients/models/Patient';

export type DataCategory = {
  data_category: string;
  count: number;
};

export interface IParticipantResultTree {
  Prescriptions: ArrangerResultsTree<PrescriptionResult>;
}

export type ITablePrescriptionResult = PrescriptionResult & {
  key: string;
};

export interface PrescriptionResult extends ArrangerNodeData {
  mrn: string;
  ethnicity: string;
  bloodRelationship: string;
  status: string;
  state: string;
  timestamp: string;
  analysis: {
    code: string;
    display: string;
  };
  submitted: string;
  authoredOn: string;
  approver: ArrangerResultsTree<HealthProfessional>;
  prescriber: HealthProfessional;
  organization: Organization;
  familyInfo: {
    cid: string;
    type: string;
  };
  patientInfo: PatientResult;
  laboratory: string;
}

export const fields = [
  'status',
  'laboratory',
  'analysis__code',
  'prescriber__lastNameFirstName',
  'organization__name',
];
