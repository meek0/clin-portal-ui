import { useEffect } from 'react';
import { Space, Tag } from 'antd';
import { useServiceRequestEntity } from 'graphql/prescriptions/actions';
import { getPositionTag } from 'graphql/prescriptions/helper';
import { GraphqlBackend } from 'providers';
import ApolloProvider from 'providers/ApolloProvider';

import { useGlobals } from 'store/global';

interface OwnProps {
  prescriptionid: string;
  patientid: string;
  setLoadingCb: (loading: boolean) => void;
}

const Header = ({ prescriptionid, patientid, setLoadingCb }: OwnProps) => {
  const { prescription, loading } = useServiceRequestEntity(prescriptionid);
  const { getAnalysisNameByCode } = useGlobals();

  useEffect(() => {
    setLoadingCb(loading);
  }, [loading]);

  return (
    <Space>
      <Tag color="blue" key="patient-prescription-id">
        <Space align="center">
          {`Patient ID : ${patientid}`} | {`Prescription ID : ${prescriptionid}`}
        </Space>
      </Tag>
      <div key="analsysis-name">
        {prescription && (
          <Tag color="geekblue">
            {getAnalysisNameByCode(prescription.code, true, prescription.code)}
          </Tag>
        )}
      </div>
      {getPositionTag(prescription, patientid)}
    </Space>
  );
};

const HeaderWrapper = (props: OwnProps) => (
  <ApolloProvider backend={GraphqlBackend.FHIR}>
    <Header {...props} />
  </ApolloProvider>
);

export default HeaderWrapper;
