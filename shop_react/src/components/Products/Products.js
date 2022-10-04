import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReducerContext from "../../context/reducerContext";
import Product from "./Product/Product";
import styles from "./Products.module.css";
import LoadingIcon from "../UI/LoadingIcon";
import axios from "axios";

export default function Products(props) {
  const location = useLocation();
  const context = useContext(ReducerContext);
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    await axios
      .get("http://localhost:3001/products")
      .then((response) => {
        const allProducts = response.data.products;
        setProducts(allProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [location]);

  return (
    <>
      {loading ? (
        <LoadingIcon />
      ) : (
        <div
          className={` bg-${context.state.theme} text-${context.state.textColor} ${styles.heightBlock}`}
        >
          {products.map((product) => {
            return <Product {...product} key={product.id} />;
          })}
        </div>
      )}
    </>
  );
}
