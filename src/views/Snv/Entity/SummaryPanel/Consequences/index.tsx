/* eslint-disable max-len */
import React from 'react';
import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import ExpandableCell from '@ferlab/ui/core/components/tables/ExpandableCell';
import ExpandableTable from '@ferlab/ui/core/components/tables/ExpandableTable';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { removeUnderscoreAndCapitalize } from '@ferlab/ui/core/utils/stringUtils';
import { Divider, Space, Tag, Tooltip, Typography } from 'antd';
import { ArrangerEdge, ArrangerResultsTree } from 'graphql/models';
import { ConsequenceEntity, GeneEntity, Impact, VariantEntity } from 'graphql/variants/models';
import capitalize from 'lodash/capitalize';
import NoData from 'views/Snv/Entity/NoData';

import CollapsePanel from 'components/containers/collapse';
import CanonicalIcon from 'components/icons/CanonicalIcon';
import ManePlusIcon from 'components/icons/ManePlusIcon';
import ManeSelectIcon from 'components/icons/ManeSelectIcon';
import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';

import { getVepImpactTag } from '../..';

import styles from '../index.module.scss';

interface OwnProps {
  className?: string;
  data: {
    loading: boolean;
    variantData: VariantEntity | null;
  };
}

type TableGroup = {
  consequences: ArrangerEdge<ConsequenceEntity>[];
  omim: string;
  symbol: string;
  biotype: string;
  ensembleGeneId: string;
  spliceai: {
    ds: string | undefined;
    type: string[] | undefined;
  };
  gnomad: {
    pli: number | undefined;
    loeuf: number | undefined;
  };
};

type SymbolToConsequences = {
  [key: string]: TableGroup;
};

const { Text, Title } = Typography;
const INDEX_IMPACT_PREDICTION_FIELD = 0;
const INDEX_IMPACT_PREDICTION_SHORT_LABEL = 1;
const INDEX_IMPACT_SCORE = 2;

export const shortToLongPrediction: Record<string, string> = {
  'sift.d': 'damaging',
  'sift.t': 'tolerated',
  'polyphen2.p': 'possibily damaging',
  'polyphen2.d': 'damaging',
  'polyphen2.b': 'benign',
  'fathmm.d': 'damaging',
  'fathmm.t': 'tolerated',
  'lrt.d': 'deleterious',
  'lrt.n': 'neutral',
  'lrt.u': 'unknown',
};

const getLongPredictionLabelIfKnown = (predictionField: string, predictionShortLabel: string) => {
  if (!predictionField || !predictionShortLabel) {
    return null;
  }
  const dictionaryPath = `${predictionField.toLowerCase()}.${predictionShortLabel.toLowerCase()}`;
  const longPrediction = shortToLongPrediction[dictionaryPath];
  return longPrediction || null;
};

const groupConsequencesBySymbol = (
  consequences: ArrangerEdge<ConsequenceEntity>[],
  genes: ArrangerEdge<GeneEntity>[],
) => {
  if (consequences.length === 0) {
    return {};
  }
  return consequences.reduce(
    (acc: SymbolToConsequences, consequence: ArrangerEdge<ConsequenceEntity>) => {
      const symbol = consequence.node.symbol;
      if (!symbol) {
        return acc;
      }
      const gene = genes.find((g) => g.node.symbol === symbol);
      const omim = gene ? gene.node.omim_gene_id : '';
      const biotype = gene ? gene.node.biotype : '';
      const ensembleGeneId = consequence.node.ensembl_gene_id || '';
      const spliceaiDS = gene?.node?.spliceai?.ds;
      const spliceAIType = gene?.node?.spliceai?.type;
      const pli = gene?.node?.gnomad?.pli;
      const loeuf = gene?.node?.gnomad?.loeuf;
      const oldConsequences = acc[symbol]?.consequences || [];

      return {
        ...acc,
        [symbol]: {
          consequences: [...oldConsequences, { ...consequence }],
          omim,
          symbol,
          ensembleGeneId,
          biotype,
          spliceai: {
            ds: spliceaiDS,
            type: spliceAIType,
          },
          gnomad: {
            pli,
            loeuf,
          },
        },
      };
    },
    {},
  );
};

