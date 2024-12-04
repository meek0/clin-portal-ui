/* eslint-disable max-len */
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { Divider, Space, Tag } from 'antd';
import { ITableVariantEntity, VariantType } from 'graphql/variants/models';
import { TAB_ID } from 'views/Snv/Entity';

import ExternalLinkIcon from 'components/icons/ExternalLinkIcon';

import styles from './index.module.css';

interface OwnProps {
  record: ITableVariantEntity;
}

const Header = ({ record }: OwnProps) => {
  const isGermline = record.variant_type.includes(VariantType.GERMLINE);

  return (
    <Space size={16} className={styles.interpretationHeader}>
      <Link target="_blank" to={`/variant/entity/${record?.locus}/${TAB_ID.SUMMARY}`}>
        <Space className={styles.hgvsg}>
          <span className={styles.hgvsgLink}>{record?.hgvsg}</span>
          <ExternalLinkIcon height="16" width="16" className="anticon" />
        </Space>
      </Link>
      <Tag key="type" color={isGermline ? 'purple' : 'gold'}>
        {intl.get(`modal.variant.interpretation.header.${isGermline ? 'germline' : 'somatic'}`)}
      </Tag>
      <Divider type="vertical" />
    </Space>
  );
};

export default Header;
