import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { Tooltip } from 'antd';
import { extractOrganizationId } from 'api/fhir/helper';
import { ITableSequencingResult, SequencingResult } from 'graphql/sequencing/models';
import StatusTag from 'views/Prescriptions/components/StatusTag';
import { getPrescriptionStatusDictionnary } from 'views/Prescriptions/utils/constant';

import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';
import { formatDate } from 'utils/date';

export const sequencingsColumns = (): ProColumnType<ITableSequencingResult>[] => [
  {
    key: 'request_id',
    render: (results: SequencingResult) => (
      <Link to={`/prescription/entity/${results.prescription_id}`}>{results.request_id}</Link>
    ),
    title: intl.get('screen.sequencingsearch.table.request'),
  },
  {
    key: 'sample',
    render: (results: SequencingResult) => results.sample,
    displayTitle: intl.get('screen.sequencingsearch.table.sample'),
    title: (
      <Tooltip
        placement="topLeft"
        title={intl.get('screen.sequencingsearch.table.sample.tooltip')}
        arrowPointAtCenter
      >
        {intl.get('screen.sequencingsearch.table.sample')}
      </Tooltip>
    ),
    sorter: { multiple: 1 },
  },
  {
    key: 'patient_id',
    dataIndex: ['patient_id'],
    render: (patient_id: string) => patient_id,
    title: intl.get('screen.patientsearch.table.patient'),
  },
  {
    key: 'status',
    dataIndex: 'status',
    render: (value: string) =>
      value ? <StatusTag dictionary={getPrescriptionStatusDictionnary()} status={value} /> : null,
    title: intl.get('screen.patientsearch.table.status'),
    sorter: { multiple: 1 },
  },
  {
    key: 'created_on',
    dataIndex: 'created_on',
    render: (date: string) => formatDate(date),
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
    key: 'timestamp',
    dataIndex: 'timestamp',
    render: (date: string) => formatDate(date),
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
    key: 'analysis_code',
    dataIndex: ['analysis_code'],
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
    key: 'ldm',
    dataIndex: ['ldm'],
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
    key: 'ep',
    dataIndex: ['ep'],
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
    key: 'prescription_id',
    dataIndex: ['prescription_id'],
    render: (prescription_id: string) => (
      <Link to={`/prescription/entity/${prescription_id}`}>{prescription_id}</Link>
    ),
    sorter: { multiple: 1 },
    title: intl.get('screen.patientsearch.table.prescription'),
  },
  {
    key: 'requester',
    dataIndex: ['requester'],
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
    key: 'prenatal',
    dataIndex: ['prenatal'],
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
    key: 'patient_mrn',
    dataIndex: ['patient_mrn'],
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
];
