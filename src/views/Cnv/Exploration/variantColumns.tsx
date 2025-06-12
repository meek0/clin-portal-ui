/* eslint-disable max-len */
import { Key } from 'react';
import ReactDOMServer from 'react-dom/server';
import intl from 'react-intl-universal';
import { FilterFilled, FlagOutlined, MessageOutlined } from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { removeUnderscoreAndCapitalize } from '@ferlab/ui/core/utils/stringUtils';
import { Button, Space, Tag, Tooltip, Typography } from 'antd';
import cx from 'classnames';
import { FrequencyEntity, ITableVariantEntity, VariantEntity } from 'graphql/cnv/models';
import { INDEXES } from 'graphql/constants';
import { VariantType } from 'graphql/variants/models';
import { PrescriptionEntityTabs } from 'views/Prescriptions/Entity';
import {
  VariantSection,
  VariantSectionKey,
} from 'views/Prescriptions/Entity/Tabs/Variants/components/VariantSectionNav';
import FlagCell from 'views/Snv/Exploration/components/Flag/FlagCell';
import FlagFilterDropdown from 'views/Snv/Exploration/components/Flag/FlagFilter';
import GnomadCell from 'views/Snv/Exploration/components/Gnomad/GnomadCell';
import NoteCell from 'views/Snv/Exploration/components/Note/NoteCell';
import NoteFilter from 'views/Snv/Exploration/components/Note/NoteFilter';
import { getQueryBuilderID } from 'views/Snv/utils/constant';

import ExternalLinkIcon from 'components/icons/ExternalLinkIcon';
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

export const renderGnomADSFToString = (variant: any) => {
  const gnomad = variant.cluster?.external_frequencies?.gnomad_exomes_4?.sf;
  if (!gnomad && gnomad !== 0) return TABLE_EMPTY_PLACE_HOLDER;
  return gnomad.toExponential(2).toString();
};

