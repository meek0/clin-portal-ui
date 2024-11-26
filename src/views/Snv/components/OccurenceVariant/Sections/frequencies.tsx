import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { Descriptions, Space, Tooltip } from 'antd';
import { ITableVariantEntity } from 'graphql/variants/models';
import { capitalize } from 'lodash';
import { TAB_ID } from 'views/Snv/Entity';

import RqdmAffectedIcon from 'components/icons/RQDMAffected';
import RqdmUnaffectedIcon from 'components/icons/RQDMUnaffected';
import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';

import style from '../index.module.css';

interface OwnProps {
  record: ITableVariantEntity;
}

const FrequenciesSection = ({ record }: OwnProps) => {
  const affected = record.frequency_RQDM.affected;
  const unAffected = record.frequency_RQDM.non_affected;
  return (
    <Descriptions
      className={style.basicBordered}
      bordered
      size="small"
      title={capitalize(intl.get('screen.variantDetails.summaryTab.frequencyCardTitle'))}
      column={1}
    >
      <Descriptions.Item
        label={
          <Tooltip title={intl.get('screen.variant.entity.frequencyTab.affected.patients')}>
            <Space className={style.rqdmLabel} size={4}>
              {intl.get('screen.variant.entity.frequencyTab.RQDM.title')}
              <RqdmAffectedIcon svgClass={`${style.affected}`} />
            </Space>
          </Tooltip>
        }
      >
        <Space className={style.alignRigthSpace} size={4}>
          {affected.pc}
          {'/'}
          <Link target="_blank" to={`/variant/entity/${record.locus}/${TAB_ID.PATIENTS}`}>
            {affected.pn}
          </Link>
          {`(${affected.pf.toExponential(2)})`}
        </Space>
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <Tooltip title={intl.get('screen.variant.entity.frequencyTab.nonaffected.patients')}>
            <Space className={style.rqdmLabel} size={4}>
              {intl.get('screen.variant.entity.frequencyTab.RQDM.title')}
              <RqdmUnaffectedIcon svgClass={`${style.unaffected}`} />
            </Space>
          </Tooltip>
        }
      >
        <Space className={style.alignRigthSpace} size={4}>
          {unAffected.pc}
          {'/'}
          <Link target="_blank" to={`/variant/entity/${record.locus}/${TAB_ID.PATIENTS}`}>
            {unAffected.pn}
          </Link>
          {`(${unAffected.pf.toExponential(2)})`}
        </Space>
      </Descriptions.Item>
      <Descriptions.Item label={intl.get('screen.variantsearch.table.gnomAd')}>
        {record.external_frequencies?.gnomad_genomes_3_1_1 ? (
          <ExternalLink
            className={style.gnomad}
            href={`https://gnomad.broadinstitute.org/variant/${record.locus}?dataset=gnomad_r3 `}
          >
            {record.external_frequencies?.gnomad_genomes_3_1_1.af?.toExponential(2)}
          </ExternalLink>
        ) : (
          TABLE_EMPTY_PLACE_HOLDER
        )}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default FrequenciesSection;
