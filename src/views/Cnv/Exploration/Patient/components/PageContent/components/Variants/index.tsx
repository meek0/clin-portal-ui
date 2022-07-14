import { useDispatch } from 'react-redux';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { ITableVariantEntity, VariantEntity } from 'graphql/cnv/models';
import { IQueryResults } from 'graphql/models';
import { getVariantColumns } from 'views/Cnv/Exploration/variantColumns';
import { DEFAULT_PAGE_SIZE } from 'views/Cnv/utils/constant';

import { useUser } from 'store/user';
import { updateConfig } from 'store/user/thunks';
import { formatQuerySortList } from 'utils/helper';
import { IQueryConfig, TQueryConfigCb } from 'utils/searchPageTypes';
import { getProTableDictionary } from 'utils/translation';

import style from './index.module.scss';

type OwnProps = {
  results: IQueryResults<VariantEntity[]>;
  setQueryConfig: TQueryConfigCb;
  queryConfig: IQueryConfig;
  patientId?: string;
};

const VariantsTable = ({ results, setQueryConfig, queryConfig }: OwnProps) => {
  const dispatch = useDispatch();
  const { user } = useUser();

  return (
    <ProTable<ITableVariantEntity>
      tableId="variant_table"
      wrapperClassName={style.variantTableWrapper}
      columns={getVariantColumns()}
      initialColumnState={user.config.data_exploration?.tables?.patientCnv?.columns}
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
      bordered
      headerConfig={{
        itemCount: {
          pageIndex: queryConfig.pageIndex,
          pageSize: queryConfig.size,
          total: results.total || 0,
        },
        enableColumnSort: true,
        onColumnSortChange: (columns) => {
          dispatch(
            updateConfig({
              data_exploration: {
                tables: {
                  patientCnv: { columns },
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
        total: results.total ?? 0,
        hideOnSinglePage: true,
      }}
    />
  );
};

export default VariantsTable;
