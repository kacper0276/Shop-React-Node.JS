import { useContext } from "react";
import ReducerContext from "../../context/reducerContext";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import styles from "./NotFound.module.css";

export default function NotFound() {
  const context = useContext(ReducerContext);
  useWebsiteTitle("Nie znaleziono strony!!");

  return (
    <div
      className={`${styles.mainBlock} bg-${context.state.theme} text-${context.state.textColor}`}
    >
      <h1>Strony nie znaleziono</h1>
    </div>
  );
}
