import { Link } from 'react-router-dom';
import { FileTextOutlined } from '@ant-design/icons';
import Empty from '@ferlab/ui/core/components/Empty';
import { Space, Table, TableColumnType } from 'antd';
import { extractServiceRequestId } from 'api/fhir/helper';
import { PatientRequest } from 'api/fhir/models';

import LineStyleIcon from 'components/icons/LineStyleIcon';
import { EMPTY_FIELD } from 'components/Prescription/Analysis/AnalysisForm/ReusableSteps/constant';
import { LimitTo, Roles } from 'components/Roles/Rules';
import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';
import { formatDate } from 'utils/date';
import { STATIC_ROUTES } from 'utils/routes';

import StatusTag from '../components/StatusTag';
import { getPrescriptionStatusDictionnary } from '../utils/constant';

interface OwnProps {
  patientId: string;
  data: PatientRequest[];
  loading?: boolean;
}

const getRequestColumns = (patientId: string): TableColumnType<Record<string, any>>[] => [
  {
    key: 'id',
    dataIndex: 'id',
    title: 'ID requête',
    render: (id) => extractServiceRequestId(id),
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
    key: 'requester',
    dataIndex: 'requester',
    title: 'Requérant',
    render: (requester) =>
      requester
        ? `${requester.practitioner?.name.family.toLocaleUpperCase()} 
      ${requester.practitioner?.name?.given?.join(' ')}`
        : EMPTY_FIELD,
  },
  {
    key: 'specimen_id',
    title: 'ID échantillon',
    render: (data: PatientRequest) => {
      const specimen = data.specimen?.find((specimen) => !('parent' in specimen.resource));
      return specimen ? specimen?.resource.accessionIdentifier.value : TABLE_EMPTY_PLACE_HOLDER;
    },
  },
  {
    key: 'links',
    title: 'Liens',
    render: (data: PatientRequest) => (
      <Space size="middle">
        <LimitTo roles={[Roles.Download]}>
          <Link
            to={`${STATIC_ROUTES.ARCHIVE_EXPLORATION}?search=${extractServiceRequestId(data.id)}`}
          >
            <Space size={4}>
              <FileTextOutlined />
              Fichiers
            </Space>
          </Link>
        </LimitTo>
        <LimitTo roles={[Roles.Variants]}>
          <Link to={`/snv/exploration/patient/${patientId}/${extractServiceRequestId(data.id)}`}>
            <Space size={4}>
              <LineStyleIcon height="15" width="15" />
              Variants
            </Space>
          </Link>
        </LimitTo>
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
