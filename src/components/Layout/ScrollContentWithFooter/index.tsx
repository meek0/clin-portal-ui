import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import Footer from '../Footer';
import cx from 'classnames';

import styles from './index.module.scss';
import ConditionalWrapper from 'components/utils/ConditionalWrapper';

interface OwnProps {
  scrollId?: string;
  children: React.ReactNode;
  className?: string;
  withContainerWidth?: boolean;
}

const ScrollContentWithFooter = ({
  children,
  scrollId,
  className = '',
  withContainerWidth = false,
}: OwnProps) => (
  <ScrollContent id={scrollId} className={cx(styles.contentWithFooter, className)}>
    <div className={styles.mainWrapper}>
      <ConditionalWrapper
        condition={withContainerWidth}
        wrapper={(children) => <div className={styles.containerWidth}>{children}</div>}
      >
        <div className={styles.contentWrapper}>{children}</div>
      </ConditionalWrapper>
      <Footer />
    </div>
  </ScrollContent>
);

export default ScrollContentWithFooter;