const orderGenes = (mSymbolToConsequences: SymbolToConsequences) => {
  if (!mSymbolToConsequences || Object.keys(mSymbolToConsequences).length === 0) {
    return [];
  }
  return Object.entries(mSymbolToConsequences).map(([, values]) => ({
    ...values,
  }));
};

const orderConsequencesForTable = (tableGroups: TableGroup[]) => {
  if (!tableGroups || tableGroups.length === 0) {
    return [];
  }

  return tableGroups.map((tableGroup: TableGroup) => {
    const consequences = tableGroup.consequences;
    return {
      ...tableGroup,
      consequences: consequences,
    };
  });
};

const makeTables = (
  rawConsequences: ArrangerEdge<ConsequenceEntity>[],
  rawGenes: ArrangerEdge<GeneEntity>[],
) => {
  if (!rawConsequences || rawConsequences.length === 0) {
    return [];
  }
  const symbolToConsequences = groupConsequencesBySymbol(rawConsequences, rawGenes);
  const orderedGenes = orderGenes(symbolToConsequences);
  return orderConsequencesForTable(orderedGenes);
};

export const makeRows = (consequences: ArrangerEdge<ConsequenceEntity>[]) =>
  consequences.map((consequence: ArrangerEdge<ConsequenceEntity>, index: number) => ({
    key: `${index + 1}`,
    aa: consequence.node.hgvsp?.split(':')[1],
    consequences: consequence.node.consequences.filter((c) => c || c.length > 0),
    codingDna: consequence.node.hgvsc?.split(':')[1],
    strand: consequence.node.strand,
    vep: consequence.node.vep_impact,
    impact: [
      [
        'Sift',
        consequence.node.predictions?.sift_pred,
        consequence.node.predictions?.sift_converted_rank_score,
      ],
      [
        'Polyphen2',
        consequence.node.predictions?.polyphen2_hvar_pred,
        consequence.node.predictions?.sift_converted_rank_score,
      ],
      [
        'Fathmm',
        consequence.node.predictions?.fathmm_pred,
        consequence.node.predictions?.FATHMM_converted_rankscore,
      ],
      ['Cadd (Raw)', null, consequence.node.predictions?.cadd_score],
      ['Cadd (Phred)', null, consequence.node.predictions?.cadd_phred],
      ['Dann', null, consequence.node.predictions?.dann_score],
      [
        'Lrt',
        consequence.node.predictions?.lrt_pred,
        consequence.node.predictions?.lrt_converted_rankscore,
      ],
      ['Revel', null, consequence.node.predictions?.revel_rankscore],
    ].filter(([, , score]) => score),
    conservation: consequence.node.conservations?.phylo_p17way_primate_rankscore,
    transcript: {
      ids: consequence.node.refseq_mrna_id?.filter((i) => i?.length > 0),
      transcriptId: consequence.node.ensembl_transcript_id,
      isCanonical: consequence.node.canonical,
      isManePlus: consequence.node.mane_plus,
      isManeSelect: consequence.node.mane_select,
    },
  }));

