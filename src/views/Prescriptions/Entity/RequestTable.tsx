import Empty from '@ferlab/ui/core/components/Empty';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { Table } from 'antd';

interface OwnProps {
  patientId: string;
  loading?: boolean;
}

const getRequestColumns = (patientId: string): ProColumnType[] => [
  {
    key: 'id',
    dataIndex: 'id',
    title: 'ID requête',
    render: () => patientId,
  },
  {
    key: 'status',
    dataIndex: 'status',
    title: 'Statut',
  },
  {
    key: 'created',
    dataIndex: 'created',
    title: 'Créée le',
  },
  {
    key: 'requester',
    dataIndex: 'requester',
    title: 'Requérant',
  },
  {
    key: 'specimen_id',
    dataIndex: 'specimen_id',
    title: 'ID échantillon',
  },
  {
    key: 'links',
    dataIndex: 'links',
    title: 'Liens',
  },
];

const RequestTable = ({ patientId, loading = false }: OwnProps) => (
  <Table
    loading={loading}
    size="small"
    columns={getRequestColumns(patientId)}
    dataSource={[]}
    bordered
    locale={{
      emptyText: <Empty description="Aucune requêtes" />,
    }}
  />
);

export default RequestTable;
