import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { removeUnderscoreAndCapitalize } from '@ferlab/ui/core/utils/stringUtils';
import { Space, Tooltip } from 'antd';
import cx from 'classnames';
import { ArrangerEdge, ArrangerResultsTree } from 'graphql/models';
import {
  ClinVar,
  Consequence,
  DonorsEntity,
  ExternalFrequenciesEntity,
  frequency_RQDMEntity,
  ITableVariantEntity,
  VariantEntity,
  Varsome,
  VarsomeClassifications,
} from 'graphql/variants/models';
import { capitalize } from 'lodash';
import ConsequencesCell from 'views/Variants/components/ConsequencesCell';

import UserAffectedIcon from 'components/icons/UserAffectedIcon';
import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';

import { getDonor } from '../components/OccurrenceDrawer';
import { HcComplementDescription } from '../components/OccurrenceDrawer/HcDescription';

import AcmgVerdict from './components/AcmgVerdict';

import style from './variantColumns.module.scss';

const findDonorById = (donors: ArrangerResultsTree<DonorsEntity>, patientId: string) =>
  donors.hits?.edges.find((donor) => donor.node.patient_id === patientId);

const formatCalls = (calls: number[]) => (calls ? calls.join('/') : TABLE_EMPTY_PLACE_HOLDER);

const formatRqdm = (rqdm: frequency_RQDMEntity) => {
  if (!rqdm?.total?.pc) {
    return TABLE_EMPTY_PLACE_HOLDER;
  }
  return `${rqdm.total.pc} / ${rqdm.total.pn} (${(rqdm.total.pf * 100).toPrecision(3)}%)`;
};

const getAcmgRuleContent = (varsome: Varsome) =>
  varsome
    ? varsome.acmg.classifications.hits.edges
        .map((e: ArrangerEdge<VarsomeClassifications>) => e.node.name)
        .reduce((prev, curr) => `${prev}, ${curr}`)
    : TABLE_EMPTY_PLACE_HOLDER;

