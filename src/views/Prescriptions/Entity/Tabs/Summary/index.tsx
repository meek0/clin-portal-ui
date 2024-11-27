import React, { useContext, useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { Skeleton } from 'antd';
import Title from 'antd/lib/typography/Title';
import { ServiceRequestEntity } from 'api/fhir/models';

import CollapsePanel from 'components/containers/collapse';

import PrescriptionEntityContext from '../../context';
import QualityControlSummary, { TQualityControlSummaryData } from '../../QualityControlSummary';
import { fetchDocsForRequestId, fetchSamplesQCReport } from '../../utils';
import { formatOptionValue, getPatientAndRequestId, getRequestOptions } from '../Variants/utils';

export const getSummaryDataForAllRequestIds = async (
  prescription: ServiceRequestEntity | undefined,
): Promise<TQualityControlSummaryData> => {
  const requestOptions = getRequestOptions(prescription);
  const { requestId, patientId } = getPatientAndRequestId(prescription?.subject.resource);

  const summaryData: TQualityControlSummaryData = [
    {
      requestId,
      gender: prescription?.subject.resource.gender,
      header: requestOptions.find(({ value }) => value === formatOptionValue(patientId, requestId))
        ?.label,
      sampleQcReport: {},
    },
  ];

  (prescription?.extensions || []).forEach((ext) => {
    const extensionValueRef = ext?.extension?.[1];
    const { requestId, patientId } = getPatientAndRequestId(
      extensionValueRef?.valueReference?.resource,
    );
    summaryData.push({
      requestId,
      gender: extensionValueRef?.valueReference?.resource.gender,
      header: requestOptions.find(({ value }) => value === formatOptionValue(patientId, requestId))
        ?.label,
      sampleQcReport: {},
    });
  });

  await Promise.all(
    summaryData.map<Promise<void>>(({ requestId }, index) =>
      fetchDocsForRequestId(requestId).then((docs) => {
        if (docs.length > 0) {
          return fetchSamplesQCReport(docs).then((report) => {
            summaryData[index].sampleQcReport = report;
          });
        }
      }),
    ),
  );

  return summaryData;
};

const Summary = () => {
  const [loadingCard, setLoadingCard] = useState(true);
  const [summaryData, setSummaryData] = useState<TQualityControlSummaryData>([]);
  const { prescription, loading } = useContext(PrescriptionEntityContext);

  useEffect(() => {
    if (prescription) {
      getSummaryDataForAllRequestIds(prescription)
        .then((data) => setSummaryData(data))
        .finally(() => setLoadingCard(false));
    }
  }, [prescription]);

  return (
    <div style={{ padding: 24 }}>
      <CollapsePanel
        header={
          <Skeleton title={{ width: 200 }} paragraph={false} loading={loading} active>
            <Title level={4}>{intl.get('pages.coverage_genic.summaryCQ')}</Title>
          </Skeleton>
        }
        loading={loadingCard}
      >
        <QualityControlSummary summaryData={summaryData} showHeader />
      </CollapsePanel>
    </div>
  );
};

export default Summary;
