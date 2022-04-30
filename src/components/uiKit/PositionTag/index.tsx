import { Tag } from 'antd';
import intl from 'react-intl-universal';

interface OwnProps {
  isProband: boolean;
}

const PositionTag = ({ isProband }: OwnProps) =>
  isProband ? (
    <Tag color="red">{intl.get('proband')}</Tag>
  ) : (
    <Tag color="geekblue">{intl.get('parent')}</Tag>
  );

export default PositionTag;
