import { FhirApi } from 'api/fhir';
import { ServiceRequestEntity } from 'api/fhir/models';
import { DocsWithTaskInfo } from 'views/Archives';
import { extractDocsFromTask } from 'views/Archives/helper';

import { getPatientAndRequestId } from './Tabs/Variants/utils';

export const fetchDocsForRequestId = async (requestId: string) =>
  FhirApi.searchPatientFiles(requestId).then(({ data }) => {
    if (data?.data.taskList) {
      return extractDocsFromTask(data.data.taskList);
    } else {
      return [];
    }
  });

export const fetchSamplesQCReport = async (docs: DocsWithTaskInfo[]) => {
  if (docs) {
    const file = docs.find((f) => f.format === 'JSON' && f.type === 'QCRUN');
    if (file) {
      return FhirApi.getFileURL(file?.url).then(async ({ data }) =>
        fetch(data?.url ? data.url : '', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        })
          .then((response) => response.json())
          .then((json) => {
            const allFile = json;
            return allFile.SamplesQC?.[0];
          }),
      );
    }
  }

  return null;
};

export const getAllRequestIds = (prescription: ServiceRequestEntity | undefined) => {
  const { requestId } = getPatientAndRequestId(prescription?.subject.resource);
  const otherRequestIds = (prescription?.extensions || []).map((ext) => {
    const extensionValueRef = ext?.extension?.[1];
    const { requestId } = getPatientAndRequestId(extensionValueRef?.valueReference?.resource);
    return requestId;
  });

  return [requestId, ...otherRequestIds].filter((e) => !!e?.trim());
};
