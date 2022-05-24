import { Typography } from 'antd';
import { extractPatientId } from 'api/fhir/helper';
import { ServiceRequestEntity } from 'api/fhir/models';

import CollapsePanel from 'components/containers/collapse';

import RequestTable from '../RequestTable';

const { Title } = Typography;

interface OwnProps {
  prescription?: ServiceRequestEntity;
  loading: boolean;
}

const ClinicalInformation = ({ prescription, loading }: OwnProps) => (
  <CollapsePanel header={<Title level={4}>Information clinique</Title>} loading={loading}>
    {prescription ? (
      <RequestTable patientId={extractPatientId(prescription?.subject.reference)} />
    ) : (
      <></>
    )}
  </CollapsePanel>
);

export default ClinicalInformation;
