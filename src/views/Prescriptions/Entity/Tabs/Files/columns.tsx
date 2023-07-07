import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { DownloadOutlined } from '@ant-design/icons';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { Space } from 'antd';
import { extractTaskId } from 'api/fhir/helper';
import { isEmpty } from 'lodash';

import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';

import DownloadFileButton from 'views/Archives/components/DownloadFileButton';
import { DocsWithTaskInfo } from 'views/Archives';

export const getFileTableColumns = (): ProColumnType<DocsWithTaskInfo>[] => [
  {
    key: 'title',
    dataIndex: 'title',
    title: intl.get('screen.prescription.entity.file.table.column.filename'),
    sorter: (a, b) => (a.format || '').localeCompare(b.format || ''),
  },
  {
    key: 'format',
    dataIndex: 'format',
    title: intl.get('screen.prescription.entity.file.table.column.format'),
    sorter: (a, b) => (a.format || '').localeCompare(b.format || ''),
  },
  {
    key: 'patientId',
    dataIndex: 'patientId',
    title: intl.get('screen.prescription.entity.file.table.column.patient'),
    sorter: (a, b) => (a.patientId || '').localeCompare(b.patientId || ''),
    defaultSortOrder: 'ascend',
  },
  {
    key: 'request',
    title: intl.get('screen.prescription.entity.file.table.column.request'),
    render: (record: DocsWithTaskInfo) => (
      <Link to={`/prescription/entity/${extractTaskId(record.basedOnSrRef)}`}>{record.srRef}</Link>
    ),
    sorter: (a, b) => (a.srRef || '').localeCompare(b.srRef || ''),
  },
  {
    key: 'sampleldm',
    dataIndex: ['sample', 'value'],
    title: intl.get('screen.prescription.entity.file.table.column.sampleldm'),
  },
  {
    key: 'analysis',
    title: intl.get('screen.prescription.entity.file.table.column.analysis'),
    render: (doc: DocsWithTaskInfo) => (
      <Link to={`/bioinformatics-analysis/${extractTaskId(doc.taskId)}`}>
        {extractTaskId(doc.taskId)}
      </Link>
    ),
    sorter: (a, b) => (extractTaskId(a.taskId) || '').localeCompare(extractTaskId(b.taskId) || ''),
  },
  {
    key: 'date',
    dataIndex: 'taskAuthoredOn',
    title: intl.get('screen.prescription.entity.file.table.column.date'),
    sorter: (a, b) => new Date(a.taskAuthoredOn).getTime() - new Date(b.taskAuthoredOn).getTime(),
  },
  {
    key: 'downloadActions',
    icon: <DownloadOutlined />,
    title: intl.get('screen.prescription.entity.file.table.column.actions'),
    render: (doc: DocsWithTaskInfo) => (
      <Space size={12}>
        <DownloadFileButton fileUrl={doc.action.urls.file} displayName={intl.get('links.file')} />
        {!isEmpty(doc.action.urls.index) && (
          <DownloadFileButton fileUrl={doc.action.urls.index} displayName="Index" />
        )}
      </Space>
    ),
  },
  {
    key: 'size',
    dataIndex: 'size',
    title: intl.get('screen.prescription.entity.file.table.column.size'),
    defaultHidden: true,
    sorter: (a, b) => parseInt(a.size) - parseInt(b.size),
  },
  {
    key: 'hash',
    dataIndex: 'hash',
    title: intl.get('screen.prescription.entity.file.table.column.hash'),
    render: (hash: string) => hash ?? TABLE_EMPTY_PLACE_HOLDER,
    defaultHidden: true,
  },
  {
    key: 'run',
    dataIndex: 'taskRunAlias',
    title: intl.get('screen.prescription.entity.file.table.column.run'),
    defaultHidden: true,
  },
  {
    key: 'type',
    dataIndex: 'type',
    title: intl.get('screen.prescription.entity.file.table.column.type'),
    defaultHidden: true,
  },
];
