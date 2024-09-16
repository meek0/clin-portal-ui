import FlagFilter from '@ferlab/ui/core/components/Flag/FlagFilter';
import { FilterConfirmProps } from 'antd/lib/table/interface';

import { getFlagDictionary } from 'utils/translation';
interface OwnProps {
  confirm: (param?: FilterConfirmProps) => void;
  selectedKeys: React.Key[];
  setSelectedKeys: (selectedKeys: React.Key[]) => void;
  setFilterList?: (key: string | undefined) => void;
  isClear?: boolean;
}

const FlagFilterDropdown = ({
  confirm,
  selectedKeys,
  setSelectedKeys,
  setFilterList,
  isClear = false,
}: OwnProps) => (
  <FlagFilter
    dictionary={getFlagDictionary()}
    confirm={() => {
      setFilterList && setFilterList(selectedKeys.length > 0 ? 'flag' : undefined);
      confirm();
    }}
    selectedKeys={selectedKeys}
    setSelectedKeys={setSelectedKeys}
    isClear={isClear}
  />
);

export default FlagFilterDropdown;
