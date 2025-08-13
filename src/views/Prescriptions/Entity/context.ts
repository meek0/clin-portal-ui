import React, { useContext } from 'react';
import { ServiceRequestEntity } from 'api/fhir/models';
import { VariantType } from 'graphql/variants/models';

export type PrescriptionEntityContextType = {
  patientId: string | undefined;
  prescription: ServiceRequestEntity | undefined;
  prescriptionId: string | undefined;
  project_code: string | undefined;

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
  project_code: undefined,

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
