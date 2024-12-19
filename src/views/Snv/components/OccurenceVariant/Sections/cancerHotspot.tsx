import intl from 'react-intl-universal';
import { FireFilled, FireOutlined } from '@ant-design/icons';
import { Descriptions } from 'antd';
import { ITableVariantEntity } from 'graphql/variants/models';

import style from '../index.module.css';

interface OwnProps {
  record: ITableVariantEntity;
}

const CancerHotspotSection = ({ record: { hotspot } }: OwnProps) => (
  <Descriptions
    className={style.basicBordered}
    bordered
    size="small"
    title={intl.get('modal.variant.interpretation.somatic.sections.cancer.title')}
    column={1}
  >
    <Descriptions.Item
      label={intl.get('modal.variant.interpretation.somatic.sections.cancer.hotspot')}
    >
      {hotspot ? (
        <FireFilled className={style.hotspotFilled} />
      ) : (
        <FireOutlined className={style.hotspotOutlined} />
      )}
    </Descriptions.Item>
  </Descriptions>
);

export default CancerHotspotSection;
