/* eslint-disable complexity */
import { Key } from 'react';
import ReactDOMServer from 'react-dom/server';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import {
  FilterFilled,
  FireFilled,
  FireOutlined,
  FlagOutlined,
  MessageOutlined,
  PlusOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import {
  addQuery,
  getQueryBuilderState,
} from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { RangeOperators } from '@ferlab/ui/core/data/sqon/operators';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { removeUnderscoreAndCapitalize } from '@ferlab/ui/core/utils/stringUtils';
import { Space, Tag, Tooltip, Typography } from 'antd';
import { INDEXES } from 'graphql/constants';
import { ArrangerResultsTree } from 'graphql/models';
import {
  BoundType,
  ClinVar,
  DonorsEntity,
  ExternalFrequenciesEntity,
  Gene,
  ITableVariantEntity,
  VariantEntity,
  VariantType,
} from 'graphql/variants/models';
import { findDonorById } from 'graphql/variants/selector';
import { capitalize } from 'lodash';
import { v4 } from 'uuid';
import {
  TChangeInterpretationList,
  TInterpretationList,
  TVariantFilter,
} from 'views/Cnv/Exploration/variantColumns';
import { PrescriptionEntityTabs } from 'views/Prescriptions/Entity';
import { EMPTY_FIELD } from 'views/Prescriptions/Entity/constants';
import {
  VariantSection,
  VariantSectionKey,
} from 'views/Prescriptions/Entity/Tabs/Variants/components/VariantSectionNav';
import ConsequencesCell from 'views/Snv/components/ConsequencesCell';

import ExternalLinkIcon from 'components/icons/ExternalLinkIcon';
import { TABLE_EMPTY_PLACE_HOLDER, TABLE_ND_PLACE_HOLDER } from 'utils/constants';
import EnvironmentVariables from 'utils/EnvVariables';
import { formatFilters } from 'utils/formatFilters';
import { formatGenotype } from 'utils/formatGenotype';
import { formatNumber } from 'utils/formatNumber';

import GqLine from '../components/GQLine';
import { HcComplementDescription } from '../components/OccurenceVariant/HcDescription';
import { TAB_ID } from '../Entity';
import { getQueryBuilderID, ZygosityValue } from '../utils/constant';

import FlagCell from './components/Flag/FlagCell';
import FlagFilterDropdown from './components/Flag/FlagFilter';
import GnomadCell from './components/Gnomad/GnomadCell';
import InterpretationCell from './components/InterpretationCell/InterpretationCell';
import InterpretationFilter from './components/InterpretationCell/InterpretationFilter';
import ManeCell from './components/ManeCell';
import NoteCell from './components/Note/NoteCell';
import NoteFilter from './components/Note/NoteFilter';

import style from './variantColumns.module.css';

export const ClinvarColorMap: Record<any, string> = {
  affects: 'default',
  association: 'default',
  association_not_found: 'default',
  benign: 'green',
  confers_sensitivity: 'default',
  conflicting_classifications_of_pathogenicity: 'volcano',
  conflicting_interpretations_of_pathogenicity: 'orange',
  drug_response: 'default',
  likely_benign: 'lime',
  likely_pathogenic: 'volcano',
  likely_risk_allele: 'default',
  low_penetrance: 'default',
  not_provided: 'default',
  no_classification_for_the_single_variant: 'default',
  other: 'default',
  pathogenic: 'red',
  protective: 'default',
  risk_factor: 'default',
  uncertain_risk_allele: 'default',
  uncertain_significance: 'orange',
};

export const ACMGExoColorMap: Record<any, string> = {
  BENIGN: 'green',
  LIKELY_BENIGN: 'lime',
  UNCERTAIN_SIGNIFICANCE: 'orange',
  PATHOGENIC: 'red',
  LIKELY_PATHOGENIC: 'volcano',
};

export const ACMGFranklinColorMap: Record<any, string> = {
  BENIGN: 'green',
  LIKELY_BENIGN: 'lime',
  UNCERTAIN_SIGNIFICANCE: 'orange',
  PATHOGENIC: 'red',
  LIKELY_PATHOGENIC: 'volcano',
  POSSIBLY_PATHOGENIC_MODERATE: 'orange',
  POSSIBLY_PATHOGENIC_BENIGN: 'orange',
  POSSIBLY_PATHOGENIC_LOW: 'orange',
  POSSIBLY_BENIGN: 'orange',
};

const ACMGExomiserColorMap: Record<any, string> = {
  PATHOGENIC: 'red',
  LIKELY_PATHOGENIC: 'volcano',
  UNCERTAIN_SIGNIFICANCE: 'orange',
  LIKELY_BENIGN: 'lime',
  BENIGN: 'green',
};

export const CmcTierColorMap: Record<any, string> = {
  1: 'red',
  2: 'volcano',
  3: 'orange',
  Other: 'default',
};

const formatRqdm = (rqdm: BoundType, variant: VariantEntity) => {
  if (!rqdm?.pc && rqdm?.pc !== 0) {
    return TABLE_EMPTY_PLACE_HOLDER;
  }
  return (
    <Space size={4}>
      <Link to={`/variant/entity/${variant.locus}/${TAB_ID.PATIENTS}`}>{rqdm.pc}</Link>
      <Typography.Text>({(rqdm?.pf || 0.0).toExponential(2)})</Typography.Text>
    </Space>
  );
};

const displayParentalOrigin = (parental_origin: string) =>
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
  );

const getDonorQd = (patientId: string) => ({
  key: 'donors.qd',
  title: intl.get('qd'),
  tooltip: intl.get('qd.tooltip'),
  defaultHidden: true,
  width: 70,
  render: (record: VariantEntity) =>
    renderDonorByKey('donors.qd', findDonorById(record.donors, patientId)),
});

const getDonorsFranklinScore = (patientId: string) => ({
  key: 'donors.franklin_combined_score',
  title: intl.get('franklin.donors.combined_score.title'),
  tooltip: intl.get('franklin.donors.combined_score.tooltip'),
  width: 70,
  sorter: {
    multiple: 1,
  },
  render: (record: VariantEntity) =>
    renderDonorByKey('donors.franklin_combined_score', findDonorById(record.donors, patientId)),
});

const getFranklinScore = () => ({
  key: 'franklin_max.combined_score',
  title: intl.get('franklin.combined_score.title'),
  tooltip: intl.get('franklin.combined_score.tooltip'),
  className: `${style.variantTableHeaderCellNowrap}`,
  width: 80,
  sorter: {
    multiple: 1,
  },
  defaultHidden: true,
  render: (record: VariantEntity) =>
    record?.franklin_max?.acmg_evidence
      ? record.franklin_max.combined_score.toExponential(2)
      : TABLE_EMPTY_PLACE_HOLDER,
});

const getFranklinAcmgClassification = () => ({
  key: 'franklin_max.acmg_classification',
  title: intl.get('franklin.acmg_classification.title'),
  tooltip: intl.get('franklin.acmg_classification.tooltip'),
  width: 90,
  sorter: {
    multiple: 1,
  },
  render: (record: VariantEntity) =>
    renderFranklinAcmg_Classification(
      record?.franklin_max?.acmg_classification,
      record?.franklin_max?.link,
      record?.locus,
    ),
});

