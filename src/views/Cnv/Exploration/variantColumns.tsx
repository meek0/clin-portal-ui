import intl from 'react-intl-universal';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { Tooltip } from 'antd';
import cx from 'classnames';
import { ITableVariantEntity } from 'graphql/cnv/models';

import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';

import style from './variantColumns.module.scss';

export const getVariantColumns = (): ProColumnType<ITableVariantEntity>[] => {
  const columns: ProColumnType<ITableVariantEntity>[] = [
    {
      title: intl.get('screen.patientcnv.results.table.cnv'),
      key: 'name',
      dataIndex: 'name',
      className: cx(style.variantTableCell, style.variantTableCellElipsis),
      render: (name: string) => {
        const value = name.split(':').slice(2).join(':');
        return (
          <Tooltip placement="topLeft" title={value}>
            {value}
          </Tooltip>
        );
      },
    },
    {
      title: (
        <Tooltip title={intl.get('screen.patientcnv.results.table.chromosome.tooltip')}>
          {intl.get('screen.patientcnv.results.table.chromosome')}
        </Tooltip>
      ),
      key: 'chromosome',
      dataIndex: 'chromosome',
      render: (chromosome: string) => chromosome,
    },
    {
      title: intl.get('screen.patientcnv.results.table.start'),
      key: 'start',
      dataIndex: 'start',
      render: (start: number) => start,
    },
    {
      title: intl.get('screen.patientcnv.results.table.end'),
      key: 'end',
      dataIndex: 'end',
      render: (end: number) => end || TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      title: intl.get('screen.patientcnv.results.table.type'),
      key: 'type',
      dataIndex: 'name',
      render: (name: string) => name.split(':')[1] || TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      title: (
        <Tooltip title={intl.get('screen.patientcnv.results.table.length.tooltip')}>
          {intl.get('screen.patientcnv.results.table.length')}
        </Tooltip>
      ),
      key: 'length',
      dataIndex: 'svlen',
      render: (length: number) => length,
    },
    {
      title: (
        <Tooltip title={intl.get('screen.patientcnv.results.table.copy_number.tooltip')}>
          {intl.get('screen.patientcnv.results.table.copy_number')}
        </Tooltip>
      ),
      key: 'cn',
      dataIndex: 'cn',
      render: (cn: number) => cn,
    },
    {
      title: (
        <Tooltip title={intl.get('screen.patientcnv.results.table.number_genes.tooltip')}>
          {intl.get('screen.patientcnv.results.table.number_genes')}
        </Tooltip>
      ),
      key: 'number_genes',
      dataIndex: 'number_genes',
      render: (number_genes: number) => number_genes,
    },
    {
      title: (
        <Tooltip title={intl.get('screen.patientcnv.results.table.dragen_filter.tooltip')}>
          {intl.get('screen.patientcnv.results.table.dragen_filter')}
        </Tooltip>
      ),
      key: 'filter',
      dataIndex: 'filters',
      render: (filters: string[]) => filters.join(', '),
    },
    {
      title: (
        <Tooltip title={intl.get('screen.patientcnv.results.table.segment_mean.tooltip')}>
          {intl.get('screen.patientcnv.results.table.segment_mean')}
        </Tooltip>
      ),
      key: 'sm',
      dataIndex: 'sm',
      render: (sm: string) => sm,
    },
    {
      title: (
        <Tooltip title={intl.get('screen.patientcnv.results.table.bins_count.tooltip')}>
          {intl.get('screen.patientcnv.results.table.bins_count')}
        </Tooltip>
      ),
      key: 'bc',
      dataIndex: 'bc',
      render: (bc: string) => bc,
    },
    {
      title: (
        <Tooltip title={intl.get('screen.patientcnv.results.table.paired_end.tooltip')}>
          {intl.get('screen.patientcnv.results.table.paired_end')}
        </Tooltip>
      ),
      key: 'pe',
      dataIndex: 'pe',
      render: (pe: string[]) => pe.join(', '),
    },
  ];
  return columns;
};
