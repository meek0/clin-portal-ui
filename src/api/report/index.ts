import { sendRequestWithRpt } from 'api';

import { MIME_TYPES } from 'utils/constants';
import EnvironmentVariables from 'utils/EnvVariables';

const ARRANGER_API = EnvironmentVariables.configFor('ARRANGER_API');

const fetchPatientTranscriptsReport = (patientId: string, variantId: string[]) =>
  sendRequestWithRpt({
    url: `${ARRANGER_API}/report/transcripts/${encodeURIComponent(patientId)}`,
    method: 'POST',
    responseType: 'arraybuffer',
    data: { variantIds: variantId },
  });

const fetchNanuqSequencingReport = (srIds: string[]) =>
  sendRequestWithRpt({
    url: `${ARRANGER_API}/report/nanuq/sequencing${
      srIds?.length ? `?${srIds.map((id) => `srIds[]=${encodeURIComponent(id)}`).join('&')}` : ''
    }`,
    headers: {
      'Content-Type': MIME_TYPES.APPLICATION_XLSX,
    },
    responseType: 'arraybuffer',
    method: 'GET',
  });

export const ReportsApi = {
  fetchPatientTranscriptsReport,
  fetchNanuqSequencingReport,
};
