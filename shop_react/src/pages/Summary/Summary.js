import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReducerContext from "../../context/reducerContext";
import styles from "./Summary.module.css";

export default function Summary() {
  const context = useContext(ReducerContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState();
  const [error, setError] = useState();
  const [valuesForm, setValuesForm] = useState({
    email: "",
    name: "",
    surname: "",
    adres: "",
    zipcode: "",
    typeDelivery: "kurier",
  });

  const sendData = (e) => {
    e.preventDefault();

    const datas = [];
    datas.push(valuesForm);
    datas.push(products);

    axios.post("http://localhost:3001/summary", datas).then((res) => {
      if (res.data.error) {
        setError(res.data.error);
      }

      window.localStorage.removeItem("shopping-cart");

      navigate("/");
    });
  };

  useEffect(() => {
    setProducts(location.state.products);

    let sumPrice = 0;
    location.state.products.forEach((product) => {
      sumPrice += +product.price * +product.quentity;
    });
    setPrice(sumPrice);
  }, []);

  return (
    <div
      className={`${styles.main} bg-${context.state.theme} text-${context.state.textColor}`}
    >
      <b>Dane dostawy: </b>

      <p>
        Cena do zapłaty <i>{price} </i>zł
      </p>
      <form method="POST">
        <input
          type="email"
          name="email"
          className="form-control mt-3 w-25"
          onChange={(e) =>
            setValuesForm({ ...valuesForm, email: e.target.value })
          }
          required
          placeholder="Podaj email"
        />
        <input
          type="text"
          name="name"
          className="form-control mt-3 w-25"
          required
          placeholder="Podaj imię"
          onChange={(e) =>
            setValuesForm({ ...valuesForm, name: e.target.value })
          }
        />
        <input
          type="text"
          name="surname"
          className="form-control mt-3 w-25"
          required
          placeholder="Podaj nazwisko"
          onChange={(e) =>
            setValuesForm({ ...valuesForm, surname: e.target.value })
          }
        />
        <input
          type="text"
          name="adres"
          className="form-control mt-3 w-25"
          required
          placeholder="Podaj adres"
          onChange={(e) =>
            setValuesForm({ ...valuesForm, adres: e.target.value })
          }
        />
        <input
          type="text"
          name="ZIPcode"
          className="form-control mt-3 w-25"
          required
          placeholder="Kod pocztowy"
          onChange={(e) =>
            setValuesForm({ ...valuesForm, zipcode: e.target.value })
          }
        />
        <select
          onChange={(e) =>
            setValuesForm({ ...valuesForm, typeDelivery: e.target.value })
          }
          className="form-control mt-3 w-25"
        >
          <option value="kurier">Dostawa kurierem</option>
          <option value="paczkomat">Paczkomat</option>
          <option value="odbiór osobisty">Odbiór osobisty</option>
        </select>
        <button className="btn btn-primary mt-3" onClick={sendData}>
          Zamawiam
        </button>
        {error !== "" && typeof error !== "undefined" ? (
          <div className="alert alert-danger mt-2">{error}</div>
        ) : null}
      </form>
    </div>
  );
}
