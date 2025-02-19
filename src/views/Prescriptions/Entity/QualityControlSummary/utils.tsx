import intl from 'react-intl-universal';
import ConditionalWrapper from '@ferlab/ui/core/components/utils/ConditionalWrapper';
import { Space, Tooltip } from 'antd';

import HighBadgeIcon from 'components/icons/variantBadgeIcons/HighBadgeIcon';
import ModerateBadgeIcon from 'components/icons/variantBadgeIcons/ModerateBadgeIcon';
import { SexValue } from 'utils/commonTypes';

import styles from './index.module.css';

export type TQualityControlIndicatorColor = 'red' | 'orange' | null;

const getSexMeta = (
  averageChrY: number,
  averageChrX: number,
  patientSex: SexValue | undefined,
): {
  sex: SexValue;
  sexTooltip: string | null;
  color: TQualityControlIndicatorColor;
  tooltip: string | null;
} => {
  if (patientSex === SexValue.FEMALE) {
    if (averageChrY > 0.2102 || averageChrX < 0.8496) {
      return {
        sex: SexValue.FEMALE,
        color: 'orange',
        tooltip: intl.get(
          'pages.quality_control_summary.xy_coverage_moderately_inconsistant_with_patient_sex_female',
        ),
        sexTooltip: null,
      };
    }
    if (averageChrY > 0.2102 && averageChrX < 0.8496) {
      return {
        sex: SexValue.FEMALE,
        color: 'red',
        tooltip: intl.get(
          'pages.quality_control_summary.xy_coverage_highly_inconsistant_with_patient_sex_female',
        ),
        sexTooltip: null,
      };
    }
    return {
      sex: SexValue.FEMALE,
      color: null,
      tooltip: null,
      sexTooltip: null,
    };
  }

  if (patientSex === SexValue.MALE) {
    if (averageChrY < 0.2456 || averageChrX > 0.7451) {
      return {
        sex: SexValue.MALE,
        color: 'orange',
        tooltip: intl.get(
          'pages.quality_control_summary.xy_coverage_moderately_inconsistant_with_patient_sex_male',
        ),
        sexTooltip: null,
      };
    }
    if (averageChrY < 0.2456 && averageChrX > 0.7451) {
      return {
        sex: SexValue.MALE,
        color: 'red',
        tooltip: intl.get(
          'pages.quality_control_summary.xy_coverage_highly_inconsistant_with_patient_sex_male',
        ),
        sexTooltip: null,
      };
    }
    return {
      sex: SexValue.MALE,
      color: null,
      tooltip: null,
      sexTooltip: null,
    };
  }

  return {
    sex: SexValue.UNKNOWN,
    color: patientSex !== SexValue.UNKNOWN && patientSex !== undefined ? 'orange' : null,
    tooltip: null,
    sexTooltip:
      patientSex !== SexValue.UNKNOWN && patientSex !== undefined
        ? intl.get('pages.quality_control_summary.sex_not_equal')
        : intl.get('pages.quality_control_summary.sex_undefined'),
  };
};

const getSexDetail = (
  averageChrY: number,
  averageChrX: number,
  patientSex: SexValue | undefined,
) => {
  const meta = getSexMeta(averageChrY, averageChrX, patientSex);

  return (
    <ConditionalWrapper
      condition={meta.tooltip !== null || meta.sexTooltip !== null}
      wrapper={(children) => (
        <Tooltip title={meta.sexTooltip !== null ? meta.sexTooltip : meta.tooltip}>
          {children}
        </Tooltip>
      )}
    >
      <Space>
        {meta.color === 'orange' ? (
          <ModerateBadgeIcon svgClass={styles.moderateImpact} />
        ) : meta.color === 'red' ? (
          <HighBadgeIcon svgClass={styles.highImpact} />
        ) : null}
        {intl.get(`sex.${meta.sex}`)}
      </Space>
    </ConditionalWrapper>
  );
};

const getContaminationIndicatorColor = (
  estimatedSampleContamination: number,
): TQualityControlIndicatorColor | null => {
  if (estimatedSampleContamination > 0.02 && estimatedSampleContamination <= 0.05) return 'orange';
  if (estimatedSampleContamination > 0.05) return 'red';
  return null;
};

