import React from 'react';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { Aggregations } from 'graphql/models';
import { ExtendedMappingResults } from 'graphql/models';
import { GenerateFilters } from 'graphql/utils/Filters';

import style from './index.module.css';

export type SidebarFilterProps = {
  queryBuilderId: string;
  aggregations: Aggregations;
  filters: ISqonGroupFilter;
  extendedMapping: ExtendedMappingResults;
};

export interface ItemProps {
  label: React.ReactElement;
  value: string;
}

const SidebarFilters = ({
  queryBuilderId,
  aggregations,
  extendedMapping,
}: SidebarFilterProps): React.ReactElement => (
  <>
    {GenerateFilters({
      queryBuilderId,
      aggregations,
      extendedMapping,
      className: style.facetCollapse,
    })}
  </>
);

export default SidebarFilters;
