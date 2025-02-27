import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
/* eslint-disable max-len */
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { Card, Divider, Space, Tooltip, Typography } from 'antd';
import { ITableVariantEntity } from 'graphql/variants/models';
import { EMPTY_FIELD } from 'views/Prescriptions/Entity/constants';
import { TAB_ID } from 'views/Snv/Entity';

import CanonicalIcon from 'components/icons/CanonicalIcon';
import ManePlusIcon from 'components/icons/ManePlusIcon';
import ManeSelectIcon from 'components/icons/ManeSelectIcon';
import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';

import { pickImpacBadge } from '../../ConsequencesCell';

import style from '../index.module.css';
interface OwnProps {
  record: ITableVariantEntity;
}

const TranscriptSection = ({ record: { genes, consequences, rsnumber, locus } }: OwnProps) => {
  const pickedConsequence = consequences?.hits?.edges.find(({ node }) => !!node.picked);
  const geneSymbol = pickedConsequence?.node.symbol;
  const geneInfo = genes?.hits.edges?.find(({ node }) => node.symbol === geneSymbol)?.node;
  const haveResult =
    pickedConsequence?.node.mane_select ||
    pickedConsequence?.node.canonical ||
    pickedConsequence?.node.mane_plus;
  const refseqToShow = pickedConsequence?.node?.refseq_mrna_id?.slice(0, 4);
  const arn = pickedConsequence?.node.hgvsc.split(':')[1];
  const refseqInfo = () => {
    if (pickedConsequence?.node?.refseq_mrna_id) {
      const info = refseqToShow?.map((r, i) => (
        <Space size={2} key={r}>
          <ExternalLink href={`https://www.ncbi.nlm.nih.gov/nuccore/${r}`}>{r}</ExternalLink>
          {i !== refseqToShow.length - 1 && ','}
          {i === refseqToShow.length - 1 &&
            i + 1 < pickedConsequence?.node?.refseq_mrna_id.length &&
            ','}
        </Space>
      ));
      return (
        <Space>
          {info}
          {pickedConsequence?.node?.refseq_mrna_id.length > 4 && (
            <Tooltip title={intl.get('see.more')}>
              <Link target="_blank" to={`/variant/entity/${locus}/${TAB_ID.SUMMARY}`}>
                ...
              </Link>
            </Tooltip>
          )}
        </Space>
      );
    }
    return EMPTY_FIELD;
  };
  return (
    <Card size="small" className={`${style.transcript} ${style.card}`}>
      <Space size={16} className={style.transcriptSpace}>
        <Space>
          <ExternalLink
            href={
              geneInfo?.omim_gene_id
                ? `https://www.omim.org/entry/${geneInfo?.omim_gene_id}`
                : `https://www.omim.org/search?index=entry&start=1&limit=10&sort=score+desc%2C+prefix_sort+desc&search=${geneSymbol}`
            }
          >
            <Space>
              <Typography.Title level={4} className={style.ominIdLink}>
                {geneInfo?.symbol}
              </Typography.Title>
            </Space>
          </ExternalLink>
          <Space size={4}>
            {pickedConsequence && (
              <div>
                {pickImpacBadge(pickedConsequence.node.vep_impact)}
                {intl.get(`consequences.${pickedConsequence?.node.consequences}`)}
              </div>
            )}
            -{pickedConsequence?.node.aa_change}
          </Space>
          <Space size={2} className={style.emsembl}>
            (
            <ExternalLink
              href={`https://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=${pickedConsequence?.node.ensembl_gene_id}`}
            >
              {intl.get('ensembl')}
            </ExternalLink>
            )
          </Space>
        </Space>
        <Divider type="vertical" />
        <Space className={style.mane}>
          {refseqInfo()}
          {haveResult ? (
            <Space size={4} className={style.maneIcons}>
              {pickedConsequence?.node.canonical && (
                <div>
                  <CanonicalIcon className={style.canonicalIcon} height="16" width="16" />
                </div>
              )}
              {pickedConsequence?.node.mane_select && (
                <div>
                  <ManeSelectIcon className={style.canonicalIcon} height="16" width="16" />
                </div>
              )}
              {pickedConsequence?.node.mane_plus && (
                <div>
                  <ManePlusIcon className={style.canonicalIcon} height="16" width="16" />
                </div>
              )}
            </Space>
          ) : (
            TABLE_EMPTY_PLACE_HOLDER
          )}
        </Space>
        <Divider type="vertical" />
        {pickedConsequence?.node.exon && (
          <>
            <Space>
              <span className={style.exonTitle}>{`${intl.get('exon')} :`}</span>
              {`${pickedConsequence?.node.exon.rank} / ${pickedConsequence?.node.exon.total} `}
            </Space>
            <Divider type="vertical" />
          </>
        )}
        {(pickedConsequence?.node.coding_dna_change ||
          (Array.isArray(pickedConsequence?.node.consequences) &&
            pickedConsequence?.node.consequences.length)) && (
          <>
            {arn}
            <Divider type="vertical" />
          </>
        )}

        <ExternalLink href={`https://www.ncbi.nlm.nih.gov/snp/${rsnumber}`}>
          {rsnumber}
        </ExternalLink>
      </Space>
    </Card>
  );
};

export default TranscriptSection;
