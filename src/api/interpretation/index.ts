import { sendRequestWithRpt } from 'api';

import EnvironmentVariables from 'utils/EnvVariables';
import {
  TInterpretationGermlineInput,
  TInterpretationOutput,
  TInterpretationSomaticInput,
  TMondoAutocompleteOutput,
  TPubmedOutput,
} from './model';

const MONDO_AUTOCOMPLETE_API_URL = `${EnvironmentVariables.configFor(
  'ARRANGER_API',
)}/mondo/autocomplete`;

const INTERPRETATION_API_URL = `${EnvironmentVariables.configFor(
  'RADIANT_API_URL',
)}/interpretations`;

const headers = () => ({
  'Content-Type': 'application/json',
});

type interpretationType = 'germline' | 'somatic';

function fetch({
  type,
  sequencing_id,
  locus_id,
  transcript_id,
}: {
  type: interpretationType;
  sequencing_id: string;
  locus_id: string;
  transcript_id: string;
}) {
  return sendRequestWithRpt<TInterpretationOutput>({
    method: 'GET',
    url: `${INTERPRETATION_API_URL}/${type}/${sequencing_id}/${locus_id}/${transcript_id}`,
    headers: headers(),
  });
}

function save({
  type,
  sequencing_id,
  locus_id,
  transcript_id,
  data,
}: {
  sequencing_id: string;
  locus_id: string;
  transcript_id: string;
} & (
  | { type: 'germline'; data: TInterpretationGermlineInput }
  | {
      type: 'somatic';
      data: TInterpretationSomaticInput;
    }
)) {
  return sendRequestWithRpt<TInterpretationOutput>({
    method: 'POST',
    url: `${INTERPRETATION_API_URL}/${type}/${sequencing_id}/${locus_id}/${transcript_id}`,
    headers: headers(),
    data,
  });
}

function fetchPubmed(citationId: string) {
  return sendRequestWithRpt<TPubmedOutput>({
    method: 'GET',
    url: `${INTERPRETATION_API_URL}/pubmed/${citationId}`,
    headers: headers(),
  });
}

function searchMondo(prefix: string) {
  return sendRequestWithRpt<TMondoAutocompleteOutput>({
    method: 'GET',
    url: MONDO_AUTOCOMPLETE_API_URL,
    headers: headers(),
    params: {
      prefix,
    },
  });
}

export const InterpretationApi = {
  fetch,
  save,
  fetchPubmed,
  searchMondo,
};