export type TVariantFilter = { flags: string[]; note: string[]; interpretation?: string[] };
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
  history?: any,
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
      width: 62,
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
              className={style.actionButton}
              icon={<LineStyleIcon />}
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
    {
      title: intl.get('screen.variantDetails.summaryTab.summaryTable.cytoband'),
      key: 'location',
      width: 160,
      render: (variant: VariantEntity) => {
        const values = [
          ...new Set(
            variant.genes.hits.edges
              .slice(0, 3)
              .map((gene) => gene.node.location)
              .filter((location) => location),
          ),
        ];

        return variant.genes.hits.edges.some((gene) => gene.node.symbol) && values.length > 0 ? (
          <a
            onClick={(e) => {
              e.preventDefault();
              openGenesModal(variant);
            }}
          >
            {values.join(', ')}
            {values.length > 3 ? '...' : ''}
          </a>
        ) : (
          <>{TABLE_EMPTY_PLACE_HOLDER}</>
        );
      },
    },
  );

  if (variantSection === VariantSection.CNV) {
    columns.push({
      title: intl.get('screen.variantDetails.summaryTab.summaryTable.snvsCount'),
      key: 'snv_count',
      tooltip: intl.get('screen.variantDetails.summaryTab.summaryTable.snvsCount.tooltip'),
      width: 160,
      sorter: { multiple: 1 },
      render: (variant: VariantEntity) => {
        const handleRedirection = (
          record: VariantEntity,
          target: VariantSection,
          { replace, location }: any,
        ) => {
          const queryBuilderId = getQueryBuilderID(target);
          addQuery({
            queryBuilderId,
            query: generateQuery({
              newFilters: [
                generateValueFilter({
                  field: 'start',
                  value: [record.start.toString(), record.end.toString()],
                  index: INDEXES.VARIANT,
                  operator: 'between',
                }),
                generateValueFilter({
                  field: 'chromosome',
                  value: [record.chromosome],
                  index: INDEXES.VARIANT,
                }),
              ],
            }),
            setAsActive: true,
          });
          replace({
            ...location,
            hash: PrescriptionEntityTabs.VARIANTS,
            search: `?${new URLSearchParams({
              [VariantSectionKey]: target,
            }).toString()}`,
          });
        };

        return variant.snv_count ? (
          <Typography.Link>
            <a
              id={'cnv'}
              onClick={() =>
                handleRedirection(
                  variant,
                  variantType === VariantType.GERMLINE ? VariantSection.SNV : VariantSection.SNVTO,
                  history,
                )
              }
            >
              {variant.snv_count}
            </a>
          </Typography.Link>
        ) : (
          '0'
        );
      },
    });
  }

  columns.push(
    {
      title: intl.get('screen.patientcnv.results.table.variant'),
      key: 'name',
      dataIndex: 'name',
      sorter: { multiple: 1 },
      className: cx(style.variantTableCell, style.variantTableCellElipsis),
      render: (name: string, variant: VariantEntity) => {
        const value = name.split(':').slice(1).join(':');
        const link = `https://franklin.genoox.com/clinical-db/variant/sv/chr${variant.chromosome}-${
          variant.start
        }-${variant.end}-${variant.type === 'GAIN' ? 'DUP' : 'DEL'}-HG38`;
        return (
          <Tooltip placement="topLeft" title={value}>
            <ExternalLink href={link}>{value}</ExternalLink>
          </Tooltip>
        );
      },
      width: 200,
    },
    {
      title: intl.get('screen.patientcnv.results.table.clingen'),
      key: 'clinGen',
      render: (variant: VariantEntity) => (
        <ExternalLink
          className={style.dbsnpLink}
          href={`https://search.clinicalgenome.org/kb/regions?page=1&type=${variant.genome_build}&region=chr${variant.chromosome}%3A${variant.start}-${variant.end}&size=25&search=`}
        >
          <ExternalLinkIcon />
        </ExternalLink>
      ),
      width: 70,
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

  columns.push(
    {
      title: intl.get('screen.variantsearch.table.gnomAd'),
      tooltip: intl.get('screen.patientcnv.results.table.gnomad.tooltip'),
      key: 'cluster.external_frequencies.gnomad_exomes_4.sf',
      sorter: { multiple: 1 },
      render: (variant: VariantEntity) => {
        const gnomAd = variant?.cluster?.external_frequencies?.gnomad_exomes_4?.sf;
        if (!gnomAd && gnomAd !== 0) return TABLE_EMPTY_PLACE_HOLDER;
        return (
          <Space direction="horizontal">
            <GnomadCell underOnePercent={gnomAd < 0.01} />
            <span>{gnomAd.toExponential(2)}</span>
          </Space>
        );
      },
      width: 98,
    },
    {
      title: intl.get('screen.variantsearch.table.gnomAdAlt'),
      tooltip: intl.get('screen.patientcnv.results.table.gnomadAlt.tooltip'),
      key: 'cluster.external_frequencies.gnomad_exomes_4.sc',
      sorter: { multiple: 1 },
      render: (variant: VariantEntity) => {
        const gnomAd = variant?.cluster?.external_frequencies?.gnomad_exomes_4?.sc;
        return gnomAd ? formatNumber(gnomAd) : TABLE_EMPTY_PLACE_HOLDER;
      },
      width: 120,
    },
  );

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
  );

  if (variantSection === VariantSection.CNVTO) {
    columns.push({
      title: intl.get('screen.variantDetails.summaryTab.summaryTable.snvsCount'),
      tooltip: intl.get('screen.variantDetails.summaryTab.summaryTable.snvsCount.tooltip'),
      key: 'snv_count',
      width: 160,
      sorter: { multiple: 1 },
      render: (variant: VariantEntity) => {
        const handleRedirection = (
          record: VariantEntity,
          target: VariantSection,
          { replace, location }: any,
        ) => {
          const queryBuilderId = getQueryBuilderID(target);
          addQuery({
            queryBuilderId,
            query: generateQuery({
              newFilters: [
                generateValueFilter({
                  field: 'start',
                  value: [record.start.toString(), record.end.toString()],
                  index: INDEXES.VARIANT,
                  operator: 'between',
                }),
                generateValueFilter({
                  field: 'chromosome',
                  value: [record.chromosome],
                  index: INDEXES.VARIANT,
                }),
              ],
            }),
            setAsActive: true,
          });
          replace({
            ...location,
            hash: PrescriptionEntityTabs.VARIANTS,
            search: `?${new URLSearchParams({
              [VariantSectionKey]: target,
            }).toString()}`,
          });
        };

        return variant.snv_count ? (
          <Typography.Link>
            <a
              id={'cnv'}
              onClick={() =>
                handleRedirection(
                  variant,
                  variantType === VariantType.GERMLINE ? VariantSection.SNV : VariantSection.SNVTO,
                  history,
                )
              }
            >
              {variant.snv_count}
            </a>
          </Typography.Link>
        ) : (
          '0'
        );
      },
    });
  }

  columns.push(
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
  } else if (key === 'location') {
    const genesSymbol = variant.genes?.hits?.edges?.map((gene) => gene.node.location).join(', ');
    return genesSymbol;
  }
  return <></>;
};
export const renderFlagToString = (variant: any) => {
  const flags = variant?.flags;
  return flags && flags.length > 0 ? flags?.join(',') : TABLE_EMPTY_PLACE_HOLDER;
};
