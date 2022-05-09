import { useState } from 'react';
import { Tooltip } from 'antd';
import cx from 'classnames';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import intl from 'react-intl-universal';
import UserAffected from 'components/icons/UserAffectedIcon';
import {
  VariantEntity,
  ClinVar,
  Consequence,
  ExternalFrequenciesEntity,
  DonorsEntity,
  frequency_RQDMEntity,
  ITableVariantEntity,
} from 'graphql/variants/models';
import { ArrangerResultsTree, ArrangerEdge, IQueryResults } from 'graphql/models';
import { formatQuerySortList } from 'utils/helper';
import { Varsome, VarsomeClassifications } from 'graphql/variants/models';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { getProTableDictionary } from 'utils/translation';
import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';
import ConsequencesCell from 'views/Variants/components/ConsequencesCell';
import OccurrenceDrawer from '../../../components/OccurrenceDrawer';
import { IQueryConfig, TQueryConfigCb } from 'utils/searchPageTypes';
import { DEFAULT_PAGE_SIZE } from 'views/Variants/utils/constant';
import { Link } from 'react-router-dom';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { capitalize } from 'lodash';

import style from './index.module.scss';

type OwnProps = {
  results: IQueryResults<VariantEntity[]>;
  setQueryConfig: TQueryConfigCb;
  queryConfig: IQueryConfig;
  patientId: string;
  sqon?: ISqonGroupFilter;
};

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

const getVariantColumns = (
  patientId: string,
  drawerCb: (record: VariantEntity) => void,
): ProColumnType<ITableVariantEntity>[] => [
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
        <ExternalLink href={`https://www.ncbi.nlm.nih.gov/clinvar/variation/${clinVar.clinvar_id}`}>
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
    key: 'varsome',
    title: intl.get('screen.patientvariant.results.table.acmgRules'),
    dataIndex: 'varsome',
    className: cx(style.variantTableCell, style.variantTableCellElipsis),
    render: (varsome: Varsome) =>
      varsome?.acmg.classifications.hits.edges
        .map((e: ArrangerEdge<VarsomeClassifications>) => e.node.name)
        .reduce((prev, curr) => `${prev}, ${curr}`),
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
    key: 'drawer',
    title: intl.get('screen.patientvariant.results.table.occ'),
    displayTitle: 'Information',
    render: (record: VariantEntity) => {
      return (
        <UserAffected
          onClick={() => drawerCb(record)}
          width="16"
          height="16"
          className={style.affectedIcon}
        />
      );
    },
    align: 'center',
  },
];

const VariantsTab = ({ results, setQueryConfig, queryConfig, sqon, patientId }: OwnProps) => {
  const [drawerOpened, toggleDrawer] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<VariantEntity | undefined>(undefined);

  return (
    <>
      <ProTable<ITableVariantEntity>
        tableId="varirant_table"
        className={style.variantSearchTable}
        wrapperClassName={style.variantTabWrapper}
        columns={getVariantColumns(patientId, (record) => {
          setSelectedVariant(record);
          toggleDrawer(true);
        })}
        dataSource={results.data.map((i, index) => ({ ...i, key: `${index}` }))}
        loading={results.loading}
        dictionary={getProTableDictionary()}
        onChange={({ current, pageSize }, _, sorter) =>
          setQueryConfig({
            pageIndex: current!,
            size: pageSize!,
            sort: formatQuerySortList(sorter),
          })
        }
        headerConfig={{
          itemCount: {
            pageIndex: queryConfig.pageIndex,
            pageSize: queryConfig.size,
            total: results.total || 0,
          },
          enableColumnSort: true,
        }}
        size="small"
        pagination={{
          current: queryConfig.pageIndex,
          pageSize: queryConfig.size,
          defaultPageSize: DEFAULT_PAGE_SIZE,
          total: results.total ?? 0,
          hideOnSinglePage: true,
        }}
      />
      {results.data.length > 0 && selectedVariant && (
        <OccurrenceDrawer
          patientId={patientId}
          data={selectedVariant}
          opened={drawerOpened}
          toggle={toggleDrawer}
        />
      )}
    </>
  );
};

export default VariantsTab;
