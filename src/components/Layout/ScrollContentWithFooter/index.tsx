import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import Footer from '../Footer';
import cx from 'classnames';

import styles from './index.module.scss';

interface OwnProps {
  scrollId?: string;
  children: React.ReactNode;
  className?: string;
}

const ScrollContentWithFooter = ({ children, scrollId, className = '' }: OwnProps) => (
  <ScrollContent id={scrollId} className={cx(styles.contentWithFooter, className)}>
    <div className={styles.mainWrapper}>
      {children}
      <Footer />
    </div>
  </ScrollContent>
);

export default ScrollContentWithFooter;
