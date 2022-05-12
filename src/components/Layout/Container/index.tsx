import styles from './index.module.scss';
import cx from 'classnames';

const Container: React.FC<{ className?: string }> = (props) => (
  <div className={cx(styles.container, props.className)}>{props.children}</div>
);

export default Container;
