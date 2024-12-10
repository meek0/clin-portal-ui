import { CSSProperties, PropsWithChildren, ReactNode } from 'react';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import Empty from '@ferlab/ui/core/components/Empty';
import { extractServiceRequestId } from 'api/fhir/helper';

import { QualityControlUtils } from './utils';

import styles from './index.module.css';

export type TQualityControlSummaryDataItem<T = {}> = {
  header?: ReactNode;
  sampleQcReport: Record<string, any>;
  gender: string | undefined;
  patientId: string;
  requestId: string;
  cnvCount: number;
} & T;

export type TQualityControlSummaryData<T = {}> = TQualityControlSummaryDataItem<T>[];

type TQualityControlSummaryProps = {
  prescriptionId: string;
  summaryData: TQualityControlSummaryData;
  showHeader?: boolean;
};

type TQualityControlSummarySingleProps = {
  prescriptionId: string;
  summaryDataItem: TQualityControlSummaryDataItem | null;
};

const QualityControlSummary = ({
  prescriptionId,
  summaryData,
  showHeader = false,
}: TQualityControlSummaryProps) => (
  <div className={styles.qualityControlSummary}>
    {summaryData.length > 0 ? (
      <CustomDescription>
        {showHeader ? (
          <CustomDescriptionRow>
            <CustomDescriptionLabel style={{ width: 'unset', fontWeight: 500 }}>
              {intl.get('pages.quality_control_summary.metric')}
            </CustomDescriptionLabel>
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
          {summaryData.map(({ sampleQcReport, gender }, index) => (
            <CustomDescriptionItemContent key={`request-${index}-sex`}>
              {QualityControlUtils.getSexDetail(
                sampleQcReport['DRAGEN_capture_coverage_metrics'][
                  'Average chr Y coverage over QC coverage region'
                ],
                sampleQcReport['DRAGEN_capture_coverage_metrics'][
                  'Average chr X coverage over QC coverage region'
                ],
                gender,
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
          {summaryData.map(({ sampleQcReport }, index) => (
            <CustomDescriptionItemContent key={`request-${index}-exome-coverage-15x`}>
              <Link
                to={`/prescription/entity/${extractServiceRequestId(
                  prescriptionId,
                )}?qcSection=CouvertureGenique#qc`}
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
          {summaryData.map(({ cnvCount }, index) => (
            <CustomDescriptionItemContent key={`request-${index}-total-cnvs`}>
              <Link
                to={`/prescription/entity/${extractServiceRequestId(
                  prescriptionId,
                )}?variantSection=cnv#variants`}
                className={styles.link}
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

export const QualityControlSummarySingle = ({
  prescriptionId,
  summaryDataItem,
}: TQualityControlSummarySingleProps) => (
  <div className={styles.qualityControlSummary}>
    {summaryDataItem ? (
      <CustomDescription>
        <CustomDescriptionRow>
          <CustomDescriptionLabel>
            {intl.get('pages.quality_control_summary.sex')}
          </CustomDescriptionLabel>
          <CustomDescriptionItemContent>
            {QualityControlUtils.getSexDetail(
              summaryDataItem.sampleQcReport['DRAGEN_capture_coverage_metrics'][
                'Average chr Y coverage over QC coverage region'
              ],
              summaryDataItem.sampleQcReport['DRAGEN_capture_coverage_metrics'][
                'Average chr X coverage over QC coverage region'
              ],
              summaryDataItem.gender,
            )}
          </CustomDescriptionItemContent>
          <CustomDescriptionLabel>
            {intl.get('pages.quality_control_summary.exome_coverage_15x')}
          </CustomDescriptionLabel>
          <CustomDescriptionItemContent>
            <Link
              to={`/prescription/entity/${extractServiceRequestId(
                prescriptionId,
              )}?qcSection=CouvertureGenique#qc`}
              className={styles.link}
            >
              {QualityControlUtils.getExomeCoverage15xDetail(
                summaryDataItem.sampleQcReport['DRAGEN_capture_coverage_metrics'][
                  'PCT of QC coverage region with coverage [  15x: inf)'
                ],
              )}
            </Link>
          </CustomDescriptionItemContent>
        </CustomDescriptionRow>
        <CustomDescriptionRow>
          <CustomDescriptionLabel>
            {intl.get('pages.quality_control_summary.contamination')}
          </CustomDescriptionLabel>
          <CustomDescriptionItemContent>
            {QualityControlUtils.getContaminationDetail(
              summaryDataItem.sampleQcReport['DRAGEN_mapping_metrics'][
                'Estimated sample contamination'
              ],
            )}
          </CustomDescriptionItemContent>
          <CustomDescriptionLabel>
            {intl.get('pages.quality_control_summary.uniformity_coverage')}
          </CustomDescriptionLabel>
          <CustomDescriptionItemContent>
            {QualityControlUtils.getUniformityCoverage40PercDetail(
              summaryDataItem.sampleQcReport['DRAGEN_capture_coverage_metrics'][
                'Uniformity of coverage (PCT > 0.4*mean) over QC coverage region'
              ],
            )}
          </CustomDescriptionItemContent>
        </CustomDescriptionRow>
        <CustomDescriptionRow>
          <CustomDescriptionLabel>
            {intl.get('pages.quality_control_summary.exome_avg_coverage')}
          </CustomDescriptionLabel>
          <CustomDescriptionItemContent>
            {QualityControlUtils.getExomeAvgCoverageDetail(
              summaryDataItem.sampleQcReport['DRAGEN_capture_coverage_metrics'][
                'Average alignment coverage over QC coverage region'
              ],
            )}
          </CustomDescriptionItemContent>
          <CustomDescriptionLabel>
            {intl.get('pages.quality_control_summary.total_cnvs')}
          </CustomDescriptionLabel>
          <CustomDescriptionItemContent>
            <Link
              to={`/prescription/entity/${extractServiceRequestId(
                prescriptionId,
              )}?variantSection=cnv#variants`}
              className={styles.link}
            >
              {QualityControlUtils.getCnvCountDetail(summaryDataItem.cnvCount)}
            </Link>
          </CustomDescriptionItemContent>
        </CustomDescriptionRow>
      </CustomDescription>
    ) : (
      <Empty description={intl.get('no.results.found')} />
    )}
  </div>
);

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
