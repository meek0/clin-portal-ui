import intl from 'react-intl-universal';
import { Descriptions, Space, Tag, Tooltip } from 'antd';
import { ITableVariantEntity } from 'graphql/variants/models';
import { findDonorById } from 'graphql/variants/selector';
import { capitalize } from 'lodash';
import { ACMGExoColorMap, ACMGFranklinColorMap } from 'views/Snv/Exploration/variantColumns';

import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';

import style from '../index.module.css';

interface OwnProps {
  record: ITableVariantEntity;
  patientId: string;
}

export const ACMGEvidenceExoColorMap: Record<any, string> = {
  PVS1: 'red',
  PS2: 'volcano',
  PM2: 'gold',
  PM3: 'gold',
  PM4: 'gold',
  PP3: 'green',
  PP4: 'green',
  PP5: 'green',
  BA1: 'geekblue',
  BS4: 'purple',
  BP2: 'blue',
  BP4: 'blue',
  BP6: 'blue',
  BP7: 'blue',
};

const PredictionSection = ({ record, patientId }: OwnProps) => {
  const acmg = record?.franklin_max?.acmg_classification;
  const donor = findDonorById(record?.donors, patientId);
  const exomiser = donor?.exomiser;
  return (
    <Descriptions
      className={style.basicBordered}
      bordered
      size="small"
      title={capitalize(intl.get('predictions'))}
      column={1}
    >
      <Descriptions.Item label={intl.get('franklin.filter.groupTitle')}>
        {record.franklin_max ? (
          <Tooltip title={intl.get(`franklin.expendableTable.tooltip.${acmg}`)}>
            <Tag color={ACMGFranklinColorMap[acmg]}>
              {intl.get(`franklin.expendableTable.abrv.${acmg}`)}
            </Tag>
          </Tooltip>
        ) : (
          TABLE_EMPTY_PLACE_HOLDER
        )}
      </Descriptions.Item>
      <Descriptions.Item label={intl.get('exomiser')}>
        {exomiser ? (
          <Space className={style.alignRigthSpace} size={4}>
            <Tooltip
              title={intl.get(`franklin.expendableTable.tooltip.${exomiser.acmg_classification}`)}
            >
              <Tag color={ACMGExoColorMap[exomiser.acmg_classification]}>
                {intl.get(`franklin.expendableTable.abrv.${exomiser.acmg_classification}`)}
              </Tag>
            </Tooltip>

            {exomiser.acmg_evidence &&
              exomiser.acmg_evidence.map((e) => (
                <Tag key={e} color={ACMGEvidenceExoColorMap[e]}>
                  {e}
                </Tag>
              ))}
          </Space>
        ) : (
          TABLE_EMPTY_PLACE_HOLDER
        )}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default PredictionSection;
