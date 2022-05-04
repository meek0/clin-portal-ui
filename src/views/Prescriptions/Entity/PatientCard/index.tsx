import { Card, Descriptions } from 'antd';
import { formatRamq } from 'api/fhir/patientHelper';
import ParagraphLoader from 'components/uiKit/ParagraphLoader';
import { PrescriptionResult } from 'graphql/prescriptions/models/Prescription';
import { formatDate } from 'utils/date';
import intl from "react-intl-universal";

interface OwnProps {
  prescription: PrescriptionResult;
  loading: boolean;
}

const PatientCard = ({ prescription, loading }: OwnProps) => (
  <Card
    title={intl.get('screen.prescription.entity.patient.card.title', {
      id: prescription?.patientInfo?.cid,
    })}
  >
    <ParagraphLoader loading={loading} paragraph={{ rows: 5 }}>
      <Descriptions column={1} size="small" className="label-35">
        <Descriptions.Item label="Dossier">{prescription?.mrn}</Descriptions.Item>
        <Descriptions.Item label="RAMQ">
          {formatRamq(prescription?.patientInfo?.ramq)}
        </Descriptions.Item>
        <Descriptions.Item label="Nom">
          {prescription?.patientInfo?.lastNameFirstName}
        </Descriptions.Item>
        <Descriptions.Item label="Date de naissance">
          {formatDate(prescription?.patientInfo?.birthDate)}
        </Descriptions.Item>
        <Descriptions.Item label="Sexe">
          {intl.get(prescription?.patientInfo?.gender?.toLowerCase() ?? 'key')}
        </Descriptions.Item>
      </Descriptions>
    </ParagraphLoader>
  </Card>
);

export default PatientCard;
