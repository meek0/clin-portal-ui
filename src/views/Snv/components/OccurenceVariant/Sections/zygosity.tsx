import intl from 'react-intl-universal';
import { Descriptions, Space } from 'antd';
import { ITableVariantEntity } from 'graphql/variants/models';
import { findDonorById } from 'graphql/variants/selector';
import { capitalize } from 'lodash';
import { VariantSection } from 'views/Prescriptions/Entity/Tabs/Variants/components/VariantSectionNav';

import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';

import { HcComplementDescription } from '../HcDescription';

import style from '../index.module.css';

interface OwnProps {
  record: ITableVariantEntity;
  patientId: string;
  variantSection?: VariantSection;
}

const ZygositySection = ({ record: { locus, donors }, patientId, variantSection }: OwnProps) => {
  const donor = findDonorById(donors, patientId);
  return (
    <Descriptions
      className={style.basicBordered}
      bordered
      size="small"
      title={capitalize(intl.get('zygosity'))}
      column={1}
    >
      <Descriptions.Item label={capitalize(intl.get('zygosity'))}>
        {donor?.zygosity
          ? intl.get(`occurence.zygosity.${donor.zygosity}`)
          : TABLE_EMPTY_PLACE_HOLDER}
      </Descriptions.Item>
      {variantSection === VariantSection.SNV && (
        <>
          <Descriptions.Item
            label={capitalize(intl.get('compound.heterozygous.abbrev', { num: 0 }))}
            className={style.hc}
          >
            <Space className={style.alignRigthSpace}>
              <HcComplementDescription
                hcComplements={donor?.hc_complement}
                defaultText={TABLE_EMPTY_PLACE_HOLDER}
                locus={locus}
              />
            </Space>
          </Descriptions.Item>
          <Descriptions.Item
            label={capitalize(intl.get('potential.compound.heterozygous.abbrev', { num: 0 }))}
          >
            <Space className={style.alignRigthSpace}>
              <HcComplementDescription
                hcComplements={donor?.possibly_hc_complement}
                defaultText={TABLE_EMPTY_PLACE_HOLDER}
              />
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label={intl.get('screen.patientsnv.drawer.transmission')}>
            {donor?.transmission
              ? intl.get(`screen.patientsnv.drawer.transmission.${donor.transmission}`)
              : TABLE_EMPTY_PLACE_HOLDER}
          </Descriptions.Item>
          <Descriptions.Item label={intl.get('screen.patientsnv.drawer.parental.origin')}>
            {donor?.parental_origin
              ? intl.get(`screen.patientsnv.drawer.parental.origin.${donor.parental_origin}`)
              : TABLE_EMPTY_PLACE_HOLDER}
          </Descriptions.Item>
        </>
      )}
    </Descriptions>
  );
};

export default ZygositySection;
