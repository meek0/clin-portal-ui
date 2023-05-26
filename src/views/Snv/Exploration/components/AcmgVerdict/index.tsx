import ReactDOMServer from 'react-dom/server';
import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { Space, Tooltip } from 'antd';
import { Varsome } from 'graphql/variants/models';

import AcmgNoVerdictCheck from 'components/icons/AcmgNoVerdictCheck';
import AcmgVerdictCheck from 'components/icons/AcmgVerdictCheck';

interface OwnProps {
  varsome?: Varsome;
  locus: string;
}

const AcmgVerdict = ({ varsome, locus }: OwnProps) => {
  const verdict = varsome?.acmg?.verdict?.verdict;
  const verdictTitle = verdict ? verdict : varsome ? 'No Verdict' : 'No Data';
  const parsedVerdict = verdictTitle?.toLowerCase().replaceAll(' ', '_');

  return (
    <Space>
      {verdict ? <AcmgVerdictCheck /> : <AcmgNoVerdictCheck />}
      <Tooltip title={verdictTitle}>
        <ExternalLink href={`https://varsome.com/variant/hg38/${encodeURIComponent(locus)}`}>
          {intl.get(`acmg.verdict.abrv.${parsedVerdict}`)}
        </ExternalLink>
      </Tooltip>
    </Space>
  );
};

export const renderToString = (row: any) =>
  ReactDOMServer.renderToString(<AcmgVerdict varsome={row.varsome} locus={row.locus} />);

export default AcmgVerdict;
