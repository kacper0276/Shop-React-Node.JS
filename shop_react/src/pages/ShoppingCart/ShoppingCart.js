import styles from "./ShoppingCart.module.css";
import { useContext, useEffect, useState } from "react";
import ReducerContext from "../../context/reducerContext";
import { useNavigate } from "react-router-dom";

export default function ShoppingCart(props) {
  const context = useContext(ReducerContext);
  const navigate = useNavigate();
  const [productInCart, setProductInCart] = useState([]);
  const [sum, setSum] = useState(0);

  const getItemFromLocalStorage = () => {
    const products = JSON.parse(window.localStorage.getItem("shopping-cart"));
    let sum = 0;

    if (window.localStorage.getItem("shopping-cart")) {
      products.forEach((product) => {
        sum += +product.price * +product.quentity;
      });

      setSum(sum);
    }

    setProductInCart(products);
  };

  const goSummary = (e) => {
    e.preventDefault();

    const products = JSON.parse(window.localStorage.getItem("shopping-cart"));

    navigate("/podsumowanie", {
      state: { products: products },
    });
  };

  const removeItem = (name) => {
    let products = JSON.parse(window.localStorage.getItem("shopping-cart"));

    const filterProducts = products.filter((product) => product.name !== name);

    window.localStorage.setItem(
      "shopping-cart",
      JSON.stringify(filterProducts)
    );
    setProductInCart(filterProducts);
  };

  useEffect(() => {
    getItemFromLocalStorage();
  }, [productInCart?.length]);

  return (
    <div
      className={`bg-${context.state.theme} text-${context.state.textColor} ${styles.main}`}
    >
      <b>Twoje zakupy: </b>
      {productInCart?.length > 0 ? (
        productInCart.map((product, key) => {
          return (
            <div key={key} className={`${styles.oneProduct}`}>
              <div className={`${styles.photo} mt-5`}>
                <img
                  src={`/img/${product.img}`}
                  width="80px"
                  height="80px"
                  alt="ALT"
                />
              </div>
              <div className={`${styles.name}`}>Nazwa: {product.name}</div>
              <div className={`${styles.price}`}>Cena: {product.price} zł</div>
              <div className={`${styles.quentity}`}>
                Ilość sztuk: {product.quentity}
              </div>
              <div className={`${styles.removeItem}`}>
                <button
                  className="btn btn-danger"
                  onClick={() => removeItem(`${product.name}`)}
                >
                  Usuń produkt
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p>Brak produktów w koszyku</p>
      )}
      <hr />
      <div className={`${styles.summary}`}>
        <div>
          Łączna cena za zakupy: <b>{sum} zł</b>
        </div>
        {productInCart?.length > 0 ? (
          <div>
            <button className="btn btn-info" onClick={goSummary}>
              KUPUJĘ!!
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
