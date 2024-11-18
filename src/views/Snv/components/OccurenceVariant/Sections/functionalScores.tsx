import intl from 'react-intl-universal';
import { Descriptions } from 'antd';
import { ITableVariantEntity } from 'graphql/variants/models';

import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';

import style from '../index.module.css';

interface OwnProps {
  record: ITableVariantEntity;
}

const FunctionalScoresSection = ({ record }: OwnProps) => {
  const pickedConsequence = record.consequences?.hits?.edges.find(
    ({ node }) => !!node.picked,
  )?.node;
  return (
    <Descriptions
      className={style.basicBordered}
      bordered
      size="small"
      title={intl.get('functionalScores')}
      column={1}
    >
      <Descriptions.Item label={intl.get('filters.group.consequences.predictions.sift_pred')}>
        {pickedConsequence?.predictions?.sift_pred
          ? `${intl.get(
              `filters.options.consequences.predictions.sift_pred.${pickedConsequence?.predictions.sift_pred}`,
            )} (${pickedConsequence?.predictions.sift_score})`
          : TABLE_EMPTY_PLACE_HOLDER}
      </Descriptions.Item>
      <Descriptions.Item label={intl.get('filters.group.consequences.predictions.revel_score')}>
        {pickedConsequence?.predictions?.revel_score
          ? pickedConsequence.predictions.revel_score.toExponential(2)
          : TABLE_EMPTY_PLACE_HOLDER}
      </Descriptions.Item>
      <Descriptions.Item label={intl.get('filters.group.consequences.predictions.fathmm_pred')}>
        {pickedConsequence?.predictions?.fathmm_pred
          ? `${intl.get(
              `filters.options.consequences.predictions.fathmm_pred.${pickedConsequence?.predictions.fathmm_pred}`,
            )} (${pickedConsequence?.predictions.fathmm_score})`
          : TABLE_EMPTY_PLACE_HOLDER}
      </Descriptions.Item>
      <Descriptions.Item label={intl.get('filters.group.consequences.predictions.cadd_score')}>
        {pickedConsequence?.predictions?.cadd_score
          ? pickedConsequence.predictions.cadd_score.toExponential(2)
          : TABLE_EMPTY_PLACE_HOLDER}
      </Descriptions.Item>
      <Descriptions.Item label={intl.get('cadd_phred')}>
        {pickedConsequence?.predictions?.cadd_phred
          ? pickedConsequence.predictions.cadd_phred.toExponential(2)
          : TABLE_EMPTY_PLACE_HOLDER}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default FunctionalScoresSection;
