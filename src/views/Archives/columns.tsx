import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { Space } from 'antd';
import intl from 'react-intl-universal';
import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';
import { DocsWithTaskInfo } from '.';
import DownloadFileButton from './components/DownloadFileButton';
import MetaDataButton from './components/MetaDataButton';

export const getAchivesTableColumns = (): ProColumnType[] => {
  return [
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
    },
    {
      key: 'patientId',
      dataIndex: 'patientId',
      title: intl.get('screen.archives.table.column.patient'),
    },
    {
      key: 'request',
      dataIndex: 'srRef',
      title: intl.get('screen.archives.table.column.request'),
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
        <MetaDataButton
          taskId={doc.taskId}
          fileName={`${doc.sample.value}_${doc.format}_META.json`}
        />
      ),
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
      title: intl.get('screen.archives.table.column.download'),
      render: (doc: DocsWithTaskInfo) => (
        <Space size={12}>
          <DownloadFileButton fileUrl={doc.action.urls.file} displayName="Fichier" />
          <DownloadFileButton fileUrl={doc.action.urls.index} displayName="Index" />
        </Space>
      ),
    },
  ];
};
