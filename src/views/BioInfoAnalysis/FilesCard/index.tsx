import intl from 'react-intl-universal';
import Empty from '@ferlab/ui/core/components/Empty';
import { Table, TableColumnType, Typography } from 'antd';
import { FhirDoc } from 'graphql/patients/models/Patient';
import { isEmpty } from 'lodash';
import { DocsWithTaskInfo } from 'views/Archives';
import { extractContentsFromDocs } from 'views/Archives/helper';

import CollapsePanel from 'components/containers/collapse';

const { Title } = Typography;

interface OwnProps {
  files?: FhirDoc[];
  loading: boolean;
}

const getFilesColumns = (): TableColumnType<any>[] => [
  {
    title: intl.get('screen.bioinfo.analysis.files.name'),
    render: (doc: DocsWithTaskInfo) => doc.title,
  },
  {
    title: intl.get('screen.bioinfo.analysis.files.type'),
    render: (doc: DocsWithTaskInfo) => doc.type,
  },
  {
    title: intl.get('screen.bioinfo.analysis.files.format'),
    render: (doc: DocsWithTaskInfo) => doc.format,
  },
  {
    title: intl.get('screen.bioinfo.analysis.files.sampleldm'),
    render: (doc: DocsWithTaskInfo) => doc.sample.value,
  },
  {
    title: intl.get('screen.bioinfo.analysis.files.size'),
    render: (doc: DocsWithTaskInfo) => doc.size,
  },
  {
    title: intl.get('screen.bioinfo.analysis.files.url'),
    render: (doc: DocsWithTaskInfo) => doc.url,
    width: 100,
  },
  {
    title: intl.get('screen.bioinfo.analysis.files.hash'),
    render: (doc: DocsWithTaskInfo) => doc.hash,
    width: 100,
  },
];

const FilesCard = ({ files, loading }: OwnProps) => (
  <CollapsePanel
    header={<Title level={4}>{intl.get('screen.bioinfo.analysis.files.title')}</Title>}
    loading={loading}
    datacy="FilesCard"
  >
    {isEmpty(files) ? (
      <></>
    ) : (
      <Table
        loading={loading}
        size="small"
        columns={getFilesColumns()}
        dataSource={extractContentsFromDocs(files)}
        bordered
        locale={{
          emptyText: <Empty description={intl.get('screen.bioinfo.analysis.files.noData')} />,
        }}
        pagination={{
          hideOnSinglePage: true,
        }}
        data-cy="FilesCard_Table"
      />
    )}
  </CollapsePanel>
);

export default FilesCard;
