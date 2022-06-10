import { HomeOutlined } from '@ant-design/icons';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Col, Row } from 'antd';
import { getUserFullName } from 'auth/keycloak';

import ContentWithHeader from 'components/Layout/ContentWithHeader';
import ScrollContentWithFooter from 'components/Layout/ScrollContentWithFooter';
import { LimitTo, Roles } from 'components/Roles/Rules';

import PrescriptionSearchBox from './components/PrescriptionSearchBox';
import VariantSearchBox from './components/VariantSearchBox';

import styles from './index.module.scss';

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
              <Col xxl={24} className={styles.contentCol}>
                <LimitTo roles={[Roles.Practitioner, Roles.LDM]}>
                  <PrescriptionSearchBox />
                </LimitTo>
              </Col>
              <Col xxl={24} className={styles.contentCol}>
                <LimitTo roles={[Roles.LDM]}>
                  <VariantSearchBox />
                </LimitTo>
              </Col>
            </Row>
          }
        />
      </div>
    </ScrollContentWithFooter>
  </ContentWithHeader>
);

export default Home;
