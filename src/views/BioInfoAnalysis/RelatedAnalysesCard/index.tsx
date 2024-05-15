import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import Empty from '@ferlab/ui/core/components/Empty';
import { Table, TableColumnType, Typography } from 'antd';
import { extractServiceRequestId, extractTaskId } from 'api/fhir/helper';
import { Task } from 'api/fhir/models';
import { isEmpty } from 'lodash';
import NoData from 'views/Snv/Entity/NoData';

import CollapsePanel from 'components/containers/collapse';
import { formatDate } from 'utils/date';

const { Title } = Typography;

interface OwnProps {
  relatedAnalyses?: Task[];
  loading: boolean;
}

const getSamplesColumns = (): TableColumnType<any>[] => [
  {
    dataIndex: 'id',
    title: intl.get('screen.bioinfo.analysis.relatedAnalyses.task'),
    render: (id: string) => (
      <Link to={`/bioinformatics-analysis/${extractTaskId(id)}`}>{extractTaskId(id)}</Link>
    ),
  },
  {
    dataIndex: 'authoredOn',
    title: intl.get('screen.bioinfo.analysis.relatedAnalyses.authoredOn'),
    render: (authoredOn) => formatDate(authoredOn),
  },
  {
    dataIndex: 'basedOn',
    title: intl.get('screen.bioinfo.analysis.relatedAnalyses.basedOn'),
    render: (basedOn) => (
      <Link to={`/prescription/entity/${extractServiceRequestId(basedOn.reference)}`}>
        {extractServiceRequestId(basedOn.reference)}
      </Link>
    ),
  },
  {
    dataIndex: 'code',
    title: intl.get('screen.bioinfo.analysis.relatedAnalyses.code'),
    render: (code) => `${intl.get(`screen.bioinfo.analysis.analysis.type.${code}`)} (${code})`,
  },
];

const RelatedAnalysesCard = ({ relatedAnalyses, loading }: OwnProps) => (
  <CollapsePanel
    header={<Title level={4}>{intl.get('screen.bioinfo.analysis.relatedAnalyses.title')}</Title>}
    loading={loading}
    datacy="RelatedAnalysesCard"
  >
    {isEmpty(relatedAnalyses) ? (
      <NoData />
    ) : (
      <Table
        loading={loading}
        size="small"
        columns={getSamplesColumns()}
        dataSource={relatedAnalyses}
        bordered
        locale={{
          emptyText: (
            <Empty description={intl.get('screen.bioinfo.analysis.relatedAnalyses.noData')} />
          ),
        }}
        pagination={{
          hideOnSinglePage: true,
        }}
        data-cy="RelatedAnalysesCard_Table"
      />
    )}
  </CollapsePanel>
);

export default RelatedAnalysesCard;
