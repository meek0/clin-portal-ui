/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import cx from 'classnames';
import intl from 'react-intl-universal';
import { useTabPatientData } from 'graphql/variants/tabActions';
import ServerError from 'components/Results/ServerError';
import { Tooltip } from 'antd';
import { DonorsEntity, TTableDonorEntity } from 'graphql/variants/models';
import { formatTimestampToISODate } from 'utils/helper';
import { ArrangerEdge, ArrangerHits, ArrangerResultsTree } from 'graphql/models';
import { ColumnFilterItem } from 'antd/lib/table/interface';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { getProTableDictionary } from 'utils/translation';
import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';
import PositionTag from 'components/uiKit/PositionTag';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';

import styles from './index.module.scss';

interface OwnProps {
  className?: string;
  locus: string;
}

const DEFAULT_PAGE_SIZE = 20;

const makeRows = (donors: ArrangerEdge<DonorsEntity>[]): TTableDonorEntity[] =>
  donors?.map((donor, index) => ({
    key: donor.node.patient_id + index,
    id: donor.node.id,
    patient_id: donor.node.patient_id,
    organization_id: donor.node.organization_id,
    gender: donor.node.gender.toLowerCase(),
    is_proband: donor.node.is_proband,
    analysis_code: donor.node.analysis_code,
    analysis_display_name: donor.node.analysis_display_name,
    family_id: donor.node.family_id,
    last_update: formatTimestampToISODate(donor.node.last_update as number),
    qd: donor.node.qd,
    gq: donor.node.gq,
    filters: donor.node.filters,
    ad_alt: donor.node.ad_alt,
    ad_total: donor.node.ad_total,
    ad_ratio: donor.node.ad_ratio,
    affected_status: donor.node.affected_status,
  }));

const findAllAnalysis = (donors: ArrangerEdge<DonorsEntity>[]) => {
  let analysisList: ColumnFilterItem[] = [];
  donors.forEach((donor) => {
    if (
      donor.node.analysis_code &&
      !analysisList.find((analysis) => analysis.value === donor.node.analysis_code)
    ) {
      analysisList.push({
        value: donor.node.analysis_code,
        text: donor.node.analysis_display_name!,
      });
    }
  });
  return analysisList;
};

const getPatientPanelColumns = (
  donorsHits: ArrangerHits<DonorsEntity>,
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
    render: (data) =>
      data.analysis_display_name ? (
        <Tooltip title={data.analysis_display_name}>{data.analysis_code}</Tooltip>
      ) : (
        data.analysis_code
      ),
    filters: findAllAnalysis(donorsHits?.edges || []),
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
    sorter: (a, b) =>
      a.family_id.toLocaleLowerCase().localeCompare(b.family_id.toLocaleLowerCase()),
    filterMultiple: false,
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
    title: intl.get('screen.variantDetails.patientsTab.qd'),
    sorter: (a, b) => a.qd - b.qd,
    render: (qd) => (qd ? qd : TABLE_EMPTY_PLACE_HOLDER),
  },
  {
    key: 'ad_alt',
    dataIndex: 'ad_alt',
    title: intl.get('screen.variantDetails.patientsTab.adAlt'),
    sorter: (a, b) => a.ad_alt - b.ad_alt,
    render: (ad_alt) => (ad_alt ? ad_alt : TABLE_EMPTY_PLACE_HOLDER),
  },
  {
    key: 'ad_total',
    dataIndex: 'ad_total',
    title: intl.get('screen.variantDetails.patientsTab.adTotal'),
    sorter: (a, b) => a.ad_total - b.ad_total,
    render: (ad_total) => (ad_total ? ad_total : TABLE_EMPTY_PLACE_HOLDER),
  },
  {
    key: 'ad_ratio',
    dataIndex: 'ad_ratio',
    title: intl.get('screen.variantDetails.patientsTab.adFreq'),
    render: (ratio: number) => ratio.toFixed(2),
    sorter: (a, b) => a.ad_ratio - b.ad_ratio,
  },
  {
    key: 'gq',
    dataIndex: 'gq',
    title: intl.get('screen.variantDetails.patientsTab.genotypeQuality'),
    sorter: (a, b) => a.gq - b.gq,
    render: (gq) => (gq ? gq : TABLE_EMPTY_PLACE_HOLDER),
  },
];

const PatientPanel = ({ locus, className = '' }: OwnProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { loading, data, error } = useTabPatientData(locus);
  const donorsHits = (data?.donors as ArrangerResultsTree<DonorsEntity>)?.hits;

  if (error) {
    return <ServerError />;
  }

  const dataSource = makeRows(donorsHits?.edges);

  return (
    <div className={cx(styles.patientPanel, className)}>
      <GridCard
        content={
          <ProTable<TTableDonorEntity>
            tableId="patient_panel_table"
            columns={getPatientPanelColumns(donorsHits)}
            dataSource={dataSource ?? []}
            loading={loading}
            dictionary={getProTableDictionary()}
            onChange={({ current, pageSize }) => {
              if (currentPage !== current || currentPageSize !== pageSize) {
                setCurrentPage(current!);
                setCurrentPageSize(pageSize || DEFAULT_PAGE_SIZE);
              }
            }}
            headerConfig={{
              itemCount: {
                pageIndex: currentPage,
                pageSize: currentPageSize,
                total: donorsHits?.total || 0,
              },
            }}
            size="small"
            bordered
            pagination={{
              current: currentPage,
              pageSize: currentPageSize,
              defaultPageSize: DEFAULT_PAGE_SIZE,
              total: donorsHits?.total ?? 0,
              hideOnSinglePage: true,
              className: styles.patientPagination,
            }}
          />
        }
      ></GridCard>
    </div>
  );
};

export default PatientPanel;
