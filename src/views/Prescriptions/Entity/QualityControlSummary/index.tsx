import { CSSProperties, PropsWithChildren, ReactNode, useContext } from 'react';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import Empty from '@ferlab/ui/core/components/Empty';
import { extractServiceRequestId } from 'api/fhir/helper';
import { VariantType } from 'graphql/variants/models';

import { SexValue } from 'utils/commonTypes';

import PrescriptionEntityContext from '../context';
import { extractOptionValue } from '../Tabs/Variants/utils';

import { QualityControlUtils } from './utils';

import styles from './index.module.css';

export type TQualityControlSummaryDataItem<T = {}> = {
  header?: ReactNode;
  sampleQcReport: Record<string, any>;
  patientSex: SexValue | undefined;
  patientId: string;
  requestId: string;
  cnvCount: number;
  variantType: string;
} & T;

export type TQualityControlSummaryData<T = {}> = TQualityControlSummaryDataItem<T>[];

type TQualityControlSummaryProps = {
  prescriptionId: string;
  summaryData: TQualityControlSummaryData;
  showHeader?: boolean;
};

const QualityControlSummary = ({
  prescriptionId,
  summaryData,
  showHeader = false,
}: TQualityControlSummaryProps) => {
  const { setVariantInfo } = useContext(PrescriptionEntityContext);
  return (
    <div className={styles.qualityControlSummary}>
      {summaryData.length > 0 ? (
        <CustomDescription>
          {showHeader ? (
            <CustomDescriptionRow>
              <CustomDescriptionLabel
                style={{ width: 'unset', fontWeight: 500 }}
              ></CustomDescriptionLabel>
              {summaryData.map(({ header }, index) => (
                <CustomDescriptionLabel
                  key={`request-${index}-header`}
                  style={{ width: 'unset', fontWeight: 500 }}
                >
                  {header}
                </CustomDescriptionLabel>
              ))}
            </CustomDescriptionRow>
          ) : null}
          <CustomDescriptionRow>
            <CustomDescriptionLabel>
              {intl.get('pages.quality_control_summary.sex')}
            </CustomDescriptionLabel>
            {summaryData.map(({ sampleQcReport, patientSex }, index) => (
              <CustomDescriptionItemContent key={`request-${index}-sex`}>
                {QualityControlUtils.getSexDetail(
                  sampleQcReport['DRAGEN_capture_coverage_metrics'][
                    'Average chr Y coverage over QC coverage region'
                  ],
                  sampleQcReport['DRAGEN_capture_coverage_metrics'][
                    'Average chr X coverage over QC coverage region'
                  ],
                  patientSex,
                )}
              </CustomDescriptionItemContent>
            ))}
          </CustomDescriptionRow>
          <CustomDescriptionRow>
            <CustomDescriptionLabel>
              {intl.get('pages.quality_control_summary.contamination')}
            </CustomDescriptionLabel>
            {summaryData.map(({ sampleQcReport }, index) => (
              <CustomDescriptionItemContent key={`request-${index}-contamination`}>
                {QualityControlUtils.getContaminationDetail(
                  sampleQcReport['DRAGEN_mapping_metrics']['Estimated sample contamination'],
                )}
              </CustomDescriptionItemContent>
            ))}
          </CustomDescriptionRow>
          <CustomDescriptionRow>
            <CustomDescriptionLabel>
              {intl.get('pages.quality_control_summary.exome_avg_coverage')}
            </CustomDescriptionLabel>
            {summaryData.map(({ sampleQcReport }, index) => (
              <CustomDescriptionItemContent key={`request-${index}-exome-avg-coverage`}>
                {QualityControlUtils.getExomeAvgCoverageDetail(
                  sampleQcReport['DRAGEN_capture_coverage_metrics'][
                    'Average alignment coverage over QC coverage region'
                  ],
                )}
              </CustomDescriptionItemContent>
            ))}
          </CustomDescriptionRow>
          <CustomDescriptionRow>
            <CustomDescriptionLabel>
              {intl.get('pages.quality_control_summary.exome_coverage_15x')}
            </CustomDescriptionLabel>
            {summaryData.map(({ sampleQcReport, requestId, patientId }, index) => (
              <CustomDescriptionItemContent key={`request-${index}-exome-coverage-15x`}>
                <Link
                  to={{
                    pathname: `/prescription/entity/${extractServiceRequestId(prescriptionId)}`,
                    search: '?qcSection=CouvertureGenique',
                    hash: '#qc',
                  }}
                  onClick={() => setVariantInfo(extractOptionValue(`${patientId},${requestId}`))}
                  className={styles.link}
                >
                  {QualityControlUtils.getExomeCoverage15xDetail(
                    sampleQcReport['DRAGEN_capture_coverage_metrics'][
                      'PCT of QC coverage region with coverage [  15x: inf)'
                    ],
                  )}
                </Link>
              </CustomDescriptionItemContent>
            ))}
          </CustomDescriptionRow>
          <CustomDescriptionRow>
            <CustomDescriptionLabel>
              {intl.get('pages.quality_control_summary.uniformity_coverage')}
            </CustomDescriptionLabel>
            {summaryData.map(({ sampleQcReport }, index) => (
              <CustomDescriptionItemContent key={`request-${index}-uniformity-coverage`}>
                {QualityControlUtils.getUniformityCoverage40PercDetail(
                  sampleQcReport['DRAGEN_capture_coverage_metrics'][
                    'Uniformity of coverage (PCT > 0.4*mean) over QC coverage region'
                  ],
                )}
              </CustomDescriptionItemContent>
            ))}
          </CustomDescriptionRow>
          <CustomDescriptionRow>
            <CustomDescriptionLabel>
              {intl.get('pages.quality_control_summary.total_cnvs')}
            </CustomDescriptionLabel>
            {summaryData.map(({ cnvCount, patientId, requestId, variantType }, index) => (
              <CustomDescriptionItemContent key={`request-${index}-total-cnvs`}>
                <Link
                  to={{
                    pathname: `/prescription/entity/${extractServiceRequestId(prescriptionId)}`,
                    search: `?variantSection=${
                      variantType === VariantType.GERMLINE ? 'cnv' : 'cnv-to'
                    }`,
                    hash: '#variants',
                  }}
                  className={styles.link}
                  onClick={() => setVariantInfo(extractOptionValue(`${patientId},${requestId}`))}
                >
                  {QualityControlUtils.getCnvCountDetail(cnvCount)}
                </Link>
              </CustomDescriptionItemContent>
            ))}
          </CustomDescriptionRow>
        </CustomDescription>
      ) : (
        <Empty description={intl.get('no.results.found')} />
      )}
    </div>
  );
};

const CustomDescription = ({ children }: PropsWithChildren) => (
  <div className="ant-descriptions ant-descriptions-small ant-descriptions-bordered label-25">
    <div className="ant-descriptions-view">
      <table>
        <tbody>{children}</tbody>
      </table>
    </div>
  </div>
);

const CustomDescriptionRow = ({ children }: PropsWithChildren) => (
  <tr className="ant-descriptions-row">{children}</tr>
);

const CustomDescriptionLabel = ({
  children,
  style,
}: PropsWithChildren<{
  style?: CSSProperties;
}>) => (
  <th className="ant-descriptions-item-label" style={style}>
    {children}
  </th>
);

const CustomDescriptionItemContent = ({ children }: PropsWithChildren) => (
  <td className="ant-descriptions-item-content" colSpan={1}>
    {children}
  </td>
);

export default QualityControlSummary;
