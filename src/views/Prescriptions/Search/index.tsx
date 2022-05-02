import React from 'react';
import intl from 'react-intl-universal';
import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { resolveSyntheticSqon } from '@ferlab/ui/core/data/sqon/utils';
import { usePrescription, usePrescriptionMapping } from 'graphql/prescriptions/actions';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import ContentHeader from 'components/Layout/ContentHeader';
import { Space } from 'antd';
import ContentContainer from './components/ContentContainer';
import ApolloProvider from 'providers/ApolloProvider';
import { MAX_NUMBER_RESULTS, PRESCRIPTION_QB_ID, PRESCRIPTION_SCROLL_ID } from './utils/contstant';
import { GraphqlBackend } from 'providers';
import Sidebar from './components/Sidebar';
import ScrollContentWithFooter from 'components/Layout/ScrollContentWithFooter';

import styles from './index.module.scss';

const PrescriptionSearch = (): React.ReactElement => {
  const { queryList, activeQuery } = useQueryBuilderState(PRESCRIPTION_QB_ID);
  const extendedMapping = usePrescriptionMapping();
  const prescriptions = usePrescription({
    first: MAX_NUMBER_RESULTS,
    offset: 0,
    sqon: resolveSyntheticSqon(queryList, activeQuery),
    sort: [
      {
        field: 'timestamp',
        order: 'desc',
      },
    ],
  });

  return (
    <Space className={styles.prescriptionLayout} direction="vertical" size={0}>
      <ContentHeader title={intl.get('screen.patientsearch.title')} />
      <div className={styles.pageWrapper}>
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
            prescriptions={prescriptions}
            searchResults={{ data: [], loading: false, aggregations: {}, total: 0 }}
          />
        </ScrollContentWithFooter>
      </div>
    </Space>
  );
};

const PatientSearchWrapper = () => (
  <ApolloProvider backend={GraphqlBackend.ARRANGER}>
    <PrescriptionSearch />
  </ApolloProvider>
);

export default PatientSearchWrapper;
