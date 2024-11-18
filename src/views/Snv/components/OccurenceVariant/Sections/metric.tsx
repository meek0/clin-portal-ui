import intl from 'react-intl-universal';
import { Descriptions } from 'antd';
import { ITableVariantEntity } from 'graphql/variants/models';
import { findDonorById } from 'graphql/variants/selector';
import { VariantSection } from 'views/Prescriptions/Entity/Tabs/Variants/components/VariantSectionNav';

import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';
import { formatFilters } from 'utils/formatFilters';

import GqLine from '../../GQLine';

import style from '../index.module.css';

interface OwnProps {
  record: ITableVariantEntity;
  patientId: string;
  variantSection?: VariantSection;
}

const MetricSection = ({ record, patientId, variantSection }: OwnProps) => {
  const donor = findDonorById(record?.donors, patientId);
  return (
    <Descriptions
      className={style.basicBordered}
      bordered
      size="small"
      title={intl.get('screen.patientsnv.category_metric')}
      column={1}
    >
      <Descriptions.Item label={intl.get('screen.patientsnv.drawer.depth.quality')}>
        {donor?.qd ?? TABLE_EMPTY_PLACE_HOLDER}
      </Descriptions.Item>
      <Descriptions.Item label={intl.get('screen.patientsnv.drawer.allprof')}>
        {donor?.ad_alt ?? TABLE_EMPTY_PLACE_HOLDER}
      </Descriptions.Item>
      <Descriptions.Item label={intl.get('screen.patientsnv.drawer.alltotal')}>
        {donor?.ad_total ?? TABLE_EMPTY_PLACE_HOLDER}
      </Descriptions.Item>
      {(variantSection === VariantSection.SNVTN || variantSection === VariantSection.SNVTO) && (
        <Descriptions.Item label={intl.get('filters.group.donors.sq')}>
          {donor?.sq ? donor?.sq : TABLE_EMPTY_PLACE_HOLDER}
        </Descriptions.Item>
      )}

      {variantSection === VariantSection.SNV && (
        <Descriptions.Item label={intl.get('screen.patientsnv.drawer.gq')}>
          {<GqLine value={donor?.gq} />}
        </Descriptions.Item>
      )}
      <Descriptions.Item label={intl.get('screen.patientsnv.drawer.filter')}>
        {formatFilters(donor?.filters)}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default MetricSection;
