import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { Descriptions, Space, Tag, Tooltip } from 'antd';
import { ITableVariantEntity } from 'graphql/variants/models';
import { TAB_ID } from 'views/Snv/Entity';

import { TABLE_EMPTY_PLACE_HOLDER, TABLE_ND_PLACE_HOLDER } from 'utils/constants';

import style from '../index.module.css';

interface OwnProps {
  record: ITableVariantEntity;
}

const AnnotationsVariantSection = ({ record }: OwnProps) => {
  const freqTO = record.freq_rqdm_tumor_only;
  const freqTN = record.freq_rqdm_tumor_normal;
  const pickedConsequence = record.consequences?.hits?.edges.find(
    ({ node }) => !!node.picked,
  )?.node;
  const gene = record.genes?.hits.edges;
  const geneSymbol = pickedConsequence?.symbol;
  const geneInfo = gene?.find(({ node }) => node.symbol === geneSymbol)?.node;
  const spliceAiLink = `${record.chromosome}-${record.start}-${record.reference}-${record.alternate}`;

  return (
    <Descriptions
      className={style.basicBordered}
      bordered
      size="small"
      title={intl.get('modal.variant.interpretation.somatic.sections.annotationsVariant.title')}
      column={1}
    >
      <Descriptions.Item
        label={`${intl.get('filters.group.panels')} (${intl.get(
          'filters.options.tasks.TEBA.abrv',
        )})`}
      >
        <Space className={style.alignRigthSpace} size={4}>
          {freqTO.pc}
          {'/'}
          <Link target="_blank" to={`/variant/entity/${record.locus}/${TAB_ID.PATIENTS}`}>
            {freqTO.pn}
          </Link>
          <Tooltip title={intl.get('filters.group.freq_rqdm_tumor_only.pf.tooltip')}>
            {`(${freqTO.pf.toExponential(2)})`}
          </Tooltip>
        </Space>
      </Descriptions.Item>
      <Descriptions.Item
        label={`${intl.get('filters.group.panels')} (${intl.get(
          'filters.options.tasks.TNEBA.abrv',
        )})`}
      >
        <Space className={style.alignRigthSpace} size={4}>
          {freqTN.pc}
          {'/'}
          <Link target="_blank" to={`/variant/entity/${record.locus}/${TAB_ID.PATIENTS}`}>
            {freqTN.pn}
          </Link>
          <Tooltip title={intl.get('filters.group.freq_rqdm_tumor_normal.pf.tooltip')}>
            {`(${freqTN.pf.toExponential(2)})`}
          </Tooltip>
        </Space>
      </Descriptions.Item>
      <Descriptions.Item label={intl.get('filters.group.genes.cosmic.tumour_types_germline')}>
        {record.cmc ? (
          <Space size={4} className={style.alignRigthSpace}>
            <ExternalLink href={record.cmc.mutation_url}>{record.cmc.sample_mutated}</ExternalLink>
            {`(${record.cmc.sample_ratio.toExponential(2)})`}
          </Space>
        ) : (
          TABLE_EMPTY_PLACE_HOLDER
        )}
      </Descriptions.Item>

      <Descriptions.Item label={intl.get('filters.group.consequences.predictions.revel_score')}>
        {pickedConsequence?.predictions?.revel_score
          ? pickedConsequence.predictions.revel_score.toExponential(2)
          : TABLE_EMPTY_PLACE_HOLDER}
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

export default AnnotationsVariantSection;
