import intl from 'react-intl-universal';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { Tooltip } from 'antd';
import { ColumnFilterItem } from 'antd/lib/table/interface';
import { ArrangerEdge, ArrangerHits } from 'graphql/models';
import { DonorsEntity, TTableDonorEntity } from 'graphql/variants/models';

import PositionTag from 'components/uiKit/PositionTag';
import { GetAnalysisNameByCode } from 'store/global/types';
import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';
import { formatNumber } from 'utils/formatNumber';

const findAllAnalysis = (
  donors: ArrangerEdge<DonorsEntity>[],
  getAnalysisNameByCode: GetAnalysisNameByCode,
) => {
  const analysisList: ColumnFilterItem[] = [];
  donors.forEach((donor) => {
    if (
      donor.node.analysis_code &&
      !analysisList.find((analysis) => analysis.value === donor.node.analysis_code)
    ) {
      analysisList.push({
        value: donor.node.analysis_code,
        text: getAnalysisNameByCode(donor.node.analysis_code),
      });
    }
  });
  return analysisList;
};

export const getPatientPanelColumns = (
  donorsHits: ArrangerHits<DonorsEntity>,
  getAnalysisNameByCode: GetAnalysisNameByCode,
): ProColumnType<TTableDonorEntity>[] => [
  {
    key: 'patient_id',
    dataIndex: 'patient_id',
    title: intl.get('screen.variantDetails.patientsTab.donor'),
    render: (id) => id,
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
    filters: findAllAnalysis(donorsHits?.edges || [], getAnalysisNameByCode),
    onFilter: (value, record: DonorsEntity) => value === record.analysis_code,
  },
  {
    key: 'gender',
    dataIndex: 'gender',
    title: intl.get('screen.variantDetails.patientsTab.sex'),
    render: (gender: string) => intl.get(`screen.variantDetails.patientsTab.${gender}`),
    filters: [
      {
        text: intl.get('screen.variantDetails.patientsTab.male'),
        value: 'male',
      },
      {
        text: intl.get('screen.variantDetails.patientsTab.female'),
        value: 'female',
      },
      {
        text: intl.get('screen.variantDetails.patientsTab.unknown'),
        value: 'unknown',
      },
    ],
    onFilter: (value, record: DonorsEntity) => value === record.gender,
  },
  {
    key: 'is_proband',
    dataIndex: 'is_proband',
    title: intl.get('screen.variantDetails.patientsTab.relation'),
    render: (isProband: boolean) => <PositionTag isProband={isProband} />,
    filters: [
      {
        text: intl.get('proband'),
        value: true,
      },
      {
        text: intl.get('parent'),
        value: false,
      },
    ],
    onFilter: (value, record: DonorsEntity) => value === record.is_proband,
  },
  {
    key: 'affected_status',
    dataIndex: 'affected_status',
    title: intl.get('screen.variantDetails.patientsTab.status'),
    render: (affected_status: boolean) =>
      intl.get(`screen.variantDetails.patientsTab.${affected_status ? 'affected' : 'notaffected'}`),
    filters: [
      {
        text: intl.get('screen.variantDetails.patientsTab.affected'),
        value: true,
      },
      {
        text: intl.get('screen.variantDetails.patientsTab.notaffected'),
        value: false,
      },
    ],
    onFilter: (value, record: DonorsEntity) => value === record.affected_status,
  },
  {
    key: 'family_id',
    dataIndex: 'family_id',
    title: intl.get('screen.variantDetails.patientsTab.familyId'),
    render: (family_id) => (family_id ? family_id : TABLE_EMPTY_PLACE_HOLDER),
    sorter: (a, b) => a.family_id.localeCompare(b.family_id),
  },
  {
    key: 'filters',
    dataIndex: 'filters',
    title: intl.get('screen.variantDetails.patientsTab.filter'),
    render: (filters) => (filters ? filters[0] : TABLE_EMPTY_PLACE_HOLDER),
  },
  {
    key: 'qd',
    dataIndex: 'qd',
    displayTitle: intl.get('screen.variantDetails.patientsTab.qd'),
    title: (
      <Tooltip
        arrowPointAtCenter
        placement="topLeft"
        title={intl.get('screen.variantDetails.patientsTab.qd.tooltip')}
      >
        {intl.get('screen.variantDetails.patientsTab.qd')}
      </Tooltip>
    ),
    sorter: (a, b) => a.qd - b.qd,
    render: (qd) => (qd ? qd : TABLE_EMPTY_PLACE_HOLDER),
  },
  {
    key: 'ad_alt',
    dataIndex: 'ad_alt',
    displayTitle: intl.get('screen.variantDetails.patientsTab.adAlt'),
    title: (
      <Tooltip
        arrowPointAtCenter
        placement="topLeft"
        title={intl.get('screen.variantDetails.patientsTab.adAlt.tooltip')}
      >
        {intl.get('screen.variantDetails.patientsTab.adAlt')}
      </Tooltip>
    ),
    sorter: (a, b) => a.ad_alt - b.ad_alt,
    render: (ad_alt) => (ad_alt ? formatNumber(ad_alt) : TABLE_EMPTY_PLACE_HOLDER),
  },
  {
    key: 'ad_total',
    dataIndex: 'ad_total',
    displayTitle: intl.get('screen.variantDetails.patientsTab.adTotal'),
    title: (
      <Tooltip
        arrowPointAtCenter
        placement="topLeft"
        title={intl.get('screen.variantDetails.patientsTab.adTotal.tooltip')}
      >
        {intl.get('screen.variantDetails.patientsTab.adTotal')}
      </Tooltip>
    ),
    sorter: (a, b) => a.ad_total - b.ad_total,
    render: (ad_total) => (ad_total ? formatNumber(ad_total) : TABLE_EMPTY_PLACE_HOLDER),
  },
  {
    key: 'ad_ratio',
    dataIndex: 'ad_ratio',
    displayTitle: intl.get('screen.variantDetails.patientsTab.adFreq'),
    title: (
      <Tooltip
        arrowPointAtCenter
        placement="topLeft"
        title={intl.get('screen.variantDetails.patientsTab.adFreq.tooltip')}
      >
        {intl.get('screen.variantDetails.patientsTab.adFreq')}
      </Tooltip>
    ),
    render: (ratio: number) => ratio.toFixed(2),
    sorter: (a, b) => a.ad_ratio - b.ad_ratio,
  },
  {
    key: 'gq',
    dataIndex: 'gq',
    displayTitle: intl.get('screen.variantDetails.patientsTab.genotypeQuality'),
    title: (
      <Tooltip
        arrowPointAtCenter
        placement="topLeft"
        title={intl.get('screen.variantDetails.patientsTab.genotypeQuality.tooltip')}
      >
        {intl.get('screen.variantDetails.patientsTab.genotypeQuality')}
      </Tooltip>
    ),
    sorter: (a, b) => a.gq - b.gq,
    render: (gq) => (gq ? formatNumber(gq) : TABLE_EMPTY_PLACE_HOLDER),
  },
];
