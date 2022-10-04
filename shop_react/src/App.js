import "./App.css";
import Layout from "./components/Layout/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Layout/Header/Header";
import Menu from "./components/Layout/Menu/Menu";
import Footer from "./components/Layout/Footer/Footer";
import { useReducer } from "react";
import { reducer, initialState } from "./reducer";
import ThemeButton from "./components/UI/ThemeButton";
import ReducerContext from "./context/reducerContext";
import Products from "./components/Products/Products";
import LoginPanel from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import NotFound from "./pages/404/NotFound";
import AuthenticatedRoute from "./hoc/AuthtenticatedRoute";
import HomePage from "./pages/Profile/HomePage/HomePage";
import AddProduct from "./pages/Profile/AddProduct/AddProduct";
import EditProfile from "./pages/Profile/EditProfile/EditProfile";
import ShowAllProducts from "./pages/Profile/ShowAllProducts/ShowAllProducts";
import EditProduct from "./pages/Profile/EditProduct/EditProduct";
import ShoppingCartButton from "./components/UI/ShioppingCartButton";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import Summary from "./pages/Summary/Summary";
import Searchbar from "./components/UI/Searchbar";
import SearchResult from "./pages/SearchResult/SearchResult";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const header = (
    <Header>
      <ThemeButton />
      <ShoppingCartButton />
      <Searchbar />
    </Header>
  );
  const menu = <Menu />;
  const content = (
    <>
      <Routes>
        <Route
          path="/profil"
          exact
          element={
            <AuthenticatedRoute>
              <HomePage />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/profil/dodaj"
          exact
          element={
            <AuthenticatedRoute>
              <AddProduct />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/profil/edytujprofil"
          exact
          element={
            <AuthenticatedRoute>
              <EditProfile />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/profil/wszystkieaukcje"
          exact
          element={
            <AuthenticatedRoute>
              <ShowAllProducts />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/profil/edytujprodukt"
          exact
          element={
            <AuthenticatedRoute>
              <EditProduct />
            </AuthenticatedRoute>
          }
        />
        <Route path="/" exact element={<Products />} />
        <Route path="/logowanie" exact element={<LoginPanel />} />
        <Route path="/rejestracja" exact element={<Register />} />
        <Route path="/koszyk" exact element={<ShoppingCart />} />
        <Route path="/podsumowanie" exact element={<Summary />} />
        <Route path="/szukaj" exact element={<SearchResult />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
  const footer = <Footer />;

  return (
    <Router>
      <ReducerContext.Provider
        value={{
          state: state,
          dispatch: dispatch,
        }}
      >
        <Layout header={header} menu={menu} content={content} footer={footer} />
      </ReducerContext.Provider>
    </Router>
  );
}

export default App;
