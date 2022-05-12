import { Spin } from 'antd';
import FilterList, { TCustomFilterMapper } from 'components/uiKit/FilterList';
import { FilterInfo } from 'components/uiKit/FilterList/types';
import { ExtendedMappingResults } from 'graphql/models';
import { v4 } from 'uuid';

export const filtersContainer = (
  mappingResults: ExtendedMappingResults,
  index: string,
  qbId: string,
  filterInfo: FilterInfo,
  filterMapper?: TCustomFilterMapper,
): React.ReactNode => {
  if (mappingResults.loading) {
    return <Spin style={{ padding: '24px', width: '100%' }} spinning />;
  }

  return (
    <FilterList
      key={v4()}
      index={index}
      queryBuilderId={qbId}
      extendedMappingResults={mappingResults}
      filterInfo={filterInfo}
      filterMapper={filterMapper}
    />
  );
};
