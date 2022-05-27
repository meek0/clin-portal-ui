import React from 'react';
import intl from 'react-intl-universal';
import { Tag } from 'antd';
import { VarsomeVerdict } from 'graphql/variants/models';

type VerdictLabelProps = {
  verdict: VarsomeVerdict;
};

type VerdictInfo = {
  label: string;
  color: string;
};

const getVerdictInfo = (verdict: string = ''): VerdictInfo | null => {
  switch (verdict.toLowerCase()) {
    case 'pathogenic':
      return { label: intl.get('variant.acmg.verdict.pathogenic'), color: 'red' };
    case 'likely pathogenic':
      return { label: intl.get('variant.acmg.verdict.likely_pathogenic'), color: 'volcano' };
    case 'uncertain significance':
      return { label: intl.get('variant.acmg.verdict.uncertain'), color: 'gold' };
    case 'benign':
      return { label: intl.get('variant.acmg.verdict.benign'), color: 'green' };
    case 'likely benign':
      return { label: intl.get('variant.acmg.verdict.likely_benign'), color: 'blue' };
    default:
      return null;
  }
};

const VerdictLabel = ({ verdict }: VerdictLabelProps): React.ReactElement => {
  const verdictInfo = getVerdictInfo(verdict?.verdict);

  return verdictInfo ? <Tag color={verdictInfo.color}>{verdictInfo.label}</Tag> : <></>;
};

export default VerdictLabel;
