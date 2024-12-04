import { Key } from 'react';
import ReactDOMServer from 'react-dom/server';
import intl from 'react-intl-universal';
import { FilterFilled, FlagOutlined, MessageOutlined } from '@ant-design/icons';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { removeUnderscoreAndCapitalize } from '@ferlab/ui/core/utils/stringUtils';
import { Button, Space, Tag, Tooltip, Typography } from 'antd';
import cx from 'classnames';
import { FrequencyEntity, ITableVariantEntity, VariantEntity } from 'graphql/cnv/models';
import { VariantType } from 'graphql/variants/models';
import { VariantSection } from 'views/Prescriptions/Entity/Tabs/Variants/components/VariantSectionNav';
import FlagCell from 'views/Snv/Exploration/components/Flag/FlagCell';
import FlagFilterDropdown from 'views/Snv/Exploration/components/Flag/FlagFilter';
import NoteCell from 'views/Snv/Exploration/components/Note/NoteCell';
import NoteFilter from 'views/Snv/Exploration/components/Note/NoteFilter';

import LineStyleIcon from 'components/icons/LineStyleIcon';
import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';
import EnvironmentVariables from 'utils/EnvVariables';
import { formatFilters } from 'utils/formatFilters';
import { formatGenotype } from 'utils/formatGenotype';
import { formatDnaLength, formatNumber } from 'utils/formatNumber';

import style from './variantColumns.module.css';

export const renderTransmissionToString = ({ transmission }: VariantEntity) =>
  transmission
    ? intl.get(`transmission.abbrev.${transmission}`).defaultMessage(transmission)
    : TABLE_EMPTY_PLACE_HOLDER;

export const renderPOToString = ({ parental_origin }: VariantEntity) =>
  parental_origin
    ? intl.get(`filters.options.donors.parental_origin.${parental_origin}.abrv`)
    : TABLE_EMPTY_PLACE_HOLDER;

export type TVariantFilter = { flags: string[]; note: string[] };
export const renderRQDMPfToString = ({ frequency_RQDM }: VariantEntity) =>
  frequency_RQDM ? frequency_RQDM.pf.toExponential(2) : TABLE_EMPTY_PLACE_HOLDER;

