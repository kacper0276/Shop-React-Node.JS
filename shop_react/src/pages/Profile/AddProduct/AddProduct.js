import { useContext, useState } from "react";
import ReducerContext from "../../../context/reducerContext";
import style from "./AddProduct.module.css";
import axios from "axios";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";

export default function AddProduct(props) {
  useWebsiteTitle("Dodaj nową aukcję");

  const context = useContext(ReducerContext);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [alt, setAlt] = useState("");
  const [image, setImage] = useState(null);
  const [quentity, setQuentity] = useState(1);
  const owner = context.state.login;

  const addProduct = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("alt", alt);
    formData.append("owner", owner);
    formData.append("image", image);
    formData.append("quentity", quentity);

    console.log(formData);

    axios.post("http://localhost:3001/addproducts", formData).then((res) => {
      setMessage(res.data.message);
    });
  };

  return (
    <div
      className={`${style.main} bg-${context.state.theme} text-${context.state.textColor}`}
    >
      <form
        method="POST"
        className={`${style.form}`}
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="name"
          className="mb-3"
          onChange={(e) => setName(e.target.value)}
          placeholder="Nazwa produktu"
          required
        />
        <textarea
          type="text"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Opis produktu"
        />
        <input
          type="number"
          min={0}
          name="price"
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Cena w zł"
          required
        />
        <input
          type="number"
          min={1}
          name="quentity"
          onChange={(e) => setQuentity(e.target.value)}
          placeholder="Ilość produktów"
          required
        />
        <input
          type="file"
          name="image"
          className="form-control"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <input
          type="text"
          name="alt"
          onChange={(e) => setAlt(e.target.value)}
          placeholder="alt"
          required
        />
        <button className="btn btn-secondary mt-2" onClick={addProduct}>
          Dodaj na sprzedaż
        </button>
        {message !== "" ? (
          <div className="alert alert-success mt-2">{message} !!</div>
        ) : null}
      </form>
    </div>
  );
}
