/* eslint-disable @typescript-eslint/no-unused-vars */
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { Tooltip } from 'antd';
import { ColumnFilterItem } from 'antd/lib/table/interface';
import { ArrangerEdge, ArrangerHits } from 'graphql/models';
import { DonorsEntity, TTableDonorEntity } from 'graphql/variants/models';

import { GetAnalysisNameByCode } from 'store/global/types';
import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';
import { formatNumber } from 'utils/formatNumber';

const columnFilterReducer = (
  columnFilterItems: ColumnFilterItem[],
  rawValue: string | undefined,
  textTransform: (t: string) => string,
) => {
  if (!rawValue || columnFilterItems.some((x) => x.value === rawValue)) {
    return columnFilterItems;
  }
  return [...columnFilterItems, { value: rawValue, text: textTransform(rawValue) }];
};

const createAnalysisItems = (
  donors: ArrangerEdge<DonorsEntity>[],
  getAnalysisNameByCode: GetAnalysisNameByCode,
): ColumnFilterItem[] =>
  donors.reduce(
    (ds: ColumnFilterItem[], d: ArrangerEdge<DonorsEntity>) =>
      columnFilterReducer(ds, d.node.analysis_code, getAnalysisNameByCode),
    [],
  );

const createFiltersItems = (donors: ArrangerEdge<DonorsEntity>[]): ColumnFilterItem[] =>
  donors.reduce(
    (ds: ColumnFilterItem[], d: ArrangerEdge<DonorsEntity>) =>
      columnFilterReducer(ds, d.node?.filters?.[0], (t) => t),
    [],
  );

export const getPatientPanelColumns = (
  donorsHits: ArrangerHits<DonorsEntity>,
  getAnalysisNameByCode: GetAnalysisNameByCode,
): ProColumnType<TTableDonorEntity>[] => [
  {
    key: 'service_request_id',
    title: intl.get('screen.variantDetails.patientsTab.request'),
    render: (record: DonorsEntity) => (
      <Link
        to={`/prescription/entity/${record.analysis_service_request_id}`}
        data-cy={`PrescriptionLink_${record.service_request_id}`}
      >
        {record.service_request_id}
      </Link>
    ),
  },
  {
    key: 'analysis_code',
    title: intl.get('screen.variantDetails.patientsTab.analysis'),
    render: (data: DonorsEntity) =>
      data.analysis_code ? (
        <Tooltip title={getAnalysisNameByCode(data.analysis_code)}>{data.analysis_code}</Tooltip>
      ) : (
        data.analysis_code
      ),
    filters: createAnalysisItems(donorsHits?.edges || [], getAnalysisNameByCode),
    onFilter: (value, record: DonorsEntity) => value === record.analysis_code,
    sorter: {
      compare: (a, b) => (a.analysis_code || '').localeCompare(b.analysis_code || ''),
      multiple: 1,
    },
  },
  {
    key: 'patient_id',
    dataIndex: 'patient_id',
    title: intl.get('screen.variantDetails.patientsTab.donor'),
    render: (id) => id,
  },
  {
    key: 'gender',
    dataIndex: 'gender',
    title: intl.get('screen.variantDetails.patientsTab.sex'),
    render: (gender: string) => intl.get(`sex.${gender}`),
    filters: [
      {
        text: intl.get('sex.male'),
        value: 'male',
      },
      {
        text: intl.get('sex.female'),
        value: 'female',
      },
      {
        text: intl.get('sex.unknown'),
        value: 'unknown',
      },
      {
        text: intl.get('sex.other'),
        value: 'other',
      },
    ],
    onFilter: (value, record: DonorsEntity) => value === record.gender,
  },
  {
    key: 'affected_status_code',
    dataIndex: 'affected_status_code',
    title: intl.get('screen.variantDetails.patientsTab.status'),
    render: (affected_status_code: string) =>
      intl.get(`screen.variantDetails.patientsTab.${affected_status_code}`),
    filters: ['affected', 'not_affected', 'unknown'].map((value: string) => ({
      text: intl.get(`screen.variantDetails.patientsTab.${value}`),
      value,
    })),
    onFilter: (value, record: DonorsEntity) => value === record.affected_status_code,
  },
  {
    key: 'filters',
    dataIndex: 'filters',
    title: intl.get('screen.variantDetails.patientsTab.filter'),
    tooltip: intl.get('screen.variantDetails.patientsTab.filter.tooltip'),
    render: (filters) => (filters ? filters[0] : TABLE_EMPTY_PLACE_HOLDER),
    filters: createFiltersItems(donorsHits?.edges || []),
  },
  {
    key: 'qd',
    dataIndex: 'qd',
    title: intl.get('screen.variantDetails.patientsTab.qd'),
    tooltip: intl.get('screen.variantDetails.patientsTab.qd.tooltip'),
    sorter: {
      compare: (a, b) => a.qd - b.qd,
      multiple: 1,
    },
    render: (qd) => (qd ? qd : TABLE_EMPTY_PLACE_HOLDER),
  },
  {
    key: 'ad_alt',
    dataIndex: 'ad_alt',
    title: intl.get('screen.variantDetails.patientsTab.adAlt'),
    tooltip: intl.get('screen.variantDetails.patientsTab.adAlt.tooltip'),
    sorter: {
      compare: (a, b) => a.ad_alt - b.ad_alt,
      multiple: 1,
    },
    render: (ad_alt) => {
      const displayValue = ad_alt ? formatNumber(ad_alt) : TABLE_EMPTY_PLACE_HOLDER;
      return <span data-cy="ad_alt">{displayValue}</span>;
    },
  },
  {
    key: 'ad_total',
    dataIndex: 'ad_total',
    title: intl.get('screen.variantDetails.patientsTab.adTotal'),
    tooltip: intl.get('screen.variantDetails.patientsTab.adTotal.tooltip'),
    sorter: {
      compare: (a, b) => a.ad_total - b.ad_total,
      multiple: 1,
    },
    render: (ad_total) => {
      const displayValue = ad_total ? formatNumber(ad_total) : TABLE_EMPTY_PLACE_HOLDER;
      return <span data-cy="ad_total">{displayValue}</span>;
    },
  },
  {
    key: 'ad_ratio',
    dataIndex: 'ad_ratio',
    title: intl.get('screen.variantDetails.patientsTab.adFreq'),
    tooltip: intl.get('screen.variantDetails.patientsTab.adFreq.tooltip'),
    render: (ratio: number) => ratio.toFixed(2),
    sorter: {
      compare: (a, b) => a.ad_ratio - b.ad_ratio,
      multiple: 1,
    },
  },
  {
    key: 'gq',
    dataIndex: 'gq',
    title: intl.get('screen.variantDetails.patientsTab.genotypeQuality'),
    tooltip: intl.get('screen.variantDetails.patientsTab.genotypeQuality.tooltip'),
    sorter: {
      compare: (a, b) => a.gq - b.gq,
      multiple: 1,
    },
    render: (gq) => (gq ? formatNumber(gq) : TABLE_EMPTY_PLACE_HOLDER),
  },
];
