import { useContext, useState } from "react";
import axios from "axios";
import ReducerContext from "../../context/reducerContext";
import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";

export default function LoginPanel(props) {
  useWebsiteTitle("Zaloguj się");

  const context = useContext(ReducerContext);
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const login = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/login", {
        login: email,
        password: password,
      })
      .then((res) => {
        if (res.data.auth === true) {
          window.localStorage.setItem("user-data", res.data.username);
          window.localStorage.setItem("authState", res.data.auth);
          context.dispatch({ type: "login" });
          history("/");
        }
        if (typeof res.data.error !== "undefined") {
          setError(res.data.error);
        }
        if (typeof res.data.error === "undefined") {
          setError(undefined);
        }
      });
  };

  return (
    <div
      className={`${style.main} bg-${context.state.theme} text-${context.state.textColor}`}
    >
      <form method="POST" className={`${style.form}`}>
        <input
          name="login"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login}>Zaloguj się</button>
        {error !== "" && typeof error !== "undefined" ? (
          <div className="alert alert-danger">{error}</div>
        ) : null}
      </form>
    </div>
  );
}
