import { BooleanOperators } from '@ferlab/ui/core/data/sqon/operators';
import { ArrangerApi } from 'api/arranger';
import { FhirApi } from 'api/fhir';
import { ServiceRequestEntity } from 'api/fhir/models';
import { IVariantResultTree } from 'graphql/cnv/models';
import { GET_VARIANT_COUNT } from 'graphql/cnv/queries';
import { getFamilyCode } from 'graphql/prescriptions/helper';
import { DocsWithTaskInfo } from 'views/Archives';
import { extractDocsFromTask } from 'views/Archives/helper';
import { wrapSqonWithPatientIdAndRequestId } from 'views/Cnv/utils/helper';

import { formatOptionValue, getPatientAndRequestId } from './Tabs/Variants/utils';
import { TQualityControlSummaryData } from './QualityControlSummary';

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

export const getRequestCodeAndValue = (
  serviceRequest: ServiceRequestEntity | undefined,
): { code: string; value: string }[] => {
  const { patientId, requestId } = getPatientAndRequestId(serviceRequest?.subject.resource);
  const familyCode = getFamilyCode(serviceRequest, patientId!);

  return [
    {
      code: familyCode ? familyCode : 'proband',
      value: formatOptionValue(patientId, requestId),
    },
    ...(serviceRequest?.extensions || []).map((ext) => {
      const code = ext?.extension?.[0]?.valueCoding?.coding?.[0].code;
      const extensionValueRef = ext?.extension?.[1];

      const { patientId, requestId } = getPatientAndRequestId(
        extensionValueRef?.valueReference?.resource,
      );

      return {
        code: code || '',
        value: formatOptionValue(patientId, requestId),
      };
    }),
  ];
};

export const fetchRequestTotalCnvs = async (patientId: string, requestId: string) => {
  const { data } = await ArrangerApi.graphqlRequest<{ data: IVariantResultTree }>({
    query: GET_VARIANT_COUNT.loc?.source.body,
    variables: {
      sqon: wrapSqonWithPatientIdAndRequestId(
        {
          op: BooleanOperators.and,
          content: [],
        },
        patientId,
        requestId,
      ),
    },
  });
  return data?.data?.cnv.hits.total ?? 0;
};

export const getGenderForRequestId = (
  prescription: ServiceRequestEntity | undefined,
  requestId: string,
): string | undefined => {
  const resource = getPatientAndRequestId(prescription?.subject.resource);

  if (resource.requestId === requestId) {
    return prescription?.subject.resource.gender;
  }

  return (prescription?.extensions || []).find((ext) => {
    const extensionValueRef = ext?.extension?.[1];
    const resource = getPatientAndRequestId(extensionValueRef?.valueReference?.resource);
    return resource.requestId === requestId;
  })?.extension?.[1].valueReference?.resource.gender;
};

export type TQualityControlSummaryDataWithCode = TQualityControlSummaryData<{ code: string }>;

export const getSummaryDataForAllRequestIds = async (
  prescription: ServiceRequestEntity | undefined,
): Promise<TQualityControlSummaryDataWithCode> => {
  const requestOptions = getRequestCodeAndValue(prescription);
  const { requestId, patientId } = getPatientAndRequestId(prescription?.subject.resource);
  const code = requestOptions.find(
    ({ value }) => value === formatOptionValue(patientId, requestId),
  )?.code;

  const summaryData: TQualityControlSummaryDataWithCode = [
    {
      patientId,
      requestId,
      gender: prescription?.subject.resource.gender,
      code: code || 'unknown',
      sampleQcReport: {},
      cnvCount: 0,
    },
  ];

  (prescription?.extensions || []).forEach((ext) => {
    const extensionValueRef = ext?.extension?.[1];
    const { requestId, patientId } = getPatientAndRequestId(
      extensionValueRef?.valueReference?.resource,
    );
    const code = requestOptions.find(
      ({ value }) => value === formatOptionValue(patientId, requestId),
    )?.code;

    summaryData.push({
      patientId,
      requestId,
      gender: extensionValueRef?.valueReference?.resource.gender,
      code: code || 'unknown',
      sampleQcReport: {},
      cnvCount: 0,
    });
  });

  await Promise.all(
    summaryData.map<Promise<void>>(({ requestId, patientId }, index) =>
      fetchDocsForRequestId(requestId)
        .then((docs) => {
          if (docs.length > 0) {
            return fetchSamplesQCReport(docs).then((report) => {
              summaryData[index].sampleQcReport = report;
            });
          }
        })
        .then(() =>
          fetchRequestTotalCnvs(patientId, requestId).then((value) => {
            summaryData[index].cnvCount = value;
          }),
        ),
    ),
  );

  return summaryData;
};

const getSequencageIndicatorForRequests = async (prescription: ServiceRequestEntity) => {
  const summaryData = await getSummaryDataForAllRequestIds(prescription);

  // Loop and get find the worst metric for each request and also the worst metric across requests
};
