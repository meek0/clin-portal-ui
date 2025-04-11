import { extractPatientId, extractServiceRequestId } from 'api/fhir/helper';
import { FhirDoc, PatientTaskResults } from 'graphql/patients/models/Patient';
import { EMPTY_FIELD } from 'views/Prescriptions/Entity/constants';

import { formatDate } from 'utils/date';
import { formatFileSize } from 'utils/formatFileSize';

import { DocsWithTaskInfo } from '.';

const INDEXES_FORMAT = ['CRAI', 'TBI'];

export const extractContentsFromDocs = (docs?: FhirDoc[]) =>
  extractDocsFromTask([
    {
      id: '',
      authoredOn: '',
      runDate: '',
      runAlias: '',
      owner: { id: '', alias: '', email: '' },
      focus: { request: { id: '', basedOn: { reference: '' } } },
      docs: [...(docs || [])],
      basedOn: [
        {
          id: '',
          extensions: [],
        },
      ],
    },
  ]);

export const extractDocsFromTask = (tasks: PatientTaskResults) => {
  const docsList: DocsWithTaskInfo[] = [];
  tasks?.forEach((task) => {
    const docs = Array.isArray(task.docs) ? [...task.docs] : [task.docs];
    docs.forEach((doc) => {
      doc?.content?.forEach((content) => {
        // ignore index files
        if (!INDEXES_FORMAT.includes(content.format)) {
          const relationship = task?.basedOn?.[0].extensions?.find((e) =>
            e.reference.includes(extractPatientId(doc.patientReference)),
          )?.code[0];

          docsList.push({
            ...doc,
            key: content.attachment.title,
            url: content.attachment.url,
            taskRunAlias: task.runAlias,
            taskAuthoredOn: task.authoredOn ? formatDate(task.authoredOn) : EMPTY_FIELD,
            taskOwner: task.owner,
            taskId: task.id,
            patientId: extractPatientId(doc.patientReference),
            hash: content.attachment.hash,
            relationship: relationship ? relationship : 'proband',
            srRef: extractServiceRequestId(task.focus.request.id),
            basedOnSrRef: extractServiceRequestId(task?.basedOn?.[0].id[0]),
            size: formatFileSize(Number(content.attachment.size)) as string,
            originalSize: content.attachment.size,
            title: content.attachment.title,
            format: content.format,
            action: {
              format: content.format,
              metadata: doc,
              urls: {
                file: content.attachment.url,
                // add index file if available
                index:
                  doc.content.length > 1 && INDEXES_FORMAT.includes(doc.content[1].format)
                    ? doc.content[1].attachment.url
                    : '',
              },
            },
          });
        }
      });
    });
  });
  return docsList;
};
