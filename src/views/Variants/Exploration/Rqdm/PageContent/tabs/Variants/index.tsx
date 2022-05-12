import { VariantEntity, ITableVariantEntity } from 'graphql/variants/models';
import { IQueryResults } from 'graphql/models';
import { formatQuerySortList } from 'utils/helper';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { getProTableDictionary } from 'utils/translation';
import { IQueryConfig, TQueryConfigCb } from 'utils/searchPageTypes';
import { DEFAULT_PAGE_SIZE } from 'views/Variants/utils/constant';
import { getVariantColumns } from 'views/Variants/Exploration/variantColumns';

import style from './index.module.scss';

type OwnProps = {
  results: IQueryResults<VariantEntity[]>;
  setQueryConfig: TQueryConfigCb;
  queryConfig: IQueryConfig;
};

const VariantsTab = ({ results, setQueryConfig, queryConfig }: OwnProps) => (
  <ProTable<ITableVariantEntity>
    tableId="varirant_table"
    className={style.variantSearchTable}
    wrapperClassName={style.variantTabWrapper}
    columns={getVariantColumns()}
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

export default VariantsTab;
