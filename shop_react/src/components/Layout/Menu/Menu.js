import styles from "./Menu.module.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import ReducerContext from "../../../context/reducerContext";

export default function Menu(props) {
  const context = useContext(ReducerContext);

  const logout = (e) => {
    e.preventDefault();

    context.dispatch({ type: "logout" });
  };

  return (
    <div className={`${styles.menu}`}>
      <NavLink
        to="/"
        className={(navData) =>
          navData.isActive ? `${styles.menuItemActive}` : `${styles.links}`
        }
      >
        Strona główna
      </NavLink>
      {context.state.login ? (
        <>
          <a href="#" onClick={logout} className={`${styles.links}`}>
            Wyloguj
          </a>
          <NavLink
            to="/profil"
            className={(navData) =>
              navData.isActive ? `${styles.menuItemActive}` : `${styles.links}`
            }
          >
            Profil
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            to="/logowanie"
            className={(navData) =>
              navData.isActive ? `${styles.menuItemActive}` : `${styles.links}`
            }
          >
            Zaloguj się
          </NavLink>
          <NavLink
            to="/rejestracja"
            className={(navData) =>
              navData.isActive ? `${styles.menuItemActive}` : `${styles.links}`
            }
          >
            Rejestracja
          </NavLink>
        </>
      )}
    </div>
  );
}
