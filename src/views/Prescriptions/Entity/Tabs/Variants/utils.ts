import intl from 'react-intl-universal';
import { DefaultOptionType } from 'antd/lib/select';
import { extractPatientId, extractServiceRequestId } from 'api/fhir/helper';
import { PatientServiceRequestFragment, ServiceRequestEntity } from 'api/fhir/models';
import { getFamilyCode } from 'graphql/prescriptions/helper';
import { PrescriptionEntityVariantInfo, VariantType } from 'views/Prescriptions/Entity/context';

export const formatServiceRequestTag = (analysisCode?: string, sequencingCode?: string) => {
  let tag = analysisCode || '';
  if (sequencingCode) {
    tag += ' | ' + sequencingCode;
  }
  return tag;
};

export const getVariantType = (serviceRequest?: ServiceRequestEntity): VariantType =>
  serviceRequest?.code?.[0] === 'EXTUM' ? VariantType.SOMATIC_TUMOR_ONLY : VariantType.GERMLINE;

export const getRequestOptions = (
  serviceRequest: ServiceRequestEntity | undefined,
): DefaultOptionType[] => {
  const { patientId, requestId } = getPatientAndRequestId(serviceRequest?.subject.resource);
  const familyCode = getFamilyCode(serviceRequest, patientId!);

  return [
    {
      label: `${familyCode ? intl.get(familyCode) : intl.get('proband')} (${requestId})`,
      value: formatOptionValue(patientId, requestId),
    },
    ...(serviceRequest?.extensions || []).map((ext) => {
      const code = ext?.extension?.[0]?.valueCoding?.coding?.[0].code;
      const extensionValueRef = ext?.extension?.[1];

      const { patientId, requestId } = getPatientAndRequestId(
        extensionValueRef?.valueReference?.resource,
      );

      return {
        label: `${code ? intl.get(code) : ''} (${requestId})`,
        value: formatOptionValue(patientId, requestId),
      };
    }),
  ];
};

export const getPatientAndRequestId = (
  resource: PatientServiceRequestFragment | undefined,
): PrescriptionEntityVariantInfo => ({
  patientId: resource ? extractPatientId(resource.id) : '',
  requestId: resource ? extractServiceRequestId(resource.requests?.[0].id) : '',
  variantType: VariantType.GERMLINE,
});

export const formatOptionValue = (patientId: string, requestId: string) =>
  `${patientId},${requestId}`;

export const extractOptionValue = (value: string): PrescriptionEntityVariantInfo => ({
  patientId: value.split(',')[0],
  requestId: value.split(',')[1],
  variantType: VariantType.GERMLINE,
});

export const hasVariantInfo = (value: PrescriptionEntityVariantInfo<undefined>): boolean =>
  !!value.patientId && !!value.requestId && !!value.variantType;
