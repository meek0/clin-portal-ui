import React, { useContext } from 'react';
import { ServiceRequestEntity } from 'api/fhir/models';

export type PrescriptionEntityContextType = {
  patientId: string | undefined;
  prescriptionId: string | undefined;
  prescription: ServiceRequestEntity | undefined;
  basedOnPrescription: ServiceRequestEntity | undefined;
  loading: boolean;
};

const PrescriptionEntityContext = React.createContext<PrescriptionEntityContextType>({
  patientId: undefined,
  prescriptionId: undefined,
  prescription: undefined,
  basedOnPrescription: undefined,
  loading: false,
});

export const usePrescriptionEntityContext = () => useContext(PrescriptionEntityContext);

export default PrescriptionEntityContext;
