/* eslint-disable max-len */
import { useContext } from 'react';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { Divider, Space, Tag, Typography } from 'antd';
import { getFamilyCode } from 'graphql/prescriptions/helper';
import { ITableVariantEntity } from 'graphql/variants/models';
import PrescriptionEntityContext from 'views/Prescriptions/Entity/context';
import { getPatientAndRequestId } from 'views/Prescriptions/Entity/Tabs/Variants/utils';
import { TAB_ID } from 'views/Snv/Entity';

import ExternalLinkIcon from 'components/icons/ExternalLinkIcon';

import styles from './index.module.css';

interface OwnProps {
  record: ITableVariantEntity;
  isSomatic: boolean;
}

const Header = ({ record, isSomatic }: OwnProps) => {
  const { prescription, selectedBasedOnRequest } = useContext(PrescriptionEntityContext);
  const analysisCode = prescription?.code?.[0];
  const { patientId, requestId } = getPatientAndRequestId(selectedBasedOnRequest?.subject.resource);
  const familyCode = getFamilyCode(selectedBasedOnRequest, patientId);

  return (
    <Space size={16} className={styles.interpretationHeader}>
      <Link target="_blank" to={`/variant/entity/${record?.locus}/${TAB_ID.SUMMARY}`}>
        <Space className={styles.hgvsg}>
          <span className={styles.hgvsgLink}>{record?.hgvsg}</span>
          <div style={{ display: 'flex' }}>
            <ExternalLinkIcon height="24" width="24" className="anticon" />
          </div>
        </Space>
      </Link>
      <Tag key="type" color={isSomatic ? 'gold' : 'purple'}>
        {intl.get(`modal.variant.interpretation.header.${isSomatic ? 'somatic' : 'germline'}`)}
      </Tag>
      <Divider type="vertical" />
      <Typography.Text className={styles.requestId}>{`${
        familyCode ? intl.get(familyCode) : intl.get('proband')
      } (${requestId})`}</Typography.Text>
      <Tag color="blue">{analysisCode}</Tag>
    </Space>
  );
};

export default Header;