const columns = [
  {
    title: () => intl.get('screen.variantDetails.summaryTab.consequencesTable.AAColumn'),
    dataIndex: 'aa',
    render: (aa: string) => (
      <div className={styles.longValue}>{aa || TABLE_EMPTY_PLACE_HOLDER}</div>
    ),
    className: `${styles.longValue}`,
    width: '10%',
  },
  {
    title: () => intl.get('screen.variantDetails.summaryTab.consequencesTable.ConsequenceColumn'),
    dataIndex: 'consequences',
    render: (consequences: string[]) => {
      if (consequences.length === 0) {
        return <></>;
      }
      return consequences?.map((item) => (
        <StackLayout key={item} horizontal className={styles.cellList}>
          <Text>{removeUnderscoreAndCapitalize(item)}</Text>
        </StackLayout>
      ));
    },
    width: '15%',
  },
  {
    title: () => intl.get('screen.variantDetails.summaryTab.consequencesTable.CDNAChangeColumn'),
    dataIndex: 'codingDna',
    render: (codingDna: string) => (
      <div className={styles.longValue}>{codingDna || TABLE_EMPTY_PLACE_HOLDER}</div>
    ),
    width: '12%',
  },
  {
    title: () => intl.get('screen.variantDetails.summaryTab.consequencesTable.VEP'),
    dataIndex: 'vep',
    render: (vep: Impact) => getVepImpactTag(vep.toLowerCase()),
    width: '10%',
  },
  {
    title: () => intl.get('prediction'),
    dataIndex: 'impact',
    render: (impacts: string[][]) => {
      if (impacts.length === 0) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }

      return (
        <ExpandableCell
          nOfElementsWhenCollapsed={2}
          dictionnary={{
            'see.less': intl.get('see.less'),
            'see.more': intl.get('see.more'),
          }}
          dataSource={impacts}
          renderItem={(item: any, id): React.ReactNode => {
            const predictionField = item[INDEX_IMPACT_PREDICTION_FIELD];
            const score = item[INDEX_IMPACT_SCORE];
            const predictionShortLabel = item[INDEX_IMPACT_PREDICTION_SHORT_LABEL];

            const predictionLongLabel = getLongPredictionLabelIfKnown(
              predictionField,
              predictionShortLabel,
            );

            const label = predictionLongLabel || predictionShortLabel;

            const description = label ? `${capitalize(label)} - ${score}` : score;
            return (
              <StackLayout key={id} horizontal className={styles.cellList}>
                <Text type={'secondary'}>{predictionField}:</Text>
                <Text>{description}</Text>
              </StackLayout>
            );
          }}
        />
      );
    },
    width: '15%',
  },
  {
    title: () => intl.get('screen.variantDetails.summaryTab.consequencesTable.ConservationColumn'),
    dataIndex: 'conservation',
    render: (conservation: number) =>
      conservation == null ? TABLE_EMPTY_PLACE_HOLDER : conservation,
  },
  {
    title: () => intl.get('ensemblID'),
    dataIndex: 'transcript',
    render: (transcript: {
      transcriptId: string;
      isCanonical?: boolean;
      isManePlus?: boolean;
      isManeSelect: boolean;
    }) => (
      <Space>
        {transcript.transcriptId}
        <Space size={2}>
          {transcript.isCanonical && (
            <Tooltip title={intl.get('screen.variantDetails.summaryTab.canonical')}>
              <div>
                <CanonicalIcon className={styles.canonicalIcon} height="14" width="14" />
              </div>
            </Tooltip>
          )}
          {transcript.isManeSelect && (
            <Tooltip title={intl.get('screen.variantDetails.summaryTab.maneSelect')}>
              <div>
                <ManeSelectIcon className={styles.canonicalIcon} height="14" width="14" />
              </div>
            </Tooltip>
          )}
          {transcript.isManePlus && (
            <Tooltip title={intl.get('screen.variantDetails.summaryTab.manePlus')}>
              <div>
                <ManePlusIcon className={styles.canonicalIcon} height="14" width="14" />
              </div>
            </Tooltip>
          )}
        </Space>
      </Space>
    ),
    width: '15%',
  },
  {
    title: () => intl.get('refSeq'),
    dataIndex: 'transcript',
    render: (transcript: { ids: string[] }) => {
      if (!transcript.ids) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }
      return (
        <ExpandableCell
          dictionnary={{
            'see.less': intl.get('see.less'),
            'see.more': intl.get('see.more'),
          }}
          dataSource={transcript.ids}
          renderItem={(item: any, id): React.ReactNode => (
            <StackLayout key={id} horizontal className={styles.cellList}>
              <ExternalLink
                href={`https://www.ncbi.nlm.nih.gov/nuccore/${item}?report=graph`}
                className={styles.transcriptLink}
              >
                {item}
              </ExternalLink>
            </StackLayout>
          )}
        />
      );
    },
    width: '15%',
  },
];

const sortConsequences = (data: ArrangerEdge<ConsequenceEntity>[]) =>
  data
    .sort((a, b) => b.node.impact_score! - a.node.impact_score!)
    .sort((a, b) => (a.node.canonical === b.node.canonical ? 0 : a.node.canonical ? -1 : 1));

