import SidebarMenu, { ISidebarMenuItem } from '@ferlab/ui/core/components/SidebarMenu';
import LineStyleIcon from 'components/icons/LineStyleIcon';
import ScrollContentWithFooter from 'components/Layout/ScrollContentWithFooter';
import ContentWithHeader from 'components/Layout/ContentWithHeader';
import { ContentHeaderProps } from 'components/Layout/ContentWithHeader/Header';
import { SCROLL_WRAPPER_ID } from 'views/Variants/utils/constant';

import styles from './index.module.scss';

interface OwnProps {
  contentHeaderProps: Omit<ContentHeaderProps, 'icon'>;
  menuItems: ISidebarMenuItem[];
  children: React.ReactElement;
}

const VariantSearchLayout = ({ contentHeaderProps, menuItems, children }: OwnProps) => (
  <ContentWithHeader
    headerProps={{
      ...contentHeaderProps,
      icon: <LineStyleIcon />,
    }}
    className={styles.variantLayout}
  >
    <SidebarMenu className={styles.sideMenu} menuItems={menuItems} />
    <ScrollContentWithFooter scrollId={SCROLL_WRAPPER_ID}>{children}</ScrollContentWithFooter>
  </ContentWithHeader>
);

export default VariantSearchLayout;
