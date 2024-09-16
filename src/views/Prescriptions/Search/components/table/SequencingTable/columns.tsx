import { renderToString } from 'react-dom/server';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { Tag, Tooltip } from 'antd';
import { extractOrganizationId } from 'api/fhir/helper';
import { ITableSequencingResult, SequencingResult } from 'graphql/sequencing/models';
import StatusTag from 'views/Prescriptions/components/StatusTag';
import { EMPTY_FIELD } from 'views/Prescriptions/Entity/constants';
import { getPrescriptionStatusDictionnary, TaskColorMap } from 'views/Prescriptions/utils/constant';

import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';
import { formatDate } from 'utils/date';

export const renderTasksToString = (analyisis: any) => {
  const tasksList = renderTasks(analyisis.tasks);
  const tasksStringList = [];
  if (Array.isArray(tasksList)) {
    for (let i = 0; i < tasksList.length; i++) {
      tasksStringList.push(renderToString(tasksList[i]));
    }
  } else {
    tasksStringList.push(EMPTY_FIELD);
  }
  return tasksStringList.join(',');
};

const renderTasks = (tasks: string[]) =>
  tasks.length > 0
    ? tasks.map((task) => (
        <Tooltip
          key={task}
          placement="topLeft"
          title={intl.get(`filters.options.tasks.${task}.tooltip`)}
        >
          <Tag color={TaskColorMap[task]}>{intl.get(`filters.options.tasks.${task}.abrv`)}</Tag>
        </Tooltip>
      ))
    : TABLE_EMPTY_PLACE_HOLDER;

export const sequencingsColumns = (): ProColumnType<ITableSequencingResult>[] => [
  {
    key: 'request_id',
    render: (results: SequencingResult) => (
      <Link to={`/prescription/entity/${results.prescription_id}`}>{results.request_id}</Link>
    ),
    title: intl.get('screen.sequencingsearch.table.request'),
    sorter: { multiple: 1 },
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
    title: intl.get('screen.patientsearch.table.createdOn'),
    tooltip: intl.get('screen.patientsearch.table.createdOn.tooltip'),
    sorter: { multiple: 1 },
  },
  {
    key: 'timestamp',
    dataIndex: 'timestamp',
    render: (date: string) => formatDate(date),
    title: intl.get('screen.patientsearch.table.updatedOn'),
    tooltip: intl.get('screen.patientsearch.table.updatedOn.tooltip'),
    sorter: { multiple: 1 },
    defaultHidden: true,
  },
  {
    key: 'sample',
    render: (results: SequencingResult) => results?.sample || TABLE_EMPTY_PLACE_HOLDER,
    title: intl.get('screen.sequencingsearch.table.sample'),
    tooltip: intl.get('screen.sequencingsearch.table.sample.tooltip'),
    sorter: { multiple: 1 },
  },
  {
    key: 'patient_id',
    dataIndex: ['patient_id'],
    render: (patient_id: string) => patient_id,
    title: intl.get('screen.patientsearch.table.patient'),
    sorter: { multiple: 1 },
  },
  {
    key: 'analysis_code',
    dataIndex: ['analysis_code'],
    title: intl.get('screen.patientsearch.table.test'),
    tooltip: intl.get('screen.patientsearch.table.test.tooltip'),
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
    key: 'patient_relationship',
    dataIndex: ['patient_relationship'],
    title: intl.get('screen.patientsearch.table.patient_relationship'),
    tooltip: intl.get('screen.patientsearch.table.patient_relationship.tooltip'),
    render: (patient_relationship: string) =>
      intl.get(`filters.options.sequencing_requests.patient_relationship.${patient_relationship}`),
    sorter: { multiple: 1 },
  },
  {
    key: 'tasks',
    dataIndex: 'tasks',
    width: 90,
    title: intl.get('screen.patientsearch.table.tasks'),
    sorter: { multiple: 1 },
    render: (tasks: string[]) => renderTasks(tasks),
  },
  {
    key: 'ldm',
    dataIndex: ['ldm'],
    render: (labo: string) => extractOrganizationId(labo),
    title: intl.get('screen.patientsearch.table.ldm'),
    tooltip: intl.get('screen.patientsearch.table.ldm.tooltip'),
    sorter: { multiple: 1 },
  },
  {
    key: 'ep',
    dataIndex: ['ep'],
    title: intl.get('screen.patientsearch.table.ep'),
    tooltip: intl.get('screen.patientsearch.table.ep.tooltip'),
    sorter: { multiple: 1 },
  },
  {
    key: 'patient_disease_status',
    dataIndex: ['patient_disease_status'],
    title: intl.get('screen.patientsearch.table.patient_disease_status'),
    render: (patient_disease_status: string) =>
      intl.get(
        `filters.options.sequencing_requests.patient_disease_status.${patient_disease_status}`,
      ),
    defaultHidden: true,
    sorter: { multiple: 1 },
  },
  {
    key: 'task_runname',
    dataIndex: ['task_runname'],
    title: intl.get('screen.patientsearch.table.task_runname'),
    tooltip: intl.get('screen.patientsearch.table.task_runname.tooltip'),
    render: (task_runname: string) => task_runname || TABLE_EMPTY_PLACE_HOLDER,
    defaultHidden: true,
    sorter: { multiple: 1 },
  },
  {
    key: 'prenatal',
    dataIndex: ['prenatal'],
    title: intl.get('screen.patientsearch.table.prenatal'),
    tooltip: intl.get('screen.patientsearch.table.prenatal.tooltip'),
    sorter: { multiple: 1 },
    render: (prenatal: boolean) => intl.get(prenatal ? 'yes' : 'no'),
    defaultHidden: true,
  },
  {
    key: 'patient_mrn',
    dataIndex: ['patient_mrn'],
    title: intl.get('screen.patientsearch.table.mrn'),
    tooltip: intl.get('screen.patientsearch.table.mrn.tooltip'),
    defaultHidden: true,
    sorter: { multiple: 1 },
  },
  {
    key: 'requester',
    dataIndex: ['requester'],
    title: intl.get('screen.patientsearch.table.requester'),
    tooltip: intl.get('screen.patientsearch.table.requester.tooltip'),
    render: (requester: string) => requester || TABLE_EMPTY_PLACE_HOLDER,
    sorter: { multiple: 1 },
    defaultHidden: true,
  },
];
