import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import Footer from '../Footer';

import styles from './index.module.scss';

interface OwnProps {
  scrollId?: string;
  children: React.ReactNode;
}

const ScrollContentWithFooter = ({ children, scrollId }: OwnProps) => (
  <ScrollContent id={scrollId} className={styles.contentWithFooter}>
    <div className={styles.wrapper}>
      {children}
      <Footer />
    </div>
  </ScrollContent>
);

export default ScrollContentWithFooter;
