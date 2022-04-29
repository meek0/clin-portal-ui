import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { OmimConditions, OmimCondition } from 'graphql/variants/models';
import { Typography } from 'antd';
import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';

interface OwnProps {
  conditions: OmimConditions;
}

const { Text } = Typography;

const OmimConditionCell = ({ conditions }: OwnProps) => (
  <div>
    {conditions.length >= 0 &&
      conditions.map((omimCondition: OmimCondition, index: number) => {
        const geneOmimName = omimCondition.omimName ?? TABLE_EMPTY_PLACE_HOLDER;
        const omimId = omimCondition.omimId;

        return (
          <StackLayout key={index}>
            <Text>{geneOmimName}</Text>&nbsp;(MIM:
            <a
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.omim.org/entry/${omimId}`}
            >
              {omimId}
            </a>
            )
          </StackLayout>
        );
      })}
  </div>
);

export default OmimConditionCell;
