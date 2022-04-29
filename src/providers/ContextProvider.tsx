import intl from 'react-intl-universal';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import KeycloakProvider from 'providers/KeycloakProvider';
import getStoreConfig from 'store';
import { LANG } from 'utils/constants';
import locales from 'locales';

const { store, persistor } = getStoreConfig();
persistor.subscribe(function () {
  intl.init({
    currentLocale: store.getState().global.lang || LANG.EN,
    locales,
    warningHandler: () => '',
  });
});

const ContextProvider = ({ children }: any) => {
  return (
    <KeycloakProvider>
      <ReduxProvider store={store}>
        <PersistGate persistor={persistor}>{children}</PersistGate>
      </ReduxProvider>
    </KeycloakProvider>
  );
};

export default ContextProvider;
