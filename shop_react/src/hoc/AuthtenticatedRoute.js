import { useNavigate } from "react-router-dom";

export default function AuthenticatedRoute({ children }) {
  const navigate = useNavigate();

  const auth = window.localStorage.getItem("authState");

  if (auth) {
    return children;
  } else {
    navigate("/");
  }
}
