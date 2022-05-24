import { useEffect, useState } from 'react';
import ProTable from '@ferlab/ui/core/components/ProTable';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import cx from 'classnames';
import { ArrangerEdge, ArrangerHits, ArrangerResultsTree } from 'graphql/models';
import { DonorsEntity, TTableDonorEntity } from 'graphql/variants/models';
import { useTabPatientData } from 'graphql/variants/tabActions';
import { isEmpty } from 'lodash';

import ServerError from 'components/Results/ServerError';
import { useGlobals } from 'store/global';
import { formatTimestampToISODate } from 'utils/helper';
import { getProTableDictionary } from 'utils/translation';

import { getPatientPanelColumns } from './columns';

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

interface DataSourceState {
  nbRows: number;
  hits: ArrangerHits<any>;
}

const PatientPanel = ({ locus, className = '' }: OwnProps) => {
  const { getAnalysisNameByCode } = useGlobals();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { loading, data, error } = useTabPatientData(locus);
  const [dataSource, setDataSource] = useState<DataSourceState>({
    nbRows: 0,
    hits: { edges: [] },
  });

  useEffect(() => {
    if (!isEmpty(data)) {
      const donorsHits = (data?.donors as ArrangerResultsTree<DonorsEntity>)?.hits;
      setDataSource({
        nbRows: donorsHits?.edges.length,
        hits: donorsHits,
      });
    }
  }, [data]);

  if (error) {
    return <ServerError />;
  }

  return (
    <div className={cx(styles.patientPanel, className)}>
      <GridCard
        content={
          <ProTable<TTableDonorEntity>
            tableId="patient_panel_table"
            columns={getPatientPanelColumns(dataSource.hits, getAnalysisNameByCode)}
            dataSource={makeRows(dataSource.hits?.edges) ?? []}
            loading={loading}
            dictionary={getProTableDictionary()}
            onChange={({ current, pageSize }, filters, sorter, extra) => {
              if (extra.currentDataSource.length !== dataSource.nbRows) {
                setDataSource({
                  ...dataSource,
                  nbRows: extra.currentDataSource.length,
                });
              }

              if (currentPage !== current || currentPageSize !== pageSize) {
                setCurrentPage(current!);
                setCurrentPageSize(pageSize || DEFAULT_PAGE_SIZE);
              }
            }}
            headerConfig={{
              itemCount: {
                pageIndex: currentPage,
                pageSize: currentPageSize,
                total: dataSource.nbRows || 0,
              },
            }}
            size="small"
            bordered
            pagination={{
              current: currentPage,
              pageSize: currentPageSize,
              defaultPageSize: DEFAULT_PAGE_SIZE,
              total: dataSource.nbRows ?? 0,
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
