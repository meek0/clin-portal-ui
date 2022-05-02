import cx from 'classnames';

import styles from './index.module.scss';

interface OwnProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const ExternalLink = ({ href, children, className }: OwnProps) => (
  <a className={cx(styles.externalLink, className)} href={href} rel="noreferrer" target="_blank">
    {children}
  </a>
);

export default ExternalLink;
