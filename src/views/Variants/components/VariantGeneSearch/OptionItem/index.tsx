import { Space, Typography } from 'antd';
import { Suggestion, SuggestionType } from 'api/arranger/models';
import SquareLabel from 'components/uiKit/search/GlobalSearch/SquareLabel';
import cx from 'classnames';

import styles from './index.module.scss';

interface OwnProps {
  type: SuggestionType;
  suggestion: Suggestion;
}

enum OptionLabel {
  VARIANT = 'VR',
  GENE = 'GN',
}

const OptionItem = ({ type, suggestion }: OwnProps) => {
  const getLabel = () => (type === SuggestionType.GENES ? OptionLabel.GENE : OptionLabel.VARIANT);

  const getValue = (option: Suggestion) =>
    type === SuggestionType.GENES ? option.symbol : option.locus;

  return (
    <Space size={12}>
      <SquareLabel label={getLabel()} className={cx(styles.searchLabel, styles[type])} />
      <Space direction="vertical" size={0}>
        <Typography.Text className={styles.variantSearchLocus}>
          {getValue(suggestion)}
        </Typography.Text>
        {suggestion.rsnumber || suggestion.ensembl_gene_id || '--'}
      </Space>
    </Space>
  );
};

export default OptionItem;
