import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { DownloadOutlined } from '@ant-design/icons';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { Space } from 'antd';
import { extractTaskId } from 'api/fhir/helper';
import { isEmpty } from 'lodash';

import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';

import DownloadFileButton from './components/DownloadFileButton';
import { DocsWithTaskInfo } from '.';

export const getAchivesTableColumns = (): ProColumnType<DocsWithTaskInfo>[] => [
  {
    key: 'url',
    dataIndex: 'url',
    title: intl.get('screen.archives.table.column.url'),
    defaultHidden: true,
  },
  {
    key: 'title',
    dataIndex: 'title',
    title: intl.get('screen.archives.table.column.filename'),
  },
  {
    key: 'type',
    dataIndex: 'type',
    title: intl.get('screen.archives.table.column.type'),
  },
  {
    key: 'format',
    dataIndex: 'format',
    title: intl.get('screen.archives.table.column.format'),
    sorter: {
      compare: (a, b) => (a.format || '').localeCompare(b.format || ''),
      multiple: 1,
    },
  },
  {
    key: 'patientId',
    dataIndex: 'patientId',
    title: intl.get('screen.archives.table.column.patient'),
    sorter: {
      compare: (a, b) => (a.patientId || '').localeCompare(b.patientId || ''),
      multiple: 1,
    },
    defaultSortOrder: 'ascend',
  },
  {
    key: 'relationship',
    title: intl.get('screen.archives.table.column.relationship'),
    render: (record: DocsWithTaskInfo) =>
      record.relationship === 'proband' ? intl.get('proband') : intl.get(record.relationship),
    sorter: {
      compare: (a, b) => (a.relationship || '').localeCompare(b.relationship || ''),
      multiple: 1,
    },
  },
  {
    key: 'request',
    title: intl.get('screen.archives.table.column.request'),
    render: (record: DocsWithTaskInfo) => (
      <Link to={`/prescription/entity/${extractTaskId(record.basedOnSrRef)}`}>{record.srRef}</Link>
    ),
    sorter: {
      compare: (a, b) => (a.srRef || '').localeCompare(b.srRef || ''),
      multiple: 1,
    },
  },
  {
    key: 'sampleldm',
    dataIndex: ['sample', 'value'],
    title: intl.get('screen.archives.table.column.sampleldm'),
  },
  {
    key: 'analysis',
    title: intl.get('screen.archives.table.column.analysis'),
    render: (doc: DocsWithTaskInfo) => (
      <Link to={`/bioinformatics-analysis/${extractTaskId(doc.taskId)}`}>
        {extractTaskId(doc.taskId)}
      </Link>
    ),
    sorter: {
      compare: (a, b) =>
        (extractTaskId(a.taskId) || '').localeCompare(extractTaskId(b.taskId) || ''),
      multiple: 1,
    },
  },
  {
    key: 'date',
    dataIndex: 'taskAuthoredOn',
    title: intl.get('screen.archives.table.column.date'),
  },
  {
    key: 'size',
    dataIndex: 'size',
    title: intl.get('screen.archives.table.column.size'),
    defaultHidden: true,
  },
  {
    key: 'hash',
    dataIndex: 'hash',
    title: intl.get('screen.archives.table.column.hash'),
    render: (hash: string) => hash ?? TABLE_EMPTY_PLACE_HOLDER,
    defaultHidden: true,
  },
  {
    key: 'run',
    dataIndex: 'taskRunAlias',
    title: intl.get('screen.archives.table.column.run'),
    defaultHidden: true,
  },
  {
    key: 'downloadActions',
    icon: <DownloadOutlined />,
    title: intl.get('screen.archives.table.column.actions'),
    render: (doc: DocsWithTaskInfo) => (
      <Space size={12}>
        <DownloadFileButton fileUrl={doc.action.urls.file} displayName={intl.get('links.file')} />
        {!isEmpty(doc.action.urls.index) && (
          <DownloadFileButton fileUrl={doc.action.urls.index} displayName="Index" />
        )}
      </Space>
    ),
  },
];
