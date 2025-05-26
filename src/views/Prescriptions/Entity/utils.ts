import { BooleanOperators } from '@ferlab/ui/core/data/sqon/operators';
import { ArrangerApi } from 'api/arranger';
import { FhirApi } from 'api/fhir';
import { extractServiceRequestId } from 'api/fhir/helper';
import { ServiceRequestEntity } from 'api/fhir/models';
import { IVariantResultTree } from 'graphql/cnv/models';
import { GET_VARIANT_COUNT } from 'graphql/cnv/queries';
import { getFamilyCode } from 'graphql/prescriptions/helper';
import { DocsWithTaskInfo } from 'views/Archives';
import { extractDocsFromTask } from 'views/Archives/helper';
import { wrapSqonWithPatientIdAndRequestId } from 'views/Cnv/utils/helper';

import { SexValue } from 'utils/commonTypes';

import { QualityControlUtils, TQualityControlIndicatorColor } from './QualityControlSummary/utils';
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
  variantType?: string,
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
      patientSex: prescription?.subject.resource.gender as SexValue,
      code: code || 'unknown',
      sampleQcReport: {},
      cnvCount: 0,
      variantType: variantType || '',
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
      patientSex: extensionValueRef?.valueReference?.resource.gender as SexValue,
      code: code || 'unknown',
      sampleQcReport: {},
      cnvCount: 0,
      variantType: variantType || '',
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
          fetchRequestTotalCnvs(patientId, extractServiceRequestId(prescription!.id)).then(
            (value) => {
              summaryData[index].cnvCount = value;
            },
          ),
        ),
    ),
  );

  return summaryData;
};

export type TSequencageIndicatorForRequests = {
  overallIndicator: TQualityControlIndicatorColor | null;
  metricIndicatorByRequest: Record<string, TQualityControlIndicatorColor | null>;
};

export const getSequencageIndicatorForRequests = async (
  prescription: ServiceRequestEntity,
): Promise<TSequencageIndicatorForRequests> => {
  const summaryData = await getSummaryDataForAllRequestIds(prescription);

  let overallIndicator: TSequencageIndicatorForRequests['overallIndicator'] = null;
  const metricIndicatorByRequest: TSequencageIndicatorForRequests['metricIndicatorByRequest'] = {};

  summaryData.forEach(({ requestId, sampleQcReport, cnvCount, patientSex }) => {
    if (typeof sampleQcReport === 'object' && Object.keys(sampleQcReport).length === 0) {
      return false;
    }

    const sexIndicator = QualityControlUtils.getSexMeta(
      sampleQcReport['DRAGEN_capture_coverage_metrics'][
        'Average chr Y coverage over QC coverage region'
      ],
      sampleQcReport['DRAGEN_capture_coverage_metrics'][
        'Average chr X coverage over QC coverage region'
      ],
      patientSex,
    ).color;

    const contaminationIndicator = QualityControlUtils.getContaminationIndicatorColor(
      sampleQcReport['DRAGEN_mapping_metrics']['Estimated sample contamination'],
    );

    const exomeAvgCoverageIndicator = QualityControlUtils.getExomeAvgCoverageIndicatorColor(
      sampleQcReport['DRAGEN_capture_coverage_metrics'][
        'Average alignment coverage over QC coverage region'
      ],
    );

    const exomeAvgCoverage15xIndicator = QualityControlUtils.getExomeCoverage15xIndicatorColor(
      sampleQcReport['DRAGEN_capture_coverage_metrics'][
        'PCT of QC coverage region with coverage [  15x: inf)'
      ],
    );

    const exomeAvgCoverage40PercIndicator =
      QualityControlUtils.getUniformityCoverage40PercIndicatorColor(
        sampleQcReport['DRAGEN_capture_coverage_metrics'][
          'Uniformity of coverage (PCT > 0.4*mean) over QC coverage region'
        ],
      );

    const cnvsIndicator = QualityControlUtils.getCnvCountIndicatorColor(cnvCount);

    const indicators = [
      sexIndicator,
      contaminationIndicator,
      exomeAvgCoverageIndicator,
      exomeAvgCoverage15xIndicator,
      exomeAvgCoverage40PercIndicator,
      cnvsIndicator,
    ];

    const worstIndicator = indicators.reduce<TQualityControlIndicatorColor | null>(
      (currentWorst, indicator) => {
        if (currentWorst === 'red' || indicator === 'red') return 'red';
        if (currentWorst === 'orange' || indicator === 'orange') return 'orange';
        return null;
      },
      null,
    );

    metricIndicatorByRequest[requestId] = worstIndicator;

    if (overallIndicator !== 'red') {
      if (worstIndicator === 'red') {
        overallIndicator = 'red';
      } else if (worstIndicator === 'orange' && overallIndicator !== 'orange') {
        overallIndicator = 'orange';
      }
    }
  });

  return {
    metricIndicatorByRequest,
    overallIndicator,
  };
};
