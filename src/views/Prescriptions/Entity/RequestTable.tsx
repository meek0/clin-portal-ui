import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { ProColumnsType } from '@ferlab/ui/core/components/ProTable/types';
import { extractServiceRequestId } from 'api/fhir/helper';
import { ITablePatientRequestResult, PatientRequest, PatientRequestEntity } from 'api/fhir/models';
import { EMPTY_FIELD } from 'views/Prescriptions/Entity/constants';

import { Roles, validate } from 'components/Roles/Rules';
import { useRpt } from 'hooks/useRpt';
import { useUser } from 'store/user';
import { updateConfig } from 'store/user/thunks';
import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';
import { formatDate } from 'utils/date';
import { getProTableDictionary } from 'utils/translation';

import Links from '../components/Links';
import StatusTag from '../components/StatusTag';
import { getPrescriptionStatusDictionnary } from '../utils/constant';

interface OwnProps {
  data: PatientRequest[];
  loading?: boolean;
}

export const getRequestColumns = (
  authorizedUser: boolean,
): ProColumnsType<ITablePatientRequestResult> => {
  const columns: ProColumnsType<ITablePatientRequestResult> = [
    {
      key: 'id',
      dataIndex: 'id',
      title: intl.get('screen.prescription.entity.request.id'),
      render: (id) => extractServiceRequestId(id),
      fixed: 'left',
    },
    {
      key: 'type',
      title: intl.get('screen.prescription.entity.request.type'),
      width: 400,
      render: (record: PatientRequestEntity) => {
        const requestCode = record.coding?.find((c) =>
          c.system.includes('sequencing-request-code'),
        );
        if (requestCode) {
          return `${requestCode.code} - ${intl.get(
            `screen.prescription.entity.request.code.${requestCode.code}`,
          )}`;
        }
        return TABLE_EMPTY_PLACE_HOLDER;
      },
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: intl.get('screen.prescription.entity.request.status'),
      render: (value: string) =>
        value ? <StatusTag dictionary={getPrescriptionStatusDictionnary()} status={value} /> : null,
    },
    {
      key: 'created',
      dataIndex: 'authoredOn',
      title: intl.get('screen.prescription.entity.request.createdOn'),
      render: (authoredOn) => formatDate(authoredOn),
    },
    {
      key: 'requester',
      dataIndex: 'requester',
      defaultHidden: true,
      title: intl.get('screen.prescription.entity.request.requester'),
      render: (requester) =>
        requester
          ? `${requester.practitioner?.name.family.toLocaleUpperCase()}
      ${requester.practitioner?.name?.given?.join(' ')}`
          : EMPTY_FIELD,
    },
    {
      key: 'specimen_id',
      title: intl.get('screen.prescription.entity.request.sampleid'),
      render: (data: PatientRequest) => {
        // specimen with parent is the sample
        const specimen = data.specimen?.find((specimen) => 'parent' in specimen.resource);
        return specimen ? specimen?.resource.accessionIdentifier.value : TABLE_EMPTY_PLACE_HOLDER;
      },
    },
  ];

  authorizedUser &&
    columns.push({
      key: 'links',
      title: intl.get('screen.prescription.entity.request.links'),
      render: (data: PatientRequest) => <Links prescriptionId={data.id} />,
    });
  return columns;
};

const RequestTable = ({ loading = false, data = [] }: OwnProps) => {
  const { decodedRpt } = useRpt();
  const { user } = useUser();
  const dispatch = useDispatch();
  const authorizedUser = validate([Roles.Download], decodedRpt, false);
  const initialColumnState =
    user.config.data_exploration?.tables?.prescriptionEntityRequest?.columns;

  const datatest = data?.map((patient: any, index: number) => ({
    key: index,
    ...patient,
  }));
  return (
    <ProTable<ITablePatientRequestResult>
      tableId="request_table"
      loading={loading}
      columns={getRequestColumns(authorizedUser)}
      dictionary={getProTableDictionary()}
      dataSource={datatest}
      initialColumnState={initialColumnState}
      headerConfig={{
        hideItemsCount: true,
        enableColumnSort: true,
        onColumnSortChange: (columns) => {
          dispatch(
            updateConfig({
              data_exploration: {
                tables: {
                  prescriptionEntityRequest: { columns },
                },
              },
            }),
          );
        },
      }}
      pagination={undefined}
      showSorterTooltip={false}
      size="small"
      bordered
    />
  );
};

export default RequestTable;
