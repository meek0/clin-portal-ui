import { sendRequestWithRpt } from 'api';

const PUBMED_API = 'https://api.ncbi.nlm.nih.gov/lit/ctxp/v1/pubmed/';

export type TPubmedCitationPayload = {
  id: string;
  nlm: {
    orig: string;
    format: string;
  };
};

const validatePubmedId = (pubmedId: string) =>
  sendRequestWithRpt<TPubmedCitationPayload>({
    url: `${PUBMED_API}?format=citation&id=${encodeURIComponent(pubmedId)}`,
    method: 'GET',
  });

export const PubmedApi = {
  validatePubmedId,
};
