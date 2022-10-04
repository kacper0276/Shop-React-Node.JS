import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Product from "../../components/Products/Product/Product";
import ReducerContext from "../../context/reducerContext";
import styles from "./SearchResult.module.css";

export default function SearchResult() {
  const context = useContext(ReducerContext);
  const location = useLocation();
  const [searchWord, setSearchWord] = useState();
  const [searchResult, setSearchResult] = useState([]);

  const requestToApi = async () => {
    axios
      .post(`http://localhost:3001/search/${location.state.searchWord}`)
      .then((res) => {
        setSearchResult(res.data.data);
      });
  };

  useEffect(() => {
    setSearchWord(location.state.searchWord);
    requestToApi();
  }, [location]);

  return (
    <div
      className={`bg-${context.state.theme} text-${context.state.textColor} ${styles.main}`}
    >
      <h3>Wyniki wyszukiwania słowa: {searchWord}</h3>
      {searchResult.map((result) => {
        return <Product {...result} key={result.id} />;
      })}
    </div>
  );
}
