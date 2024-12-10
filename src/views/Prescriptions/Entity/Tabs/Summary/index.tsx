import { useContext, useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { Skeleton } from 'antd';
import Title from 'antd/lib/typography/Title';

import CollapsePanel from 'components/containers/collapse';

import PrescriptionEntityContext from '../../context';
import QualityControlSummary from '../../QualityControlSummary';
import { getSummaryDataForAllRequestIds, TQualityControlSummaryDataWithCode } from '../../utils';

const Summary = () => {
  const [loadingCard, setLoadingCard] = useState(true);
  const [summaryData, setSummaryData] = useState<TQualityControlSummaryDataWithCode>([]);
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
        {prescription && (
          <QualityControlSummary
            prescriptionId={prescription.id}
            summaryData={summaryData.map(({ code, ...data }) => ({
              ...data,
              header: `${intl.get(code)} (${data.requestId})`,
            }))}
            showHeader
          />
        )}
      </CollapsePanel>
    </div>
  );
};

export default Summary;