export const getVariantColumns = (
  variantType: VariantType,
  openGenesModal: (record: VariantEntity) => void,
  igvModalCb?: (record: VariantEntity) => void,
  noData: boolean = false,
  variantSection?: string,
  isSameLDM?: boolean,
  isClear?: boolean,
  setFilterList?: (columnKeys: Key[], filter: string) => void,
  filtersList?: TVariantFilter,
  onlyExportTSV: boolean = false,
): ProColumnType<ITableVariantEntity>[] => {
  const columns: ProColumnType<ITableVariantEntity>[] = [];

  if (EnvironmentVariables.configFor('SHOW_FLAGS') === 'true' && isSameLDM) {
    columns.push({
      key: 'flags',
      fixed: 'left',
      title: intl.get('screen.patientsnv.results.table.flag'),
      dataIndex: 'flags',
      tooltip: intl.get('flag.table.tooltip'),
      iconTitle: <FlagOutlined />,
      width: 85,
      filterIcon: () => {
        const isFilter = filtersList && filtersList.flags.length > 0 ? true : false;
        return <FilterFilled className={isFilter ? style.activeFilter : style.unActiveFilter} />;
      },
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <FlagFilterDropdown
          confirm={confirm}
          selectedKeys={selectedKeys}
          setFilterList={setFilterList}
          setSelectedKeys={setSelectedKeys}
          isClear={isClear}
          selectedFilter={filtersList?.flags}
        />
      ),
      render: (flags: string[], entity: VariantEntity) => (
        <FlagCell options={!flags ? [] : flags} hash={entity.hash} variantType="cnv" />
      ),
    });
    columns.push({
      key: 'note',
      fixed: 'left',
      title: intl.get('screen.patientsnv.results.table.note'),
      dataIndex: 'note',
      tooltip: intl.get('note.table.tooltip'),
      iconTitle: <MessageOutlined />,
      filterIcon: () => {
        const isFilter = filtersList && filtersList.note.length > 0 ? true : false;
        return <FilterFilled className={isFilter ? style.activeFilter : style.unActiveFilter} />;
      },
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <NoteFilter
          confirm={confirm}
          selectedKeys={selectedKeys}
          setFilterList={setFilterList}
          setSelectedKeys={setSelectedKeys}
          isClear={isClear}
          selectedFilter={filtersList?.note}
        />
      ),
      width: 55,
      render: (note: string, entity: VariantEntity) => (
        <NoteCell note={note} hash={entity.hash} variantType="cnv" />
      ),
    });
  }
  columns.push(
    {
      className: noData
        ? `${style.fixedVariantTableCellNoData} ${style.userAffectedBtnCell}`
        : style.userAffectedBtnCell,
      key: 'actions',
      title: intl.get('screen.patientsnv.results.table.actions'),
      fixed: 'left',
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
      width: 70,
    },
    {
      title: intl.get('screen.patientcnv.results.table.genes'),
      tooltip: intl.get('screen.patientcnv.results.table.genes.tooltip'),
      key: 'genes',
      dataIndex: 'number_genes',
      width: 160,
      render: (number_genes: number, variant: VariantEntity) =>
        variant.genes.hits.edges.some((gene) => gene.node.symbol) ? (
          <a
            onClick={(e) => {
              e.preventDefault();
              openGenesModal(variant);
            }}
            data-cy={`openGenesModal_${variant.name.split(':').slice(1).join(':')}`}
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
  );

  columns.push(
    {
      title: intl.get('screen.patientcnv.results.table.variant'),
      key: 'name',
      dataIndex: 'name',
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
      width: 200,
    },
    {
      title: intl.get('screen.patientcnv.results.table.chromosome'),
      tooltip: intl.get('screen.patientcnv.results.table.chromosome.tooltip'),
      key: 'chromosome',
      dataIndex: 'sort_chromosome',
      sorter: { multiple: 1 },
      render: (sort_chromosome: number, variant: VariantEntity) => variant.chromosome,
      width: 60,
    },
    {
      title: intl.get('screen.patientcnv.results.table.start'),
      key: 'start',
      dataIndex: 'start',
      sorter: { multiple: 1 },
      render: (start: number) => (start ? formatNumber(start) : TABLE_EMPTY_PLACE_HOLDER),
      width: 110,
    },
    {
      title: intl.get('screen.patientcnv.results.table.end'),
      key: 'end',
      dataIndex: 'end',
      sorter: { multiple: 1 },
      render: (end: number) => (end ? formatNumber(end) : TABLE_EMPTY_PLACE_HOLDER),
      width: 110,
    },
    {
      title: intl.get('screen.patientcnv.results.table.event'),
      key: 'type',
      dataIndex: 'type',
      sorter: { multiple: 1 },
      render: (type: string) => type,
      width: 100,
    },
    {
      title: intl.get('screen.patientcnv.results.table.length'),
      tooltip: intl.get('screen.patientcnv.results.table.length.tooltip'),
      key: 'reflen',
      dataIndex: 'reflen',
      render: (length: number) => formatDnaLength(length),
      sorter: { multiple: 1 },
      width: 100,
    },
    {
      title: intl.get('screen.patientcnv.results.table.segment_mean'),
      tooltip: intl.get('screen.patientcnv.results.table.segment_mean.tooltip'),
      key: 'sm',
      dataIndex: 'sm',
      sorter: { multiple: 1 },
      defaultHidden: variantSection === VariantSection.CNV,
      render: (sm: string) => sm,
      width: 75,
    },
  );

  if (variantSection === VariantSection.CNV) {
    columns.push({
      title: intl.get('screen.patientcnv.results.table.copy_number'),
      tooltip: intl.get('screen.patientcnv.results.table.copy_number.tooltip'),
      key: 'cn',
      dataIndex: 'cn',
      sorter: { multiple: 1 },
      render: (cn: number) => cn,
      width: 60,
    });
  }

  if (onlyExportTSV) {
    columns.push({
      key: 'frequency_RQDM.pc',
      title: intl.get('screen.patientsnv.results.table.rqdm'),
      defaultHidden: true,
    });
  }
  columns.push(
    {
      title: intl.get('screen.patientcnv.results.table.rqdm'),
      tooltip: intl.get('screen.patientcnv.results.table.rqdm.tooltip'),
      key: 'frequency_RQDM.pf',
      sorter: { multiple: 1 },
      dataIndex: 'frequency_RQDM',
      render: (frequency_RQDM: FrequencyEntity) =>
        frequency_RQDM?.pc ? (
          <Space size={4}>
            {frequency_RQDM.pc}
            <Typography.Text>({frequency_RQDM.pf.toExponential(2)})</Typography.Text>
          </Space>
        ) : (
          TABLE_EMPTY_PLACE_HOLDER
        ),
      width: 100,
    },
    {
      title: intl.get('screen.patientcnv.results.table.number_genes'),
      tooltip: intl.get('screen.patientcnv.results.table.number_genes.tooltip'),
      key: 'number_genes',
      dataIndex: 'number_genes',
      width: 85,
      sorter: { multiple: 1 },
      render: (number_genes: number, variant: VariantEntity) =>
        number_genes !== 0 ? (
          <a
            onClick={(e) => {
              e.preventDefault();
              openGenesModal(variant);
            }}
          >
            {number_genes}
          </a>
        ) : (
          <>{number_genes}</>
        ),
    },
    {
      title: intl.get('screen.patientcnv.results.table.genotype'),
      tooltip: intl.get('screen.patientcnv.results.table.genotype.tooltip'),
      key: 'calls',
      dataIndex: 'calls',
      defaultHidden: true,
      render: (calls: number[], variant: VariantEntity) => renderCNVByKey('calls', variant),
      width: 40,
    },
    {
      title: intl.get('screen.patientcnv.results.table.dragen_filter'),
      tooltip: intl.get('screen.patientcnv.results.table.dragen_filter.tooltip'),
      key: 'filter',
      dataIndex: 'filters',
      defaultHidden: true,
      render: (filters: string[]) => formatFilters(filters),
      width: 70,
    },
    {
      title: intl.get('screen.patientcnv.results.table.quality'),
      tooltip: intl.get('screen.patientcnv.results.table.quality.tooltip'),
      key: 'qual',
      dataIndex: 'qual',
      sorter: { multiple: 1 },
      defaultHidden: true,
      render: (qual: number) => qual,
      width: 65,
    },
    {
      title: intl.get('screen.patientcnv.results.table.bins_count'),
      tooltip: intl.get('screen.patientcnv.results.table.bins_count.tooltip'),
      key: 'bc',
      dataIndex: 'bc',
      defaultHidden: true,
      sorter: { multiple: 1 },
      render: (bc: string) => bc,
      width: 50,
    },
    {
      title: intl.get('screen.patientcnv.results.table.paired_end'),
      tooltip: intl.get('screen.patientcnv.results.table.paired_end.tooltip'),
      key: 'pe',
      dataIndex: 'pe',
      defaultHidden: true,
      render: (pe: string[]) => pe?.join(', ') || TABLE_EMPTY_PLACE_HOLDER,
      width: 50,
    },
    {
      title: intl.get('screen.patientcnv.results.table.transmission'),
      tooltip: intl.get('screen.patientcnv.results.table.transmission.tooltip'),
      key: 'transmission',
      dataIndex: 'transmission',
      defaultHidden: true,
      sorter: { multiple: 1 },
      render: (transmission: string) => {
        const value = transmission ? removeUnderscoreAndCapitalize(transmission) : '';
        return transmission ? (
          <Tooltip title={value}>
            <Tag color="blue">
              {intl.get(`transmission.abbrev.${transmission}`).defaultMessage(value)}
            </Tag>
          </Tooltip>
        ) : (
          TABLE_EMPTY_PLACE_HOLDER
        );
      },
      width: 70,
    },
    {
      title: intl.get('screen.patientcnv.results.table.parental_origin'),
      tooltip: intl.get('screen.patientcnv.results.table.parental_origin.tooltip'),
      key: 'parental_origin',
      sorter: { multiple: 1 },
      dataIndex: 'parental_origin',
      defaultHidden: true,
      render: (parental_origin: string) =>
        parental_origin ? (
          <Tooltip
            title={intl
              .get(`filters.options.donors.parental_origin.${parental_origin}`)
              .defaultMessage(removeUnderscoreAndCapitalize(parental_origin || ''))}
          >
            <Tag color="blue">
              {intl.get(`filters.options.donors.parental_origin.${parental_origin}.abrv`)}
            </Tag>
          </Tooltip>
        ) : (
          TABLE_EMPTY_PLACE_HOLDER
        ),
      width: 70,
    },
  );
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
  } else if (key === 'genes') {
    const genesSymbol = variant.genes?.hits?.edges?.map((gene) => gene.node.symbol).join(', ');
    return genesSymbol;
  }
  return <></>;
};
export const renderFlagToString = (variant: any) => {
  const flags = variant?.flags;
  return flags && flags.length > 0 ? flags?.join(',') : TABLE_EMPTY_PLACE_HOLDER;
};
