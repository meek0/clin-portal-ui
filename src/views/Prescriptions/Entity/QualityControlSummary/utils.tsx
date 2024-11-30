import intl from 'react-intl-universal';
import ConditionalWrapper from '@ferlab/ui/core/components/utils/ConditionalWrapper';
import { Space, Tooltip } from 'antd';

import HighBadgeIcon from 'components/icons/variantBadgeIcons/HighBadgeIcon';
import ModerateBadgeIcon from 'components/icons/variantBadgeIcons/ModerateBadgeIcon';

import styles from './index.module.css';

export type TQualityControlIndicatorColor = 'red' | 'orange';

const getSexMeta = (
  averageChrY: number,
  averageChrX: number,
): {
  sex: 'male' | 'female' | 'undefined';
  color: TQualityControlIndicatorColor;
} => {
  if (averageChrY > 0.2102 || averageChrX < 0.8496) {
    return {
      sex: 'female',
      color: 'orange',
    };
  }

  if (averageChrY > 0.2102 && averageChrX < 0.8496) {
    return {
      sex: 'female',
      color: 'red',
    };
  }

  if (averageChrY < 0.2456 || averageChrX > 0.7451) {
    return {
      sex: 'male',
      color: 'orange',
    };
  }

  if (averageChrY < 0.2456 && averageChrX > 0.7451) {
    return {
      sex: 'male',
      color: 'red',
    };
  }

  return {
    sex: 'undefined',
    color: 'orange',
  };
};

const getSexDetail = (averageChrY: number, averageChrX: number, gender: string | undefined) => {
  const meta = getSexMeta(averageChrY, averageChrX);
  const isSexUndefined = meta.sex === 'undefined';
  const isSexNotEqual = meta.sex !== gender;

  return (
    <ConditionalWrapper
      condition={isSexUndefined || isSexNotEqual}
      wrapper={(children) => (
        <Tooltip
          title={
            isSexNotEqual
              ? intl.get(`pages.quality_control_summary.sex_not_equal`)
              : intl.get(`pages.quality_control_summary.sex_undefined`)
          }
        >
          {children}
        </Tooltip>
      )}
    >
      <Space>
        {meta.color === 'orange' || isSexNotEqual ? (
          <ModerateBadgeIcon svgClass={styles.moderateImpact} />
        ) : (
          <HighBadgeIcon svgClass={styles.highImpact} />
        )}
        {intl.get(`pages.quality_control_summary.${meta.sex}`)}
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
    <Space>
      {indicatorColor === 'orange' ? (
        <ModerateBadgeIcon svgClass={styles.moderateImpact} />
      ) : indicatorColor === 'red' ? (
        <HighBadgeIcon svgClass={styles.highImpact} />
      ) : null}
      {estimatedSampleContamination}
    </Space>
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
