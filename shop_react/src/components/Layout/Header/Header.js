import styles from "./Header.module.css";

export default function Header(props) {
  return (
    <div className={`${styles.header}`}>
      <div className={styles.headerImage}></div>
      {props.children}
    </div>
  );
}