const getFranklinAcmgEvidence = (patientId?: string) => ({
  key: 'franklin_max.acmg_evidence',
  title: intl.get('franklin.acmg_evidence.title'),
  tooltip: intl.get('franklin.acmg_evidence.tooltip'),
  width: 100,
  defaultHidden: !!patientId,
  render: (record: VariantEntity) =>
    renderFranklinAcmg_evidence(record?.franklin_max?.acmg_evidence),
});

const getExomiserScore = () => ({
  key: 'exomiser_max.gene_combined_score',
  title: intl.get('exomiser_max.combined_score.title'),
  tooltip: intl.get('exomiser_max.combined_score.tooltip'),
  width: 90,
  sorter: {
    multiple: 1,
  },
  defaultHidden: true,
  render: (record: VariantEntity) =>
    record?.exomiser_max?.gene_combined_score
      ? record.exomiser_max.gene_combined_score.toFixed(3)
      : TABLE_EMPTY_PLACE_HOLDER,
});

const getExomiserAcmgClassification = () => ({
  key: 'exomiser_max.acmg_classification',
  title: intl.get('exomiser_max.acmg_classification.title'),
  tooltip: intl.get('exomiser_max.acmg_classification.tooltip'),
  width: 90,
  sorter: {
    multiple: 1,
  },
  render: (record: VariantEntity) =>
    renderExomiserAcmg_Classification(record?.exomiser_max?.acmg_classification),
});

const getDonorZygosity = (patientId: string) => ({
  key: 'donors.zygosity',
  title: intl.get('screen.patientsnv.results.table.zygosity'),
  tooltip: intl.get('donor.zygosity.tooltip'),
  dataIndex: 'donors',
  width: 60,
  sorter: {
    multiple: 1,
  },
  render: (record: ArrangerResultsTree<DonorsEntity>) =>
    renderDonorByKey('donors.zygosity', findDonorById(record, patientId)) as string,
});

const getCmcSampleMutatedCol = (variantType: VariantType, patientId?: string) => ({
  key: 'cmc.sample_mutated',
  title: intl.get('screen.patientsnv.results.table.cmc'),
  tooltip: intl.get('screen.patientsnv.results.table.cmc.tooltip'),
  width: 150,
  defaultHidden: patientId && variantType !== VariantType.SOMATIC ? true : false,
  sorter: {
    multiple: 1,
  },
  render: (record: VariantEntity) =>
    record.cmc ? (
      <Space size={4}>
        <a
          href={`https://cancer.sanger.ac.uk/cosmic/search?q=${record.cmc.cosmic_id}&genome=38#`}
          target="_blank"
          rel="noreferrer"
        >
          {record.cmc.sample_mutated}
        </a>
        <Typography.Text>({record.cmc.sample_ratio.toExponential(2)})</Typography.Text>
      </Space>
    ) : (
      TABLE_EMPTY_PLACE_HOLDER
    ),
});

const getHotspotCol = () => ({
  key: 'hotspot',
  title: intl.get('screen.variantsearch.table.hotspot'),
  tooltip: `${intl.get('screen.variantsearch.table.hotspot.tooltip')}`,
  iconTitle: <FireOutlined />,
  sorter: {
    multiple: 1,
  },
  width: 50,
  render: (record: VariantEntity) => {
    if (record.hotspot === true) {
      return <FireFilled className={style.hotspotFilled} />;
    } else if (record.hotspot === false) {
      return <FireOutlined className={style.hotspotOutlined} />;
    }
    return TABLE_EMPTY_PLACE_HOLDER;
  },
});
const getCmcTier = (variantType: VariantType) => ({
  key: 'cmc.tier',
  title: intl.get('screen.patientsnv.results.table.cmc_tier'),
  tooltip: intl.get('screen.patientsnv.results.table.cmc_tier.tooltip'),
  width: 70,
  defaultHidden: variantType !== VariantType.SOMATIC ? true : false,
  sorter: {
    multiple: 1,
  },
  render: (record: VariantEntity) => (
    <Tag color={record.cmc?.tier ? CmcTierColorMap[record.cmc.tier] : 'default'}>
      <ExternalLink
        href={`https://franklin.genoox.com/clinical-db/variant/snpTumor/chr${record.locus}-hg38`}
      >
        {intl.get(
          record.cmc?.tier
            ? `filters.options.cmc.tier.${record.cmc.tier}`
            : 'filters.options.cmc.tier.null',
        )}
      </ExternalLink>
    </Tag>
  ),
});

