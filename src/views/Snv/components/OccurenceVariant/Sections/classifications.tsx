import intl from 'react-intl-universal';
import { FireFilled, FireOutlined } from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { Descriptions, Tag, Tooltip } from 'antd';
import { ITableVariantEntity } from 'graphql/variants/models';
import { capitalize } from 'lodash';
import { VariantSection } from 'views/Prescriptions/Entity/Tabs/Variants/components/VariantSectionNav';
import { ClinvarColorMap } from 'views/Snv/Exploration/variantColumns';

import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';

import style from '../index.module.css';

interface OwnProps {
  record: ITableVariantEntity;
  variantSection?: VariantSection;
}

const ClassificationSection = ({ record: { clinvar, hotspot, cmc }, variantSection }: OwnProps) => {
  const clinVarSigKey: string[] = clinvar?.clin_sig
    ? clinvar.clin_sig.map((c) => c.toLowerCase())
    : [];
  return (
    <Descriptions
      className={style.basicBordered}
      bordered
      size="small"
      title={capitalize(intl.get('classifications'))}
      column={1}
    >
      <Descriptions.Item label={intl.get('screen.patientsnv.results.table.clinvar')}>
        {clinvar
          ? clinVarSigKey.map((clinvarKey) => (
              <Tooltip
                key={clinvarKey}
                placement="topLeft"
                title={intl.get(`clinvar.${clinvarKey}`)}
              >
                <Tag color={ClinvarColorMap[clinvarKey]}>
                  <ExternalLink
                    href={`https://www.ncbi.nlm.nih.gov/clinvar/variation/${clinvar.clinvar_id}`}
                  >
                    {intl.get(`clinvar.abrv.${clinvarKey}`)}
                  </ExternalLink>
                </Tag>
              </Tooltip>
            ))
          : TABLE_EMPTY_PLACE_HOLDER}
      </Descriptions.Item>
      {(variantSection === VariantSection.SNVTN || variantSection === VariantSection.SNVTO) && (
        <>
          <Descriptions.Item label={intl.get('filters.group.genes.cosmic.tumour_types_germline')}>
            {cmc?.tier
              ? intl.get(`filters.options.cmc.tier.${cmc.tier}`)
              : TABLE_EMPTY_PLACE_HOLDER}
          </Descriptions.Item>
          <Descriptions.Item label={intl.get('screen.variantsearch.table.hotspot')}>
            {hotspot ? (
              <FireFilled className={style.hotspotFilled} />
            ) : (
              <FireOutlined className={style.hotspotOutlined} />
            )}
          </Descriptions.Item>
        </>
      )}
    </Descriptions>
  );
};

export default ClassificationSection;
