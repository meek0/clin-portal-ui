import React from 'react';
import { Space, Tag } from 'antd';
import { ServiceRequestEntity } from 'api/fhir/models';
import { getPositionTag } from 'graphql/prescriptions/helper';

import { useGlobals } from 'store/global';

const getSpecimen = (
  patientId: string,
  prescription?: ServiceRequestEntity,
  basedOnPrescription?: ServiceRequestEntity,
) => {
  const isParent = basedOnPrescription
    ? basedOnPrescription.extensions?.some((p) =>
        p.extension?.[1]?.valueReference?.reference.includes(patientId),
      )
    : false;

  if (basedOnPrescription) {
    if (isParent) {
      const parentInfo = basedOnPrescription.extensions?.find((p) =>
        p.extension?.[1]?.valueReference?.reference.includes(patientId),
      );
      return parentInfo?.extension?.[1]?.valueReference?.resource.requests[0].specimen[0].resource
        .accessionIdentifier.value;
    } else {
      return basedOnPrescription?.subject?.resource?.requests?.[0].specimen?.find(
        (specimen) => !('parent' in specimen.resource),
      )?.resource.accessionIdentifier.value;
    }
  } else {
    return prescription?.subject?.resource?.requests?.[0].specimen?.find(
      (specimen) => !('parent' in specimen.resource),
    )?.resource.accessionIdentifier.value;
  }
};

export default (
  patientId: string,
  prescriptionId?: string,
  prescription?: ServiceRequestEntity,
  basedOnPrescription?: ServiceRequestEntity,
): React.ReactNode[] => {
  const { getAnalysisNameByCode } = useGlobals();

  const specimen = getSpecimen(patientId, prescription, basedOnPrescription);
  const tags: React.ReactNode[] = [
    <Tag color="blue" key="patient-prescription-id">
      <Space align="center">
        {`Patient ID : ${patientId}`}
        {prescriptionId && `|`}
        {prescriptionId && `Prescription ID : ${prescriptionId}`}
        {specimen && `|`}
        {specimen && `Échantillon : ${specimen}`}
      </Space>
    </Tag>,
  ];

  if (prescription) {
    tags.push(
      <div key="analsysis-name">
        {<Tag color="geekblue">{getAnalysisNameByCode(prescription.code)}</Tag>}
      </div>,
      getPositionTag(prescription.basedOn ? basedOnPrescription : prescription, patientId),
    );
  }

  return tags;
};