const getContaminationDetail = (estimatedSampleContamination: number) => {
  const indicatorColor = getContaminationIndicatorColor(estimatedSampleContamination);

  return (
    <ConditionalWrapper
      condition={indicatorColor !== null}
      wrapper={(children) => (
        <Tooltip
          title={
            indicatorColor === 'orange'
              ? intl.get('pages.quality_control_summary.light_contamination')
              : intl.get('pages.quality_control_summary.strong_contamination')
          }
        >
          {children}
        </Tooltip>
      )}
    >
      <Space>
        {indicatorColor === 'orange' ? (
          <ModerateBadgeIcon svgClass={styles.moderateImpact} />
        ) : indicatorColor === 'red' ? (
          <HighBadgeIcon svgClass={styles.highImpact} />
        ) : null}
        {estimatedSampleContamination}
      </Space>
    </ConditionalWrapper>
  );
};

const getExomeAvgCoverageIndicatorColor = (
  avgAlignmentCoverage: number,
): TQualityControlIndicatorColor | null => {
  const isInsufficient = avgAlignmentCoverage < 100;
  return isInsufficient ? 'red' : null;
};

const getExomeAvgCoverageDetail = (avgAlignmentCoverage: number) => {
  const indicatorColor = getExomeAvgCoverageIndicatorColor(avgAlignmentCoverage);

  return (
    <ConditionalWrapper
      condition={indicatorColor === 'red'}
      wrapper={(children) => (
        <Tooltip title={intl.get('pages.quality_control_summary.insufficient_coverage')}>
          {children}
        </Tooltip>
      )}
    >
      <Space>
        {indicatorColor === 'red' ? <HighBadgeIcon svgClass={styles.highImpact} /> : null}
        {avgAlignmentCoverage}
      </Space>
    </ConditionalWrapper>
  );
};

const getExomeCoverage15xIndicatorColor = (
  exomeCoverage15x: number,
): TQualityControlIndicatorColor | null => {
  const isInsufficient = exomeCoverage15x < 95;
  return isInsufficient ? 'red' : null;
};

const getExomeCoverage15xDetail = (exomeCoverage15x: number) => {
  const indicatorColor = getExomeCoverage15xIndicatorColor(exomeCoverage15x);

  return (
    <ConditionalWrapper
      condition={indicatorColor === 'red'}
      wrapper={(children) => (
        <Tooltip title={intl.get('pages.quality_control_summary.insufficient_coverage_15x')}>
          {children}
        </Tooltip>
      )}
    >
      <Space>
        {indicatorColor === 'red' ? <HighBadgeIcon svgClass={styles.highImpact} /> : null}
        {exomeCoverage15x}
      </Space>
    </ConditionalWrapper>
  );
};

const getUniformityCoverage40PercIndicatorColor = (
  uniformityCoverage: number,
): TQualityControlIndicatorColor | null => {
  const isInsufficient = uniformityCoverage < 93.91;
  return isInsufficient ? 'orange' : null;
};

const getUniformityCoverage40PercDetail = (uniformityCoverage: number) => {
  const indicatorColor = getUniformityCoverage40PercIndicatorColor(uniformityCoverage);

  return (
    <ConditionalWrapper
      condition={indicatorColor === 'orange'}
      wrapper={(children) => (
        <Tooltip title={intl.get('pages.quality_control_summary.suboptimal_coverage_40')}>
          {children}
        </Tooltip>
      )}
    >
      <Space>
        {indicatorColor === 'orange' ? (
          <ModerateBadgeIcon svgClass={styles.moderateImpact} />
        ) : null}
        {uniformityCoverage}
      </Space>
    </ConditionalWrapper>
  );
};

const getCnvCountIndicatorColor = (cnvCount: number): TQualityControlIndicatorColor | null => {
  if (cnvCount > 504) return 'orange';
  return null;
};

const getCnvCountDetail = (cnvCount: number) => {
  const indicatorColor = getCnvCountIndicatorColor(cnvCount);

  return (
    <ConditionalWrapper
      condition={indicatorColor === 'orange'}
      wrapper={(children) => (
        <Tooltip title={intl.get('pages.quality_control_summary.high_number_of_cnvs')}>
          {children}
        </Tooltip>
      )}
    >
      <Space>
        {indicatorColor === 'orange' ? (
          <ModerateBadgeIcon svgClass={styles.moderateImpact} />
        ) : null}
        {cnvCount}
      </Space>
    </ConditionalWrapper>
  );
};

export const QualityControlUtils = {
  getSexMeta,
  getSexDetail,
  getContaminationIndicatorColor,
  getContaminationDetail,
  getExomeAvgCoverageIndicatorColor,
  getExomeAvgCoverageDetail,
  getExomeCoverage15xIndicatorColor,
  getExomeCoverage15xDetail,
  getUniformityCoverage40PercIndicatorColor,
  getUniformityCoverage40PercDetail,
  getCnvCountIndicatorColor,
  getCnvCountDetail,
};
