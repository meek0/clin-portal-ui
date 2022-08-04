import { sendRequestWithRpt } from 'api';

import EnvironmentVariables from 'utils/EnvVariables';

import { TFormConfig } from './models';

const FORM_API_URL = `${EnvironmentVariables.configFor('FORM_API_URL')}/form`;

const headers = {
  'Content-Type': 'application/json',
};

const fetchConfig = (code: string) =>
  sendRequestWithRpt<{ config: TFormConfig }>({
    method: 'GET',
    url: `${FORM_API_URL}/${code}`,
    headers,
  });

export const PrescriptionFormApi = {
  fetchConfig,
};
