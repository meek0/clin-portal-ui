import Empty from '@ferlab/ui/core/components/Empty';
import { Table, TableColumnType, Typography } from 'antd';
import { FhirDoc } from 'graphql/patients/models/Patient';
import { isEmpty } from 'lodash';

import CollapsePanel from 'components/containers/collapse';
import { formatFileSize } from 'utils/formatFileSize';

const { Title } = Typography;

interface OwnProps {
  files?: FhirDoc[];
  loading: boolean;
}

const getFilesColumns = (): TableColumnType<any>[] => [
  {
    title: 'Nom',
    render: (doc: FhirDoc) => doc.content[0].attachment.title,
  },
  {
    title: 'Type',
    render: (doc: FhirDoc) => doc.type,
  },
  {
    title: 'Format',
    render: (doc: FhirDoc) => doc.content[0].format,
  },
  {
    title: 'Échantillon (LDM)',
    render: (doc: FhirDoc) => doc.sample.value,
  },
  {
    title: 'Taille',
    render: (doc: FhirDoc) => formatFileSize(doc.content[0].attachment.size),
  },
  {
    title: 'URL',
    render: (doc: FhirDoc) => doc.content[0].attachment.url,
    width: 100,
  },
  {
    title: 'Hash',
    render: (doc: FhirDoc) => doc.content[0].attachment.hash,
    width: 100,
  },
];

const FilesCard = ({ files, loading }: OwnProps) => (
  <CollapsePanel header={<Title level={4}>Fichiers de données</Title>} loading={loading}>
    {isEmpty(files) ? (
      <></>
    ) : (
      <Table
        loading={loading}
        size="small"
        columns={getFilesColumns()}
        dataSource={files?.map((file, index) => ({ key: index, ...file }))}
        bordered
        locale={{
          emptyText: <Empty description="Aucun Fichier" />,
        }}
        pagination={{
          hideOnSinglePage: true,
        }}
      />
    )}
  </CollapsePanel>
);

export default FilesCard;
