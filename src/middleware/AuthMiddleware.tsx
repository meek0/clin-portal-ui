import React from 'react';

type Props = {
  children: React.ReactElement;
};

const AuthMiddleware = ({ children }: Props) => {
  //const { isLoading } = useUser();
  //const { isLoading: isSavedFilterLoading } = useSavedFilter();
  //const { keycloak } = useKeycloak();
  //const dispatch = useDispatch();
  //const params = useQueryParams();

  //useEffect(() => {
  //  const sharedFilterId = params.get(SHARED_FILTER_ID_QUERY_PARAM_KEY);
  //  if (sharedFilterId) {
  //    dispatch(fetchSharedSavedFilter(sharedFilterId));
  //  }
  //  // eslint-disable-next-line
  //}, []);

  //useEffect(() => {
  //  if (keycloak.authenticated) {
  //    dispatch(fetchUser());
  //    dispatch(fetchSavedFilters());
  //    dispatch(fetchSavedSet());
  //  } else {
  //    dispatch(userActions.setIsUserLoading(false));
  //  }
  //  // eslint-disable-next-line
  //}, [keycloak]);

  return children
};

export default AuthMiddleware;
