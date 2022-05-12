import { useKeycloak } from '@react-keycloak/web';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteChildrenProps,
  RouteComponentProps,
  Redirect,
} from 'react-router-dom';
import ContextProvider from 'providers/ContextProvider';
import Empty from '@ferlab/ui/core/components/Empty';
import { DYNAMIC_ROUTES, STATIC_ROUTES } from 'utils/routes';
import Spinner from 'components/uiKit/Spinner';
import ProtectedRoute from 'ProtectedRoute';
import PageLayout from 'components/Layout';
import ErrorPage from 'views/Error';
import loadable from '@loadable/component';
import { useLang } from 'store/global';
import { ConfigProvider } from 'antd';
import frFR from 'antd/lib/locale/fr_FR';
import enUS from 'antd/lib/locale/en_US';
import NotificationContextHolder from 'components/utils/NotificationContextHolder';
import { LANG } from 'utils/constants';
import ErrorBoundary from 'components/ErrorBoundary';
import intl from 'react-intl-universal';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPractitionerRole } from 'store/user/thunks';

const loadableProps = { fallback: <Spinner size="large" /> };
const PrescriptionEntity = loadable(() => import('views/Prescriptions/Entity'), loadableProps);
const PrescriptionSearch = loadable(() => import('views/Prescriptions/Search'), loadableProps);
const VariantEntity = loadable(() => import('views/Variants/Entity'), loadableProps);
const VariantExplorationPatient = loadable(
  () => import('views/Variants/Exploration/Patient'),
  loadableProps,
);
const VariantExplorationRqdm = loadable(
  () => import('views/Variants/Exploration/Rqdm'),
  loadableProps,
);
const HomePage = loadable(() => import('views/Home'), loadableProps);
const Archives = loadable(() => import('views/Archives'), loadableProps);

const App = () => {
  const lang = useLang();
  const dispatch = useDispatch();
  const { keycloak, initialized } = useKeycloak();
  const keycloakIsReady = keycloak && initialized;

  useEffect(() => {
    if (keycloakIsReady && keycloak.authenticated) {
      dispatch(fetchPractitionerRole());
    }
    // eslint-disable-next-line
  }, [keycloakIsReady, keycloak]);

  return (
    <ConfigProvider
      locale={lang === LANG.FR ? frFR : enUS}
      renderEmpty={() => <Empty imageType="grid" description={intl.get('no.data.available')} />}
    >
      <div className="App" id="appContainer">
        {keycloakIsReady ? (
          <Router>
            <Switch>
              <ProtectedRoute exact path={STATIC_ROUTES.HOME} layout={PageLayout}>
                <HomePage />
              </ProtectedRoute>
              <ProtectedRoute exact path={STATIC_ROUTES.PRESCRIPTION_SEARCH} layout={PageLayout}>
                <PrescriptionSearch />
              </ProtectedRoute>
              <ProtectedRoute exact path={DYNAMIC_ROUTES.PRESCRIPTION_ENTITY} layout={PageLayout}>
                {(
                  props: RouteChildrenProps<{
                    id: string;
                  }>,
                ) => <PrescriptionEntity prescriptionId={props.match?.params.id!} />}
              </ProtectedRoute>
              <ProtectedRoute
                exact
                path={DYNAMIC_ROUTES.VARIANT_EXPLORATION_PATIENT}
                layout={PageLayout}
              >
                <VariantExplorationPatient />
              </ProtectedRoute>
              <ProtectedRoute
                exact
                path={STATIC_ROUTES.VARIANT_EXPLORATION_RQDM}
                layout={PageLayout}
              >
                <VariantExplorationRqdm />
              </ProtectedRoute>
              <ProtectedRoute exact path={DYNAMIC_ROUTES.VARIANT_ENTITY} layout={PageLayout}>
                <VariantEntity />
              </ProtectedRoute>
              <ProtectedRoute exact path={STATIC_ROUTES.ARCHIVE_EXPLORATION} layout={PageLayout}>
                <Archives />
              </ProtectedRoute>
              <Route
                path={DYNAMIC_ROUTES.ERROR}
                render={(props: RouteComponentProps<{ status?: any }>) => (
                  <ErrorPage status={props.match.params.status} />
                )}
              />
              <Redirect from="*" to={STATIC_ROUTES.HOME} />
            </Switch>
            <NotificationContextHolder />
          </Router>
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
