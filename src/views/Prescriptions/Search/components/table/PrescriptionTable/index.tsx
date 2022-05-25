import React from 'react';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { GqlResults } from 'graphql/models';
import { AnalysisResult, ITableAnalysisResult } from 'graphql/prescriptions/models/Prescription';
import { DEFAULT_PAGE_SIZE } from 'views/Prescriptions/Search';
import { PRESCRIPTION_SCROLL_ID } from 'views/Prescriptions/Search/utils/contstant';

import { formatQuerySortList, scrollToTop } from 'utils/helper';
import { IQueryConfig, TQueryConfigCb } from 'utils/searchPageTypes';
import { getProTableDictionary } from 'utils/translation';

import { prescriptionsColumns } from './columns';

import styles from './index.module.scss';

interface OwnProps {
  results: GqlResults<AnalysisResult> | null;
  total?: number;
  extra?: React.ReactElement;
  loading?: boolean;
  setQueryConfig: TQueryConfigCb;
  queryConfig: IQueryConfig;
}

const PrescriptionsTable = ({
  results,
  setQueryConfig,
  queryConfig,
  loading = false,
}: OwnProps): React.ReactElement => (
  <ProTable<ITableAnalysisResult>
    tableId="prescription_table"
    columns={prescriptionsColumns()}
    dataSource={results?.data.map((i) => ({ ...i, key: i.id }))}
    className={styles.prescriptionTableWrapper}
    loading={loading}
    dictionary={getProTableDictionary()}
    showSorterTooltip={false}
    bordered
    onChange={({ current, pageSize }, _, sorter) => {
      setQueryConfig({
        pageIndex: current!,
        size: pageSize!,
        sort: formatQuerySortList(sorter),
      });
      scrollToTop(PRESCRIPTION_SCROLL_ID);
    }}
    headerConfig={{
      itemCount: {
        pageIndex: queryConfig.pageIndex,
        pageSize: queryConfig.size,
        total: results?.total || 0,
      },
      enableColumnSort: true,
    }}
    size="small"
    pagination={{
      current: queryConfig.pageIndex,
      pageSize: queryConfig.size,
      defaultPageSize: DEFAULT_PAGE_SIZE,
      total: results?.total ?? 0,
      showSizeChanger: true,
      hideOnSinglePage: true,
    }}
  />
);

export default PrescriptionsTable;
