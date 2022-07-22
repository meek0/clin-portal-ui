import intl from 'react-intl-universal';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { Tooltip } from 'antd';
import { ITableGeneEntity } from 'graphql/cnv/models';

import { formatDnaLength, formatNumber, formatRatio } from 'utils/formatNumber';

export const getGeneColumns = (): ProColumnType<ITableGeneEntity>[] => {
  const columns: ProColumnType<ITableGeneEntity>[] = [
    {
      displayTitle: intl.get('screen.patientcnv.modal.genes.table.gene'),
      title: intl.get('screen.patientcnv.modal.genes.table.gene'),
      key: 'symbol',
      dataIndex: 'symbol',
      render: (symbol: string) => symbol,
    },
    {
      displayTitle: intl.get('screen.patientcnv.modal.genes.table.number_bases'),
      title: (
        <Tooltip title={intl.get('screen.patientcnv.modal.genes.table.number_bases.tooltip')}>
          {intl.get('screen.patientcnv.modal.genes.table.number_bases')}
        </Tooltip>
      ),
      key: 'overlap_bases',
      dataIndex: 'overlap_bases',
      render: (overlap_bases: string) => formatDnaLength(overlap_bases),
    },
    {
      displayTitle: intl.get('screen.patientcnv.modal.genes.table.number_exons'),
      title: (
        <Tooltip title={intl.get('screen.patientcnv.modal.genes.table.number_exons.tooltip')}>
          {intl.get('screen.patientcnv.modal.genes.table.number_exons')}
        </Tooltip>
      ),
      key: 'overlap_exons',
      dataIndex: 'overlap_exons',
      render: (overlap_exons: string) => formatNumber(overlap_exons),
    },
    {
      displayTitle: intl.get('screen.patientcnv.modal.genes.table.percent_gene'),
      title: (
        <Tooltip title={intl.get('screen.patientcnv.modal.genes.table.percent_gene.tooltip')}>
          {intl.get('screen.patientcnv.modal.genes.table.percent_gene')}
        </Tooltip>
      ),
      key: 'overlap_gene_ratio',
      dataIndex: 'overlap_gene_ratio',
      render: (overlap_gene_ratio: string) => formatRatio(overlap_gene_ratio),
    },
    {
      displayTitle: intl.get('screen.patientcnv.modal.genes.table.percent_cnv'),
      title: (
        <Tooltip title={intl.get('screen.patientcnv.modal.genes.table.percent_cnv.tooltip')}>
          {intl.get('screen.patientcnv.modal.genes.table.percent_cnv')}
        </Tooltip>
      ),
      key: 'overlap_cnv_ratio',
      dataIndex: 'overlap_cnv_ratio',
      render: (overlap_cnv_ratio: string) => formatRatio(overlap_cnv_ratio),
    },
  ];
  return columns;
};
