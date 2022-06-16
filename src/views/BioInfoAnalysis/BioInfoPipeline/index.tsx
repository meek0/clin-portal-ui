import { Card, Descriptions } from 'antd';
import { AnalysisTaskWorkflow } from 'api/fhir/models';

import ParagraphLoader from 'components/uiKit/ParagraphLoader';

interface OwnProps {
  workflow?: AnalysisTaskWorkflow;
  loading: boolean;
}

const BioInfoPipelineCard = ({ workflow, loading }: OwnProps) => (
  <Card title="Pipeline bioinformatique">
    <ParagraphLoader loading={loading} paragraph={{ rows: 3 }}>
      {workflow && (
        <Descriptions column={1} size="small" className="label-35">
          <Descriptions.Item label="Nom">{workflow.name}</Descriptions.Item>
          <Descriptions.Item label="Version">{workflow.version}</Descriptions.Item>
          <Descriptions.Item label="Genome">{workflow.genomeBuild}</Descriptions.Item>
        </Descriptions>
      )}
    </ParagraphLoader>
  </Card>
);

export default BioInfoPipelineCard;
