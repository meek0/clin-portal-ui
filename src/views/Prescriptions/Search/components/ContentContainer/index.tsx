import React from 'react';
import intl from 'react-intl-universal';
import { Space, Tabs } from 'antd';
import { MedicineBoxFilled } from '@ant-design/icons';
import { GqlResults } from 'graphql/models';
import { ExtendedMappingResults } from 'graphql/models';
import { PrescriptionResult } from 'graphql/prescriptions/models/Prescription';
import PrescriptionsTable from 'views/Prescriptions/Search/components/table/PrescriptionsTable';
import { TableTabs } from 'views/Prescriptions/Search/utils/contstant';
import PrescriptionAutoComplete from 'components/uiKit/search/PrescriptionAutoComplete';

import styles from './index.module.scss';

const { TabPane } = Tabs;

export type PrescriptionResultsContainerProps = {
  prescriptions: GqlResults<PrescriptionResult>;
  extendedMapping: ExtendedMappingResults;
  isLoading?: boolean;
};

const ContentContainer = ({
  prescriptions,
  isLoading = false,
}: PrescriptionResultsContainerProps): React.ReactElement => (
  <Space direction="vertical" size="middle" className={styles.patientContentContainer}>
    <div className={styles.patientContentHeader}>
      <PrescriptionAutoComplete />
    </div>
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
