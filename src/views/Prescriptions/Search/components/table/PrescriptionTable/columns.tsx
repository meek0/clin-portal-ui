import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { Tooltip } from 'antd';
import { extractOrganizationId } from 'api/fhir/helper';
import { ITableAnalysisResult } from 'graphql/prescriptions/models/Prescription';
import StatusTag from 'views/Prescriptions/components/StatusTag';
import { getPrescriptionStatusDictionnary } from 'views/Prescriptions/utils/constant';

import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';
import { formatDate } from 'utils/date';

export const prescriptionsColumns = (): ProColumnType<ITableAnalysisResult>[] =>
  [
    {
      name: ['prescription_id'],
      render: (prescription_id: string) => (
        <Link to={`/prescription/entity/${prescription_id}`}>{prescription_id}</Link>
      ),
      title: intl.get('screen.patientsearch.table.prescription'),
    },
    {
      name: ['patient_id'],
      render: (patient_id: string) => patient_id,
      summary: false,
      title: intl.get('screen.patientsearch.table.patient'),
    },
    {
      name: 'status',
      render: (value: string) =>
        value ? <StatusTag dictionary={getPrescriptionStatusDictionnary()} status={value} /> : null,
      summary: false,
      title: intl.get('screen.patientsearch.table.status'),
      sorter: { multiple: 1 },
    },
    {
      name: 'created_on',
      render: (date: string) => formatDate(date),
      summary: false,
      title: (
        <Tooltip
          placement="topLeft"
          title={intl.get('screen.patientsearch.table.createdOn.tooltip')}
          arrowPointAtCenter
        >
          {intl.get('screen.patientsearch.table.createdOn')}
        </Tooltip>
      ),
      displayTitle: intl.get('screen.patientsearch.table.createdOn'),
      sorter: { multiple: 1 },
    },
    {
      name: 'timestamp',
      render: (date: string) => formatDate(date),
      summary: false,
      title: (
        <Tooltip
          placement="topLeft"
          title={intl.get('screen.patientsearch.table.updatedOn.tooltip')}
          arrowPointAtCenter
        >
          {intl.get('screen.patientsearch.table.updatedOn')}
        </Tooltip>
      ),
      displayTitle: intl.get('screen.patientsearch.table.updatedOn'),
      sorter: { multiple: 1 },
      defaultHidden: true,
    },
    {
      name: ['analysis_code'],
      summary: true,
      displayTitle: intl.get('screen.patientsearch.table.test'),
      title: (
        <Tooltip
          placement="topLeft"
          title={intl.get('screen.patientsearch.table.test.tooltip')}
          arrowPointAtCenter
        >
          {intl.get('screen.patientsearch.table.test')}
        </Tooltip>
      ),
      sorter: { multiple: 1 },
    },
    {
      name: ['ldm'],
      summary: false,
      render: (labo: string) => extractOrganizationId(labo),
      displayTitle: intl.get('screen.patientsearch.table.ldm'),
      title: (
        <Tooltip
          placement="topLeft"
          title={intl.get('screen.patientsearch.table.ldm.tooltip')}
          arrowPointAtCenter
        >
          {intl.get('screen.patientsearch.table.ldm')}
        </Tooltip>
      ),
      sorter: { multiple: 1 },
    },
    {
      name: ['ep'],
      summary: true,
      displayTitle: intl.get('screen.patientsearch.table.ep'),
      title: (
        <Tooltip
          placement="topLeft"
          title={intl.get('screen.patientsearch.table.ep.tooltip')}
          arrowPointAtCenter
        >
          {intl.get('screen.patientsearch.table.ep')}
        </Tooltip>
      ),
      sorter: { multiple: 1 },
    },
    {
      name: ['requester'],
      summary: true,
      displayTitle: intl.get('screen.patientsearch.table.requester'),
      title: (
        <Tooltip
          placement="topLeft"
          title={intl.get('screen.patientsearch.table.requester.tooltip')}
          arrowPointAtCenter
        >
          {intl.get('screen.patientsearch.table.requester')}
        </Tooltip>
      ),
      render: (requester: string) => requester ?? TABLE_EMPTY_PLACE_HOLDER,
      sorter: { multiple: 1 },
      defaultHidden: true,
    },
    {
      name: ['prenatal'],
      summary: true,
      displayTitle: intl.get('screen.patientsearch.table.prenatal'),
      title: (
        <Tooltip
          placement="topLeft"
          title={intl.get('screen.patientsearch.table.prenatal.tooltip')}
          arrowPointAtCenter
        >
          {intl.get('screen.patientsearch.table.prenatal')}
        </Tooltip>
      ),
      sorter: { multiple: 1 },
      render: (prenatal: boolean) => intl.get(prenatal ? 'yes' : 'no'),
      defaultHidden: true,
    },
    {
      name: 'patient_mrn',
      summary: true,
      displayTitle: intl.get('screen.patientsearch.table.mrn'),
      title: (
        <Tooltip
          placement="topLeft"
          title={intl.get('screen.patientsearch.table.mrn.tooltip')}
          arrowPointAtCenter
        >
          {intl.get('screen.patientsearch.table.mrn')}
        </Tooltip>
      ),
      defaultHidden: true,
    },
  ].map((c) => ({
    ...c,
    dataIndex: c.name,
    key: Array.isArray(c.name) ? c.name.join('.') : c.name,
  }));
