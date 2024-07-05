import { useDispatch } from 'react-redux';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { IQueryConfig, TQueryConfigCb } from '@ferlab/ui/core/graphql/types';
import { IQueryResults } from 'graphql/models';
import { ITableVariantEntity, VariantEntity, VariantType } from 'graphql/variants/models';
import { VARIANT_KEY } from 'views/Prescriptions/utils/export';
import { getVariantColumns } from 'views/Snv/Exploration/variantColumns';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_SORT_QUERY,
  SCROLL_WRAPPER_ID,
} from 'views/Snv/utils/constant';

import FixedSizeTable from 'components/Layout/FixedSizeTable';
import { useUser } from 'store/user';
import { updateConfig } from 'store/user/thunks';
import { formatQuerySortList, scrollToTop } from 'utils/helper';
import { getProTableDictionary } from 'utils/translation';

import style from './index.module.css';

type OwnProps = {
  results: IQueryResults<VariantEntity[]>;
  setQueryConfig: TQueryConfigCb;
  queryConfig: IQueryConfig;
  pageIndex: number;
  setPageIndex: (value: number) => void;
  queryBuilderId: string;
  setDownloadTriggered: any;
  setSelectedRows: any;
};

const VariantsTab = ({
  queryBuilderId,
  results,
  setQueryConfig,
  queryConfig,
  pageIndex,
  setPageIndex,
  setDownloadTriggered,
  setSelectedRows,
}: OwnProps) => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const initialColumnState = user.config.data_exploration?.tables?.snv?.columns;

  return (
    <FixedSizeTable
      numberOfColumn={initialColumnState || []}
      fixedProTable={(dimension) => (
        <ProTable<ITableVariantEntity>
          tableId="variant_table"
          className={style.variantSearchTable}
          wrapperClassName={style.variantTabWrapper}
          columns={getVariantColumns(
            queryBuilderId,
            VariantType.GERMLINE,
            undefined,
            undefined,
            undefined,
            undefined,
            results?.data.length === 0,
          )}
          initialColumnState={initialColumnState}
          dataSource={results?.data.map((i) => ({ ...i, key: `${i[VARIANT_KEY]}` }))}
          loading={results?.loading}
          showSorterTooltip={false}
          dictionary={getProTableDictionary()}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onChange={(_, __, sorter) => {
            setPageIndex(DEFAULT_PAGE_INDEX);
            setQueryConfig({
              pageIndex: DEFAULT_PAGE_INDEX,
              size: queryConfig.size!,
              // @ts-ignore
              sort: formatQuerySortList(sorter, DEFAULT_SORT_QUERY),
            });
          }}
          bordered
          enableRowSelection
          headerConfig={{
            enableTableExport: true,
            tableExportDisabled: (results?.total || 0) === 0,
            itemCount: {
              pageIndex: pageIndex,
              pageSize: queryConfig.size,
              total: results?.total,
            },
            enableColumnSort: true,
            onSelectedRowsChange: (key, row) => {
              setSelectedRows(row);
            },
            onSelectAllResultsChange: () => {
              setSelectedRows([]);
            },
            onTableExportClick: () => {
              setDownloadTriggered(true);
            },
            onColumnSortChange: (columns) => {
              dispatch(
                updateConfig({
                  data_exploration: {
                    tables: {
                      snv: { columns },
                    },
                  },
                }),
              );
            },
          }}
          size="small"
          scroll={dimension}
          pagination={{
            current: pageIndex,
            queryConfig,
            setQueryConfig,
            onChange: (page: number) => {
              scrollToTop(SCROLL_WRAPPER_ID);
              setPageIndex(page);
            },
            searchAfter: results?.searchAfter,
            defaultViewPerQuery: queryConfig.size,
          }}
        />
      )}
    />
  );
};

export default VariantsTab;
