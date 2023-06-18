import { useEffect, useMemo, useState } from 'react';
import intl from 'react-intl-universal';
import { useHistory, useLocation } from 'react-router-dom';
import { MedicineBoxOutlined } from '@ant-design/icons';
import { Space, Tabs } from 'antd';
import { FhirApi } from 'api/fhir';
import { extractPatientId, extractServiceRequestId } from 'api/fhir/helper';
import { ServiceRequestEntity } from 'api/fhir/models';
import { useServiceRequestEntity } from 'graphql/prescriptions/actions';
import { GraphqlBackend } from 'providers';
import ApolloProvider from 'providers/ApolloProvider';

import Forbidden from 'components/Results/Forbidden';

import PrescriptionDetails from './Tabs/Details';
import PrescriptionFiles from './Tabs/Files';
import PrescriptionVariants from './Tabs/Variants';
import PrescriptionEntityContext, { PrescriptionEntityContextType } from './context';

import styles from './index.module.scss';

interface OwnProps {
  prescriptionId: string;
}

enum PrescriptionEntityTabs {
  DETAILS = '#details',
  VARIANTS = '#variants',
  FILES = '#files',
}

const PrescriptionEntity = ({ prescriptionId }: OwnProps) => {
  const { hash } = useLocation();
  const { push } = useHistory();
  const { prescription, loading } = useServiceRequestEntity(prescriptionId);
  const [basedOnPrescription, setBasedOnPrescription] = useState<ServiceRequestEntity>();

  useEffect(() => {
    if (prescription?.basedOn) {
      FhirApi.fetchServiceRequestEntity(prescription?.basedOn.reference).then(({ data }) =>
        setBasedOnPrescription(data?.data.ServiceRequest),
      );
    }
  }, [prescription]);

  const memoedContextValue = useMemo<PrescriptionEntityContextType>(
    () => ({
      prescription,
      basedOnPrescription,
      loading,
      patientId: prescription ? extractPatientId(prescription?.subject.reference) : undefined,
      prescriptionId: prescription ? extractServiceRequestId(prescription.id) : undefined,
    }),
    [prescription, basedOnPrescription, loading],
  );

  if (!loading && !prescription) {
    return <Forbidden />;
  }

  return (
    <PrescriptionEntityContext.Provider value={memoedContextValue}>
      <Tabs
        defaultActiveKey={PrescriptionEntityTabs.DETAILS}
        activeKey={hash || PrescriptionEntityTabs.DETAILS}
        onChange={(activeKey) => push({ hash: activeKey })}
        tabBarExtraContent={{
          left: (
            <Space direction="horizontal" className={styles.headerIcon}>
              <MedicineBoxOutlined />
              {prescriptionId}
            </Space>
          ),
        }}
        className={styles.prescriptionEntityContainer}
      >
        <Tabs.TabPane
          key={PrescriptionEntityTabs.DETAILS}
          tab={intl.get('prescription.tabs.title.details')}
        >
          <PrescriptionDetails />
        </Tabs.TabPane>
        <Tabs.TabPane
          key={PrescriptionEntityTabs.VARIANTS}
          tab={intl.get('prescription.tabs.title.variants')}
        >
          <PrescriptionVariants />
        </Tabs.TabPane>
        <Tabs.TabPane
          key={PrescriptionEntityTabs.FILES}
          tab={intl.get('prescription.tabs.title.files')}
        >
          <PrescriptionFiles />
        </Tabs.TabPane>
      </Tabs>
    </PrescriptionEntityContext.Provider>
  );
};

const PrescriptionEntityWrapper = (props: OwnProps) => (
  <ApolloProvider backend={GraphqlBackend.FHIR}>
    <PrescriptionEntity {...props} />
  </ApolloProvider>
);

export default PrescriptionEntityWrapper;
