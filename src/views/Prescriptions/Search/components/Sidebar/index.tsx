import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { IFilter } from '@ferlab/ui/core/components/filters/types';
import { updateActiveQueryFilters } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { underscoreToDot } from '@ferlab/ui/core/data/arranger/formatting';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import { Spin } from 'antd';
import cx from 'classnames';
import { Aggregations } from 'graphql/models';
import { ExtendedMapping, ExtendedMappingResults } from 'graphql/models';
import { analysisFields } from 'graphql/prescriptions/models/Prescription';
import { getFilterGroup, getFilters } from 'graphql/utils/Filters';

import SidebarFilters from './Filter';

import styles from './index.module.css';

export type SidebarData = {
  queryBuilderId: string;
  aggregations: Aggregations;
  extendedMapping: ExtendedMappingResults;
  isLoading?: boolean;
};

type PrescriptionSidebarProps = SidebarData & {
  filters: ISqonGroupFilter;
};

const PrescriptionSidebar = ({
  queryBuilderId,
  aggregations,
  extendedMapping,
  filters,
  isLoading = false,
}: PrescriptionSidebarProps): React.ReactElement => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    if (location.search && !isLoading && aggregations) {
      const searchParams = new URLSearchParams(location.search);
      const hasToClearAnyway = analysisFields.some((f) => searchParams.has(f));

      analysisFields.forEach((f) => {
        const found = (extendedMapping?.data || []).find(
          (d: ExtendedMapping) => d.field === underscoreToDot(f),
        );

        const filters = getFilters(aggregations, f);
        const filterGroup = getFilterGroup(found, aggregations[f], [], false, undefined);

        const newSelectedFilters: IFilter<any>[] = [];

        if (searchParams.has(f)) {
          searchParams.getAll(f).forEach((param) => {
            const foundFilter = filters.find((i) =>
              [i.id.toLowerCase(), ((i.name || '') as string).toLowerCase()].includes(
                param.toLowerCase(),
              ),
            );
            if (foundFilter) {
              newSelectedFilters.push(foundFilter);
            }
          });
        }

        if (searchParams.has(f) || hasToClearAnyway) {
          updateActiveQueryFilters({
            queryBuilderId,
            filterGroup,
            selectedFilters: newSelectedFilters,
          });
        }
      });
    }
  }, [location, isLoading]);

  return (
    <Spin className={styles.loader} spinning={isLoading}>
      <div className={cx(styles.siderContainer, collapsed ? styles.collapsed : '')}>
        {collapsed ? (
          <MenuUnfoldOutlined onClick={() => setCollapsed(!collapsed)} />
        ) : (
          <MenuFoldOutlined onClick={() => setCollapsed(!collapsed)} />
        )}
        <ScrollContent className={cx(styles.scrollWrapper, collapsed ? styles.collapsed : '')}>
          <SidebarFilters
            queryBuilderId={queryBuilderId}
            aggregations={aggregations}
            extendedMapping={extendedMapping}
            filters={filters}
          />
        </ScrollContent>
      </div>
    </Spin>
  );
};

export default PrescriptionSidebar;
