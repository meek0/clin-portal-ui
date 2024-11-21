import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { Descriptions, Space, Tag } from 'antd';
import { ITableVariantEntity } from 'graphql/variants/models';

import { TABLE_EMPTY_PLACE_HOLDER, TABLE_ND_PLACE_HOLDER } from 'utils/constants';

import style from '../index.module.css';

interface OwnProps {
  record: ITableVariantEntity;
}

const GeneSection = ({ record }: OwnProps) => {
  const gene = record.genes?.hits.edges;
  const pickedConsequence = record.consequences?.hits?.edges.find(({ node }) => !!node.picked);
  const geneSymbol = pickedConsequence?.node.symbol;
  const geneInfo = gene?.find(({ node }) => node.symbol === geneSymbol)?.node;
  const spliceAiLink = `${record.chromosome}-${record.start}-${record.reference}-${record.alternate}`;
  return (
    <Descriptions
      className={style.basicBordered}
      bordered
      size="small"
      title={intl.get('screen.patientsnv.category_genomic')}
      column={1}
    >
      <Descriptions.Item label={intl.get('pli')}>
        {geneInfo?.gnomad.pli ? (
          <ExternalLink
            className={style.gene}
            href={`https://gnomad.broadinstitute.org/gene/${geneInfo.ensembl_gene_id}?dataset=gnomad_r2_1`}
          >
            {geneInfo.gnomad.pli < 0.001
              ? geneInfo.gnomad?.pli?.toExponential(2)
              : geneInfo.gnomad.pli}
          </ExternalLink>
        ) : (
          TABLE_EMPTY_PLACE_HOLDER
        )}
      </Descriptions.Item>
      <Descriptions.Item label={intl.get('screen.patientsnv.results.table.loeuf')}>
        {geneInfo?.gnomad.loeuf ? (
          <ExternalLink
            className={style.gene}
            href={`https://gnomad.broadinstitute.org/gene/${geneInfo.ensembl_gene_id}?dataset=gnomad_r2_1`}
          >
            {geneInfo.gnomad.loeuf < 0.001
              ? geneInfo.gnomad?.loeuf?.toExponential(2)
              : geneInfo.gnomad.loeuf}
          </ExternalLink>
        ) : (
          TABLE_EMPTY_PLACE_HOLDER
        )}
      </Descriptions.Item>
      <Descriptions.Item label={intl.get('screen.patientsnv.results.table.spliceAI')}>
        {geneInfo?.spliceai ? (
          <Space className={style.alignRigthSpace}>
            {geneInfo?.spliceai.ds && Number(geneInfo?.spliceai.ds) > 0 ? (
              <ExternalLink
                className={style.gene}
                href={`https://spliceailookup.broadinstitute.org/#variant=${spliceAiLink}&hg=38&distance=50&mask=0&precomputed=0`}
              >
                {geneInfo?.spliceai.ds}
              </ExternalLink>
            ) : (
              <ExternalLink
                className={style.gene}
                href={`https://spliceailookup.broadinstitute.org/#variant=${spliceAiLink}&hg=38&distance=50&mask=0&precomputed=0`}
              >
                {TABLE_ND_PLACE_HOLDER}
              </ExternalLink>
            )}
            {geneInfo.spliceai.type && (
              <Space size={4}>
                {geneInfo.spliceai.type.map((t: string) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </Space>
            )}
          </Space>
        ) : (
          <ExternalLink
            className={style.gene}
            href={`https://spliceailookup.broadinstitute.org/#variant=${spliceAiLink}&hg=38&distance=50&mask=0&precomputed=0`}
          >
            {TABLE_ND_PLACE_HOLDER}
          </ExternalLink>
        )}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default GeneSection;