export const getVariantColumns = (
  queryBuilderId: string,
  variantType: VariantType,
  patientId?: string,
  onlyExportTSV: boolean = false,
  noData: boolean = false,
  variantSection?: VariantSection,
  isSameLDM?: boolean,
  isClear?: boolean,
  setFilterList?: (columnKeys: Key[]) => void,
  filtersList?: TVariantFilter,
  interpretationList?: TInterpretationList,
  changeInterpretationList?: TChangeInterpretationList,
  history?: any,
): ProColumnType<ITableVariantEntity>[] => {
  let columns: ProColumnType<ITableVariantEntity>[] = [];

  const cnvCountQueries = (record: VariantEntity, donor?: DonorsEntity) => {
    const handleRedirection = (
      record: VariantEntity,
      target: VariantSection,
      { replace, location }: any,
    ) => {
      const queryBuilderId = getQueryBuilderID(target);
      const queryBuilderState = getQueryBuilderState(queryBuilderId);
      const getnbCnvQueries = () => {
        if (queryBuilderState && queryBuilderState.state && queryBuilderState.state.length > 0) {
          if (
            queryBuilderState.state?.[queryBuilderState.state.length - 1]?.content?.length === 0 // check if empty query
          ) {
            return queryBuilderState.state.length - 1;
          }
          return queryBuilderState.state.length;
        }
        return 0;
      };
      addQuery({
        queryBuilderId,
        query: generateQuery({
          newFilters: [
            generateValueFilter({
              field: 'chromosome',
              value: [record.chromosome],
              index: INDEXES.VARIANT,
            }),
            generateValueFilter({
              field: 'start',
              value: [record.start.toString()],
              index: INDEXES.VARIANT,
              operator: RangeOperators['<='],
            }),
          ],
        }),
        setAsActive: true,
      });
      addQuery({
        queryBuilderId,
        query: generateQuery({
          newFilters: [
            generateValueFilter({
              field: 'chromosome',
              value: [record.chromosome],
              index: INDEXES.VARIANT,
            }),
            generateValueFilter({
              field: 'end',
              value: [record.start.toString()],
              index: INDEXES.VARIANT,
              operator: RangeOperators['>='],
            }),
          ],
        }),
        setAsActive: true,
      });
      addQuery({
        queryBuilderId,
        query: {
          content: [getnbCnvQueries(), getnbCnvQueries() + 1],
          id: v4(),
          op: 'and',
        },
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

    return donor?.cnv_count ? (
      <Typography.Link>
        <a
          onClick={() =>
            handleRedirection(
              record,
              variantType === VariantType.GERMLINE ? VariantSection.CNV : VariantSection.CNVTO,
              history,
            )
          }
        >
          {donor?.cnv_count}
        </a>
      </Typography.Link>
    ) : (
      '0'
    );
  };

  if (patientId && isSameLDM) {
    if (EnvironmentVariables.configFor('SHOW_FLAGS') === 'true') {
      columns.push({
        key: 'flags',
        fixed: 'left',
        title: intl.get('screen.patientsnv.results.table.flag'),
        dataIndex: 'flags',
        tooltip: intl.get('flag.table.tooltip'),
        iconTitle: <FlagOutlined />,
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
        width: 65,
        render: (flags: string[], entity: VariantEntity) => (
          <FlagCell options={!flags ? [] : flags} hash={entity.hash} variantType="snv" />
        ),
      });
    }
    columns.push(
      {
        key: 'note',
        fixed: 'left',
        title: intl.get('screen.patientsnv.results.table.note'),
        dataIndex: 'note',
        tooltip: intl.get('note.table.tooltip'),
        iconTitle: <MessageOutlined />,
        filterIcon: () => {
          const isFilter = filtersList && filtersList.note.length > 0;
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
          <NoteCell note={note} hash={entity.hash} variantType="snv" />
        ),
      },
      {
        key: 'interpretation',
        fixed: 'left',
        title: intl.get('interpretation_Cell.tooltip_column'),
        dataIndex: 'interpretation',
        tooltip: intl.get('interpretation_Cell.tooltip_column'),
        iconTitle: <ThunderboltOutlined />,
        filterIcon: () => {
          const isFilter =
            filtersList && filtersList.interpretation && filtersList.interpretation.length > 0;
          return <FilterFilled className={isFilter ? style.activeFilter : style.unActiveFilter} />;
        },
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
          <InterpretationFilter
            confirm={confirm}
            selectedKeys={selectedKeys}
            setFilterList={setFilterList}
            setSelectedKeys={setSelectedKeys}
            isClear={isClear}
            selectedFilter={filtersList?.interpretation}
          />
        ),
        width: 55,
        render: (interpretation: string, entity: VariantEntity) => (
          <InterpretationCell
            record={entity}
            variantSection={variantSection}
            interpretationList={interpretationList}
            changeInterpretationList={changeInterpretationList}
          />
        ),
      },
    );
  }

  columns = [
    ...columns,
    {
      title: intl.get('screen.patientsnv.results.table.variant'),
      key: 'hgvsg',
      dataIndex: 'hgvsg',
      className: noData
        ? `${style.fixedVariantTableCellNoData} ${style.fixedVariantTableCellElipsis}`
        : style.fixedVariantTableCellElipsis,
      fixed: 'left',
      sorter: {
        multiple: 1,
      },
      render: (hgvsg: string, entity: VariantEntity) =>
        hgvsg ? (
          <Tooltip placement="topLeft" title={hgvsg}>
            <div>
              <Link target="_blank" to={`/variant/entity/${entity.locus}/${TAB_ID.SUMMARY}`}>
                {hgvsg}
              </Link>
            </div>
          </Tooltip>
        ) : (
          TABLE_EMPTY_PLACE_HOLDER
        ),
      width: 100,
    },
    {
      key: 'variant_class',
      title: intl.get('screen.patientsnv.results.table.type'),
      dataIndex: 'variant_class',
      sorter: {
        multiple: 1,
      },
      width: 65,
      render: (variant: string) =>
        variant ? (
          <Tooltip
            title={intl
              .get(`type.abrv.${variant.toLowerCase()}.tooltip`)
              .defaultMessage(capitalize(variant))}
          >
            {intl.get(`type.abrv.${variant.toLowerCase()}`).defaultMessage(capitalize(variant))}
          </Tooltip>
        ) : (
          TABLE_EMPTY_PLACE_HOLDER
        ),
    },
  ];

  if (patientId && variantType === VariantType.SOMATIC) {
    columns.push({
      key: 'donors.all_analyses',
      title: intl.get('screen.patientsnv.results.table.bioinfo_analysis_code'),
      tooltip: intl.get('bioinfo_analysis_code.tooltip'),
      width: 90,
      render: (record: VariantEntity) =>
        renderDonorByKey('donors.all_analyses', findDonorById(record.donors, patientId)),
    });
  }

  columns.push(
    {
      key: 'rsnumber',
      title: intl.get('screen.patientsnv.results.table.dbsnp'),
      dataIndex: 'rsnumber',
      className: style.dbSnpTableCell,
      width: 60,
      render: (rsNumber: string) =>
        rsNumber ? (
          <ExternalLink
            className={style.dbsnpLink}
            href={`https://www.ncbi.nlm.nih.gov/snp/${rsNumber}`}
          >
            <ExternalLinkIcon />
          </ExternalLink>
        ) : (
          TABLE_EMPTY_PLACE_HOLDER
        ),
    },
    {
      title: intl.get('screen.patientsnv.results.table.gene'),
      key: 'gene',
      width: 100,
      sorter: {
        multiple: 1,
      },
      render: (variant: {
        genes: { hits: { edges: Gene[] } };
        consequences: VariantEntity['consequences'];
      }) => {
        const { genes, consequences } = variant;
        const pickedConsequence = consequences?.hits?.edges.find(({ node }) => !!node.picked);
        const geneSymbol = pickedConsequence?.node.symbol;
        const geneInfo = genes.hits.edges.find(({ node }) => node.symbol === geneSymbol);
        if (geneSymbol) {
          return (
            <Space size={4} direction="horizontal" className={style.addGene}>
              <ExternalLink
                hasIcon={false}
                href={
                  geneInfo?.node?.omim_gene_id
                    ? `https://www.omim.org/entry/${geneInfo.node.omim_gene_id}`
                    : // eslint-disable-next-line max-len
                      `https://www.omim.org/search?index=entry&start=1&limit=10&sort=score+desc%2C+prefix_sort+desc&search=${geneSymbol}`
                }
              >
                {geneSymbol}
              </ExternalLink>
              <div
                className={style.addGeneButton}
                onClick={() => {
                  addQuery({
                    queryBuilderId,
                    query: generateQuery({
                      newFilters: [
                        generateValueFilter({
                          field: 'consequences.symbol',
                          value: [geneSymbol],
                          index: INDEXES.VARIANT,
                        }),
                      ],
                    }),
                    setAsActive: true,
                  });
                }}
              >
                <PlusOutlined />
              </div>
            </Space>
          );
        } else {
          return TABLE_EMPTY_PLACE_HOLDER;
        }
      },
    },
    {
      key: 'consequence',
      title: intl.get('screen.patientsnv.results.table.consequence'),
      tooltip: intl.get('screen.patientsnv.results.table.consequence.tooltip'),
      dataIndex: 'consequences',
      width: 225,
      render: (consequences: VariantEntity['consequences']) => {
        const pickedConsequence = consequences?.hits?.edges.find(({ node }) => !!node.picked);
        return <ConsequencesCell consequences={pickedConsequence ? [pickedConsequence] : []} />;
      },
    },
    {
      key: 'MANE',
      title: intl.get('screen.patientsnv.results.table.mane'),
      dataIndex: 'consequences',
      width: 80,
      render: (consequences: VariantEntity['consequences']) => {
        const pickedConsequence = consequences?.hits?.edges.find(({ node }) => !!node.picked);
        return pickedConsequence ? (
          <ManeCell consequence={pickedConsequence} />
        ) : (
          TABLE_EMPTY_PLACE_HOLDER
        );
      },
    },
    {
      key: 'omim',
      title: intl.get('screen.patientsnv.results.table.omim'),
      tooltip: intl.get('screen.patientsnv.results.table.omim.tooltip'),
      width: 95,
      render: (variant: {
        genes: { hits: { edges: Gene[] } };
        consequences: VariantEntity['consequences'];
      }) => {
        const pickedConsequenceSymbol = variant.consequences?.hits.edges.find(
          ({ node }) => !!node.picked,
        )?.node.symbol;
        return renderOmim(variant, pickedConsequenceSymbol);
      },
    },
    {
      key: 'clinvar',
      title: intl.get('screen.patientsnv.results.table.clinvar'),
      width: 92,
      render: (variant: { clinvar: ClinVar; locus: string }) =>
        renderClinvar(variant.clinvar, variant.locus),
    },
  );
  if (patientId && variantType === VariantType.SOMATIC) {
    columns.push(
      { ...getHotspotCol() },
      { ...getCmcTier(variantType) },
      { ...getCmcSampleMutatedCol(variantType, patientId) },
    );
    if (onlyExportTSV) {
      columns.push({
        key: 'cmc.sample_ratio',
        title: intl.get('screen.patientsnv.results.table.cmc'),
        defaultHidden: true,
      });
    }
  }

  if (patientId && variantType !== VariantType.SOMATIC) {
    columns.push(
      { ...getDonorsFranklinScore(patientId) },
      {
        key: 'donors.exomiser.gene_combined_score',
        title: intl.get('screen.patientsnv.results.table.gene_combined_score'),
        tooltip: intl.get('screen.patientsnv.results.table.gene_combined_score.tooltip'),
        width: 59,
        sorter: {
          multiple: 1,
        },
        render: (record: VariantEntity) =>
          renderDonorByKey(
            'donors.exomiser.gene_combined_score',
            findDonorById(record.donors, patientId),
          ),
      },
      { ...getFranklinAcmgClassification() },
      {
        key: 'donors.exomiser.acmg_classification',
        title: intl.get('screen.patientsnv.results.table.acmg_classification'),
        tooltip: intl.get('screen.patientsnv.results.table.acmg_classification.tooltip'),
        width: 90,
        sorter: {
          multiple: 1,
        },
        render: (record: VariantEntity) =>
          renderAcmgExo(findDonorById(record.donors, patientId)?.exomiser?.acmg_classification),
      },
    );
  }
  columns.push(
    {
      key: 'external_frequencies.gnomad_joint_4.af',
      title: intl.get('screen.variantsearch.table.gnomAd'),
      tooltip: `${intl.get('screen.variantsearch.table.gnomAd.tooltip')}`,
      dataIndex: 'external_frequencies',
      sorter: {
        multiple: 1,
      },
      width: 98,
      render: (external_frequencies: ExternalFrequenciesEntity) => {
        const af = external_frequencies.gnomad_joint_4?.af;

        if (!af && af !== 0) return TABLE_EMPTY_PLACE_HOLDER;
        return (
          <Space direction="horizontal">
            <GnomadCell underOnePercent={af < 0.01} />
            <span>{af.toExponential(2)}</span>
          </Space>
        );
      },
    },
    {
      key: 'external_frequencies.gnomad_joint_4.ac',
      title: intl.get('screen.variantsearch.table.gnomAdAlt'),
      tooltip: `${intl.get('screen.variantsearch.table.gnomAdAlt.tooltip')}`,
      dataIndex: 'external_frequencies',
      defaultHidden: patientId && variantType !== VariantType.GERMLINE ? true : false,
      sorter: {
        multiple: 1,
      },
      width: 120,
      render: (external_frequencies: ExternalFrequenciesEntity) => {
        const ac = external_frequencies.gnomad_joint_4?.ac;
        return !ac && ac !== 0 ? TABLE_EMPTY_PLACE_HOLDER : formatNumber(ac);
      },
    },
  );

  if (onlyExportTSV) {
    columns.push({
      key: 'frequency_RQDM.total.pc',
      title: intl.get('screen.patientsnv.results.table.rqdm'),
      defaultHidden: true,
    });
  }
  columns.push({
    key: 'frequency_RQDM.total.pf',
    title: intl.get('screen.patientsnv.results.table.rqdm'),
    tooltip: intl.get('screen.variantDetails.summaryTab.patientTable.patient.tootltip'),
    className: style.rqdmCell,
    sorter: {
      multiple: 1,
    },
    width: 120,
    render: (record: VariantEntity) => formatRqdm(record.frequency_RQDM.total, record),
  });

  if (patientId) {
    if (variantType === VariantType.GERMLINE) {
      columns.push(
        {
          key: 'donors.gq',
          title: intl.get('screen.patientsnv.results.table.gq'),
          tooltip: intl.get('gq.tooltip'),
          width: 59,
          sorter: {
            multiple: 1,
          },
          render: (record: VariantEntity) =>
            renderDonorByKey('donors.gq', findDonorById(record.donors, patientId)),
        },
        {
          title: intl.get('screen.patientsnv.results.table.cnvCount'),
          tooltip: intl.get('screen.patientsnv.results.table.cnvCount.tooltip'),
          key: 'donors.cnv_count',
          width: 160,
          sorter: { multiple: 1 },
          render: (record: VariantEntity) => {
            const donor = findDonorById(record.donors, patientId);
            return cnvCountQueries(record, donor);
          },
        },
        {
          ...getDonorZygosity(patientId),
        },
        {
          key: 'donors_genotype',
          title: intl.get('screen.patientsnv.results.table.genotype'),
          tooltip: intl.get('screen.patientsnv.results.table.genotype.tooltip'),
          dataIndex: 'donors',
          defaultHidden: true,
          width: 80,
          render: (record: ArrangerResultsTree<DonorsEntity>) =>
            renderDonorByKey('donors_genotype', findDonorById(record, patientId)),
        },
        {
          key: 'ch',
          title: intl.get('screen.patientsnv.results.table.ch'),
          tooltip: intl.get('ch.tooltip'),
          defaultHidden: true,
          width: 200,
          render: (record: VariantEntity) => {
            const donor = findDonorById(record.donors, patientId);
            return (
              <HcComplementDescription
                hcComplements={donor?.hc_complement}
                defaultText={TABLE_EMPTY_PLACE_HOLDER}
                wrap={false}
                size={0}
                locus={record.locus}
              />
            );
          },
        },
        {
          key: 'pch',
          title: intl.get('screen.patientsnv.results.table.pch'),
          tooltip: intl.get('pch.tooltip'),
          defaultHidden: true,
          width: 220,
          render: (record: VariantEntity) =>
            renderDonorByKey('pch', findDonorById(record.donors, patientId)),
        },
        {
          key: 'donors.transmission',
          title: intl.get('screen.patientsnv.results.table.transmission'),
          tooltip: intl.get('screen.patientsnv.results.table.transmission.tooltip'),
          defaultHidden: true,
          width: 80,
          sorter: {
            multiple: 1,
          },
          render: (record: VariantEntity) =>
            renderDonorByKey('donors.transmission', findDonorById(record.donors, patientId)),
        },
        {
          ...getDonorQd(patientId),
          sorter: {
            multiple: 1,
          },
        },
        {
          key: 'donors.parental_origin',
          title: intl.get('po'),
          tooltip: intl.get('parental.origin'),
          defaultHidden: true,
          width: 80,
          sorter: {
            multiple: 1,
          },
          render: (record: VariantEntity) =>
            renderDonorByKey('donors.parental_origin', findDonorById(record.donors, patientId)),
        },
      );
    } else if (variantType === VariantType.SOMATIC) {
      if (variantSection === VariantSection.SNVTO) {
        columns.push({
          key: 'freq_rqdm_tumor_only.pc',
          title: intl.get('screen.patientsnv.results.table.rqdm.TO'),
          tooltip: intl.get('screen.patientsnv.results.table.rqdm.TO.tooltip'),
          width: 120,
          sorter: {
            multiple: 1,
          },
          render: (record: VariantEntity) => formatRqdm(record.freq_rqdm_tumor_only, record),
        });
        if (onlyExportTSV) {
          columns.push({
            key: 'freq_rqdm_tumor_only.pf',
            title: intl.get('screen.patientsnv.results.table.rqdm.TO'),
            defaultHidden: true,
          });
        }
      }
      if (variantSection === VariantSection.SNVTN) {
        columns.push({
          key: 'freq_rqdm_tumor_normal.pc',
          title: intl.get('screen.patientsnv.results.table.rqdm.TN'),
          tooltip: intl.get('screen.patientsnv.results.table.rqdm.TN.tooltip'),
          width: 120,
          sorter: {
            multiple: 1,
          },
          render: (record: VariantEntity) => formatRqdm(record.freq_rqdm_tumor_normal, record),
        });
        if (onlyExportTSV) {
          columns.push({
            key: 'freq_rqdm_tumor_normal.pf',
            title: intl.get('screen.patientsnv.results.table.rqdm.TN'),
            defaultHidden: true,
          });
        }
      }
      columns.push({
        key: 'donors.sq',
        title: intl.get('screen.patientsnv.results.table.sq'),
        tooltip: intl.get('sq.tooltip'),
        width: 59,
        sorter: {
          multiple: 1,
        },
        render: (record: VariantEntity) =>
          renderDonorByKey('donors.sq', findDonorById(record.donors, patientId)),
      });

      if (variantSection === VariantSection.SNVTO) {
        columns.push({
          title: intl.get('screen.patientsnv.results.table.cnvCount'),
          tooltip: intl.get('screen.patientsnv.results.table.cnvCount.tooltip'),
          key: 'donors.cnv_count',
          width: 160,
          sorter: { multiple: 1 },
          render: (record: VariantEntity) => {
            const donor = findDonorById(record.donors, patientId);
            return cnvCountQueries(record, donor);
          },
        });
      }
      columns.push(
        {
          ...getDonorZygosity(patientId),
          sorter: {
            multiple: 1,
          },
        },
        {
          ...getDonorQd(patientId),
          sorter: {
            multiple: 1,
          },
        },
      );
    }

    columns.push(
      {
        key: 'donors.ad_alt',
        title: intl.get('screen.patientsnv.results.table.altprof'),
        tooltip: intl.get('screen.patientsnv.results.table.altprof.tooltip'),
        defaultHidden: true,
        width: 65,
        sorter: {
          multiple: 1,
        },
        render: (record: VariantEntity) =>
          renderDonorByKey('donors.ad_alt', findDonorById(record.donors, patientId)),
      },
      {
        key: 'donors.ad_total',
        title: intl.get('screen.patientsnv.results.table.alttotal'),
        tooltip: intl.get('screen.patientsnv.results.table.alttotal.tooltip'),
        defaultHidden: true,
        width: 65,
        sorter: {
          multiple: 1,
        },
        render: (record: VariantEntity) =>
          renderDonorByKey('donors.ad_total', findDonorById(record.donors, patientId)),
      },
      {
        key: 'donors.ad_ratio',
        title: intl.get('screen.patientsnv.results.table.altratio'),
        tooltip: intl.get('screen.patientsnv.results.table.altratio.tooltip'),
        defaultHidden: true,
        width: 85,
        sorter: {
          multiple: 1,
        },
        render: (record: VariantEntity) =>
          renderDonorByKey('donors.ad_ratio', findDonorById(record.donors, patientId)),
      },
      {
        key: 'donors.filters',
        title: intl.get('screen.patientsnv.results.table.filter'),
        tooltip: intl.get('screen.variantDetails.patientsTab.filter.tooltip'),
        defaultHidden: true,
        width: 160,
        sorter: {
          multiple: 1,
        },
        render: (record: VariantEntity) =>
          renderDonorByKey('donors.filters', findDonorById(record.donors, patientId)),
      },
    );
  }
  if (variantType !== VariantType.SOMATIC) {
    if (patientId) {
      columns.push({
        key: 'donors.exomiser.acmg_evidence',
        title: intl.get('screen.patientsnv.results.table.acmg_evidence'),
        tooltip: intl.get('screen.patientsnv.results.table.acmg_evidence.tooltip'),
        width: 150,
        defaultHidden: true,
        render: (record: VariantEntity) =>
          renderDonorByKey(
            'donors.exomiser.acmg_evidence',
            findDonorById(record.donors, patientId),
          ),
      });
    }
    columns.push({ ...getCmcSampleMutatedCol(variantType, patientId) });
    if (onlyExportTSV) {
      columns.push({
        key: 'cmc.sample_ratio',
        title: intl.get('screen.patientsnv.results.table.cmc'),
        defaultHidden: true,
      });
    }
    if (!patientId) {
      columns.push(
        {
          ...getHotspotCol(),
        },
        {
          key: 'exomiser_max.variant_score',
          title: intl.get('exomiser_max.table.title'),
          tooltip: intl.get('exomiser_max.table.tooltip'),
          width: 95,
          sorter: {
            multiple: 1,
          },
          render: (record: VariantEntity) =>
            record.exomiser_max?.variant_score
              ? record.exomiser_max?.variant_score
              : TABLE_EMPTY_PLACE_HOLDER,
        },
      );
    }
    columns.push({ ...getCmcTier(variantType) });
  }

  if (!patientId) {
    columns.push(
      { ...getFranklinScore() },
      { ...getExomiserScore() },
      { ...getFranklinAcmgClassification() },
      { ...getExomiserAcmgClassification() },
      { ...getFranklinAcmgEvidence(patientId) },
    );
  }

  columns.push(
    {
      key: 'consequences.predictions.cadd_phred',
      title: intl.get('screen.patientsnv.results.table.cadd_phred'),
      tooltip: intl.get('screen.patientsnv.results.table.cadd_phred.tooltip'),
      width: 70,
      defaultHidden: true,
      render: (record: VariantEntity) => {
        const pickedConsequenceSymbol = record.consequences?.hits.edges.find(
          ({ node }: any) => !!node.picked,
        );
        return pickedConsequenceSymbol?.node?.predictions?.cadd_phred
          ? pickedConsequenceSymbol.node.predictions.cadd_phred.toExponential(2)
          : TABLE_EMPTY_PLACE_HOLDER;
      },
    },
    {
      key: 'consequences.predictions.revel_score',
      title: intl.get('screen.patientsnv.results.table.revel_score'),
      tooltip: intl.get('screen.patientsnv.results.table.revel_score.tooltip'),
      width: 70,
      defaultHidden: true,
      render: (record: VariantEntity) => {
        const pickedConsequenceSymbol = record.consequences?.hits.edges.find(
          ({ node }: any) => !!node.picked,
        );
        return pickedConsequenceSymbol?.node?.predictions?.revel_score
          ? pickedConsequenceSymbol.node.predictions.revel_score.toExponential(2)
          : TABLE_EMPTY_PLACE_HOLDER;
      },
    },
  );
  if (patientId && variantType === VariantType.GERMLINE) {
    columns.push({ ...getFranklinAcmgEvidence(patientId) });
  }
  return columns;
};

const renderClinvar = (clinVar: ClinVar, locus?: string) => {
  const clinVarSigKey: string[] = [];

  clinVar?.clin_sig &&
    clinVar.clin_sig.map((c) => {
      clinVarSigKey.push(c.toLowerCase());
    });
  return clinVar?.clin_sig && clinVar.clinvar_id ? (
    clinVarSigKey.map((clinvarKey) => (
      <Tooltip key={clinvarKey} placement="topLeft" title={intl.get(`clinvar.${clinvarKey}`)}>
        <Tag color={ClinvarColorMap[clinvarKey]}>
          <ExternalLink
            href={`https://www.ncbi.nlm.nih.gov/clinvar/variation/${clinVar.clinvar_id}`}
          >
            {intl.get(`clinvar.abrv.${clinvarKey}`)}
          </ExternalLink>
        </Tag>
      </Tooltip>
    ))
  ) : (
    <Tooltip placement="topLeft" title={intl.get('no_data')}>
      <Tag>
        <ExternalLink href={`https://www.ncbi.nlm.nih.gov/clinvar/?term=${locus}`}>
          {TABLE_ND_PLACE_HOLDER}
        </ExternalLink>
      </Tag>
    </Tooltip>
  );
};

const renderAcmgExo = (acmg?: string) =>
  acmg ? (
    <Tooltip key={acmg} placement="topLeft" title={intl.get(`acmg.exomiser.${acmg.toLowerCase()}`)}>
      <Tag color={ACMGExoColorMap[acmg]}>
        {intl.get(`acmg.exomiser.abrv.${acmg.toLowerCase()}`)}
      </Tag>
    </Tooltip>
  ) : (
    <Tooltip placement="topLeft" title={intl.get('no_data')}>
      <Tag>{TABLE_ND_PLACE_HOLDER}</Tag>
    </Tooltip>
  );

const renderFranklinAcmg_Classification = (acmg?: string, link?: string, locus?: string) => {
  const value = link ? (
    <ExternalLink href={link}>{intl.get(`franklin.acmg_classification.abrv.${acmg}`)}</ExternalLink>
  ) : (
    intl.get(`franklin.acmg_classification.abrv.${acmg}`)
  );
  return acmg ? (
    <Tooltip
      title={intl
        .get(`franklin.acmg_classification.value.${acmg}`)
        .defaultMessage(removeUnderscoreAndCapitalize(acmg || ''))}
    >
      <Tag color={ACMGFranklinColorMap[acmg]}>{value}</Tag>
    </Tooltip>
  ) : (
    <Tooltip placement="topLeft" title={intl.get('no_data')}>
      <Tag>
        <ExternalLink href={`https://franklin.genoox.com/clinical-db/variant/snp/chr${locus}-HG38`}>
          {TABLE_ND_PLACE_HOLDER}
        </ExternalLink>
      </Tag>
    </Tooltip>
  );
};

const renderFranklinAcmg_evidence = (acmg?: string[]) =>
  acmg && acmg.length > 0 ? acmg.join(', ') : TABLE_EMPTY_PLACE_HOLDER;

const renderExomiserAcmg_Classification = (acmg?: string) =>
  acmg ? (
    <Tooltip
      title={intl
        .get(`exomiser_max.acmg_classification.value.${acmg}`)
        .defaultMessage(removeUnderscoreAndCapitalize(acmg || ''))}
    >
      <Tag color={ACMGExomiserColorMap[acmg]}>
        {intl.get(`exomiser_max.acmg_classification.abrv.${acmg}`)}
      </Tag>
    </Tooltip>
  ) : (
    <Tooltip placement="topLeft" title={intl.get('no_data')}>
      <Tag>{TABLE_ND_PLACE_HOLDER}</Tag>
    </Tooltip>
  );

export const renderToString = (element: any) => {
  if (typeof element === 'string' || typeof element === 'number') {
    return String(element);
  } else if (element) {
    return ReactDOMServer.renderToString(element);
  }
  return '';
};

export const renderCNVCountToString = (variant: any) => {
  const pickedConsequenceSymbol = variant.consequences?.hits.edges.find(
    ({ node }: any) => !!node.picked,
  )?.node.symbol;

  return renderToString(renderOmim(variant, pickedConsequenceSymbol));
};

export const renderOmimToString = (variant: any) => {
  const pickedConsequenceSymbol = variant.consequences?.hits.edges.find(
    ({ node }: any) => !!node.picked,
  )?.node.symbol;

  return renderToString(renderOmim(variant, pickedConsequenceSymbol));
};

export const renderInterpretationToString = (variant: any) => {
  const hasInterpretation = variant.interpretation;
  return hasInterpretation ? 'true' : 'false';
};

export const renderFranklinScoreToString = (variant: any) => {
  const score = variant?.franklin_max?.combined_score;
  if (!score && score !== 0) return TABLE_EMPTY_PLACE_HOLDER;
  return score.toExponential(2).toString();
};

export const renderExomiserScoreToString = (variant: any) => {
  const score = variant?.exomiser_max?.gene_combined_score;
  if (!score && score !== 0) return TABLE_EMPTY_PLACE_HOLDER;
  return score.toFixed(3).toString();
};

export const renderExomiserAcmg_ClassificationToString = (variant: any) => {
  const value = variant?.exomiser_max?.acmg_classification;
  if (value) {
    return renderToString(renderExomiserAcmg_Classification(value));
  }
  return EMPTY_FIELD;
};

export const renderFranklinAcmg_ClassificationToString = (variant: any) => {
  const value = variant?.franklin_max?.acmg_classification;
  if (value) {
    return renderToString(renderFranklinAcmg_Classification(value));
  }
  return EMPTY_FIELD;
};

export const renderFranklinAcmg_evidenceToString = (variant: any) => {
  const value = variant?.franklin_max?.acmg_evidence;
  return renderToString(renderFranklinAcmg_evidence(value));
};

export const renderClinvarToString = (variant: any) => {
  const clinvarList = renderClinvar(variant.clinvar);
  const clinvarStringList = [];
  if (Array.isArray(clinvarList)) {
    for (let i = 0; i < clinvarList.length; i++) {
      clinvarStringList.push(renderToString(clinvarList[i]));
    }
  } else {
    clinvarStringList.push(EMPTY_FIELD);
  }
  return clinvarStringList.join(',');
};
export const renderGeneToString = (variant: any) => {
  const pickedConsequence = variant.consequences?.hits?.edges?.find(
    ({ node }: any) => !!node.picked,
  )?.node;
  if (pickedConsequence?.symbol) {
    return pickedConsequence.symbol;
  }

  return TABLE_EMPTY_PLACE_HOLDER;
};

export const renderHotspotToString = (variant: any) => {
  const hotspot = variant.hotspot;
  if (hotspot === null) {
    return TABLE_EMPTY_PLACE_HOLDER;
  }
  return hotspot.toString();
};

export const renderGnomADAFToString = (variant: any) => {
  const af = variant.external_frequencies.gnomad_joint_4?.af;
  if (!af && af !== 0) return TABLE_EMPTY_PLACE_HOLDER;
  return af.toExponential(2).toString();
};
export const renderGnomADACToString = (variant: any) => {
  const ac = variant.external_frequencies.gnomad_joint_4?.ac;
  if (!ac && ac !== 0) return TABLE_EMPTY_PLACE_HOLDER;
  return ac.toString();
};

export const renderRQDMToString = (variant: any) => {
  const rqdm = variant?.frequency_RQDM?.total?.pf;
  if (!rqdm && rqdm !== 0) return TABLE_EMPTY_PLACE_HOLDER;
  return rqdm.toExponential(2).toString();
};
export const renderRQDMPCToString = (variant: any) => {
  const rqdm = variant?.frequency_RQDM?.total?.pc;
  if (!rqdm && rqdm !== 0) return TABLE_EMPTY_PLACE_HOLDER;
  return rqdm.toString();
};

export const renderRQDMTOToString = (variant: any) => {
  const rqdm = variant?.freq_rqdm_tumor_only?.pf;
  if (!rqdm && rqdm !== 0) return TABLE_EMPTY_PLACE_HOLDER;
  return rqdm.toExponential(2).toString();
};
export const renderRQDMTOPCToString = (variant: any) => {
  const rqdm = variant?.freq_rqdm_tumor_only?.pc;
  if (!rqdm && rqdm !== 0) return TABLE_EMPTY_PLACE_HOLDER;
  return rqdm.toString();
};

export const renderRQDMTNToString = (variant: any) => {
  const rqdm = variant?.freq_rqdm_tumor_normal?.pf;
  if (!rqdm && rqdm !== 0) return TABLE_EMPTY_PLACE_HOLDER;
  return rqdm.toExponential(2).toString();
};
export const renderRQDMTNPCToString = (variant: any) => {
  const rqdm = variant?.freq_rqdm_tumor_normal?.pc;
  if (!rqdm && rqdm !== 0) return TABLE_EMPTY_PLACE_HOLDER;
  return rqdm.toString();
};

export const renderManeToString = (variant: any) => {
  const pickedConsequence = variant.consequences?.hits.edges.find(
    ({ node }: any) => !!node.picked,
  )?.node;
  const { mane_select, canonical, mane_plus } = pickedConsequence;
  const value = [];
  if (canonical) {
    value.push(intl.get('screen.variantDetails.summaryTab.canonical'));
  }
  if (mane_select) {
    value.push(intl.get('screen.variantDetails.summaryTab.maneSelect'));
  }
  if (mane_plus) {
    value.push(intl.get('screen.variantDetails.summaryTab.manePlus'));
  }
  if (!pickedConsequence) {
    return TABLE_EMPTY_PLACE_HOLDER;
  }
  return value.join(',');
};

export const renderCaddPhredToString = (variant: any) => {
  const pickedConsequence = variant.consequences?.hits.edges.find(
    ({ node }: any) => !!node.picked,
  ).node;
  if (!pickedConsequence) {
    return TABLE_EMPTY_PLACE_HOLDER;
  }
  const { predictions } = pickedConsequence;
  return predictions?.cadd_phred
    ? predictions.cadd_phred.toExponential(2).toString()
    : TABLE_EMPTY_PLACE_HOLDER;
};

export const renderRevelScoreToString = (variant: any) => {
  const pickedConsequence = variant.consequences?.hits.edges.find(
    ({ node }: any) => !!node.picked,
  ).node;
  if (!pickedConsequence) {
    return TABLE_EMPTY_PLACE_HOLDER;
  }
  const { predictions } = pickedConsequence;
  return predictions?.revel_score
    ? predictions.revel_score.toExponential(2).toString()
    : TABLE_EMPTY_PLACE_HOLDER;
};

export const renderAllAnalysisToString = (key: string, donor?: DonorsEntity) => {
  const codes = donor?.all_analyses;
  return codes ? codes?.join(',') : TABLE_EMPTY_PLACE_HOLDER;
};

export const renderFlagToString = (variant: any) => {
  const flags = variant?.flags;
  return flags?.length > 0 ? flags?.join(',') : TABLE_EMPTY_PLACE_HOLDER;
};

export const renderDonorToString = (key: string, donor?: DonorsEntity) =>
  renderToString(renderDonorByKey(key, donor));

// eslint-disable-next-line complexity
const renderDonorByKey = (key: string, donor?: DonorsEntity) => {
  if (key === 'donors.gq') {
    return <GqLine value={donor?.gq} />;
  } else if (key === 'donors.sq') {
    return donor ? donor?.sq : TABLE_EMPTY_PLACE_HOLDER;
  } else if (key === 'donors.all_analyses') {
    const codes = donor?.all_analyses;
    return codes
      ? codes.map((code) => (
          <Tooltip
            key={code}
            title={intl
              .get(`type.abrv.all_analyses.${code}.tooltip`)
              .defaultMessage(capitalize(code))}
          >
            <Tag color={code === 'TN' ? 'red' : undefined}>{code}</Tag>
          </Tooltip>
        ))
      : TABLE_EMPTY_PLACE_HOLDER;
  } else if (key === 'donors.exomiser.gene_combined_score') {
    return donor?.exomiser?.gene_combined_score.toFixed(3) || TABLE_EMPTY_PLACE_HOLDER;
  } else if (key === 'donors.exomiser.acmg_evidence') {
    return (donor?.exomiser?.acmg_evidence || [TABLE_EMPTY_PLACE_HOLDER])?.join(', ');
  } else if (key === 'donors.exomiser.acmg_classification') {
    return removeUnderscoreAndCapitalize(
      donor?.exomiser?.acmg_classification.toLowerCase() || '',
    ).defaultMessage(TABLE_EMPTY_PLACE_HOLDER);
  } else if (key === 'donors.zygosity') {
    return donor && donor.zygosity ? ZygosityValue[donor.zygosity] : TABLE_EMPTY_PLACE_HOLDER;
  } else if (key === 'donors.franklin_combined_score') {
    return donor?.franklin_combined_score?.toFixed(2) || TABLE_EMPTY_PLACE_HOLDER;
  } else if (key === 'donors_genotype') {
    const motherCalls = formatGenotype(donor?.mother_calls!);
    const fatherCalls = formatGenotype(donor?.father_calls!);
    return `${motherCalls} : ${fatherCalls}`;
  } else if (key === 'ch') {
    return (
      <HcComplementDescription
        hcComplements={donor?.hc_complement}
        defaultText={TABLE_EMPTY_PLACE_HOLDER}
        wrap={false}
        size={0}
      />
    );
  } else if (key === 'pch') {
    return (
      <HcComplementDescription
        hcComplements={donor?.possibly_hc_complement}
        defaultText={TABLE_EMPTY_PLACE_HOLDER}
        wrap={false}
        size={0}
      />
    );
  } else if (key === 'donors.transmission') {
    const value = donor?.transmission ? removeUnderscoreAndCapitalize(donor.transmission) : '';
    return donor?.transmission ? (
      <Tooltip title={value}>
        <Tag color="blue">
          {intl.get(`transmission.abbrev.${donor.transmission}`).defaultMessage(value)}
        </Tag>
      </Tooltip>
    ) : (
      TABLE_EMPTY_PLACE_HOLDER
    );
  } else if (key === 'donors.qd') {
    const qd = donor?.qd;
    if (!qd && qd !== 0) return TABLE_EMPTY_PLACE_HOLDER;
    return qd;
  } else if (key === 'donors.parental_origin') {
    return donor ? displayParentalOrigin(donor?.parental_origin!) : TABLE_EMPTY_PLACE_HOLDER;
  } else if (key === 'donors.ad_alt') {
    return donor?.ad_alt ?? TABLE_EMPTY_PLACE_HOLDER;
  } else if (key === 'donors.ad_total') {
    return donor?.ad_total ?? TABLE_EMPTY_PLACE_HOLDER;
  } else if (key === 'donors.ad_ratio') {
    return (donor?.ad_ratio ?? 0).toFixed(2) ?? TABLE_EMPTY_PLACE_HOLDER;
  } else if (key === 'donors.filters') {
    return formatFilters(donor?.filters);
  } else if (key === 'donors.cnv_count') {
    return donor?.cnv_count ?? TABLE_EMPTY_PLACE_HOLDER;
  }
  return <></>;
};

const renderOmim = (
  variant: {
    genes: { hits: { edges: Gene[] } };
  },
  pickedConsequenceSymbol: string | undefined,
) => {
  const geneMatchingSymbol = variant.genes.hits.edges.find(
    (gene) => gene.node.symbol === pickedConsequenceSymbol,
  );
  const omimId = geneMatchingSymbol?.node.omim_gene_id;
  if (!omimId) return TABLE_EMPTY_PLACE_HOLDER;

  const omims = geneMatchingSymbol?.node.omim?.hits?.edges || [];
  const inheritance = omims
    .reduce<string[]>((prev, curr) => [...prev, ...(curr.node.inheritance_code || [])], [])
    .filter((item, pos, self) => self.indexOf(item) == pos);

  const omimLink = `https://www.omim.org/entry/${omimId}`;

  if (!inheritance.length) {
    const type = !omims.length ? 'NRP' : 'NRT';
    return (
      <Tooltip title={intl.get(`inheritant.code.${type}`)}>
        <ExternalLink href={omimLink}>{type}</ExternalLink>
      </Tooltip>
    );
  }
  return (
    <StackLayout horizontal>
      <Space size={4} className={style.variantSnvOmimCellItem}>
        {inheritance.length
          ? inheritance.map((code) => (
              <Tooltip key={code} title={intl.get(`inheritant.code.${code}`)}>
                <Tag color={code.includes('?') ? 'default' : 'blue'}>
                  <ExternalLink href={omimLink}>{code}</ExternalLink>
                </Tag>
              </Tooltip>
            ))
          : TABLE_EMPTY_PLACE_HOLDER}
      </Space>
    </StackLayout>
  );
};

/* {
      key: 'gene.pli',
      title: intl.get('screen.patientsnv.results.table.pli'),
      tooltip: `${intl.get('screen.patientsnv.results.table.pli.tooltip')}`,
      defaultHidden: true,
      width: 150,
      render: (variant: { genes: { hits: { edges: Gene[] } } }) => {
        const genesWithPli = variant.genes.hits.edges.filter((gene: Gene) => gene.node.gnomad);
        return genesWithPli.length ? (
          <ExpandableCell<Gene>
            dataSource={genesWithPli}
            nOfElementsWhenCollapsed={2}
            dictionnary={{
              'see.less': intl.get('see.less'),
              'see.more': intl.get('see.more'),
            }}
            renderItem={(item, id): React.ReactNode => (
              <StackLayout horizontal>
                <Space key={id} align="center" className={style.variantSnvOmimCellItem}>
                  <>
                    {genesWithPli.length > 1 && <div>{`${item.node.symbol} : `}</div>}
                    <ExternalLink
                      href={`https://gnomad.broadinstitute.org/gene/${item.node.ensembl_gene_id}?dataset=gnomad_r2_1`}
                    >
                      {item.node.gnomad.pli.toFixed(2)}
                    </ExternalLink>
                  </>
                </Space>
              </StackLayout>
            )}
          />
        ) : (
          'ND'
        );
      },
    },
    {
      key: 'gene.loeuf',
      title: intl.get('screen.patientsnv.results.table.loeuf'),
      tooltip: `${intl.get('screen.patientsnv.results.table.loeuf.tooltip')}`,
      defaultHidden: true,
      width: 150,
      render: (variant: { genes: { hits: { edges: Gene[] } } }) => {
        const genesWithloeuf = variant.genes.hits.edges.filter((gene: Gene) => gene.node.gnomad);
        return genesWithloeuf.length ? (
          <ExpandableCell<Gene>
            dataSource={genesWithloeuf}
            nOfElementsWhenCollapsed={2}
            dictionnary={{
              'see.less': intl.get('see.less'),
              'see.more': intl.get('see.more'),
            }}
            renderItem={(item, id): React.ReactNode => (
              <StackLayout horizontal>
                <Space key={id} align="center" className={style.variantSnvOmimCellItem}>
                  <>
                    {genesWithloeuf.length > 1 && <div>{`${item.node.symbol} : `}</div>}
                    <ExternalLink
                      href={`https://gnomad.broadinstitute.org/gene/${item.node.ensembl_gene_id}?dataset=gnomad_r2_1`}
                    >
                      {item.node.gnomad.loeuf.toFixed(2)}
                    </ExternalLink>
                  </>
                </Space>
              </StackLayout>
            )}
          />
        ) : (
          'ND'
        );
      },
    }, */
