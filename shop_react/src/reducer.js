export const reducer = (state, action) => {
  switch (action.type) {
    case "change-theme":
      const theme = state.theme === "white" ? "dark" : "white";
      const textColor = state.textColor === "white" ? "dark" : "white";
      return { ...state, theme, textColor };

    case "change-loading":
      let loading;
      loading = false;
      return { ...state, loading };

    case "login":
      const isAuth = window.localStorage.getItem("authState");
      const login = window.localStorage.getItem("user-data");
      return { ...state, isAuth, login };

    case "logout":
      const Auth = false;
      const user = null;
      window.localStorage.removeItem("user-data");
      window.localStorage.removeItem("authState");
      return { ...state, isAuth: Auth, login: user };

    default:
      throw new Error("Nie ma takiej akcji: " + action.type);
  }
};

export const initialState = {
  theme: "dark",
  textColor: "white",
  loading: true,
  login: window.localStorage.getItem("user-data") ?? null,
  isAuth: false,
};
