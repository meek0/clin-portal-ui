import React, { useState } from 'react';
import intl from 'react-intl-universal';
import { MedicineBoxOutlined } from '@ant-design/icons';
import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { resolveSyntheticSqon } from '@ferlab/ui/core/data/sqon/utils';
import { usePrescription, usePrescriptionMapping } from 'graphql/prescriptions/actions';
import { isEmpty } from 'lodash';
import { GraphqlBackend } from 'providers';
import ApolloProvider from 'providers/ApolloProvider';

import ContentWithHeader from 'components/Layout/ContentWithHeader';
import ScrollContentWithFooter from 'components/Layout/ScrollContentWithFooter';
import { IQueryConfig } from 'utils/searchPageTypes';

import ContentContainer from './components/ContentContainer';
import Sidebar from './components/Sidebar';
import { PRESCRIPTION_QB_ID, PRESCRIPTION_SCROLL_ID } from './utils/contstant';

import styles from './index.module.scss';

export const DEFAULT_PAGE_SIZE = 20;
export const DEFAULT_PAGE = 1;

const DEFAULT_QUERY_CONFIG: IQueryConfig = {
  pageIndex: DEFAULT_PAGE,
  size: DEFAULT_PAGE_SIZE,
  sort: [],
};

const PrescriptionSearch = (): React.ReactElement => {
  const extendedMapping = usePrescriptionMapping();
  const { queryList, activeQuery } = useQueryBuilderState(PRESCRIPTION_QB_ID);
  const [prescriptionQueryConfig, setPrescriptionQueryConfig] = useState(DEFAULT_QUERY_CONFIG);

  const prescriptions = usePrescription({
    first: prescriptionQueryConfig.size,
    offset: prescriptionQueryConfig.size * (prescriptionQueryConfig.pageIndex - 1),
    sqon: resolveSyntheticSqon(queryList, activeQuery),
    sort: isEmpty(prescriptionQueryConfig.sort)
      ? [
          {
            field: 'timestamp',
            order: 'desc',
          },
        ]
      : prescriptionQueryConfig.sort,
  });

  return (
    <ContentWithHeader
      className={styles.prescriptionLayout}
      headerProps={{
        icon: <MedicineBoxOutlined />,
        title: intl.get('screen.patientsearch.title'),
      }}
    >
      <Sidebar
        queryBuilderId={PRESCRIPTION_QB_ID}
        isLoading={prescriptions.loading}
        aggregations={prescriptions.aggregations}
        extendedMapping={extendedMapping}
        filters={activeQuery as ISqonGroupFilter}
      />
      <ScrollContentWithFooter scrollId={PRESCRIPTION_SCROLL_ID}>
        <ContentContainer
          isLoading={prescriptions.loading}
          extendedMapping={extendedMapping}
          prescriptions={{
            results: prescriptions,
            queryConfig: prescriptionQueryConfig,
            setQueryConfigCg: setPrescriptionQueryConfig,
          }}
        />
      </ScrollContentWithFooter>
    </ContentWithHeader>
  );
};

const PatientSearchWrapper = () => (
  <ApolloProvider backend={GraphqlBackend.ARRANGER}>
    <PrescriptionSearch />
  </ApolloProvider>
);

export default PatientSearchWrapper;
