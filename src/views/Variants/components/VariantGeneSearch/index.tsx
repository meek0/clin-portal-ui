import { INDEXES } from 'graphql/constants';
import GlobalSearch, { ICustomSearchProps } from 'components/uiKit/search/GlobalSearch';
import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { VARIANT_SEARCH_QUERY } from 'graphql/variants/queries';
import intl from 'react-intl-universal';
import { Suggestion, SuggestionType } from 'api/arranger/models';
import { ArrangerApi } from 'api/arranger';
import OptionItem from './OptionItem';

type OwnProps = ICustomSearchProps & {
  type: SuggestionType;
};

export const getValue = (type: SuggestionType, option: Suggestion) =>
  type === SuggestionType.GENES ? option.symbol! : option.locus!;

const VariantGeneSearch = ({ queryBuilderId, type }: OwnProps) => {
  const { activeQuery } = useQueryBuilderState(queryBuilderId);

  return (
    <GlobalSearch<Suggestion>
      queryBuilderId={queryBuilderId}
      field={type === SuggestionType.VARIANTS ? 'locus' : 'genes.symbol'}
      index={INDEXES.VARIANT}
      placeholder={intl.get(`global.search.${type}.placeholder`)}
      emptyDescription={intl.get(`global.search.${type}.emptyText`)}
      searchFields={[]}
      tooltipText={intl.get(`global.search.${type}.tooltip`)}
      query={VARIANT_SEARCH_QUERY}
      sqon={activeQuery as ISqonGroupFilter}
      handleSearch={async (searchText: string) => {
        const { data } = await ArrangerApi.searchSuggestions(type, searchText);
        return data!;
      }}
      optionsFormatter={(options) =>
        options.map((option) => ({
          label: <OptionItem type={type} suggestion={option} value={getValue(type, option)} />,
          value: getValue(type, option),
        }))
      }
      title={intl.get(`global.search.${type}.title`)}
      limit={4}
    />
  );
};

export default VariantGeneSearch;
