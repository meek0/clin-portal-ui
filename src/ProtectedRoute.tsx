import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import ConditionalWrapper from 'components/utils/ConditionalWrapper';
import Spinner from 'components/uiKit/Spinner';

type OwnProps = Omit<RouteProps, 'component' | 'render' | 'children'> & {
  layout?: (children: any) => React.ReactElement;
  children: React.ReactNode;
};

const ProtectedRoute = ({ children, layout, ...routeProps }: OwnProps) => {
  const { keycloak, initialized } = useKeycloak();
  const RouteLayout = layout!;
  const keycloakIsReady = keycloak && initialized;
  const showLogin = keycloakIsReady && !keycloak.authenticated;

  if (showLogin) {
    keycloak.login();
    return <Spinner size={'large'} />;
  }

  return (
    <ConditionalWrapper
      condition={RouteLayout !== undefined}
      children={<Route {...routeProps}>{children}</Route>}
      wrapper={(children) => <RouteLayout>{children}</RouteLayout>}
    />
  );
};

export default ProtectedRoute;
