import intl from 'react-intl-universal';
import { Tooltip } from 'antd';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { formatDate } from 'utils/date';
import { ITableAnalysisResult } from 'graphql/prescriptions/models/Prescription';
import { Link } from 'react-router-dom';
import { getPrescriptionStatusDictionnary } from 'views/Prescriptions/utils/constant';
import StatusTag from 'views/Prescriptions/components/StatusTag';
import { extractOrganizationId } from 'api/fhir/helper';

import './tableColumn.scss';

export const prescriptionsColumns = (): ProColumnType<ITableAnalysisResult>[] => {
  return [
    {
      name: ['prescription_id'],
      render: (prescription_id: string) => {
        return <Link to={`/prescription/entity/${prescription_id}`}>{prescription_id}</Link>;
      },
      title: intl.get('screen.patientsearch.table.prescription'),
    },
    {
      name: ['patient_id'],
      render: (patient_id: string) => patient_id,
      summary: false,
      title: intl.get('screen.patientsearch.table.patientId'),
    },
    {
      name: 'status',
      render: (value: string) =>
        !!value ? (
          <StatusTag dictionary={getPrescriptionStatusDictionnary()} status={value} />
        ) : null,
      summary: false,
      title: intl.get('screen.patientsearch.table.status'),
      sorter: { multiple: 1 },
    },
    {
      name: 'created_on',
      render: (date: string) => formatDate(date),
      summary: false,
      title: (
        <Tooltip placement="topLeft" title={intl.get('standard.format.date')} arrowPointAtCenter>
          {intl.get('screen.patientsearch.table.createdOn')}
        </Tooltip>
      ),
      displayTitle: intl.get('screen.patientsearch.table.createdOn'),
      sorter: { multiple: 1 },
    },
    {
      name: ['analysis_code'],
      summary: true,
      title: intl.get('screen.patientsearch.table.test'),
      sorter: { multiple: 1 },
    },
    {
      name: ['ldm'],
      summary: false,
      render: (labo: string) => extractOrganizationId(labo),
      title: intl.get('screen.patientsearch.table.ldm'),
      sorter: { multiple: 1 },
    },
    {
      name: ['ep'],
      summary: true,
      title: intl.get('screen.patientsearch.table.establishment'),
      sorter: { multiple: 1 },
    },
  ].map((c) => ({
    ...c,
    dataIndex: c.name,
    key: Array.isArray(c.name) ? c.name.join('.') : c.name,
  }));
};
