import { Skeleton, Space, Typography } from 'antd';
import { ReactNode } from 'react';

import styles from './index.module.scss';

const { Title } = Typography;

export type ContentHeaderProps = {
  title: string;
  loading?: boolean;
  extra?: ReactNode[];
};

const ContentHeader = ({
  title,
  loading = false,
  extra,
}: ContentHeaderProps): React.ReactElement => (
  <div className={styles.contentHeader}>
    <Skeleton
      title={{ width: 200 }}
      paragraph={false}
      loading={loading}
      className={styles.titleSkeleton}
      active
    >
      <Space size={12}>
        <Title level={3}>{title}</Title>
        <div>{extra}</div>
      </Space>
    </Skeleton>
  </div>
);

export default ContentHeader;
