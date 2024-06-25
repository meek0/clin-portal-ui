import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { Tag, Tooltip } from 'antd';
import { extractOrganizationId } from 'api/fhir/helper';
import { PractitionerBundleType } from 'api/fhir/models';
import { AnalysisResult, ITableAnalysisResult } from 'graphql/prescriptions/models/Prescription';
import PriorityTag from 'views/Prescriptions/components/PriorityTag';
import StatusTag from 'views/Prescriptions/components/StatusTag';
import { EMPTY_FIELD } from 'views/Prescriptions/Entity/constants';
import {
  getPrescriptionStatusDictionnary,
  prescriptionPriorityDictionnary,
  TaskColorMap,
} from 'views/Prescriptions/utils/constant';
import { renderToString } from 'views/Snv/Exploration/variantColumns';

import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';
import { formatDate } from 'utils/date';
import EnvironmentVariables from 'utils/EnvVariables';

import { AssignmentsFilterDropdown } from './components/AssignmentFilter';
import AssignmentsCell from './components/AssignmentsCell';

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

export const renderAssignmentsToString = (analyisis: any) => {
  const assignmentsList = analyisis.assignments;
  if (assignmentsList.length > 0) {
    return assignmentsList.join(', ');
  }
  return EMPTY_FIELD;
};

const renderTasks = (tasks: string[]) =>
  tasks.length > 0
    ? tasks.map((task) => (
        <Tooltip
          key={task}
          placement="topLeft"
          title={intl.get(`filters.options.tasks.${task}.tooltip`)}
        >
          <Tag color={TaskColorMap[task]}>{intl.get(`filters.options.tasks.${task}`)}</Tag>
        </Tooltip>
      ))
    : TABLE_EMPTY_PLACE_HOLDER;

export const prescriptionsColumns = (
  practitionerRolesBundle?: PractitionerBundleType,
): ProColumnType<ITableAnalysisResult>[] => {
  const columns: ProColumnType[] = [
    {
      key: 'prescription_id',
      dataIndex: ['prescription_id'],
      render: (prescription_id: string) => (
        <Link to={`/prescription/entity/${prescription_id}`}>{prescription_id}</Link>
      ),
      title: intl.get('screen.patientsearch.table.prescription'),
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
      key: 'priority',
      dataIndex: ['priority'],
      width: '6em',
      render: (value: string) =>
        value ? (
          <PriorityTag dictionaries={prescriptionPriorityDictionnary()} priority={value} />
        ) : (
          TABLE_EMPTY_PLACE_HOLDER
        ),
      title: intl.get('screen.patientsearch.table.priority'),
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
      key: 'analysis_code',
      dataIndex: ['analysis_code'],
      title: intl.get('screen.patientsearch.table.test'),
      tooltip: intl.get('screen.patientsearch.table.test.tooltip'),
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
      key: 'requester',
      dataIndex: ['requester'],
      title: intl.get('screen.patientsearch.table.requester'),
      tooltip: intl.get('screen.patientsearch.table.requester.tooltip'),
      render: (requester: string) => requester || TABLE_EMPTY_PLACE_HOLDER,
      sorter: { multiple: 1 },
      defaultHidden: true,
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
      dataIndex: 'patient_mrn',
      title: intl.get('screen.patientsearch.table.mrn'),
      tooltip: intl.get('screen.patientsearch.table.mrn.tooltip'),
      sorter: { multiple: 1 },
      defaultHidden: true,
    },
  ];
  EnvironmentVariables.configFor('SHOW_ASSIGNMENT') === 'true' &&
    columns.unshift({
      key: 'assignments',
      render: (results: AnalysisResult) => (
        <AssignmentsCell results={results} practitionerRolesBundle={practitionerRolesBundle} />
      ),
      title: intl.get('assignment.title'),
      iconTitle: <UserOutlined style={{ fontSize: '16px' }} />,
      width: 50,
      fixed: 'left',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) =>
        practitionerRolesBundle && (
          <AssignmentsFilterDropdown
            confirm={confirm}
            selectedKeys={selectedKeys}
            setSelectedKeys={setSelectedKeys}
            practitionerRolesBundle={practitionerRolesBundle}
          />
        ),
    });

  return columns;
};
