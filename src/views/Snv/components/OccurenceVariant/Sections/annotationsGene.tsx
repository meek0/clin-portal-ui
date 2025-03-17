import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { Descriptions } from 'antd';
import { ITableVariantEntity } from 'graphql/variants/models';

import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';

import style from '../index.module.css';

interface OwnProps {
  record: ITableVariantEntity;
}

const AnnotationsGeneSection = ({ record }: OwnProps) => {
  const pickedConsequence = record.consequences?.hits?.edges.find(
    ({ node }) => !!node.picked,
  )?.node;
  const gene = record.genes?.hits.edges;
  const geneSymbol = pickedConsequence?.symbol;
  const geneInfo = gene?.find(({ node }) => node.symbol === geneSymbol)?.node;

  return (
    <Descriptions
      className={style.basicBordered}
      bordered
      size="small"
      title={intl.get('modal.variant.interpretation.somatic.sections.annotationsGene.title')}
      column={1}
    >
      <Descriptions.Item label={intl.get('screen.patientsnv.results.table.loeuf')}>
        {geneInfo?.gnomad?.loeuf ? (
          <ExternalLink
            className={style.gene}
            href={`https://gnomad.broadinstitute.org/gene/${geneInfo.ensembl_gene_id}?dataset=gnomad_r2_1`}
          >
            {geneInfo?.gnomad?.loeuf < 0.001
              ? geneInfo.gnomad?.loeuf?.toExponential(2)
              : geneInfo.gnomad?.loeuf}
          </ExternalLink>
        ) : (
          TABLE_EMPTY_PLACE_HOLDER
        )}
      </Descriptions.Item>
      <Descriptions.Item label={intl.get('pli')}>
        {geneInfo?.gnomad?.pli ? (
          <ExternalLink
            className={style.gene}
            href={`https://gnomad.broadinstitute.org/gene/${geneInfo.ensembl_gene_id}?dataset=gnomad_r2_1`}
          >
            {geneInfo?.gnomad?.pli < 0.001
              ? geneInfo.gnomad?.pli?.toExponential(2)
              : geneInfo.gnomad?.pli}
          </ExternalLink>
        ) : (
          TABLE_EMPTY_PLACE_HOLDER
        )}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default AnnotationsGeneSection;