export const getVariantColumns = (
  patientId?: string,
  drawerCb?: (record: VariantEntity) => void,
): ProColumnType<ITableVariantEntity>[] => {
  const columns: ProColumnType<ITableVariantEntity>[] = [
    {
      title: intl.get('screen.patientvariant.results.table.variant'),
      key: 'hgvsg',
      dataIndex: 'hgvsg',
      className: cx(style.variantTableCell, style.variantTableCellElipsis),
      render: (hgvsg: string, entity: VariantEntity) =>
        hgvsg ? (
          <Tooltip placement="topLeft" title={hgvsg}>
            <Link target="_blank" to={`/variant/entity/${entity.locus}`}>
              {hgvsg}
            </Link>
          </Tooltip>
        ) : (
          TABLE_EMPTY_PLACE_HOLDER
        ),
    },
    {
      key: 'variant_class',
      title: intl.get('screen.patientvariant.results.table.type'),
      dataIndex: 'variant_class',
      render: (variant: string) =>
        variant ? intl.get(variant).defaultMessage(capitalize(variant)) : TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      key: 'rsnumber',
      title: intl.get('screen.patientvariant.results.table.dbsnp'),
      dataIndex: 'rsnumber',
      className: style.dbSnpTableCell,
      render: (rsNumber: string) =>
        rsNumber ? (
          <ExternalLink href={`https://www.ncbi.nlm.nih.gov/snp/${rsNumber}`}>
            {rsNumber}
          </ExternalLink>
        ) : (
          TABLE_EMPTY_PLACE_HOLDER
        ),
    },
    {
      key: 'consequences',
      title: intl.get('screen.patientvariant.results.table.consequence'),
      dataIndex: 'consequences',
      width: 300,
      render: (consequences: { hits: { edges: Consequence[] } }) => (
        <ConsequencesCell consequences={consequences?.hits?.edges || []} />
      ),
    },
    {
      key: 'clinvar',
      title: intl.get('screen.patientvariant.results.table.clinvar'),
      dataIndex: 'clinvar',
      className: cx(style.variantTableCell, style.variantTableCellElipsis),
      render: (clinVar: ClinVar) =>
        clinVar?.clin_sig && clinVar.clinvar_id ? (
          <ExternalLink
            href={`https://www.ncbi.nlm.nih.gov/clinvar/variation/${clinVar.clinvar_id}`}
          >
            {clinVar.clin_sig.join(', ')}
          </ExternalLink>
        ) : (
          TABLE_EMPTY_PLACE_HOLDER
        ),
    },
    {
      key: 'acmgVerdict',
      displayTitle: intl.get('screen.patientvariant.results.table.acmgVerdict'),
      title: (
        <Tooltip title={intl.get('screen.patientvariant.results.table.acmgVerdict.tooltip')}>
          {intl.get('screen.patientvariant.results.table.acmgVerdict')}
        </Tooltip>
      ),
      dataIndex: 'rsnumber',
      className: cx(style.variantTableCell, style.variantTableCellElipsis),
      render: (rsnumber: string, entity: VariantEntity) => {
        const varsome: Varsome | undefined = entity.varsome;
        return (
          <AcmgVerdict
            verdict={varsome?.acmg.verdict.verdict}
            externalId={varsome ? varsome.variant_id : rsnumber}
          />
        );
      },
    },
    {
      key: 'external_frequencies',
      title: (
        <Tooltip title="Gnomad Exomes">{intl.get('screen.variantsearch.table.gnomAd')}</Tooltip>
      ),
      displayTitle: intl.get('screen.variantsearch.table.gnomAd'),
      dataIndex: 'external_frequencies',
      render: (external_frequencies: ExternalFrequenciesEntity) =>
        external_frequencies.gnomad_exomes_2_1_1
          ? external_frequencies.gnomad_exomes_2_1_1.af.toExponential(3)
          : TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      key: 'rqdm',
      title: intl.get('screen.patientvariant.results.table.rqdm'),
      className: style.rqdmCell,
      render: (record: VariantEntity) => formatRqdm(record.frequency_RQDM),
    },
  ];

  if (!patientId) {
    columns.push({
      key: 'acmgrules',
      title: intl.get('screen.patientvariant.results.table.acmgRules'),
      dataIndex: 'varsome',
      defaultHidden: true,
      className: cx(style.variantTableCell, style.variantTableCellElipsis),
      render: (varsome: Varsome) => getAcmgRuleContent(varsome),
    });
  }

  if (patientId) {
    columns.push(
      {
        key: 'donors_zygosity',
        title: intl.get('screen.patientvariant.results.table.zygosity'),
        dataIndex: 'donors',
        render: (record: ArrangerResultsTree<DonorsEntity>) => {
          const donor = findDonorById(record, patientId);
          return donor ? donor.node?.zygosity : TABLE_EMPTY_PLACE_HOLDER;
        },
      },
      {
        className: style.userAffectedBtnCell,
        key: 'actions',
        title: intl.get('screen.patientvariant.results.table.actions'),
        displayTitle: 'Information',
        render: (record: VariantEntity) => (
          <Space>
            <UserAffectedIcon
              onClick={() => drawerCb && drawerCb(record)}
              width="16"
              height="16"
              className={style.affectedIcon}
            />
          </Space>
        ),
        align: 'center',
      },
      {
        key: 'acmgrules',
        title: intl.get('screen.patientvariant.results.table.acmgRules'),
        dataIndex: 'varsome',
        className: cx(style.variantTableCell, style.variantTableCellElipsis),
        defaultHidden: true,
        render: (varsome: Varsome) => getAcmgRuleContent(varsome),
      },
      {
        key: 'donors_genotype',
        title: intl.get('screen.patientvariant.results.table.genotype'),
        dataIndex: 'donors',
        defaultHidden: true,
        render: (record: ArrangerResultsTree<DonorsEntity>) => {
          const donor = findDonorById(record, patientId);
          const motherCalls = formatCalls(donor?.node.mother_calls!);
          const fatherCalls = formatCalls(donor?.node.father_calls!);

          return `${motherCalls} : ${fatherCalls}`;
        },
      },
      {
        key: 'hc',
        title: intl.get('screen.patientvariant.results.table.hc'),
        defaultHidden: true,
        render: (record: VariantEntity) => (
          <HcComplementDescription
            hcComplements={getDonor(patientId, record)?.hc_complement}
            defaultText={TABLE_EMPTY_PLACE_HOLDER}
            wrap={false}
            size={0}
          />
        ),
      },
      {
        key: 'hcp',
        title: intl.get('screen.patientvariant.results.table.hcp'),
        defaultHidden: true,
        render: (record: VariantEntity) => (
          <HcComplementDescription
            hcComplements={getDonor(patientId, record)?.possibly_hc_complement}
            defaultText={TABLE_EMPTY_PLACE_HOLDER}
            wrap={false}
            size={0}
          />
        ),
      },
      {
        key: 'transmission',
        title: intl.get('screen.patientvariant.results.table.transmission'),
        defaultHidden: true,
        render: (record: VariantEntity) =>
          removeUnderscoreAndCapitalize(
            getDonor(patientId, record)?.transmission! || '',
          ).defaultMessage(TABLE_EMPTY_PLACE_HOLDER),
      },
      {
        key: 'op',
        title: intl.get('screen.patientvariant.results.table.parentalOrigin'),
        defaultHidden: true,
        render: (record: VariantEntity) => {
          const donor = getDonor(patientId, record);
          return donor?.parental_origin
            ? capitalize(intl.get(donor?.parental_origin))
            : TABLE_EMPTY_PLACE_HOLDER;
        },
      },
      {
        key: 'alt',
        title: intl.get('screen.patientvariant.results.table.altprof'),
        defaultHidden: true,
        render: (record: VariantEntity) =>
          getDonor(patientId, record)?.ad_alt ?? TABLE_EMPTY_PLACE_HOLDER,
      },
      {
        key: 'alttotal',
        title: intl.get('screen.patientvariant.results.table.alttotal'),
        defaultHidden: true,
        render: (record: VariantEntity) =>
          getDonor(patientId, record)?.ad_total ?? TABLE_EMPTY_PLACE_HOLDER,
      },
      {
        key: 'altratio',
        title: intl.get('screen.patientvariant.results.table.altratio'),
        defaultHidden: true,
        render: (record: VariantEntity) =>
          (getDonor(patientId, record)?.ad_ratio ?? 0).toFixed(2) ?? TABLE_EMPTY_PLACE_HOLDER,
      },
      {
        key: 'gq',
        title: intl.get('screen.patientvariant.results.table.gq'),
        defaultHidden: true,
        render: (record: VariantEntity) =>
          getDonor(patientId, record)?.gq ?? TABLE_EMPTY_PLACE_HOLDER,
      },
      {
        key: 'filter',
        title: intl.get('screen.patientvariant.results.table.filter'),
        defaultHidden: true,
        render: (record: VariantEntity) =>
          getDonor(patientId, record)?.filters ?? TABLE_EMPTY_PLACE_HOLDER,
      },
    );
  }

  return columns;
};
