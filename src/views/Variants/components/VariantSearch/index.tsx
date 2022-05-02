import { INDEXES } from 'graphql/constants';
import GlobalSearch, { ICustomSearchProps } from 'components/uiKit/GlobalSearch';
import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { VARIANT_SEARCH_QUERY } from 'graphql/variants/queries';
import { Space } from 'antd';
import SquareLabel from 'components/uiKit/GlobalSearch/SquareLabel';
import { VariantEntity } from 'graphql/variants/models';
import intl from 'react-intl-universal';

const OPTION_LABEL = 'VR';

const VariantSearch = ({ queryBuilderId }: ICustomSearchProps) => {
  const { activeQuery } = useQueryBuilderState(queryBuilderId);

  return (
    <GlobalSearch<VariantEntity>
      queryBuilderId={queryBuilderId}
      field="locus"
      index={INDEXES.VARIANT}
      placeholder={'e.g. 10-100063679-T-C, rs341'}
      emptyDescription={intl.get('global.search.variant.emptyText')}
      searchFields={['rsnumber', 'locus']}
      tooltipText={intl.get('global.search.variant.tooltip')}
      query={VARIANT_SEARCH_QUERY}
      sqon={activeQuery as ISqonGroupFilter}
      optionsFormatter={(options, matchRegex, search) =>
        options.map((option) => ({
          label: (
            <Space>
              <SquareLabel label={OPTION_LABEL} />
              {option.locus}
            </Space>
          ),
          value: option.locus,
        }))
      }
      title={intl.get('global.search.variant.title')}
    />
  );
};

export default VariantSearch;
