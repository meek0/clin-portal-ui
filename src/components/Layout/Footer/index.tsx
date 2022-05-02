import { Col, Layout, Row } from 'antd';
import intl from 'react-intl-universal';
import get from 'lodash/get';

import styles from './index.module.scss';
import ExternalLink from 'components/uiKit/ExternalLink';

const ZEPLIN_URL = get(window, 'CLIN.zeplinUrl', process.env.REACT_APP_ZEPLIN_URL);
const FHIR_CONSOLE_URL = get(window, 'CLIN.fhirConsoleUrl', process.env.REACT_APP_FHIR_CONSOLE_URL);

const Footer = () => (
  <Layout.Footer id="footer" className={styles.footer}>
    <Row align="middle" justify="space-between">
      <Col>
        <nav>
          <ul>
            <li>
              <ExternalLink href={ZEPLIN_URL}>{intl.get('footer.navigation.zepplin')}</ExternalLink>
            </li>
            <li>
              <ExternalLink href={FHIR_CONSOLE_URL}>
                {intl.get('footer.navigation.fhir')}
              </ExternalLink>
            </li>
          </ul>
        </nav>
      </Col>
      <Col>
        <img alt="Saint-Justine" className="logo" src="/assets/logos/chujs-color.svg" />
      </Col>
    </Row>
  </Layout.Footer>
);

export default Footer;
