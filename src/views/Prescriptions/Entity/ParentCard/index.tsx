import intl from 'react-intl-universal';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Descriptions, Divider, Space, Typography } from 'antd';
import { ServiceRequestEntityExtension } from 'api/fhir/models';
import { checkIfPatientIfAffected } from 'api/fhir/patientHelper';
import { get } from 'lodash';

import CollapsePanel from 'components/containers/collapse';
import ParagraphLoader from 'components/uiKit/ParagraphLoader';

import PatientContent from '../PatientCard/PatientContent';
import RequestTable from '../RequestTable';

const { Title } = Typography;

interface OwnProps {
  extension?: ServiceRequestEntityExtension;
  loading: boolean;
}

const ParentCard = ({ extension, loading }: OwnProps) => (
  <ParagraphLoader loading={loading} paragraph={{ rows: 6 }}>
    {extension?.extension?.length && (
      <CollapsePanel
        header={
          <Title level={4}>
            {intl.get(get(extension?.extension[0].valueCoding, 'coding[0].code', ''))}
          </Title>
        }
      >
        <Space direction="vertical" size="large">
          <GridCard
            content={
              <>
                <PatientContent
                  patient={extension?.extension[1].valueReference?.resource!}
                  labelClass="label-20"
                />
                <Divider />
                <Descriptions column={1} size="small" className="label-20">
                  <Descriptions.Item label="Statut">
                    {intl.get(checkIfPatientIfAffected(extension) ? 'affected' : 'not_affected')}
                  </Descriptions.Item>
                </Descriptions>
              </>
            }
          />
          <RequestTable patientId={extension?.extension[1].valueReference?.resource.id!} />
        </Space>
      </CollapsePanel>
    )}
  </ParagraphLoader>
);

export default ParentCard;
