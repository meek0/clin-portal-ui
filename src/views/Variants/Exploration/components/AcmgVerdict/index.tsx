import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { Space, Tooltip } from 'antd';

import AcmgNoVerdictCheck from 'components/icons/AcmgNoVerdictCheck';
import AcmgVerdictCheck from 'components/icons/AcmgVerdictCheck';

import styles from './index.module.scss';

interface OwnProps {
  verdict?: string;
  externalId?: string;
}

const AcmgVerdict = ({ verdict, externalId }: OwnProps) =>
  verdict ? (
    <Space>
      <AcmgVerdictCheck className={styles.acmgVerdictCheckIcon} />
      <ExternalLink href={`https://varsome.com/variant/${externalId}`}>{verdict}</ExternalLink>
    </Space>
  ) : (
    <Tooltip title={intl.get('screen.patientvariant.results.table.noVerdict')}>
      <div className={styles.acmgNoVerdictWrapper}>
        <AcmgNoVerdictCheck />
      </div>
    </Tooltip>
  );

export default AcmgVerdict;
