import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { Descriptions, Space, Tooltip } from 'antd';
import { ITableVariantEntity } from 'graphql/variants/models';
import { capitalize } from 'lodash';
import { TAB_ID } from 'views/Snv/Entity';

import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';

import style from '../index.module.css';

interface OwnProps {
  record: ITableVariantEntity;
}

const FrequenciesSomaticSection = ({ record }: OwnProps) => {
  const freqTO = record.freq_rqdm_tumor_only;
  const freqTN = record.freq_rqdm_tumor_normal;
  return (
    <Descriptions
      className={style.basicBordered}
      bordered
      size="small"
      title={capitalize(intl.get('screen.variantDetails.summaryTab.frequencyCardTitle'))}
      column={1}
    >
      <Descriptions.Item
        label={`${intl.get('filters.group.panels')} (${intl.get(
          'filters.options.tasks.TEBA.abrv',
        )})`}
      >
        <Space className={style.alignRigthSpace} size={4}>
          {freqTO.pc}
          {'/'}
          <Link target="_blank" to={`/variant/entity/${record.locus}/${TAB_ID.PATIENTS}`}>
            {freqTO.pn}
          </Link>
          <Tooltip title={intl.get('filters.group.freq_rqdm_tumor_only.pf.tooltip')}>
            {`(${freqTO.pf.toExponential(2)})`}
          </Tooltip>
        </Space>
      </Descriptions.Item>
      <Descriptions.Item
        label={`${intl.get('filters.group.panels')} (${intl.get(
          'filters.options.tasks.TNEBA.abrv',
        )})`}
      >
        <Space className={style.alignRigthSpace} size={4}>
          {freqTN.pc}
          {'/'}
          <Link target="_blank" to={`/variant/entity/${record.locus}/${TAB_ID.PATIENTS}`}>
            {freqTN.pn}
          </Link>

          {`(${freqTN.pf.toExponential(2)})`}
        </Space>
      </Descriptions.Item>
      <Descriptions.Item label={intl.get('filters.group.genes.cosmic.tumour_types_germline')}>
        {record.cmc ? (
          <Space size={4} className={style.alignRigthSpace}>
            <ExternalLink href={record.cmc.mutation_url}>{record.cmc.sample_mutated}</ExternalLink>
            {`(${record.cmc.sample_ratio.toExponential(2)})`}
          </Space>
        ) : (
          TABLE_EMPTY_PLACE_HOLDER
        )}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default FrequenciesSomaticSection;
