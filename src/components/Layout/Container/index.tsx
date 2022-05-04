import styles from "./index.module.scss";

const Container: React.FC = (props) => (
  <div className={styles.container}>{props.children}</div>
);

export default Container;
