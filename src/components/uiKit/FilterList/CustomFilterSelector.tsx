import { useEffect } from 'react';
import FilterSelector, {
  FilterSelectorProps,
} from '@ferlab/ui/core/components/filters/FilterSelector';
import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { Spin } from 'antd';
import { ExtendedMappingResults } from 'graphql/models';
import { AGGREGATION_QUERY } from 'graphql/queries';

import useGetAggregations from 'hooks/graphql/useGetAggregations';
import { resolveSyntheticSqonWithReferences } from 'utils/query';

import { TCustomFilterMapper } from '.';

type OwnProps = FilterSelectorProps & {
  index: string;
  queryBuilderId: string;
  filterKey: string;
  onDataLoaded: Function;
  extendedMappingResults: ExtendedMappingResults;
  filterMapper?: TCustomFilterMapper;
};

const CustomFilterSelector = ({
  index,
  queryBuilderId,
  filterKey,
  dictionary,
  filters,
  filterGroup,
  maxShowing,
  selectedFilters,
  onChange,
  onDataLoaded,
  searchInputVisible,
  extendedMappingResults,
  filterMapper,
  ...rest
}: OwnProps) => {
  const { queryList, activeQuery } = useQueryBuilderState(queryBuilderId);

  const resolvedSqon = filterMapper
    ? filterMapper(resolveSyntheticSqonWithReferences(queryList, activeQuery))
    : resolveSyntheticSqonWithReferences(queryList, activeQuery);
  const results = useGetAggregations(
    {
      sqon: resolvedSqon,
    },
    AGGREGATION_QUERY(index, [filterKey], extendedMappingResults),
    index,
  );

  useEffect(() => {
    if (results.data) {
      onDataLoaded(results);
    }
    // eslint-disable-next-line
  }, [results.aggregations]);

  return (
    <Spin spinning={results.loading}>
      <FilterSelector
        dictionary={dictionary}
        filterGroup={filterGroup}
        filters={filters}
        maxShowing={maxShowing}
        onChange={onChange}
        searchInputVisible={searchInputVisible}
        selectedFilters={selectedFilters}
        {...rest}
      />
    </Spin>
  );
};

export default CustomFilterSelector;
