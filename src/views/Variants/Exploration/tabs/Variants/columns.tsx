import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
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
import intl from 'react-intl-universal';
import cx from 'classnames';
import { Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';
import { capitalize } from 'lodash';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import ConsequencesCell from 'views/Variants/components/ConsequencesCell';
import { ArrangerEdge, ArrangerResultsTree } from 'graphql/models';

import style from './index.module.scss';
import UserAffectedIcon from 'components/icons/UserAffectedIcon';

const findDonorById = (donors: ArrangerResultsTree<DonorsEntity>, patientId: string) => {
  return donors.hits?.edges.find((donor) => donor.node.patient_id === patientId);
};

const formatCalls = (calls: number[]) => (calls ? calls.join('/') : TABLE_EMPTY_PLACE_HOLDER);

const formatRqdm = (rqdm: frequency_RQDMEntity) => {
  if (!rqdm?.total?.pc) {
    return TABLE_EMPTY_PLACE_HOLDER;
  }
  return `${rqdm.total.pc} / ${rqdm.total.pn} (${(rqdm.total.pf * 100).toPrecision(3)}%)`;
};

export const getVariantColumns = (
  patientId: string,
  drawerCb: (record: VariantEntity) => void,
): ProColumnType<ITableVariantEntity>[] => {
  let columns: ProColumnType<ITableVariantEntity>[] = [
    {
      title: intl.get('screen.patientvariant.results.table.variant'),
      key: 'hgvsg',
      dataIndex: 'hgvsg',
      className: cx(style.variantTableCell, style.variantTableCellElipsis),
      render: (hgvsg: string, entity: VariantEntity) =>
        hgvsg ? (
          <Tooltip placement="topLeft" title={hgvsg}>
            <Link to={`/variant/entity/${entity.locus}`}>{hgvsg}</Link>
          </Tooltip>
        ) : (
          TABLE_EMPTY_PLACE_HOLDER
        ),
    },
    {
      key: 'variant_class',
      title: intl.get('screen.patientvariant.results.table.type'),
      dataIndex: 'variant_class',
      render: (variant: string) => intl.get(variant).defaultMessage(capitalize(variant)),
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
      key: 'varsome',
      title: intl.get('screen.patientvariant.results.table.varsome'),
      dataIndex: 'varsome',
      className: cx(style.variantTableCell, style.variantTableCellElipsis),
      render: (varsome: Varsome) => (
        <ExternalLink href={`https://varsome.com/variant/${varsome?.variant_id}`}>
          {varsome?.acmg.verdict.verdict ? varsome?.acmg.verdict.verdict : 'No Verdict'}
        </ExternalLink>
      ),
    },
    {
      key: 'acmgrules',
      title: intl.get('screen.patientvariant.results.table.acmgRules'),
      dataIndex: 'varsome',
      className: cx(style.variantTableCell, style.variantTableCellElipsis),
      render: (varsome: Varsome) =>
        varsome
          ? varsome.acmg.classifications.hits.edges
              .map((e: ArrangerEdge<VarsomeClassifications>) => e.node.name)
              .reduce((prev, curr) => `${prev}, ${curr}`)
          : TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      key: 'external_frequencies',
      title: intl.get('screen.variantsearch.table.gnomAd'),
      dataIndex: 'external_frequencies',
      render: (external_frequencies: ExternalFrequenciesEntity) =>
        external_frequencies.gnomad_exomes_2_1_1
          ? external_frequencies.gnomad_exomes_2_1_1.af.toPrecision(4)
          : TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      key: 'rqdm',
      title: intl.get('screen.patientvariant.results.table.rqdm'),
      render: (record: VariantEntity) => formatRqdm(record.frequency_RQDM),
    },
  ];

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
        key: 'donors_genotype',
        title: intl.get('screen.patientvariant.results.table.genotype'),
        dataIndex: 'donors',
        render: (record: ArrangerResultsTree<DonorsEntity>) => {
          const donor = findDonorById(record, patientId);
          const motherCalls = formatCalls(donor?.node.mother_calls!);
          const fatherCalls = formatCalls(donor?.node.father_calls!);

          return `${motherCalls} : ${fatherCalls}`;
        },
      },
      {
        className: style.userAffectedBtnCell,
        key: 'information',
        title: intl.get('screen.patientvariant.results.table.occ'),
        displayTitle: 'Information',
        render: (record: VariantEntity) => (
          <UserAffectedIcon
            onClick={() => drawerCb(record)}
            width="16"
            height="16"
            className={style.affectedIcon}
          />
        ),
        align: 'center',
      },
    );
  }

  return columns;
};
