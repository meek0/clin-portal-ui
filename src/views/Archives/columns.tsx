import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import intl from 'react-intl-universal';

export const getAchivesTableColumns = (): ProColumnType[] => {
  return [
    {
      key: 'url',
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
      dataIndex: "srRef",
      title: intl.get('screen.archives.table.column.request'),
    },
    {
      key: 'sampleldm',
      dataIndex: ["sample", "value"],
      title: intl.get('screen.archives.table.column.sampleldm'),
    },
    {
      key: 'analysis',
      title: intl.get('screen.archives.table.column.analysis'),
    },
    {
      key: 'date',
      dataIndex: 'taskRunDate',
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
      defaultHidden: true,
    },
    {
      key: 'run',
      dataIndex: 'taskRunAlias',
      title: intl.get('screen.archives.table.column.run'),
      defaultHidden: true,
    },
    {
      key: 'action',
      title: intl.get('screen.archives.table.column.action'),
    },
  ];
};
