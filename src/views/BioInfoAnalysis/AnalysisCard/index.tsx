import { Card, Descriptions } from 'antd';
import {
  extractOrganizationId,
  extractPatientId,
  extractServiceRequestId,
  extractTaskId,
} from 'api/fhir/helper';
import { AnalysisTaskEntity } from 'api/fhir/models';

import ParagraphLoader from 'components/uiKit/ParagraphLoader';
import { formatDate } from 'utils/date';

interface OwnProps {
  analysis?: AnalysisTaskEntity;
  loading: boolean;
}

const AnalysisCard = ({ analysis, loading }: OwnProps) => (
  <Card title="Analyse">
    <ParagraphLoader loading={loading} paragraph={{ rows: 7 }}>
      {analysis && (
        <Descriptions column={1} size="small" className="label-35">
          <Descriptions.Item label="ID">{extractTaskId(analysis.id)}</Descriptions.Item>
          <Descriptions.Item label="Type d'analyse">{analysis.code.code}</Descriptions.Item>
          <Descriptions.Item label="Date">{formatDate(analysis.authoredOn)}</Descriptions.Item>
          <Descriptions.Item label="Requête">
            {extractServiceRequestId(analysis.serviceRequestReference)}
          </Descriptions.Item>
          <Descriptions.Item label="Patient">
            {extractPatientId(analysis.patientReference)}
          </Descriptions.Item>
          <Descriptions.Item label="Requérant">
            {extractOrganizationId(analysis.requester.id)}
          </Descriptions.Item>
          <Descriptions.Item label="Effectuée par">
            {extractOrganizationId(analysis.ownerReference)}
          </Descriptions.Item>
        </Descriptions>
      )}
    </ParagraphLoader>
  </Card>
);

export default AnalysisCard;
