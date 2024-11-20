import { HomeOutlined } from '@ant-design/icons';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Button, Col, Row } from 'antd';
import { getUserFullName } from 'auth/keycloak';
import InterpretationModal from 'views/Snv/components/InterpretationModal';

import ContentWithHeader from 'components/Layout/ContentWithHeader';
import ScrollContentWithFooter from 'components/Layout/ScrollContentWithFooter';
import { LimitTo, Roles } from 'components/Roles/Rules';
import useFeatureToggle from 'hooks/useFeatureToggle';
import useQueryParams from 'hooks/useQueryParams';

import PrescriptionSearchBox from './components/PrescriptionSearchBox';
import VariantSearchBox from './components/VariantSearchBox';

import styles from './index.module.css';

const Home = () => (
  <ContentWithHeader
    headerProps={{
      icon: <HomeOutlined />,
      title: getUserFullName(),
    }}
  >
    <ScrollContentWithFooter className={styles.homePageWrapper} container>
      <div className={styles.contentWrapper}>
        <GridCard
          bordered={false}
          className={styles.contentCard}
          wrapperClassName={styles.contentCardWrapper}
          content={
            <Row gutter={[48, 48]}>
              <LimitTo roles={[Roles.Practitioner]}>
                <Col xxl={24} className={styles.contentCol}>
                  <PrescriptionSearchBox />
                </Col>
              </LimitTo>
              <LimitTo roles={[Roles.Variants]}>
                <Col xxl={24} className={styles.contentCol}>
                  <VariantSearchBox />
                </Col>
              </LimitTo>
            </Row>
          }
        />
      </div>
    </ScrollContentWithFooter>
    <VariantInterpretationModal />
  </ContentWithHeader>
);

const VariantInterpretationModal = () => {
  const queryParams = useQueryParams();
  const { isEnabled } = useFeatureToggle('interpretation');

  return (
    <div>
      <Button onClick={() => {}}>Interpretation</Button>
      <InterpretationModal
        isOpen={isEnabled}
        toggleModal={() => {}}
        isGermline={queryParams.get('interpretation') === 'germline'}
      />
    </div>
  );
};

export default Home;
