import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { ProColumnsType } from '@ferlab/ui/core/components/ProTable/types';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { Space, Tag, Tooltip } from 'antd';
import { GeneEntity, ITableGeneEntity } from 'graphql/cnv/models';

import ExternalLinkIcon from 'components/icons/ExternalLinkIcon';
import Type1Icon from 'components/icons/geneOverlapType/Type1Icon';
import Type2Icon from 'components/icons/geneOverlapType/Type2Icon';
import Type3Icon from 'components/icons/geneOverlapType/Type3Icon';
import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';
import { formatDnaLength, formatNumber, formatRatio } from 'utils/formatNumber';

import { GeneOverlapType, getGeneOverlapType, NRT } from './utils';

import style from './geneColumns.module.css';

export const getGeneColumns = (): ProColumnsType<ITableGeneEntity> => {
  const columns: ProColumnsType<ITableGeneEntity> = [
    {
      title: intl.get('screen.patientcnv.modal.genes.table.gene'),
      key: 'symbol',
      dataIndex: 'symbol',
      sorter: {
        compare: (a: ITableGeneEntity, b: ITableGeneEntity) => a.symbol.localeCompare(b.symbol),
        multiple: 1,
      },
      render: (symbol: string, record) => (
        <ExternalLink
          href={
            record.omim_gene_id
              ? `https://www.omim.org/entry/${record.omim_gene_id}`
              : `https://www.omim.org/search?index=entry&start=1&limit=10&sort=score+desc%2C+prefix_sort+desc&search=${symbol}`
          }
        >
          {symbol}
        </ExternalLink>
      ),
    },
    {
      title: intl.get('screen.variantDetails.summaryTab.summaryTable.cytoband'),
      key: 'location',
      dataIndex: 'location',
      render: (location: string) => (location ? location : TABLE_EMPTY_PLACE_HOLDER),
    },
    {
      title: intl.get('filters.group.genes.omim.name'),
      key: 'inheritance_code',
      sorter: {
        compare: (a: ITableGeneEntity, b: ITableGeneEntity) => {
          const inheritanceA =
            a.omim && a.omim.hits?.edges.length > 0
              ? a.omim.hits?.edges
                  .reduce<string[]>(
                    (prev, curr) => [...prev, ...(curr.node.inheritance_code || [])],
                    [],
                  )
                  .filter((item, pos, self) => self.indexOf(item) == pos)
              : undefined;

          const inheritanceB =
            b.omim && b.omim.hits?.edges.length > 0
              ? b.omim.hits?.edges
                  .reduce<string[]>(
                    (prev, curr) => [...prev, ...(curr.node.inheritance_code || [])],
                    [],
                  )
                  .filter((item, pos, self) => self.indexOf(item) == pos)
              : undefined;

          const valueA = inheritanceA
            ? inheritanceA?.length > 0
              ? inheritanceA.toString()
              : NRT
            : '';

          const valueB = inheritanceB
            ? inheritanceB?.length > 0
              ? inheritanceB.toString()
              : NRT
            : '';

          return valueA.localeCompare(valueB);
        },
        multiple: 1,
      },
      render: (record: GeneEntity) => {
        if (!record.omim || record.omim.hits.edges.length === 0) {
          return TABLE_EMPTY_PLACE_HOLDER;
        }
        const inheritance = record.omim.hits.edges
          .reduce<string[]>((prev, curr) => [...prev, ...(curr.node.inheritance_code || [])], [])
          .filter((item, pos, self) => self.indexOf(item) == pos);

        const omimLink = `https://www.omim.org/entry/${record.omim_gene_id}`;
        return (
          <StackLayout horizontal>
            <Space size={4} className={style.variantSnvOmimCellItem}>
              {inheritance.length ? (
                inheritance.map((code) => (
                  <Tooltip key={code} title={intl.get(`inheritant.code.${code}`)}>
                    <Tag color={code.includes('?') ? 'default' : 'blue'}>
                      <ExternalLink href={omimLink}>{code}</ExternalLink>
                    </Tag>
                  </Tooltip>
                ))
              ) : (
                <Tooltip title={intl.get(`inheritant.code.NRT`)}>
                  <ExternalLink href={omimLink}>{NRT}</ExternalLink>
                </Tooltip>
              )}
            </Space>
          </StackLayout>
        );
      },
    },
    {
      title: intl.get('screen.patientcnv.results.table.clingen'),
      key: 'clinGen',
      dataIndex: 'symbol',
      render: (symbol: string) => (
        <ExternalLink
          // eslint-disable-next-line max-len
          href={`https://search.clinicalgenome.org/kb/genes?page=1&size=50&search=${symbol}`}
        >
          <ExternalLinkIcon />
        </ExternalLink>
      ),
    },
    {
      title: intl.get('screen.patientcnv.modal.genes.table.panel'),
      tooltip: intl.get('screen.patientcnv.modal.genes.table.panel.tooltip'),
      key: 'panels',
      dataIndex: 'panels',
      render: (panels: string[] | null) => (panels ? panels.join(', ') : TABLE_EMPTY_PLACE_HOLDER),
    },
    {
      title: intl.get('screen.patientcnv.modal.genes.table.length'),
      tooltip: intl.get('screen.patientcnv.modal.genes.table.length.tooltip'),
      key: 'gene_length',
      dataIndex: 'gene_length',
      sorter: {
        compare: (a: ITableGeneEntity, b: ITableGeneEntity) => a.gene_length - b.gene_length,
        multiple: 1,
      },
      render: (gene_length: string) => formatDnaLength(gene_length),
    },
    {
      key: 'overlapping',
      title: intl.get('screen.patientcnv.modal.genes.table.overlapping'),
      children: [
        {
          title: intl.get('screen.patientcnv.modal.genes.table.number_bases'),
          tooltip: intl.get('screen.patientcnv.modal.genes.table.number_bases.tooltip'),
          key: 'overlap_bases',
          dataIndex: 'overlap_bases',
          sorter: {
            compare: (a: ITableGeneEntity, b: ITableGeneEntity) =>
              a.overlap_bases - b.overlap_bases,
            multiple: 1,
          },
          render: (overlap_bases: string) => formatDnaLength(overlap_bases),
        },
        {
          title: intl.get('screen.patientcnv.modal.genes.table.number_exons'),
          tooltip: intl.get('screen.patientcnv.modal.genes.table.number_exons.tooltip'),
          key: 'overlap_exons',
          dataIndex: 'overlap_exons',
          sorter: {
            compare: (a: ITableGeneEntity, b: ITableGeneEntity) =>
              a.overlap_exons - b.overlap_exons,
            multiple: 1,
          },
          render: (overlap_exons: string) => formatNumber(overlap_exons),
        },
        {
          title: intl.get('screen.patientcnv.modal.genes.table.percent_gene'),
          tooltip: intl.get('screen.patientcnv.modal.genes.table.percent_gene.tooltip'),
          key: 'overlap_gene_ratio',
          dataIndex: 'overlap_gene_ratio',
          sorter: {
            compare: (a: ITableGeneEntity, b: ITableGeneEntity) =>
              a.overlap_gene_ratio - b.overlap_gene_ratio,
            multiple: 1,
          },
          render: (overlap_gene_ratio: string) => formatRatio(overlap_gene_ratio),
        },
        {
          title: intl.get('screen.patientcnv.modal.genes.table.percent_cnv'),
          tooltip: intl.get('screen.patientcnv.modal.genes.table.percent_cnv.tooltip'),
          key: 'overlap_cnv_ratio',
          dataIndex: 'overlap_cnv_ratio',
          sorter: {
            compare: (a: ITableGeneEntity, b: ITableGeneEntity) =>
              a.overlap_cnv_ratio - b.overlap_cnv_ratio,
            multiple: 1,
          },
          render: (overlap_cnv_ratio: string) => formatRatio(overlap_cnv_ratio),
        },
        {
          title: intl.get('screen.patientcnv.modal.genes.table.overlap_type'),
          tooltip: intl.get('screen.patientcnv.modal.genes.table.overlap_type.tooltip'),
          key: 'overlap_type',
          sorter: {
            compare: (a: ITableGeneEntity, b: ITableGeneEntity) =>
              a.overlap_gene_ratio - b.overlap_gene_ratio,
            multiple: 1,
          },
          render: (record: GeneEntity) => {
            const type = getGeneOverlapType(record.overlap_gene_ratio, record.overlap_cnv_ratio);
            const Icon =
              type === GeneOverlapType.TYPE1
                ? Type1Icon
                : type === GeneOverlapType.TYPE2
                ? Type2Icon
                : Type3Icon;

            return (
              <Tooltip
                title={intl.get(`screen.patientcnv.modal.genes.table.overlap_type.tooltip.${type}`)}
              >
                <span>
                  <Icon />
                </span>
              </Tooltip>
            );
          },
        },
      ],
    },
  ];
  return columns;
};
