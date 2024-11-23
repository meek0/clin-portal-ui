import { CSSProperties, PropsWithChildren, ReactNode } from 'react';
import intl from 'react-intl-universal';
import Empty from '@ferlab/ui/core/components/Empty';

import { QualityControlUtils } from './utils';

type TQualityControlSummaryProps = {
  summaryData: {
    header?: ReactNode;
    gcReport: any;
  }[];
  showHeader?: boolean;
  patientSex: string | undefined;
};

const QualityControlSummary = ({
  summaryData,
  patientSex,
  showHeader = false,
}: TQualityControlSummaryProps) => (
  <>
    {summaryData.length > 0 ? (
      <CustomDescription>
        {showHeader ? (
          <CustomDescriptionRow>
            <CustomDescriptionLabel></CustomDescriptionLabel>
            {summaryData.map(({ header }, index) => (
              <CustomDescriptionLabel key={`request-${index}-header`} style={{ width: 'unset' }}>
                {header}
              </CustomDescriptionLabel>
            ))}
          </CustomDescriptionRow>
        ) : null}
        <CustomDescriptionRow>
          <CustomDescriptionLabel>
            {intl.get('pages.quality_control_summary.sex')}
          </CustomDescriptionLabel>
          {summaryData.map(({ gcReport }, index) => (
            <CustomDescriptionItemContent key={`request-${index}-sex`}>
              {QualityControlUtils.getSexDetail(
                gcReport['DRAGEN_capture_coverage_metrics'][
                  'Average chr Y coverage over QC coverage region'
                ],
                gcReport['DRAGEN_capture_coverage_metrics'][
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
          {summaryData.map(({ gcReport }, index) => (
            <CustomDescriptionItemContent key={`request-${index}-contamination`}>
              {QualityControlUtils.getContaminationDetail(
                gcReport['DRAGEN_mapping_metrics']['Estimated sample contamination'],
              )}
            </CustomDescriptionItemContent>
          ))}
        </CustomDescriptionRow>
        <CustomDescriptionRow>
          <CustomDescriptionLabel>
            {intl.get('pages.quality_control_summary.exome_avg_coverage')}
          </CustomDescriptionLabel>
          {summaryData.map(({ gcReport }, index) => (
            <CustomDescriptionItemContent key={`request-${index}-exome-avg-coverage`}>
              {QualityControlUtils.getExomeAvgCoverageDetail(
                gcReport['DRAGEN_capture_coverage_metrics'][
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
          {summaryData.map(({ gcReport }, index) => (
            <CustomDescriptionItemContent key={`request-${index}-exome-coverage-15x`}>
              {QualityControlUtils.getExomeCoverage15xDetail(
                gcReport['DRAGEN_capture_coverage_metrics'][
                  'PCT of QC coverage region with coverage [  15x: inf)'
                ],
              )}
            </CustomDescriptionItemContent>
          ))}
        </CustomDescriptionRow>
        <CustomDescriptionRow>
          <CustomDescriptionLabel>
            {intl.get('pages.quality_control_summary.uniformity_coverage')}
          </CustomDescriptionLabel>
          {summaryData.map(({ gcReport }, index) => (
            <CustomDescriptionItemContent key={`request-${index}-uniformity-coverage`}>
              {QualityControlUtils.getUniformityCoverage40PercDetail(
                gcReport['DRAGEN_capture_coverage_metrics'][
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
          {summaryData.map((_, index) => (
            <CustomDescriptionItemContent key={`request-${index}-total-cnvs`}>
              -
            </CustomDescriptionItemContent>
          ))}
        </CustomDescriptionRow>
      </CustomDescription>
    ) : (
      <Empty description={intl.get('pages.qc_report.no_data')} />
    )}
  </>
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
