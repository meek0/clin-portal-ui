import { Card, Descriptions } from 'antd';
import ParagraphLoader from 'components/uiKit/ParagraphLoader';
import { PrescriptionResult } from 'graphql/prescriptions/models/Prescription';
import { formatDate } from 'utils/date';

interface OwnProps {
  prescription: PrescriptionResult;
  loading: boolean;
}

const AnalysisCard = ({ prescription, loading }: OwnProps) => (
  <Card title="Analyse">
    <ParagraphLoader loading={loading} paragraph={{ rows: 5 }}>
      <Descriptions column={1} size="small" className="label-35">
        <Descriptions.Item label="Analyse demandée">
          {prescription?.analysis?.display}
        </Descriptions.Item>
        <Descriptions.Item label="Panel en réflexe">
          {prescription?.analysis?.display}
        </Descriptions.Item>
        <Descriptions.Item label="Médecin prescripteur">
          {`${prescription?.prescriber?.lastNameFirstName} - ${prescription?.prescriber?.cid}`}
        </Descriptions.Item>
        <Descriptions.Item label="Créée le">
          {formatDate(prescription?.timestamp)}
        </Descriptions.Item>
        <Descriptions.Item label="LDM">{prescription?.organization?.cid}</Descriptions.Item>
      </Descriptions>
    </ParagraphLoader>
  </Card>
);

export default AnalysisCard;
