import { useKeycloak } from '@react-keycloak/web';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  RouteComponentProps,
} from 'react-router-dom';
import ContextProvider from 'providers/ContextProvider';
import Empty from '@ferlab/ui/core/components/Empty';
import { DYNAMIC_ROUTES, STATIC_ROUTES } from 'utils/routes';
import Spinner from 'components/uiKit/Spinner';
import ProtectedRoute from 'ProtectedRoute';
import PageLayout from 'components/Layout';
import AuthMiddleware from 'middleware/AuthMiddleware';
import ErrorPage from 'views/Error';
import loadable from '@loadable/component';
import { useLang } from 'store/global';
import { ConfigProvider } from 'antd';
import frFR from 'antd/lib/locale/fr_FR';
import enUS from 'antd/lib/locale/en_US';
import NotificationContextHolder from 'components/utils/NotificationContextHolder';
import { LANG } from 'utils/constants';
import ErrorBoundary from 'components/ErrorBoundary';
import { useEffect } from 'react';

const loadableProps = { fallback: <Spinner size="large" /> };

const App = () => {
  const lang = useLang();
  const { keycloak, initialized } = useKeycloak();
  const keycloakIsReady = keycloak && initialized;

  useEffect(() => {
    const showLogin = keycloakIsReady && !keycloak.authenticated;
    if (showLogin) {
      keycloak.login();
    }
  }, [keycloakIsReady, keycloak]);

  return (
    <ConfigProvider
      locale={lang === LANG.FR ? frFR : enUS}
      renderEmpty={() => <Empty imageType="grid" />}
    >
      <div className="App" id="appContainer">
        {keycloakIsReady ? (
          <AuthMiddleware>
            <Router>
              <Switch>
                <ProtectedRoute path={STATIC_ROUTES.PATIENT_EXPLORATION} layout={PageLayout}>
                  <></>
                </ProtectedRoute>
                <ProtectedRoute path={STATIC_ROUTES.VARIANT_EXPLORATION}>
                  <></>
                </ProtectedRoute>
                <Route
                  path={DYNAMIC_ROUTES.ERROR}
                  render={(props: RouteComponentProps<{ status?: any }>) => (
                    <ErrorPage status={props.match.params.status} />
                  )}
                />
                <Redirect from="*" to={STATIC_ROUTES.DASHBOARD} />
              </Switch>
              <NotificationContextHolder />
            </Router>
          </AuthMiddleware>
        ) : (
          <Spinner size={'large'} />
        )}
      </div>
    </ConfigProvider>
  );
};

const EnhanceApp = () => {
  return (
    <ErrorBoundary>
      <ContextProvider>
        <App />
      </ContextProvider>
    </ErrorBoundary>
  );
};

export default EnhanceApp;
