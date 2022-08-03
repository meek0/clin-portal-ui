import { sendRequestWithRpt } from 'api';

import EnvironmentVariables from 'utils/EnvVariables';

const FORM_API_URL = `${EnvironmentVariables.configFor('FORM_API_URL')}/form`;

const headers = {
  'Content-Type': 'application/json',
};

const fetchConfig = () =>
  sendRequestWithRpt({
    method: 'GET',
    url: `${FORM_API_URL}/MMG`,
    headers,
  });

export const PrescriptionFormApi = {
  fetchConfig,
};
