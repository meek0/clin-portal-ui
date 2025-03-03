import React from 'react';
import { TFilterGroupDefaults } from '@ferlab/ui/core/components/filters/types';
import { DocumentNode } from 'graphql';
import { ExtendedMappingResults } from 'graphql/models';

export interface FilterGroup {
  title?: string;
  facets: React.ReactNode[];
  defaults?: { [key: string]: TFilterGroupDefaults };
  tooltips?: string[];
  intervalDecimal?: { [key: string]: number };
}

export interface FilterInfo {
  defaultOpenFacets?: string[];
  customSearches?: () => React.ReactNode[];
  groups: FilterGroup[];
}

export type TAggregationFunction = (
  index: string,
  aggList: string[],
  mappingResults: ExtendedMappingResults,
) => DocumentNode;
