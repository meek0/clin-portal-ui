import Empty from '@ferlab/ui/core/components/Empty';
import { Table, TableColumnType, Typography } from 'antd';
import { AnalysisTaskSample } from 'api/fhir/models';
import { isEmpty } from 'lodash';

import CollapsePanel from 'components/containers/collapse';

const { Title } = Typography;

interface OwnProps {
  samples?: AnalysisTaskSample[];
  loading: boolean;
}

const getSamplesColumns = (): TableColumnType<any>[] => [
  {
    dataIndex: 'value',
    title: 'Échantillon (LDM)',
  },
  {
    dataIndex: 'code',
    title: 'Type d’échantillon',
  },
  {
    title: 'Spécimen (LDM)',
    render: (sample: AnalysisTaskSample) => sample.parent[0].resource.value,
  },
  {
    title: 'Type de spécimen',
    render: (sample: AnalysisTaskSample) => sample.parent[0].resource.code,
  },
  {
    dataIndex: 'tissue',
    title: 'Tissue',
    render: () => '-',
  },
];

const SamplesCard = ({ samples, loading }: OwnProps) => (
  <CollapsePanel header={<Title level={4}>Échantillon(s)</Title>} loading={loading}>
    {isEmpty(samples) ? (
      <></>
    ) : (
      <Table
        loading={loading}
        size="small"
        columns={getSamplesColumns()}
        dataSource={samples?.map((sample, index) => ({ key: index, ...sample }))}
        bordered
        locale={{
          emptyText: <Empty description="Aucun échantillon" />,
        }}
        pagination={{
          hideOnSinglePage: true,
        }}
      />
    )}
  </CollapsePanel>
);

export default SamplesCard;
