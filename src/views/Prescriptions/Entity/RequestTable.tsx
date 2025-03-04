import { useState } from 'react';
import intl from 'react-intl-universal';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { ProColumnsType } from '@ferlab/ui/core/components/ProTable/types';
import { extractServiceRequestId } from 'api/fhir/helper';
import { ITablePatientRequestResult, PatientRequest, PatientRequestEntity } from 'api/fhir/models';
import { EMPTY_FIELD } from 'views/Prescriptions/Entity/constants';

import { Roles, validate } from 'components/Roles/Rules';
import { useRpt } from 'hooks/useRpt';
import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';
import { formatDate } from 'utils/date';
import { getProTableDictionary } from 'utils/translation';

import Links from '../components/Links';
import StatusTag from '../components/StatusTag';
import { DEFAULT_PAGE_SIZE } from '../Search/utils/contstant';
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
      key: 'name',
      defaultHidden: true,
      title: intl.get('screen.prescription.entity.request.name'),
      render: (record: PatientRequestEntity) => {
        const requestCode = record.code.coding.find((c) =>
          c.system.includes('sequencing-request-code'),
        );
        return requestCode
          ? intl.get(`screen.prescription.entity.request.code.${requestCode?.code}`)
          : TABLE_EMPTY_PLACE_HOLDER;
      },
    },
    {
      key: 'code',
      title: intl.get('screen.prescription.entity.request.code'),
      render: (record: PatientRequestEntity) => {
        const requestCode = record.code.coding.find((c) =>
          c.system.includes('sequencing-request-code'),
        );
        return requestCode ? requestCode.code : TABLE_EMPTY_PLACE_HOLDER;
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
  const authorizedUser = validate([Roles.Download], decodedRpt, false);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

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
      headerConfig={{
        itemCount: {
          pageIndex: pageIndex,
          pageSize: pageSize,
          total: data?.length || 0,
        },
        hideItemsCount: true,
        enableColumnSort: true,
      }}
      pagination={{
        current: pageIndex,
        pageSize: pageSize,
        defaultPageSize: pageSize,
        total: data?.length,
        hideOnSinglePage: true,
        responsive: true,
        size: 'small',
      }}
      showSorterTooltip={false}
      onChange={({ current, pageSize }) => {
        setPageIndex(current!);
        setPageSize(pageSize!);
      }}
      size="small"
      bordered
    />
  );
};

export default RequestTable;
