import { Link } from 'react-router-dom';
import { FileTextOutlined } from '@ant-design/icons';
import Empty from '@ferlab/ui/core/components/Empty';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { Space, Table } from 'antd';
import { extractServiceRequestId } from 'api/fhir/helper';
import { PatientRequest } from 'api/fhir/models';

import LineStyleIcon from 'components/icons/LineStyleIcon';
import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';
import { formatDate } from 'utils/date';
import { formatNumber } from 'utils/formatNumber';
import { STATIC_ROUTES } from 'utils/routes';

import StatusTag from '../components/StatusTag';
import { getPrescriptionStatusDictionnary } from '../utils/constant';

interface OwnProps {
  patientId: string;
  data: PatientRequest[];
  loading?: boolean;
}

const getRequestColumns = (patientId: string): ProColumnType[] => [
  {
    key: 'id',
    dataIndex: 'id',
    title: 'ID requête',
    render: (id) => formatNumber(extractServiceRequestId(id)),
  },
  {
    key: 'status',
    dataIndex: 'status',
    title: 'Statut',
    render: (value: string) =>
      value ? <StatusTag dictionary={getPrescriptionStatusDictionnary()} status={value} /> : null,
  },
  {
    key: 'created',
    dataIndex: 'authoredOn',
    title: 'Créée le',
    render: (authoredOn) => formatDate(authoredOn),
  },
  {
    key: 'specimen_id',
    title: 'ID échantillon',
    render: (data: PatientRequest) => {
      const specimen = data.specimen.find((specimen) => !('parent' in specimen.resource));
      return specimen ? specimen?.resource.accessionIdentifier.value : TABLE_EMPTY_PLACE_HOLDER;
    },
  },
  {
    key: 'links',
    title: 'Liens',
    render: (data: PatientRequest) => (
      <Space size="middle">
        <Link
          to={`${STATIC_ROUTES.ARCHIVE_EXPLORATION}?search=${extractServiceRequestId(data.id)}`}
        >
          <Space size={4}>
            <FileTextOutlined />
            Fichiers
          </Space>
        </Link>
        <Link to={`/variant-exploration/patient/${patientId}/${extractServiceRequestId(data.id)}`}>
          <Space size={4}>
            <LineStyleIcon height="15" width="15" />
            Variants
          </Space>
        </Link>
      </Space>
    ),
  },
];

const RequestTable = ({ patientId, loading = false, data = [] }: OwnProps) => (
  <Table
    loading={loading}
    size="small"
    columns={getRequestColumns(patientId)}
    dataSource={data.map((data, index) => ({ ...data, key: index }))}
    bordered
    locale={{
      emptyText: <Empty description="Aucune requêtes" />,
    }}
    pagination={{
      hideOnSinglePage: true,
    }}
  />
);

export default RequestTable;
