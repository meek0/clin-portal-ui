import React from 'react';
import intl from 'react-intl-universal';
import { Space, Tabs } from 'antd';
import { MedicineBoxFilled } from '@ant-design/icons';
import { GqlResults } from 'graphql/models';
import { ExtendedMappingResults } from 'graphql/models';
import { PatientResult } from 'graphql/patients/models/Patient';
import { PrescriptionResult } from 'graphql/prescriptions/models/Prescription';
import ContentHeader from 'views/Prescriptions/Search/components/ContentHeader';
import PrescriptionsTable from 'views/Prescriptions/Search/components/table/PrescriptionsTable';
import { TableTabs } from 'views/Prescriptions/Search/utils/contstant';

import styles from './index.module.scss';

const { TabPane } = Tabs;

export type PrescriptionResultsContainerProps = {
  prescriptions: GqlResults<PrescriptionResult>;
  extendedMapping: ExtendedMappingResults;
  searchResults: GqlResults<PatientResult> | null;
  isLoading?: boolean;
};

const ContentContainer = ({
  prescriptions,
  searchResults,
  isLoading = false,
}: PrescriptionResultsContainerProps): React.ReactElement => (
  <Space direction="vertical" size="middle" className={styles.patientContentContainer}>
    <ContentHeader searchResults={searchResults} />
    <Tabs type="card">
      <TabPane
        key={TableTabs.Prescriptions}
        tab={
          <>
            <MedicineBoxFilled />
            {intl.get('screen.patient.tab.prescriptions')}{' '}
            {prescriptions?.total && ` (${prescriptions?.total})`}
          </>
        }
      >
        <PrescriptionsTable results={prescriptions} loading={isLoading} />
      </TabPane>
    </Tabs>
  </Space>
);

export default ContentContainer;
