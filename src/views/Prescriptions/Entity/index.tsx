import { useEffect, useMemo, useState } from 'react';
import intl from 'react-intl-universal';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { MedicineBoxOutlined } from '@ant-design/icons';
import ConditionalWrapper from '@ferlab/ui/core/components/utils/ConditionalWrapper';
import { Badge, Space, Tabs } from 'antd';
import { FhirApi } from 'api/fhir';
import { extractPatientId, extractServiceRequestId } from 'api/fhir/helper';
import { ServiceRequestEntity } from 'api/fhir/models';
import { useServiceRequestEntity } from 'graphql/prescriptions/actions';
import { GraphqlBackend } from 'providers';
import ApolloProvider from 'providers/ApolloProvider';

import Forbidden from 'components/Results/Forbidden';
import useFeatureToggle from 'hooks/useFeatureToggle';

import PrescriptionDetails from './Tabs/Details';
import PrescriptionFiles from './Tabs/Files';
import PrescriptionQC from './Tabs/QC';
import Summary from './Tabs/Summary';
import PrescriptionVariants from './Tabs/Variants';
import { getPatientAndRequestId, getVariantTypeFromServiceRequest } from './Tabs/Variants/utils';
import PrescriptionEntityContext, {
  PrescriptionEntityContextType,
  PrescriptionEntityVariantInfo,
} from './context';
import { getSequencageIndicatorForRequests, TSequencageIndicatorForRequests } from './utils';

import styles from './index.module.css';

export enum PrescriptionEntityTabs {
  SUMMARY = '#summary',
  DETAILS = '#details',
  QC = '#qc',
  VARIANTS = '#variants',
  FILES = '#files',
}

const PrescriptionEntity = () => {
  const { hash } = useLocation();
  const { push } = useHistory();
  const { id: prescriptionId } = useParams<{ id: string }>();
  const [requestLoading, setRequestLoading] = useState(true);
  const { prescription, loading } = useServiceRequestEntity(prescriptionId);
  const summaryTabFeatureToggle = useFeatureToggle('summaryTab');

  const [selectedRequest, setSelectedRequest] = useState<ServiceRequestEntity>();
  const [selectedBasedOnRequest, setBasedOnRequest] = useState<ServiceRequestEntity>();
  const [variantInfo, setVariantInfo] = useState<PrescriptionEntityVariantInfo>();
  const [sequencageIndicators, setSequencageIndicators] =
    useState<TSequencageIndicatorForRequests>();

  useEffect(() => {
    if (prescription) {
      getSequencageIndicatorForRequests(prescription).then(setSequencageIndicators);
    }
  }, [prescription]);

  useEffect(() => {
    const subjectRequestId = prescription?.subject?.resource?.requests?.[0]?.id;

    if (subjectRequestId) {
      FhirApi.fetchServiceRequestEntity(subjectRequestId).then(({ data }) => {
        setSelectedRequest(data?.data.ServiceRequest);
        data?.data.ServiceRequest.basedOn ? null : setRequestLoading(false);
      });
    } else {
      setRequestLoading(false);
    }
  }, [prescription?.subject?.resource?.requests]);

  useEffect(() => {
    if (selectedRequest?.basedOn) {
      FhirApi.fetchServiceRequestEntity(selectedRequest?.basedOn.reference).then(({ data }) => {
        setBasedOnRequest(data?.data.ServiceRequest);
        setRequestLoading(false);
      });
    }
  }, [selectedRequest]);

  const memoedContextValue = useMemo<PrescriptionEntityContextType>(() => {
    const prescriptionId = prescription ? extractServiceRequestId(prescription.id) : undefined;
    const patientId = selectedBasedOnRequest
      ? extractPatientId(selectedBasedOnRequest?.subject.reference)
      : undefined;
    const { requestId } = getPatientAndRequestId(selectedBasedOnRequest?.subject.resource);
    const variantType = getVariantTypeFromServiceRequest(selectedBasedOnRequest);

    return {
      loading: loading || requestLoading,
      patientId,
      prescription,
      prescriptionId,
      selectedRequest,
      selectedBasedOnRequest,
      setVariantInfo,
      variantInfo: variantInfo || {
        patientId,
        requestId,
        variantType,
      },
    };
  }, [
    prescription,
    selectedRequest,
    selectedBasedOnRequest,
    loading,
    requestLoading,
    variantInfo,
    setVariantInfo,
  ]);

  const getTabs = () => {
    const items = [
      {
        key: PrescriptionEntityTabs.DETAILS,
        label: intl.get('prescription.tabs.title.details'),
        children: <PrescriptionDetails />,
      },
      {
        key: PrescriptionEntityTabs.QC,
        label: (
          <ConditionalWrapper
            condition={!!sequencageIndicators?.overallIndicator}
            wrapper={(children) => (
              <Badge dot color={sequencageIndicators?.overallIndicator!} offset={[0, 4]}>
                {children}
              </Badge>
            )}
          >
            <>{intl.get('prescription.tabs.title.qc')}</>
          </ConditionalWrapper>
        ),
        children: (
          <PrescriptionQC
            metricIndicatorByRequest={sequencageIndicators?.metricIndicatorByRequest}
          />
        ),
      },
      {
        key: PrescriptionEntityTabs.VARIANTS,
        label: intl.get('prescription.tabs.title.variants'),
        children: <PrescriptionVariants />,
      },
      {
        key: PrescriptionEntityTabs.FILES,
        label: intl.get('prescription.tabs.title.files'),
        children: <PrescriptionFiles />,
      },
    ];

    if (summaryTabFeatureToggle.isEnabled) {
      items.unshift({
        key: PrescriptionEntityTabs.SUMMARY,
        label: intl.get('prescription.tabs.title.summary'),
        children: <Summary />,
      });
    }

    return items;
  };

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
        items={getTabs()}
      />
    </PrescriptionEntityContext.Provider>
  );
};

const PrescriptionEntityWrapper = () => (
  <ApolloProvider backend={GraphqlBackend.FHIR}>
    <PrescriptionEntity />
  </ApolloProvider>
);

export default PrescriptionEntityWrapper;
