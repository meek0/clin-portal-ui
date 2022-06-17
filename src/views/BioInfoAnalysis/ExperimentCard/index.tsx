import { Card, Descriptions } from 'antd';
import { AnalysisTaskExperiment } from 'api/fhir/models';

import ParagraphLoader from 'components/uiKit/ParagraphLoader';
import { formatDate } from 'utils/date';

interface OwnProps {
  experiment?: AnalysisTaskExperiment;
  loading: boolean;
}

const ExperimentCard = ({ experiment, loading }: OwnProps) => (
  <Card title="Séquençage">
    <ParagraphLoader loading={loading} paragraph={{ rows: 8 }}>
      {experiment && (
        <Descriptions column={1} size="small" className="label-35">
          <Descriptions.Item label="Stratégie expérimentale">
            {experiment.experimentalStrategy}
          </Descriptions.Item>
          <Descriptions.Item label="Nom de la run">{experiment.name}</Descriptions.Item>
          <Descriptions.Item label="Alias de la run">{experiment.alias}</Descriptions.Item>
          <Descriptions.Item label="Plateforme">{experiment.platform}</Descriptions.Item>
          <Descriptions.Item label="Kit de capture">{experiment.captureKit}</Descriptions.Item>
          <Descriptions.Item label="Séquenceur">{experiment.sequencerId}</Descriptions.Item>
          <Descriptions.Item label="Date">{formatDate(experiment.runDate)}</Descriptions.Item>
          <Descriptions.Item label="Aliquot">{experiment.aliquotId}</Descriptions.Item>
        </Descriptions>
      )}
    </ParagraphLoader>
  </Card>
);

export default ExperimentCard;
