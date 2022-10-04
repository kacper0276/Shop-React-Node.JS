import { useContext, useEffect } from "react";
import ReducerContext from "../../../context/reducerContext";
import styles from "./Footer.module.css";

export default function Footer(props) {
  const context = useContext(ReducerContext);

  return (
    <div className={` bg-${context.state.theme} ${styles.footer}`}>
      <b className={`text-${context.state.textColor}`}>
        Stronę wykonał: Kacper Renkel
      </b>
    </div>
  );
}
