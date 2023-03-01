import ReactDOMServer from 'react-dom/server';
import intl from 'react-intl-universal';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { Button, Space, Tooltip } from 'antd';
import cx from 'classnames';
import { ITableVariantEntity, VariantEntity } from 'graphql/cnv/models';

import LineStyleIcon from 'components/icons/LineStyleIcon';
import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';
import { formatGenotype } from 'utils/formatGenotype';
import { formatDnaLength, formatNumber } from 'utils/formatNumber';

import style from './variantColumns.module.scss';

export const getVariantColumns = (
  openGenesModal: (record: VariantEntity) => void,
  igvModalCb?: (record: VariantEntity) => void,
): ProColumnType<ITableVariantEntity>[] => {
  const columns: ProColumnType<ITableVariantEntity>[] = [
    {
      title: intl.get('screen.patientcnv.results.table.variant'),
      key: 'name',
      dataIndex: 'name',
      fixed: 'left',
      sorter: { multiple: 1 },
      className: cx(style.variantTableCell, style.variantTableCellElipsis),
      render: (name: string) => {
        const value = name.split(':').slice(1).join(':');
        return (
          <Tooltip placement="topLeft" title={value}>
            {value}
          </Tooltip>
        );
      },
    },
    {
      title: intl.get('screen.patientcnv.results.table.chromosome'),
      tooltip: intl.get('screen.patientcnv.results.table.chromosome.tooltip'),
      key: 'chromosome',
      dataIndex: 'sort_chromosome',
      sorter: { multiple: 1 },
      render: (sort_chromosome: number, variant: VariantEntity) => variant.chromosome,
    },
    {
      title: intl.get('screen.patientcnv.results.table.start'),
      key: 'start',
      dataIndex: 'start',
      sorter: { multiple: 1 },
      render: (start: number) => (start ? formatNumber(start) : TABLE_EMPTY_PLACE_HOLDER),
    },
    {
      title: intl.get('screen.patientcnv.results.table.end'),
      key: 'end',
      dataIndex: 'end',
      sorter: { multiple: 1 },
      render: (end: number) => (end ? formatNumber(end) : TABLE_EMPTY_PLACE_HOLDER),
    },
    {
      title: intl.get('screen.patientcnv.results.table.event'),
      key: 'type',
      dataIndex: 'type',
      sorter: { multiple: 1 },
      render: (type: string) => type,
    },
    {
      title: intl.get('screen.patientcnv.results.table.length'),
      tooltip: intl.get('screen.patientcnv.results.table.length.tooltip'),
      key: 'reflen',
      dataIndex: 'reflen',
      render: (length: number) => formatDnaLength(length),
      sorter: { multiple: 1 },
    },
    {
      title: intl.get('screen.patientcnv.results.table.copy_number'),
      tooltip: intl.get('screen.patientcnv.results.table.copy_number.tooltip'),
      key: 'cn',
      dataIndex: 'cn',
      sorter: { multiple: 1 },
      render: (cn: number) => cn,
    },
    {
      title: intl.get('screen.patientcnv.results.table.number_genes'),
      tooltip: intl.get('screen.patientcnv.results.table.number_genes.tooltip'),
      key: 'number_genes',
      dataIndex: 'number_genes',
      render: (number_genes: number, variant: VariantEntity) =>
        variant.genes.hits.edges.some((gene) => gene.node.symbol) ? (
          <a
            onClick={(e) => {
              e.preventDefault();
              openGenesModal(variant);
            }}
          >
            {number_genes}
          </a>
        ) : (
          0
        ),
    },
    {
      title: intl.get('screen.patientcnv.results.table.genes'),
      tooltip: intl.get('screen.patientcnv.results.table.genes.tooltip'),
      key: 'genes',
      dataIndex: 'number_genes',
      render: (number_genes: number, variant: VariantEntity) =>
        variant.genes.hits.edges.some((gene) => gene.node.symbol) ? (
          <a
            onClick={(e) => {
              e.preventDefault();
              openGenesModal(variant);
            }}
          >
            {variant.genes.hits.edges
              .slice(0, 3)
              .map((gene) => gene.node.symbol)
              .join(', ')}
            {variant.genes.hits.edges.length > 3 ? '...' : ''}
          </a>
        ) : (
          <>{TABLE_EMPTY_PLACE_HOLDER}</>
        ),
    },
    {
      title: intl.get('screen.patientcnv.results.table.genotype'),
      tooltip: intl.get('screen.patientcnv.results.table.genotype.tooltip'),
      key: 'calls',
      dataIndex: 'calls',
      defaultHidden: true,
      render: (calls: number[], variant: VariantEntity) => renderCNVByKey('calls', variant),
    },
    {
      title: intl.get('screen.patientcnv.results.table.dragen_filter'),
      tooltip: intl.get('screen.patientcnv.results.table.dragen_filter.tooltip'),
      key: 'filter',
      dataIndex: 'filters',
      defaultHidden: true,
      render: (filters: string[]) => filters.join(', '),
    },
    {
      title: intl.get('screen.patientcnv.results.table.quality'),
      tooltip: intl.get('screen.patientcnv.results.table.quality.tooltip'),
      key: 'qual',
      dataIndex: 'qual',
      sorter: { multiple: 1 },
      defaultHidden: true,
      render: (qual: number) => qual,
    },
    {
      title: intl.get('screen.patientcnv.results.table.segment_mean'),
      tooltip: intl.get('screen.patientcnv.results.table.segment_mean.tooltip'),
      key: 'sm',
      dataIndex: 'sm',
      sorter: { multiple: 1 },
      defaultHidden: true,
      render: (sm: string) => sm,
    },
    {
      title: intl.get('screen.patientcnv.results.table.bins_count'),
      tooltip: intl.get('screen.patientcnv.results.table.bins_count.tooltip'),
      key: 'bc',
      dataIndex: 'bc',
      defaultHidden: true,
      sorter: { multiple: 1 },
      render: (bc: string) => bc,
    },
    {
      title: intl.get('screen.patientcnv.results.table.paired_end'),
      tooltip: intl.get('screen.patientcnv.results.table.paired_end.tooltip'),
      key: 'pe',
      dataIndex: 'pe',
      defaultHidden: true,
      render: (pe: string[]) => pe.join(', '),
    },
    {
      className: style.userAffectedBtnCell,
      key: 'actions',
      title: intl.get('screen.patientsnv.results.table.actions'),
      fixed: 'right',
      render: (record: VariantEntity) => (
        <Space align={'center'}>
          <Tooltip title={intl.get('open.in.igv')}>
            <Button
              onClick={() => igvModalCb && igvModalCb(record)}
              icon={<LineStyleIcon width={'100%'} height={'16px'} />}
              type={'link'}
              size={'small'}
            />
          </Tooltip>
        </Space>
      ),
      align: 'center',
    },
  ];
  return columns;
};

const renderToString = (element: any) => {
  if (typeof element === 'string' || typeof element === 'number') {
    return String(element);
  } else if (element) {
    return ReactDOMServer.renderToString(element);
  }
  return '';
};

export const renderCNVToString = (key: string, variant: VariantEntity) =>
  renderToString(renderCNVByKey(key, variant));

const renderCNVByKey = (key: string, variant: VariantEntity) => {
  if (key === 'calls') {
    return formatGenotype(variant?.calls);
  }
  return <></>;
};
