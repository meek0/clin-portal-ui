import intl from 'react-intl-universal';
import { Space, Table, Typography } from 'antd';
import { useTabClinicalData } from 'graphql/variants/tabActions';
import NoData from 'views/Snv/Entity/NoData';

import CollapsePanel from 'components/containers/collapse';

import { columnsPhenotypes } from './columns';
import { makeGenesOrderedRow } from './utils';

import styles from './index.module.css';

interface OwnProps {
  locus: string;
}

const { Title } = Typography;

const ClinicalCard = ({ locus }: OwnProps) => {
  const { loading, data } = useTabClinicalData(locus);
  const dataGenes = data?.genes || {};

  const genesRows = makeGenesOrderedRow(dataGenes);
  const genesHasRows = genesRows.length > 0;

  return (
    <>
      <Title level={3}>{intl.get('screen.variantDetails.summaryTab.clinicalCardTitle')}</Title>
      <Space direction="vertical" className={styles.clinicalCard} size={16}>
        <CollapsePanel
          header={
            <Title level={4}>
              {intl.get('screen.variantDetails.clinicalAssociationsTab.genePhenotype')}
            </Title>
          }
          loading={loading}
          datacy="ClinicalCard_GenePhenotype"
        >
          {genesHasRows ? (
            <Table
              bordered
              pagination={false}
              dataSource={genesRows}
              columns={columnsPhenotypes}
              size="small"
              rowKey={(record) => `ClinicalCard_GenePhenotype_${record.source}_${record.gene}`}
            />
          ) : (
            <NoData />
          )}
        </CollapsePanel>
      </Space>
    </>
  );
};

export default ClinicalCard;
