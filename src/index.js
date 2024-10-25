/* eslint-disable simple-import-sort/imports */
// required for the theme to be correctly applied
/// <reference types="@welldone-software/why-did-you-render" />
// import 'utils/wdyr';
import 'clin-portal-theme/themes/clin/main.css';

import './prototypes/number';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';
import { ContextLines } from '@sentry/integrations';
import LocalStorageIntegrations from 'utils/sentry/localStorageIntergretions';
import EnvironmentVariables from 'utils/EnvVariables';

// Import App after the style to make sure styles is apply correctly!
import App from './App';
import reportWebVitals from './reportWebVitals';

/*eslint-env node*/
const reactAppWebRoot = process.env.REACT_APP_WEB_ROOT;
const SentryDSN = EnvironmentVariables.configFor('SENTRY_API');

Sentry.init({
  dsn: SentryDSN,
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost', reactAppWebRoot],
  integrations: [
    new ContextLines(),
    Sentry.browserTracingIntegration(),
    Sentry.browserProfilingIntegration(),
    new LocalStorageIntegrations('LocalStorage'),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions
});

const container = document.getElementById('clin-ui');
const root = createRoot(container);
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
