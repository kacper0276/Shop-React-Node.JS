import { useState } from "react";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import styles from "./Product.module.css";

export default function Product(props) {
  useWebsiteTitle("Produkty");
  const [quentity, setQuentity] = useState(1);

  const addToCart = (name, price, img, id) => {
    if (window.localStorage.getItem("shopping-cart")) {
      let oldProducts = JSON.parse(
        window.localStorage.getItem("shopping-cart")
      );

      let newProduct = {
        id: id,
        name: name,
        price: price,
        img: img,
        quentity: quentity,
      };

      oldProducts.push(newProduct);

      window.localStorage.setItem("shopping-cart", JSON.stringify(oldProducts));
    } else {
      let product = {
        id: id,
        name: name,
        price: price,
        img: img,
        quentity: quentity,
      };

      let arrayProducts = [];

      arrayProducts.push(product);

      window.localStorage.setItem(
        "shopping-cart",
        JSON.stringify(arrayProducts)
      );
    }
  };

  return (
    <div className={`${styles.singleProduct}`}>
      <div className={`${styles.name}`}>{props.name}</div>
      <div className={`${styles.photo} mt-5`}>
        <img
          src={`/img/${props.img}`}
          alt={`${props.alt}`}
          width="80px"
          height="80px"
        />
      </div>
      <div className={`${styles.info}`}>
        <p>{props.description}</p>
      </div>
      <div className={`${styles.buttons}`}>
        <button
          onClick={() =>
            addToCart(
              `${props.name}`,
              `${props.price}`,
              `${props.img}`,
              `${props.id}`
            )
          }
          className="btn btn-primary"
        >
          Kupuję!
        </button>
      </div>
      <div className={`${styles.price}`}>
        <p>CENA: {props.price} zł</p>
      </div>
      <div className={`${styles.owner}`}>
        <p>Sprzedający: {props.owner}</p>
      </div>
      <div>
        <p>
          Kupuję:
          <input
            type="number"
            min={1}
            name="quentity"
            max={`${props.quentity}`}
            onChange={(e) => setQuentity(e.target.value)}
          />{" "}
          z {props.quentity} sztuk
        </p>
      </div>
    </div>
  );
}
