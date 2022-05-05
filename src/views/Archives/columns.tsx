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
      key: 'file_name',
      title: intl.get('screen.archives.table.column.filename'),
    },
    {
      key: 'type',
      title: intl.get('screen.archives.table.column.type'),
    },
    {
      key: 'format',
      title: intl.get('screen.archives.table.column.format'),
    },
    {
      key: 'patient',
      title: intl.get('screen.archives.table.column.patient'),
    },
    {
      key: 'request',
      title: intl.get('screen.archives.table.column.request'),
    },
    {
      key: 'sampleldm',
      title: intl.get('screen.archives.table.column.sampleldm'),
    },
    {
      key: 'analysis',
      title: intl.get('screen.archives.table.column.analysis'),
    },
    {
      key: 'date',
      title: intl.get('screen.archives.table.column.date'),
    },
    {
      key: 'size',
      title: intl.get('screen.archives.table.column.size'),
      defaultHidden: true,
    },
    {
      key: 'hash',
      title: intl.get('screen.archives.table.column.hash'),
      defaultHidden: true,
    },
    {
      key: 'run',
      title: intl.get('screen.archives.table.column.run'),
      defaultHidden: true,
    },
    {
      key: 'action',
      title: intl.get('screen.archives.table.column.action'),
    },
  ];
};
