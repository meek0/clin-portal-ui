import Empty from '@ferlab/ui/core/components/Empty';
import intl from 'react-intl-universal';

const NoData = () => (
  <Empty showImage={false} noPadding align="left" description={intl.get('no.data.available')} />
);

export default NoData;
