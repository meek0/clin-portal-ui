import intl from 'react-intl-universal';
import { DefaultOptionType } from 'antd/lib/select';
import { extractPatientId, extractServiceRequestId } from 'api/fhir/helper';
import { PatientServiceRequestFragment, ServiceRequestEntity } from 'api/fhir/models';
import { VariantEntity as CNVVariantEntity } from 'graphql/cnv/models';
import { getFamilyCode } from 'graphql/prescriptions/helper';
import { VariantEntity as SNVVariantEntity, VariantType } from 'graphql/variants/models';
import { PrescriptionEntityVariantInfo } from 'views/Prescriptions/Entity/context';

const SERVICE_REQUEST_CODE_EXTUM = 'EXTUM';

export const SERVICE_REQUEST_CODES = {
  GERMILE_WXS: '75020',
  SOMATIC_WXS: '65241',
  SOMATIC_WTS: '65240',
  GERMILE_WGS: '75022',
};

export const formatServiceRequestTag = (analysisCode?: string, sequencingCode?: string) => {
  let tag = analysisCode || '';
  if (sequencingCode) {
    tag += ' | ' + sequencingCode;
  }
  return tag;
};

export const getVariantTypeFromServiceRequest = (
  serviceRequest?: ServiceRequestEntity,
): VariantType =>
  serviceRequest?.code?.[0] === SERVICE_REQUEST_CODE_EXTUM
    ? VariantType.SOMATIC
    : VariantType.GERMLINE;

export const getVariantTypeFromSNVVariantEntity = (variantEntity?: SNVVariantEntity): VariantType =>
  variantEntity?.donors?.hits?.edges?.[0]?.node?.variant_type || VariantType.GERMLINE;

export const getVariantTypeFromCNVVariantEntity = (variantEntity?: CNVVariantEntity): VariantType =>
  variantEntity?.variant_type || VariantType.GERMLINE;

export const getRequestOptions = (
  serviceRequest: ServiceRequestEntity | undefined,
  excludeWTS: boolean = true,
  excludeWGS: boolean = true,
): DefaultOptionType[] => {
  const patientsResourcesAndFamilycode = [
    {
      resource: serviceRequest?.subject.resource,
      familyCode: getFamilyCode(
        serviceRequest,
        extractPatientId(serviceRequest?.subject.resource?.id || '')!,
      ),
    },
    ...(serviceRequest?.extensions || []).map((ext) => ({
      resource: ext.extension?.[1]?.valueReference?.resource,
      familyCode: ext?.extension?.[0]?.valueCoding?.coding?.[0].code,
    })),
  ];

  const options: DefaultOptionType[] = [];
  patientsResourcesAndFamilycode.forEach(({ resource, familyCode }) => {
    const { patientId, requestIds } = getPatientAndRequestIds(resource, excludeWTS, excludeWGS);
    for (const requestId of requestIds) {
      options.push({
        label: `${familyCode ? intl.get(familyCode) : intl.get('proband')} (${requestId})`,
        value: formatOptionValue(patientId, requestId),
      });
    }
  });

  return options;
};

export const getPatientAndRequestId = (
  resource: PatientServiceRequestFragment | undefined,
): PrescriptionEntityVariantInfo => ({
  patientId: resource ? extractPatientId(resource.id) : '',
  requestId: resource ? extractServiceRequestId(resource.requests?.[0]?.id) : '',
  variantType: VariantType.GERMLINE,
});

export function getPatientAndRequestIds(
  resource: PatientServiceRequestFragment | undefined,
  excludeWTS: boolean = true,
  excludeWGS: boolean = true,
) {
  const serviceRequests =
    resource?.requests?.filter((request) =>
      request.code?.coding.every(
        (coding) =>
          !excludeWTS ||
          !excludeWGS ||
          (coding.code !== SERVICE_REQUEST_CODES.SOMATIC_WTS &&
            coding.code !== SERVICE_REQUEST_CODES.GERMILE_WGS),
      ),
    ) || [];
  return {
    patientId: resource ? extractPatientId(resource.id) : '',
    requestIds: serviceRequests.map((request) => extractServiceRequestId(request.id)),
  };
}

export const formatOptionValue = (patientId: string, requestId: string) =>
  `${patientId},${requestId}`;

export const extractOptionValue = (value: string): PrescriptionEntityVariantInfo => ({
  patientId: value.split(',')[0],
  requestId: value.split(',')[1],
  variantType: VariantType.GERMLINE,
});

export const hasVariantInfo = (value: PrescriptionEntityVariantInfo<undefined>): boolean =>
  !!value.patientId && !!value.requestId && !!value.variantType;
