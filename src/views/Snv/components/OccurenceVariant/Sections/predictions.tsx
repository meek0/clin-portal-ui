import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
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

export const ACMGEvidenceColorMap: Record<any, string> = {
  PVS1: 'red',
  PS1: 'volcano',
  PS2: 'volcano',
  PS3: 'volcano',
  PS4: 'volcano',
  PM1: 'gold',
  PM2: 'gold',
  PM3: 'gold',
  PM4: 'gold',
  PM5: 'gold',
  PM6: 'gold',
  PP1: 'green',
  PP2: 'green',
  PP3: 'green',
  PP4: 'green',
  PP5: 'green',
  BA1: 'geekblue',
  BS1: 'purple',
  BS2: 'purple',
  BS3: 'purple',
  BS4: 'purple',
  BP1: 'blue',
  BP2: 'blue',
  BP3: 'blue',
  BP4: 'blue',
  BP5: 'blue',
  BP6: 'blue',
  BP7: 'blue',
};

const PredictionSection = ({ record: { donors, franklin_max }, patientId }: OwnProps) => {
  const acmg = franklin_max?.acmg_classification;
  const donor = findDonorById(donors, patientId);
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
        {franklin_max ? (
          <Space className={style.alignRigthSpace} size={4}>
            <Tooltip title={intl.get(`franklin.expendableTable.tooltip.${acmg}`)}>
              <Tag color={ACMGFranklinColorMap[acmg]}>
                <ExternalLink className={style.ominGene} href={franklin_max.link}>
                  {intl.get(`franklin.expendableTable.abrv.${acmg}`)}
                </ExternalLink>
              </Tag>
            </Tooltip>
            {franklin_max.acmg_evidence && franklin_max.acmg_evidence.length > 0 && (
              <>
                (
                {franklin_max.acmg_evidence.map((e) => (
                  <Space key={e} className={style.alignRigthSpace} size={4}>
                    <Tooltip title={intl.get(`franklin.expendableTable.tooltip.${e}`)}>
                      <Tag color={ACMGEvidenceColorMap[e]}>{e}</Tag>
                    </Tooltip>
                  </Space>
                ))}
                )
              </>
            )}
          </Space>
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

            {exomiser.acmg_evidence && exomiser.acmg_evidence.length > 0 && (
              <>
                (
                {exomiser.acmg_evidence.map((e) => {
                  const code = e.split('_')[0];
                  return (
                    <Space key={e} className={style.alignRigthSpace} size={4}>
                      <Tooltip title={intl.get(`franklin.expendableTable.tooltip.${code}`)}>
                        <Tag color={ACMGEvidenceColorMap[code]}>{e}</Tag>
                      </Tooltip>
                    </Space>
                  );
                })}
                )
              </>
            )}
          </Space>
        ) : (
          TABLE_EMPTY_PLACE_HOLDER
        )}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default PredictionSection;
