import { SearchOutlined } from '@ant-design/icons';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Col, Row } from 'antd';
import ScrollContentWithFooter from 'components/Layout/ScrollContentWithFooter';
import { useUser } from 'store/user';
import SearchBox from './components/SearchBox';
import VariantSearchBox from './components/VariantSearchBox';
import intl from 'react-intl-universal';

import styles from './index.module.scss';

const Home = () => {
  const { user } = useUser();
  const roles = user.practitionerRoles;

  return (
    <ScrollContentWithFooter className={styles.homePageWrapper}>
      <div className={styles.contentWrapper}>
        <GridCard
          bordered={false}
          className={styles.contentCard}
          wrapperClassName={styles.contentCardWrapper}
          content={
            <Row gutter={[48, 48]}>
              <Col xxl={12} className={styles.contentCol}>
                <SearchBox
                  icon={<SearchOutlined />}
                  title={intl.get('home.prescription.search.box.title')}
                  searchPlaceholder={intl.get('home.prescription.search.box.placeholder')}
                  searchLabel={intl.get('home.prescription.search.box.label')}
                />
              </Col>
              <Col xxl={12} className={styles.contentCol}>
                <VariantSearchBox />
              </Col>
            </Row>
          }
        />
      </div>
    </ScrollContentWithFooter>
  );
};

export default Home;
