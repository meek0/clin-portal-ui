import FlagFilter from '@ferlab/ui/core/components/Flag/FlagFilter';
import { removeIgnoreFieldFromQueryContent } from '@ferlab/ui/core/components/QueryBuilder/utils/helper';
import { ISyntheticSqon, TSyntheticSqonContentValue } from '@ferlab/ui/core/data/sqon/types';
import { FilterConfirmProps, Key } from 'antd/lib/table/interface';

import { getFlagDictionary } from 'utils/translation';
interface OwnProps {
  confirm: (param?: FilterConfirmProps) => void;
  selectedKeys: React.Key[];
  setSelectedKeys: (selectedKeys: React.Key[]) => void;
  setFilterList?: (columnKeys: Key[]) => void;
  selectedFilter?: string[];
  isClear?: boolean;
  variantSection?: string;
}

export const flagFilterQuery = (filteredValues: string[]) => ({
  content: {
    field: 'flags',
    value: filteredValues,
  },
  op: 'in',
});

export const noFlagQuery = (filteredValues: string[]) => ({
  content: [
    {
      content: {
        field: 'flags',
        value: ['flag', 'pin', 'star'],
      },
      op: 'not-in',
    },
    flagFilterQuery(filteredValues),
  ],
  op: 'or',
});

const activeQueryContent = (activeQuery: ISyntheticSqon) => ({
  content: activeQuery!.content.length > 0 ? [activeQuery] : [],
  op: 'and',
});

export const hasFlags = (activeQuery: ISyntheticSqon) =>
  activeQuery.content.some((c: any) => {
    if (c.content) {
      if (Array.isArray(c.content)) {
        return c.content.length > 0 && c.content[0].content.field === 'flags';
      } else {
        return c.content.field === 'flags';
      }
    } else {
      return false;
    }
  });

export const newQuery = (activeQuery: ISyntheticSqon, values: string[]) => {
  const filteredValues = values.filter((v) => v !== 'none');
  const activeQueryWithoutFilter =
    activeQuery.content.length > 0
      ? removeIgnoreFieldFromQueryContent(activeQuery, ['flags'])
      : activeQuery;

  const queries = [...activeQueryWithoutFilter.content];
  const asFlag = hasFlags(activeQuery);
  const queriesNew: any =
    values.length > 0 && !asFlag
      ? [activeQueryContent(activeQueryWithoutFilter)]
      : [...activeQueryWithoutFilter.content];

  values.length > 0 &&
    queries.push(
      values.includes('none') ? noFlagQuery(filteredValues) : flagFilterQuery(filteredValues),
    );

  values.length > 0 &&
    queriesNew.push(
      values.includes('none') ? noFlagQuery(filteredValues) : flagFilterQuery(filteredValues),
    );

  const isDuplicate = (obj: TSyntheticSqonContentValue, array: any[]) =>
    array.some((item: any) => JSON.stringify(item) === JSON.stringify(obj));
  const uniqueArray: any = [];

  queriesNew.forEach((item: any) => {
    if (!isDuplicate(item, uniqueArray)) {
      uniqueArray.push(item);
    }
  });

  return uniqueArray;
};

const FlagFilterDropdown = ({
  confirm,
  selectedKeys,
  setSelectedKeys,
  setFilterList,
  selectedFilter,
  isClear = false,
}: OwnProps) => (
  <FlagFilter
    dictionary={getFlagDictionary()}
    confirm={() => {
      /*         updateQuery({
          query: {
            content: newQuery(activeQuery, selectedKeys as string[]),
            id: activeQuery.id,
            op: 'and',
          },
          queryBuilderId: getQueryBuilderID(variantSection as VariantSection),
        }); */
      setFilterList && setFilterList(selectedKeys);
      confirm();
    }}
    selectedFilter={selectedFilter}
    selectedKeys={selectedKeys}
    setSelectedKeys={setSelectedKeys}
    isClear={isClear}
  />
);

export default FlagFilterDropdown;
