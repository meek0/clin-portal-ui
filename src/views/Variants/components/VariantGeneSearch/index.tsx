import { INDEXES } from 'graphql/constants';
import GlobalSearch, { ICustomSearchProps } from 'components/uiKit/GlobalSearch';
import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { VARIANT_SEARCH_QUERY } from 'graphql/variants/queries';
import { Space, Typography } from 'antd';
import SquareLabel from 'components/uiKit/GlobalSearch/SquareLabel';
import { Suggestion, SuggestionType } from 'graphql/variants/models';
import intl from 'react-intl-universal';
import cx from "classnames";
import { sendRequest } from 'api';
import { ISuggestionPayload } from 'components/uiKit/GlobalSearch/types';

import styles from './index.module.scss';

type OwnProps = ICustomSearchProps & {
  type: SuggestionType;
};

enum OptionLabel {
  VARIANT = 'VR',
  GENE = 'GN',
}

const { Text } = Typography;

const VariantGeneSearch = ({ queryBuilderId, type }: OwnProps) => {
  const { activeQuery } = useQueryBuilderState(queryBuilderId);

  const getValue = (option: Suggestion) =>
    type === SuggestionType.GENES ? option.symbol : option.locus;

  const getLabel = () => (type === SuggestionType.GENES ? OptionLabel.GENE : OptionLabel.VARIANT);

  return (
    <GlobalSearch<Suggestion>
      queryBuilderId={queryBuilderId}
      field=""
      index={INDEXES.VARIANT}
      placeholder={intl.get(`global.search.${type}.placeholder`)}
      emptyDescription={intl.get(`global.search.${type}.emptyText`)}
      searchFields={[]}
      tooltipText={intl.get(`global.search.${type}.tooltip`)}
      query={VARIANT_SEARCH_QUERY}
      sqon={activeQuery as ISqonGroupFilter}
      handleSearch={async (searchText: string) => {
        const response = await sendRequest<ISuggestionPayload<Suggestion>>({
          url: `${process.env.REACT_APP_ARRANGER_API}/${type}Feature/suggestions/${searchText}`,
          method: 'GET',
        });
        return response.data!;
      }}
      optionsFormatter={(options) =>
        options.map((option) => ({
          label: (
            <Space size={12}>
              <SquareLabel label={getLabel()} className={cx(styles.searchLabel, styles[type])} />
              <Space direction="vertical" size={0}>
                <Text className={styles.variantSearchLocus}>{getValue(option)}</Text>
                {option.rsnumber || option.ensembl_gene_id || '--'}
              </Space>
            </Space>
          ),
          value: option.locus!,
        }))
      }
      title={intl.get(`global.search.${type}.title`)}
      limit={4}
    />
  );
};

export default VariantGeneSearch;
