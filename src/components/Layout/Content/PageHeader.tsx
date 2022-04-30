import { Typography } from 'antd';

import styles from './PageHeader.module.scss';

const { Title } = Typography;

type ContentHeaderProps = {
  title: string;
};

const PageHeader = ({ title }: ContentHeaderProps): React.ReactElement => (
  <div className={styles.contentHeader}>
    <Title level={3}>{title}</Title>
  </div>
);

export default PageHeader;
