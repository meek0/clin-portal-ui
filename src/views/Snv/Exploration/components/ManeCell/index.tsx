import intl from 'react-intl-universal';
import { Space, Tooltip } from 'antd';
import { Consequence } from 'graphql/variants/models';

import CanonicalIcon from 'components/icons/CanonicalIcon';
import ManePlusIcon from 'components/icons/ManePlusIcon';
import ManeSelectIcon from 'components/icons/ManeSelectIcon';
import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';

import style from './index.module.scss';
interface OwnProps {
  consequence: Consequence;
}

const ManeCell = ({ consequence }: OwnProps) => {
  const haveResult =
    consequence?.node.canonical || consequence?.node.mane_select || consequence?.node.mane_plus;
  return haveResult ? (
    <Space size={4} className={style.maneIcons}>
      {consequence?.node.canonical && (
        <Tooltip title={intl.get('screen.variantDetails.summaryTab.canonical')}>
          <div>
            <CanonicalIcon className={style.canonicalIcon} height="16" width="16" />
          </div>
        </Tooltip>
      )}
      {consequence?.node.mane_select && (
        <Tooltip title={intl.get('screen.variantDetails.summaryTab.maneSelect')}>
          <div>
            <ManeSelectIcon className={style.canonicalIcon} height="16" width="16" />
          </div>
        </Tooltip>
      )}
      {consequence?.node.mane_plus && (
        <Tooltip title={intl.get('screen.variantDetails.summaryTab.manePlus')}>
          <div>
            <ManePlusIcon className={style.canonicalIcon} height="16" width="16" />
          </div>
        </Tooltip>
      )}
    </Space>
  ) : (
    <>{TABLE_EMPTY_PLACE_HOLDER}</>
  );
};
export default ManeCell;
