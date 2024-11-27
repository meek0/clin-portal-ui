import { sendRequestWithRpt } from 'api';

import EnvironmentVariables from 'utils/EnvVariables';

const FLAG_API_URL = `${EnvironmentVariables.configFor('USERS_API_URL')}/variants`;

const headers = () => ({
  'Content-Type': 'application/json',
});

const update = (
  hash: string,
  analysis_id: string,
  patient_id: string,
  organization: string,
  variantType: string,
  body: { flags: string[] } | { note: string | null },
) =>
  sendRequestWithRpt<any>({
    method: 'POST',
    url: `${FLAG_API_URL}/${hash}_${analysis_id}_${patient_id}_${variantType}/${organization}`,
    headers: headers(),
    data: body,
  });

const get = (hash: string, analysis_id: string, patient_id: string, variantType: string) =>
  sendRequestWithRpt<any>({
    method: 'GET',
    url: `${FLAG_API_URL}/?unique_id=${hash}_${analysis_id}_${patient_id}_${variantType}`,
    headers: headers(),
  });

export const FlagApi = {
  update,
  get,
};
