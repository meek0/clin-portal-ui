import { Descriptions, Space, Typography } from 'antd';
import { PrescriptionResult } from 'graphql/prescriptions/models/Prescription';
import { formatDate } from 'utils/date';

import styles from './index.module.scss';

interface OwnProps {
  data: PrescriptionResult;
}

const OptionItem = ({ data }: OwnProps) => (
  <Space direction="vertical" size={0} className={styles.prescriptionOptionItem}>
    <Typography.Text strong>{data.analysis.display}</Typography.Text>
    <Descriptions size="small" column={1}>
      <Descriptions.Item label={'Prescription'}>
        <Typography.Text type="secondary">{`${data.cid} (${formatDate(
          data.timestamp,
        )})`}</Typography.Text>
      </Descriptions.Item>
      <Descriptions.Item label={'Patient'}>
        <Typography.Text type="secondary">{data.patientInfo.cid}</Typography.Text>
      </Descriptions.Item>
      <Descriptions.Item label={'Dossier'}>
        <Typography.Text type="secondary">{data.mrn}</Typography.Text>
      </Descriptions.Item>
      <Descriptions.Item label={'LDM'}>
        <Typography.Text type="secondary">{data.laboratory}</Typography.Text>
      </Descriptions.Item>
    </Descriptions>
  </Space>
);

export default OptionItem;
