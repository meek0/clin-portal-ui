import { useEffect } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
} from 'react-router-dom';
import Empty from '@ferlab/ui/core/components/Empty';
import loadable from '@loadable/component';
import { useKeycloak } from '@react-keycloak/web';
import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import frFR from 'antd/lib/locale/fr_FR';
import ProtectedRoute from 'ProtectedRoute';
import ContextProvider from 'providers/ContextProvider';
import ErrorPage from 'views/Error';
import Landing from 'views/Landing';

import ErrorBoundary from 'components/ErrorBoundary';
import PageLayout from 'components/Layout';
import { Roles } from 'components/Roles/Rules';
import Spinner from 'components/uiKit/Spinner';
import NotificationContextHolder from 'components/utils/NotificationContextHolder';
import useQueryParams from 'hooks/useQueryParams';
import { initGa } from 'services/analytics';
import { useLang } from 'store/global';
import { fetchFhirServiceRequestCodes } from 'store/global/thunks';
import { fetchSavedFilters, fetchSharedSavedFilter } from 'store/savedFilter/thunks';
import { fetchConfig, fetchPractitionerRole, fetchPractitionerRoles } from 'store/user/thunks';
import { LANG, SHARED_FILTER_ID_QUERY_PARAM_KEY } from 'utils/constants';
import EnvironmentVariables from 'utils/EnvVariables';
import { DYNAMIC_ROUTES, STATIC_ROUTES } from 'utils/routes';

const loadableProps = { fallback: <Spinner size="large" /> };
const BioInfoAnalysis = loadable(() => import('views/BioInfoAnalysis'), loadableProps);
const PrescriptionEntity = loadable(() => import('views/Prescriptions/Entity'), loadableProps);
const PrescriptionSearch = loadable(() => import('views/Prescriptions/Search'), loadableProps);
const VariantEntity = loadable(() => import('views/Snv/Entity'), loadableProps);
const SnvExplorationPatient = loadable(
  () => import('views/Snv/Exploration/Patient'),
  loadableProps,
);
const CnvExplorationPatient = loadable(
  () => import('views/Cnv/Exploration/Patient'),
  loadableProps,
);
const SnvExplorationRqdm = loadable(() => import('views/Snv/Exploration/Rqdm'), loadableProps);
const HomePage = loadable(() => import('views/Home'), loadableProps);
const Archives = loadable(() => import('views/Archives'), loadableProps);

initGa();

const App = () => {
  const lang = useLang();
  const dispatch = useDispatch();
  const params = useQueryParams();
  const { keycloak, initialized } = useKeycloak();
  const keycloakIsReady = keycloak && initialized;

  useEffect(() => {
    if (keycloakIsReady && keycloak.authenticated) {
      dispatch(fetchSavedFilters());
      dispatch(fetchPractitionerRole());
      dispatch(fetchPractitionerRoles());
      dispatch(fetchFhirServiceRequestCodes());
      dispatch(fetchConfig());

      const sharedFilterId = params.get(SHARED_FILTER_ID_QUERY_PARAM_KEY);
      if (sharedFilterId) {
        dispatch(fetchSharedSavedFilter(sharedFilterId));
      }
    }
    // eslint-disable-next-line
  }, [keycloakIsReady, keycloak]);

  useEffect(() => {
    if (keycloakIsReady && keycloak.authenticated) {
      const script = document.createElement('script');
      document.body.appendChild(script);
      const idByLang = lang === LANG.FR ? 'pD6A3kMjCfERq52yyEZYg8' : '57UqYYjNEqnTnVV3qf97Yz';
      script.innerHTML = `
        var releasecat = {
          id: '${idByLang}',
          production: ${EnvironmentVariables.configFor(
            'SHOW_ONLY_NEW_INFO_POPUP',
          )} // Change to 'true' for production. keep false for QA
        };
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.releasecat.io/embed/index.js';
        script.defer = true;
        document.head.appendChild(script);
      `;
      // Nettoyer le script à la désinstallation du composant
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [lang, keycloakIsReady, keycloak]);

  return (
    <ConfigProvider
      locale={lang === LANG.FR ? frFR : enUS}
      renderEmpty={() => <Empty imageType="grid" description={intl.get('no.data.available')} />}
    >
      <div className="App" id="appContainer">
        {keycloakIsReady ? (
          <Router>
            <Switch>
              <Route exact path={STATIC_ROUTES.LANDING}>
                <Landing />
              </Route>
              <ProtectedRoute exact path={STATIC_ROUTES.HOME} layout={PageLayout}>
                <HomePage />
              </ProtectedRoute>
              <ProtectedRoute
                exact
                path={STATIC_ROUTES.PRESCRIPTION_SEARCH}
                layout={PageLayout}
                roles={[Roles.Practitioner]}
              >
                <PrescriptionSearch />
              </ProtectedRoute>
              <ProtectedRoute
                exact
                path={DYNAMIC_ROUTES.PRESCRIPTION_ENTITY}
                layout={PageLayout}
                roles={[Roles.Practitioner]}
              >
                <PrescriptionEntity />
              </ProtectedRoute>
              <ProtectedRoute
                exact
                path={DYNAMIC_ROUTES.BIOINFO_ANALYSIS}
                layout={PageLayout}
                roles={[Roles.Download]}
              >
                <BioInfoAnalysis />
              </ProtectedRoute>
              <ProtectedRoute
                exact
                path={DYNAMIC_ROUTES.SNV_EXPLORATION_PATIENT}
                layout={PageLayout}
                roles={[Roles.Variants]}
              >
                <SnvExplorationPatient />
              </ProtectedRoute>
              <ProtectedRoute
                exact
                path={DYNAMIC_ROUTES.CNV_EXPLORATION_PATIENT}
                layout={PageLayout}
                roles={[Roles.Variants]}
              >
                <CnvExplorationPatient />
              </ProtectedRoute>
              <ProtectedRoute
                exact
                path={STATIC_ROUTES.SNV_EXPLORATION_RQDM}
                layout={PageLayout}
                roles={[Roles.Variants]}
              >
                <SnvExplorationRqdm />
              </ProtectedRoute>
              <ProtectedRoute
                exact
                path={DYNAMIC_ROUTES.VARIANT_ENTITY}
                layout={PageLayout}
                roles={[Roles.Variants]}
              >
                <VariantEntity />
              </ProtectedRoute>
              <ProtectedRoute
                exact
                path={STATIC_ROUTES.ARCHIVE_EXPLORATION}
                layout={PageLayout}
                roles={[Roles.Download]}
              >
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

const EnhanceApp = () => (
  <ErrorBoundary>
    <ContextProvider>
      <App />
    </ContextProvider>
  </ErrorBoundary>
);

export default EnhanceApp;
