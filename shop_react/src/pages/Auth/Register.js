import { useContext, useState } from "react";
import ReducerContext from "../../context/reducerContext";
import style from "./Register.module.css";
import axios from "axios";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";

export default function Register() {
  useWebsiteTitle("Rejestracja");

  const context = useContext(ReducerContext);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const register = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/register", {
        login: email,
        password: password,
        password2: password2,
      })
      .then((res) => {
        if (typeof res.data.error !== "undefined") {
          setError(res.data.error);
        }
        if (typeof res.data.error == "undefined") {
          setError(undefined);
        }
        if (typeof res.data.message !== "undefined") {
          setMessage(res.data.message);
        }
        if (typeof res.data.message == "undefined") {
          setMessage(undefined);
        }
      });
  };

  return (
    <div
      className={`${style.main} bg-${context.state.theme} text-${context.state.textColor}`}
    >
      <form method="POST" className={`${style.form}`}>
        <input
          type="email"
          placeholder="np. nazwa@email.com"
          name="email"
          className=""
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Hasło"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          name="password2"
          placeholder="Powtórz hasło"
          onChange={(e) => setPassword2(e.target.value)}
        />

        <button onClick={register}>Zarejestruj</button>

        {error !== "" && typeof error !== "undefined" ? (
          <div className="alert alert-danger">{error}</div>
        ) : null}
        {message !== "" && typeof message !== "undefined" ? (
          <div className="alert alert-success ">{message}</div>
        ) : null}
      </form>
    </div>
  );
}
