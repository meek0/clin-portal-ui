import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { GqlResults } from 'graphql/models';
import { AnalysisResult, ITableAnalysisResult } from 'graphql/prescriptions/models/Prescription';
import { DEFAULT_PAGE_SIZE } from 'views/Prescriptions/Search';
import { PRESCRIPTION_SCROLL_ID } from 'views/Prescriptions/Search/utils/contstant';
import { exportAsTSV } from 'views/Prescriptions/utils/export';

import { useUser } from 'store/user';
import { updateConfig } from 'store/user/thunks';
import { downloadText, formatQuerySortList, scrollToTop } from 'utils/helper';
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

const download = (results: GqlResults<AnalysisResult> | null, selectedKeys: string[]) => {
  const data = results?.data.filter((row) => selectedKeys.includes(row.prescription_id)) as any[];
  const headers = prescriptionsColumns().map((c) => c.key);
  const tsv = exportAsTSV(data, headers);
  downloadText(tsv, 'prescriptions.tsv');
};

const PrescriptionsTable = ({
  results,
  setQueryConfig,
  queryConfig,
  loading = false,
}: OwnProps): React.ReactElement => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  return (
    <ProTable<ITableAnalysisResult>
      tableId="prescription_table"
      columns={prescriptionsColumns()}
      initialColumnState={user.config.data_exploration?.tables?.prescriptions?.columns}
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
          // @ts-ignore
          // mismatched between antd and antd used in ferlab-ui
          sort: formatQuerySortList(sorter),
        });
        scrollToTop(PRESCRIPTION_SCROLL_ID);
      }}
      enableRowSelection
      headerConfig={{
        itemCount: {
          pageIndex: queryConfig.pageIndex,
          pageSize: queryConfig.size,
          total: results?.total || 0,
        },
        enableColumnSort: true,
        onSelectedRowsChange: (e) => {
          setSelectedKeys(e);
        },
        enableTableExport: true,
        onTableExportClick: () => {
          download(results, selectedKeys);
        },
        onColumnSortChange: (columns) => {
          dispatch(
            updateConfig({
              data_exploration: {
                tables: {
                  prescriptions: { columns },
                },
              },
            }),
          );
        },
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
};

export default PrescriptionsTable;
