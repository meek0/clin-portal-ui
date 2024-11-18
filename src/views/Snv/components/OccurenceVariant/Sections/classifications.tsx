import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { Descriptions, Tag, Tooltip } from 'antd';
import { ITableVariantEntity } from 'graphql/variants/models';
import { capitalize } from 'lodash';
import { ClinvarColorMap } from 'views/Snv/Exploration/variantColumns';

import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';

import style from '../index.module.css';

interface OwnProps {
  record: ITableVariantEntity;
}

const ClassificationSection = ({ record }: OwnProps) => {
  const clinVar = record.clinvar;
  const clinVarSigKey: string[] = [];

  clinVar?.clin_sig &&
    clinVar.clin_sig.map((c) => {
      clinVarSigKey.push(c.toLowerCase());
    });
  return (
    <Descriptions
      className={style.basicBordered}
      bordered
      size="small"
      title={capitalize(intl.get('classifications'))}
      column={1}
    >
      <Descriptions.Item label={intl.get('screen.patientsnv.results.table.clinvar')}>
        {clinVar
          ? clinVarSigKey.map((clinvarKey) => (
              <Tooltip
                key={clinvarKey}
                placement="topLeft"
                title={intl.get(`clinvar.${clinvarKey}`)}
              >
                <Tag color={ClinvarColorMap[clinvarKey]}>
                  <ExternalLink
                    href={`https://www.ncbi.nlm.nih.gov/clinvar/variation/${clinVar.clinvar_id}`}
                  >
                    {intl.get(`clinvar.abrv.${clinvarKey}`)}
                  </ExternalLink>
                </Tag>
              </Tooltip>
            ))
          : TABLE_EMPTY_PLACE_HOLDER}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default ClassificationSection;
