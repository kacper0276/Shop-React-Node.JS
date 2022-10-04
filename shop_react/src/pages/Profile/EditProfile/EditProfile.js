import axios from "axios";
import { useContext, useState } from "react";
import ReducerContext from "../../../context/reducerContext";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import style from "./EditProfile.module.css";

export default function EditProfile() {
  useWebsiteTitle("Edytuj profil");

  const context = useContext(ReducerContext);
  const email = context.state.login;
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const editProfile = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/editprofile", {
        login: email,
        password: password,
      })
      .then((res) => {
        setMessage(res.data.message);
      });
  };

  return (
    <div
      className={`bg-${context.state.theme} text-${context.state.textColor} ${style.main}`}
    >
      <form method="POST" className={`${style.form}`}>
        <input
          name="login"
          type="text"
          required
          disabled
          value={email}
          className={`text-${context.state.textColor}`}
        />
        <input
          name="password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={editProfile}>Zmień dane</button>
        {message !== "" && typeof message !== "undefined" ? (
          <div className="alert alert-success mt-2">{message}</div>
        ) : null}
      </form>
    </div>
  );
}
