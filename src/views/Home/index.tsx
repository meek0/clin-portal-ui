import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Col, Row } from 'antd';
import ScrollContentWithFooter from 'components/Layout/ScrollContentWithFooter';
import { useUser } from 'store/user';
import VariantSearchBox from './components/VariantSearchBox';
import ContentWithHeader from 'components/Layout/ContentWithHeader';
import { getUserFullName } from 'auth/keycloak';
import PrescriptionSearchBox from './components/PrescriptionSearchBox';

import styles from './index.module.scss';
import { HomeOutlined } from '@ant-design/icons';

const Home = () => {
  const { user } = useUser();
  const roles = user.practitionerRoles;

  return (
    <ContentWithHeader
      headerProps={{
        icon: <HomeOutlined />,
        title: getUserFullName(),
      }}
    >
      <ScrollContentWithFooter className={styles.homePageWrapper}>
        <div className={styles.contentWrapper}>
          <GridCard
            bordered={false}
            className={styles.contentCard}
            wrapperClassName={styles.contentCardWrapper}
            content={
              <Row gutter={[48, 48]}>
                <Col xxl={12} className={styles.contentCol}>
                  <PrescriptionSearchBox />
                </Col>
                <Col xxl={12} className={styles.contentCol}>
                  <VariantSearchBox />
                </Col>
              </Row>
            }
          />
        </div>
      </ScrollContentWithFooter>
    </ContentWithHeader>
  );
};

export default Home;
