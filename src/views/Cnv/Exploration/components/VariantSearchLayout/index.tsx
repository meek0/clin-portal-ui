import { SCROLL_WRAPPER_ID } from 'views/Cnv/utils/constant';

import LineStyleIcon from 'components/icons/LineStyleIcon';
import ContentWithHeader from 'components/Layout/ContentWithHeader';
import { ContentHeaderProps } from 'components/Layout/ContentWithHeader/Header';
import ScrollContentWithFooter from 'components/Layout/ScrollContentWithFooter';
import Sidebar from 'components/Layout/Sidebar';

interface OwnProps {
  contentHeaderProps: Omit<ContentHeaderProps, 'icon'>;
  sidebarContent: React.ReactNode;
  children: React.ReactElement;
}

const VariantSearchLayout = ({ contentHeaderProps, sidebarContent, children }: OwnProps) => (
  <ContentWithHeader
    headerProps={{
      ...contentHeaderProps,
      icon: <LineStyleIcon />,
    }}
  >
    <Sidebar>{sidebarContent}</Sidebar>
    <ScrollContentWithFooter scrollId={SCROLL_WRAPPER_ID}>{children}</ScrollContentWithFooter>
  </ContentWithHeader>
);

export default VariantSearchLayout;
