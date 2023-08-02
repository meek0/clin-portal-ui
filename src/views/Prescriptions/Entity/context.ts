import React, { useContext } from 'react';
import { ServiceRequestEntity } from 'api/fhir/models';

export enum VariantType {
  GERMLINE = 'germline', // by default
  SOMATIC_TUMOR_ONLY = 'somatic_tumor_only',
}

export type PrescriptionEntityContextType = {
  patientId: string | undefined;
  prescription: ServiceRequestEntity | undefined;
  prescriptionId: string | undefined;

  selectedRequest: ServiceRequestEntity | undefined;
  selectedBasedOnRequest: ServiceRequestEntity | undefined;
  loading: boolean;
  variantInfo: PrescriptionEntityVariantInfo<undefined>;
  setVariantInfo(variantInfo: PrescriptionEntityVariantInfo): void;
};

export type PrescriptionEntityVariantInfo<T = string> = {
  patientId: string | T;
  requestId: string | T;
  variantType: VariantType;
};

const PrescriptionEntityContext = React.createContext<PrescriptionEntityContextType>({
  loading: false,

  patientId: undefined,
  prescription: undefined,
  prescriptionId: undefined,

  selectedRequest: undefined,
  selectedBasedOnRequest: undefined,

  setVariantInfo: () => {},
  variantInfo: {
    patientId: undefined,
    requestId: undefined,
    variantType: VariantType.GERMLINE,
  },
});

export const usePrescriptionEntityContext = () => useContext(PrescriptionEntityContext);

export default PrescriptionEntityContext;
