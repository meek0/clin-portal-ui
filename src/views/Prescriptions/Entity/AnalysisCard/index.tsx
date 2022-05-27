import intl from 'react-intl-universal';
import { Card, Descriptions, Tag } from 'antd';
import { extractOrganizationId, extractServiceRequestId } from 'api/fhir/helper';
import { ServiceRequestEntity } from 'api/fhir/models';
import StatusTag from 'views/Prescriptions/components/StatusTag';
import { getPrescriptionStatusDictionnary } from 'views/Prescriptions/utils/constant';

import ParagraphLoader from 'components/uiKit/ParagraphLoader';
import { useGlobals } from 'store/global';
import { formatDate } from 'utils/date';
import { formatNumber } from 'utils/formatNumber';

interface OwnProps {
  prescription?: ServiceRequestEntity;
  loading: boolean;
}

const AnalysisCard = ({ prescription, loading }: OwnProps) => {
  const { getAnalysisNameByCode } = useGlobals();

  return (
    <Card title={intl.get(`screen.prescription.entity.analyse.card.title`)}>
      <ParagraphLoader loading={loading} paragraph={{ rows: 5 }}>
        {prescription && (
          <Descriptions column={1} size="small" className="label-35">
            <Descriptions.Item
              label={intl.get('screen.prescription.entity.analysisCard.prescriptionId')}
            >
              {formatNumber(extractServiceRequestId(prescription?.id))}
            </Descriptions.Item>
            <Descriptions.Item label={intl.get('status')}>
              <StatusTag
                dictionary={getPrescriptionStatusDictionnary()}
                status={prescription?.status}
              />
            </Descriptions.Item>
            <Descriptions.Item
              label={intl.get('screen.prescription.entity.analysisCard.askedAnalysis')}
            >
              <Tag color="geekblue">{getAnalysisNameByCode(prescription.code)}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label={intl.get('screen.patientsearch.table.createdOn')}>
              {formatDate(prescription?.authoredOn)}
            </Descriptions.Item>
            <Descriptions.Item label={intl.get('screen.patientsearch.table.ldm')}>
              {extractOrganizationId(prescription?.performer.resource.alias)}
            </Descriptions.Item>
          </Descriptions>
        )}
      </ParagraphLoader>
    </Card>
  );
};

export default AnalysisCard;
