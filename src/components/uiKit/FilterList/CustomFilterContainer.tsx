import { useEffect, useState } from 'react';
import FilterContainer from '@ferlab/ui/core/components/filters/FilterContainer';
import { IFilter, IFilterGroup, VisualType } from '@ferlab/ui/core/components/filters/types';
import { updateActiveQueryFilters } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { underscoreToDot } from '@ferlab/ui/core/data/arranger/formatting';
import { getFilterGroup } from '@ferlab/ui/core/data/filters/utils';
import { getSelectedFilters } from '@ferlab/ui/core/data/sqon/utils';
import { ExtendedMapping, ExtendedMappingResults, GqlResults } from 'graphql/models';
import { getDictionnairyInfo, getFilters } from 'graphql/utils/Filters';
import isUndefined from 'lodash/isUndefined';

import EnvironmentVariables from 'utils/EnvVariables';
import {
  getFacetsDictionaryCNV,
  getFacetsDictionarySNV,
  getFiltersDictionary,
} from 'utils/translation';

import CustomFilterSelector from './CustomFilterSelector';
import { TCustomFilterMapper } from '.';

type OwnProps = {
  classname: string;
  index: string;
  queryBuilderId: string;
  filterKey: string;
  extendedMappingResults: ExtendedMappingResults;
  filterOpen?: boolean;
  defaultOpen?: boolean;
  filterMapper?: TCustomFilterMapper;
  intervalDecimal?: number;
};

const CustomFilterContainer = ({
  classname,
  index,
  queryBuilderId,
  filterKey,
  filterOpen,
  defaultOpen,
  extendedMappingResults,
  filterMapper,
  intervalDecimal,
}: OwnProps) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [results, setResults] = useState<GqlResults<any>>();
  const found = (extendedMappingResults?.data || []).find(
    (f: ExtendedMapping) => f.field === underscoreToDot(filterKey),
  );

  useEffect(() => {
    if (!isUndefined(filterOpen) && isOpen !== filterOpen) {
      setIsOpen(filterOpen);
    }
    // eslint-disable-next-line
  }, [filterOpen]);

  const onChange = (fg: IFilterGroup, f: IFilter[]) =>
    updateActiveQueryFilters({
      queryBuilderId,
      filterGroup: fg,
      selectedFilters: f,
      index,
    });

  const aggregations = results?.aggregations ? results?.aggregations[filterKey] : {};
  const filterGroup = getFilterGroup({
    extendedMapping: found,
    aggregation: aggregations,
    rangeTypes: [],
    filterFooter: true,
    dictionary: index === 'cnv' ? getFacetsDictionaryCNV() : getFacetsDictionarySNV(),
    intervalDecimal,
  });
  getDictionnairyInfo(found, aggregations, filterGroup);
  if (
    EnvironmentVariables.configFor('FORCE_FILTER_BOOLEAN_TO_DICTIONARY') === 'true' &&
    found?.type === 'boolean'
  ) {
    filterGroup.type = VisualType.Checkbox;
  }

  const filters = results?.aggregations ? getFilters(results?.aggregations, filterKey) : [];
  const selectedFilters = results?.data
    ? getSelectedFilters({
        queryBuilderId,
        filters,
        filterGroup,
      })
    : [];

  return (
    <div className={classname} key={filterKey}>
      <FilterContainer
        maxShowing={5}
        isOpen={isOpen}
        filterGroup={filterGroup}
        filters={filters}
        onChange={() => {}}
        selectedFilters={selectedFilters}
        onSearchVisibleChange={setIsSearchVisible}
        collapseProps={{
          headerBorderOnly: true,
        }}
        customContent={
          <CustomFilterSelector
            index={index}
            queryBuilderId={queryBuilderId}
            filterKey={filterKey}
            dictionary={getFiltersDictionary()}
            filters={filters}
            filterGroup={filterGroup}
            maxShowing={5}
            onChange={onChange}
            selectedFilters={selectedFilters}
            searchInputVisible={isSearchVisible}
            onDataLoaded={setResults}
            extendedMappingResults={extendedMappingResults}
            filterMapper={filterMapper}
          />
        }
      />
    </div>
  );
};

export default CustomFilterContainer;
