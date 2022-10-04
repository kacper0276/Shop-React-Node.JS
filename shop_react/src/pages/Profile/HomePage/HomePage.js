import { useContext } from "react";
import { Link } from "react-router-dom";
import ReducerContext from "../../../context/reducerContext";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import style from "./HomePage.module.css";

export default function HomePage() {
  useWebsiteTitle("Panel użytkownika");

  const context = useContext(ReducerContext);

  return (
    <div
      className={`${style.main} bg-${context.state.theme} text-${context.state.textColor}`}
    >
      <Link to="/profil/dodaj" className={`${style.link}`}>
        Dodaj przedmiot na aukcję
      </Link>
      <Link to="/profil/edytujprofil" className={`${style.link}`}>
        Edytuj profil
      </Link>
      <Link to="/profil/wszystkieaukcje" className={`${style.link}`}>
        Wszystkie twoje aukcje
      </Link>
    </div>
  );
}