const Consequences = ({ data }: OwnProps) => {
  const variantData = data.variantData;
  const consequences = (variantData?.consequences as ArrangerResultsTree<ConsequenceEntity>)?.hits
    .edges;
  const genes = (variantData?.genes as ArrangerResultsTree<GeneEntity>)?.hits.edges;
  const tables = makeTables(consequences, genes);
  const hasTables = tables.length > 0;

  return (
    <CollapsePanel
      header={
        <Title level={4}>{intl.get('screen.variantDetails.summaryTab.consequencesTitle')}</Title>
      }
      loading={data.loading}
    >
      <Space className={styles.consequenceCards} direction="vertical" size={48}>
        {hasTables ? (
          tables.map((tableData: TableGroup, index: number) => {
            const symbol = tableData.symbol;
            const omim = tableData.omim;
            const biotype = tableData.biotype;
            const orderedConsequences = sortConsequences(tableData.consequences);
            const spliceAI = Number(tableData.spliceai.ds) >= 0 ? tableData.spliceai.ds : 'ND';
            const spliceAIType = tableData.spliceai.type ? tableData.spliceai.type : null;
            const spliceAiLink = `${data.variantData?.chromosome}-${data.variantData?.start}-${data.variantData?.reference}-${data.variantData?.alternate}`;
            const pli = tableData.gnomad.pli;
            const loeuf = tableData.gnomad.loeuf;
            const ensembleGeneId = tableData.ensembleGeneId;
            return (
              <Space
                key={index}
                direction="vertical"
                className={styles.consequenceTableWrapper}
                size={8}
              >
                <Space size={8}>
                  <Space size={4}>
                    <Text strong data-cy={`${symbol}_Symbol`}>
                      <ExternalLink
                        href={`https://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=${symbol}`}
                      >
                        {symbol}
                      </ExternalLink>
                    </Text>
                  </Space>
                  {omim && (
                    <Space size={4}>
                      <Divider type="vertical" />
                      <Text strong>Omim :</Text>
                      <Text strong>
                        <ExternalLink href={`https://omim.org/entry/${omim}`}>{omim}</ExternalLink>
                      </Text>
                    </Space>
                  )}

                  {biotype && (
                    <Space size={4}>
                      <Divider type="vertical" />
                      <Text strong>{biotype}</Text>
                    </Space>
                  )}
                  <Space size={4}>
                    <Divider type="vertical" />
                    <Text strong>SpliceAI :</Text>
                    <Space size={8}>
                      <Text strong>
                        <ExternalLink
                          href={`https://spliceailookup.broadinstitute.org/#variant=${spliceAiLink}&hg=38&distance=50&mask=0&precomputed=0`}
                        >
                          {spliceAI}
                        </ExternalLink>
                      </Text>
                      {spliceAIType && (
                        <Space size={4}>
                          {spliceAIType.map((t, index) => (
                            <Tag key={index}>{t}</Tag>
                          ))}
                        </Space>
                      )}
                    </Space>
                  </Space>
                  {pli && (
                    <Space size={4}>
                      <Divider type="vertical" />
                      <Text strong>pLI :</Text>
                      {
                        <Text strong>
                          <ExternalLink
                            href={`https://gnomad.broadinstitute.org/gene/${ensembleGeneId}?dataset=gnomad_r2_1`}
                          >
                            {pli < 0.001 ? pli.toExponential(2) : pli}
                          </ExternalLink>
                        </Text>
                      }
                    </Space>
                  )}
                  {loeuf && (
                    <Space size={4}>
                      <Divider type="vertical" />
                      <Text strong>LOEUF :</Text>
                      {
                        <Text strong>
                          <ExternalLink
                            href={`https://gnomad.broadinstitute.org/gene/${ensembleGeneId}?dataset=gnomad_r2_1`}
                          >
                            {loeuf < 0.001 ? loeuf.toExponential(2) : loeuf}
                          </ExternalLink>
                        </Text>
                      }
                    </Space>
                  )}
                </Space>
                <ExpandableTable
                  bordered={true}
                  nOfElementsWhenCollapsed={1}
                  buttonText={(showAll, hiddenNum) =>
                    showAll
                      ? intl.get('screen.variant.entity.table.hidetranscript')
                      : intl.get('screen.variant.entity.table.showtranscript', {
                          count: hiddenNum,
                        })
                  }
                  key={index}
                  dataSource={makeRows(orderedConsequences)}
                  columns={columns}
                  pagination={false}
                  size="small"
                />
              </Space>
            );
          })
        ) : (
          <NoData />
        )}
      </Space>
    </CollapsePanel>
  );
};

export default Consequences;
