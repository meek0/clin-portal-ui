import intl from 'react-intl-universal';
import { useTabClinicalData } from 'graphql/variants/tabActions';
import { Space, Table, Spin, Typography } from 'antd';
import NoData from 'views/Variants/Entity/NoData';
import { makeClinVarRows, makeGenesOrderedRow } from './utils';
import { columnsClinVar, columnsPhenotypes } from './columns';
import CollapsePanel from 'components/containers/collapse';

import styles from './index.module.scss';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';

interface OwnProps {
  locus: string;
}

const { Title } = Typography;

const ClinicalCard = ({ locus }: OwnProps) => {
  const { loading, data } = useTabClinicalData(locus);

  const dataClinvar = data?.clinvar || {};
  const clinvarId = dataClinvar.clinvar_id;
  const dataGenes = data?.genes || {};

  const clinVarRows = makeClinVarRows(dataClinvar);
  const clinVarHasRows = clinVarRows.length > 0;

  const genesRows = makeGenesOrderedRow(dataGenes);
  const genesHasRows = genesRows.length > 0;

  return (
    <>
      <Title level={3}>{intl.get('screen.variantDetails.summaryTab.clinicalCardTitle')}</Title>
      <Space direction="vertical" className={styles.clinicalCard} size={16}>
        <Spin spinning={loading}>
          <CollapsePanel
            header={
              <Title level={4}>
                ClinVar{' '}
                {clinvarId ? (
                  <ExternalLink
                    href={`https://www.ncbi.nlm.nih.gov/clinvar/variation/${clinvarId}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {clinvarId}
                  </ExternalLink>
                ) : (
                  ''
                )}
              </Title>
            }
          >
            {clinVarHasRows ? (
              <Table
                pagination={false}
                dataSource={clinVarRows}
                columns={columnsClinVar}
                bordered
                size="small"
              />
            ) : (
              <NoData />
            )}
          </CollapsePanel>
        </Spin>
        <Spin spinning={loading}>
          <CollapsePanel
            header={
              <Title level={4}>
                {intl.get('screen.variantDetails.clinicalAssociationsTab.genePhenotype')}
              </Title>
            }
          >
            {genesHasRows ? (
              <Table
                bordered
                pagination={false}
                dataSource={genesRows}
                columns={columnsPhenotypes}
                size="small"
              />
            ) : (
              <NoData />
            )}
          </CollapsePanel>
        </Spin>
      </Space>
    </>
  );
};

export default ClinicalCard;
