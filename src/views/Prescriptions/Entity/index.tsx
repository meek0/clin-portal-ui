import { DownloadOutlined, MedicineBoxOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Typography } from 'antd';
import CollapsePanel from 'components/containers/collapse';
import LineStyleIcon from 'components/icons/LineStyleIcon';
import ContentWithHeader from 'components/Layout/ContentWithHeader';
import ScrollContentWithFooter from 'components/Layout/ScrollContentWithFooter';
import intl from 'react-intl-universal';
import ApolloProvider from 'providers/ApolloProvider';
import { GraphqlBackend } from 'providers';
import { usePrescriptionEntity } from 'graphql/prescriptions/actions';
import ParagraphLoader from 'components/uiKit/ParagraphLoader';
import AnalysisCard from './AnalysisCard';
import PatientCard from './PatientCard';
import { Link } from 'react-router-dom';
import Container from 'components/Layout/Container';

import styles from './index.module.scss';

const { Title } = Typography;

interface OwnProps {
  prescriptionId: string;
}

const PrescriptionEntity = ({ prescriptionId }: OwnProps) => {
  const { prescription, loading } = usePrescriptionEntity(prescriptionId);

  return (
    <ContentWithHeader
      headerProps={{
        icon: <MedicineBoxOutlined />,
        title: intl.get('screen.prescription.entity.title', { id: prescriptionId }),
        actions: [
          <Button key="documents" icon={<DownloadOutlined />}>
            {intl.get('screen.prescription.entity.download.documents')}
          </Button>,
          <Link
            key="variants"
            to={`/variant-exploration/${prescription?.patientInfo?.cid}/${prescriptionId}`}
          >
            <Button type="primary" icon={<LineStyleIcon height="14" width="14" />}>
              {intl.get('screen.prescription.entity.see.variant')}
            </Button>
          </Link>,
        ],
      }}
    >
      <ScrollContentWithFooter>
        <div className={styles.prescriptionEntityWrapper}>
          <Container>
            <Row gutter={[24, 24]}>
              <Col span={12}>
                <AnalysisCard prescription={prescription} loading={loading} />
              </Col>
              <Col span={12}>
                <PatientCard prescription={prescription} loading={loading} />
              </Col>
              <Col span={24}>
                <Card title="Commentaire">
                  <ParagraphLoader loading={loading} paragraph={{ rows: 2 }}>
                    Purus sit mauris nam porttitor elit, ut. Nulla porttitor sed volutpat vitae sed
                    sodales enim, nisi.
                  </ParagraphLoader>
                </Card>
              </Col>
              <Col span={24}>
                <CollapsePanel header={<Title level={4}>Information clinique</Title>}>
                  {' '}
                </CollapsePanel>
              </Col>
            </Row>
          </Container>
        </div>
      </ScrollContentWithFooter>
    </ContentWithHeader>
  );
};

const PrescriptionEntityWrapper = (props: OwnProps) => (
  <ApolloProvider backend={GraphqlBackend.ARRANGER}>
    <PrescriptionEntity {...props} />
  </ApolloProvider>
);

export default PrescriptionEntityWrapper;
