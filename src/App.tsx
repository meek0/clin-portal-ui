import { useKeycloak } from '@react-keycloak/web';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteChildrenProps,
  RouteComponentProps,
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

const loadableProps = { fallback: <Spinner size="large" /> };
const PrescriptionSearch = loadable(() => import('views/Prescriptions/Search'), loadableProps);
const VariantEntity = loadable(() => import('views/Variants/Entity'), loadableProps);
const VariantExploration = loadable(() => import('views/Variants'), loadableProps);

const App = () => {
  const lang = useLang();
  const { keycloak, initialized } = useKeycloak();
  const keycloakIsReady = keycloak && initialized;

  return (
    <ConfigProvider
      locale={lang === LANG.FR ? frFR : enUS}
      renderEmpty={() => <Empty imageType="grid" description={intl.get('no.data.available')} />}
    >
      <div className="App" id="appContainer">
        {keycloakIsReady ? (
          <Router>
            <Switch>
            <ProtectedRoute exact path={STATIC_ROUTES.DASHBOARD} layout={PageLayout}>
                <>Home</>
              </ProtectedRoute>
              <ProtectedRoute exact path={STATIC_ROUTES.PRESCRIPTION_SEARCH} layout={PageLayout}>
                <PrescriptionSearch />
              </ProtectedRoute>
              <ProtectedRoute exact path={DYNAMIC_ROUTES.PRESCRIPTION_ENTITY} layout={PageLayout}>
                <>Prescription Entity</>
              </ProtectedRoute>
              <ProtectedRoute exact path={STATIC_ROUTES.VARIANT_EXPLORATION} layout={PageLayout}>
                <VariantExploration />
              </ProtectedRoute>
              <ProtectedRoute exact path={DYNAMIC_ROUTES.VARIANT_ENTITY} layout={PageLayout}>
                {(
                  props: RouteChildrenProps<{
                    hash: string;
                    tabid: string | undefined;
                  }>,
                ) => (
                  <VariantEntity
                    hash={props.match?.params.hash!}
                    tabid={props.match?.params.tabid!}
                  />
                )}
              </ProtectedRoute>
              <ProtectedRoute exact path={STATIC_ROUTES.ARCHIVE_EXPLORATION} layout={PageLayout}>
                <>Archives</>
              </ProtectedRoute>
              <Route
                path={DYNAMIC_ROUTES.ERROR}
                render={(props: RouteComponentProps<{ status?: any }>) => (
                  <ErrorPage status={props.match.params.status} />
                )}
              />
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
