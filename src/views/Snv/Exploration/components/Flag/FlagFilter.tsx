import FlagFilter from '@ferlab/ui/core/components/Flag/FlagFilter';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
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
