import intl from 'react-intl-universal';
import { Card, Descriptions } from 'antd';
import { extractServiceRequestId } from 'api/fhir/helper';
import { AnalysisTaskEntity } from 'api/fhir/models';
import { EMPTY_FIELD } from 'views/Prescriptions/Entity/constants';

import ParagraphLoader from 'components/uiKit/ParagraphLoader';
import { formatDate } from 'utils/date';

interface OwnProps {
  task?: AnalysisTaskEntity;
  loading: boolean;
}

const ExperimentCard = ({ task, loading }: OwnProps) => (
  <Card title={intl.get('screen.bioinfo.analysis.experiment.title')} data-cy="ExperimentCard_Card">
    <ParagraphLoader loading={loading} paragraph={{ rows: 8 }}>
      {task?.experiment && (
        <Descriptions column={1} size="small" className="label-35">
          <Descriptions.Item label={intl.get('screen.bioinfo.analysis.analysis.request')}>
            {extractServiceRequestId(task.serviceRequestReference)}
          </Descriptions.Item>
          <Descriptions.Item
            label={intl.get('screen.bioinfo.analysis.experiment.experimental.stategy')}
          >
            {task.experiment.experimentalStrategy}
          </Descriptions.Item>
          <Descriptions.Item label={intl.get('screen.bioinfo.analysis.experiment.protocol')}>
            {task.experiment.protocol || EMPTY_FIELD}
          </Descriptions.Item>
          <Descriptions.Item label={intl.get('screen.bioinfo.analysis.experiment.runName')}>
            {task.experiment.name}
          </Descriptions.Item>
          <Descriptions.Item label={intl.get('screen.bioinfo.analysis.experiment.runAlias')}>
            {task.experiment.alias}
          </Descriptions.Item>
          <Descriptions.Item label={intl.get('screen.bioinfo.analysis.experiment.platform')}>
            {task.experiment.platform}
          </Descriptions.Item>
          <Descriptions.Item label={intl.get('screen.bioinfo.analysis.experiment.captureKit')}>
            {task.experiment.captureKit}
          </Descriptions.Item>
          <Descriptions.Item label={intl.get('screen.bioinfo.analysis.experiment.sequencer')}>
            {task.experiment.sequencerId}
          </Descriptions.Item>
          <Descriptions.Item label={intl.get('screen.bioinfo.analysis.experiment.date')}>
            {formatDate(task.experiment.runDate)}
          </Descriptions.Item>
          <Descriptions.Item label={intl.get('screen.bioinfo.analysis.experiment.aliquot')}>
            {task.experiment.aliquotId}
          </Descriptions.Item>
        </Descriptions>
      )}
    </ParagraphLoader>
  </Card>
);

export default ExperimentCard;
