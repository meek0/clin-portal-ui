import React from 'react';
import { Space, Tag } from 'antd';
import { ServiceRequestEntity } from 'api/fhir/models';
import { getPositionTag } from 'graphql/prescriptions/helper';

import { useGlobals } from 'store/global';

export default (
  patientId: string,
  prescriptionId?: string,
  prescription?: ServiceRequestEntity,
): React.ReactNode[] => {
  const { getAnalysisNameByCode } = useGlobals();

  const tags: React.ReactNode[] = [
    <Tag color="blue" key="patient-prescription-id">
      <Space align="center">
        {`Patient ID : ${patientId}`}
        {prescriptionId && `|`}
        {prescriptionId && `Prescription ID : ${prescriptionId}`}
      </Space>
    </Tag>,
  ];

  if (prescription) {
    tags.push(
      <div key="analsysis-name">
        {<Tag color="geekblue">{getAnalysisNameByCode(prescription.code)}</Tag>}
      </div>,
      getPositionTag(prescription, patientId),
    );
  }

  return tags;
};
