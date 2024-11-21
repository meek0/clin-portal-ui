import intl from 'react-intl-universal';
import ConditionalWrapper from '@ferlab/ui/core/components/utils/ConditionalWrapper';
import { Space, Tooltip } from 'antd';

import HighBadgeIcon from 'components/icons/variantBadgeIcons/HighBadgeIcon';
import ModerateBadgeIcon from 'components/icons/variantBadgeIcons/ModerateBadgeIcon';

import styles from './index.module.css';

const getSexMeta = (
  averageChrY: number,
  averageChrX: number,
): {
  sex: 'male' | 'female' | 'undefined';
  color: 'yellow' | 'red';
} => {
  if (averageChrY > 0.2102 || averageChrX < 0.8496) {
    return {
      sex: 'female',
      color: 'yellow',
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
      color: 'yellow',
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
    color: 'yellow',
  };
};

const getSexDetail = (averageChrY: number, averageChrX: number, patientSex: string | undefined) => {
  const meta = getSexMeta(averageChrY, averageChrX);
  const isSexUndefined = meta.sex === 'undefined';
  const isSexNotEqual = meta.sex !== patientSex;

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
        {meta.color === 'yellow' ? (
          <ModerateBadgeIcon svgClass={styles.moderateImpact} />
        ) : (
          <HighBadgeIcon svgClass={styles.highImpact} />
        )}
        {intl.get(`pages.quality_control_summary.${meta.sex}`)}
      </Space>
    </ConditionalWrapper>
  );
};

const getContaminationDetail = (estimatedSampleContamination: number) => (
  <Space>
    {estimatedSampleContamination > 0.02 && estimatedSampleContamination <= 0.05 ? (
      <ModerateBadgeIcon svgClass={styles.moderateImpact} />
    ) : estimatedSampleContamination > 0.05 ? (
      <HighBadgeIcon svgClass={styles.highImpact} />
    ) : null}
    {estimatedSampleContamination}
  </Space>
);

const getExomeAvgCoverageDetail = (avgAlignmentCoverage: number) => {
  const isInsufficient = avgAlignmentCoverage < 100;

  return (
    <ConditionalWrapper
      condition={isInsufficient}
      wrapper={(children) => (
        <Tooltip title={intl.get('pages.quality_control_summary.insufficient_coverage')}>
          {children}
        </Tooltip>
      )}
    >
      <Space>
        {isInsufficient ? <HighBadgeIcon svgClass={styles.highImpact} /> : null}
        {avgAlignmentCoverage}
      </Space>
    </ConditionalWrapper>
  );
};

const getExomeCoverage15xDetail = (exomeCoverage15x: number) => {
  const isInsufficient = exomeCoverage15x < 95;

  return (
    <ConditionalWrapper
      condition={isInsufficient}
      wrapper={(children) => (
        <Tooltip title={intl.get('pages.quality_control_summary.insufficient_coverage_15x')}>
          {children}
        </Tooltip>
      )}
    >
      <Space>
        {isInsufficient ? <HighBadgeIcon svgClass={styles.highImpact} /> : null}
        {exomeCoverage15x}
      </Space>
    </ConditionalWrapper>
  );
};

const getUniformityCoverage40PercDetail = (uniformityCoverage: number) => {
  const isInsufficient = uniformityCoverage < 93.91;

  return (
    <ConditionalWrapper
      condition={isInsufficient}
      wrapper={(children) => (
        <Tooltip title={intl.get('pages.quality_control_summary.insufficient_coverage_15x')}>
          {children}
        </Tooltip>
      )}
    >
      <Space>
        {isInsufficient ? <ModerateBadgeIcon svgClass={styles.moderateImpact} /> : null}
        {uniformityCoverage}
      </Space>
    </ConditionalWrapper>
  );
};

export const QualityControlUtils = {
  getSexDetail,
  getContaminationDetail,
  getExomeAvgCoverageDetail,
  getExomeCoverage15xDetail,
  getUniformityCoverage40PercDetail,
};
