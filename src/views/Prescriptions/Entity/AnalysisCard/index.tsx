import { Card, Descriptions, Tag } from 'antd';
import ParagraphLoader from 'components/uiKit/ParagraphLoader';
import { PrescriptionResult } from 'graphql/prescriptions/models/Prescription';
import { formatDate } from 'utils/date';
import intl from 'react-intl-universal';

interface OwnProps {
  prescription?: PrescriptionResult;
  loading: boolean;
}

const AnalysisCard = ({ prescription, loading }: OwnProps) => (
  <Card
    title={intl.get(
      `screen.prescription.entity.analyse.card.title${
        prescription?.patientInfo.fetus ? '.foetus' : ''
      }`,
    )}
  >
    <ParagraphLoader loading={loading} paragraph={{ rows: 8 }}>
      {prescription && (
        <Descriptions column={1} size="small" className="label-35">
          <Descriptions.Item label="Id prescription">{prescription?.cid}</Descriptions.Item>
          <Descriptions.Item label="Status">{prescription?.state}</Descriptions.Item>
          <Descriptions.Item label="Analyse demandée">
            <Tag color="geekblue">{prescription?.analysis?.display}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Panel en réflexe">
            {prescription?.analysis?.display}
          </Descriptions.Item>
          <Descriptions.Item label="Créée le">
            {formatDate(prescription?.timestamp)}
          </Descriptions.Item>
          <Descriptions.Item label="Médecin prescripteur">
            {`${prescription?.prescriber?.lastNameFirstName} - ${prescription?.prescriber?.cid}`}
          </Descriptions.Item>
          <Descriptions.Item label="Établissement prescripteur">
            {prescription?.organization?.cid}
          </Descriptions.Item>
          <Descriptions.Item label="LDM">{prescription?.laboratory}</Descriptions.Item>
        </Descriptions>
      )}
    </ParagraphLoader>
  </Card>
);

export default AnalysisCard;
