import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { Card, Descriptions } from 'antd';
import {
  extractOrganizationId,
  extractPatientId,
  extractServiceRequestId,
  extractTaskId,
} from 'api/fhir/helper';
import { AnalysisTaskEntity } from 'api/fhir/models';
import { EMPTY_FIELD } from 'views/Prescriptions/Entity/constants';

import ParagraphLoader from 'components/uiKit/ParagraphLoader';
import { formatDate } from 'utils/date';

interface OwnProps {
  analysis?: AnalysisTaskEntity;
  loading: boolean;
}

const AnalysisCard = ({ analysis, loading }: OwnProps) => (
  <Card title={intl.get('screen.bioinfo.analysis.analysis.title')} data-cy="AnalysisCard_Card">
    <ParagraphLoader loading={loading} paragraph={{ rows: 7 }}>
      {analysis && (
        <Descriptions column={1} size="small" className="label-35">
          <Descriptions.Item label={intl.get('screen.bioinfo.analysis.analysis.id')}>
            {extractTaskId(analysis.id)}
          </Descriptions.Item>
          <Descriptions.Item label={intl.get('screen.bioinfo.analysis.analysis.type')}>
            {`${intl.get(`screen.bioinfo.analysis.analysis.type.${analysis.code.code}`)} (${
              analysis.code.code
            })`}
          </Descriptions.Item>
          <Descriptions.Item label={intl.get('screen.bioinfo.analysis.analysis.prescription')}>
            <Link
              to={`/prescription/entity/${extractServiceRequestId(analysis.basedOn.reference)}`}
            >
              {extractServiceRequestId(analysis.basedOn?.reference)}
            </Link>
          </Descriptions.Item>
          <Descriptions.Item label={intl.get('screen.bioinfo.analysis.analysis.date')}>
            {analysis.authoredOn ? formatDate(analysis.authoredOn) : EMPTY_FIELD}
          </Descriptions.Item>
          <Descriptions.Item label={intl.get('screen.bioinfo.analysis.analysis.patient')}>
            {extractPatientId(analysis.patientReference)}
          </Descriptions.Item>
          <Descriptions.Item label={intl.get('screen.bioinfo.analysis.analysis.requester')}>
            {extractOrganizationId(analysis.requester.id)}
          </Descriptions.Item>
          <Descriptions.Item label={intl.get('screen.bioinfo.analysis.analysis.owner')}>
            {extractOrganizationId(analysis.ownerReference)}
          </Descriptions.Item>
        </Descriptions>
      )}
    </ParagraphLoader>
  </Card>
);

export default AnalysisCard;
