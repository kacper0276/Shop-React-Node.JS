import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReducerContext from "../../../context/reducerContext";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import styles from "./EditProduct.module.css";

export default function EditProduct() {
  useWebsiteTitle("Edytuj twoją aukcję");

  const location = useLocation();
  const context = useContext(ReducerContext);
  const [formEdit, setFormEdit] = useState([]);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [alt, setAlt] = useState("");
  const [quentity, setQuentity] = useState();
  // const [id, setId] = useState();
  const [image, setImage] = useState(null);
  const owner = context.state.login;

  const editProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("alt", alt);
    formData.append("owner", owner);
    formData.append("image", image);
    formData.append("quentity", quentity);
    formData.append("id", location.state.id);

    await axios
      .post(`http://localhost:3001/editproduct`, formData)
      .then((res) => {
        setMessage(res.data.message);
      });
  };

  useEffect(() => {
    const fetchEditForm = async () => {
      await axios
        .get(`http://localhost:3001/editformproduct/${location.state.id}`)
        .then((res) => {
          setFormEdit(res.data.dataForm);
          setName(res.data.dataForm[0].name);
          setDescription(res.data.dataForm[0].description);
          setPrice(res.data.dataForm[0].price);
          setQuentity(res.data.dataForm[0].quentity);
          setAlt(res.data.dataForm[0].alt);
        });
    };
    // console.log(location.state.id);

    fetchEditForm();
  }, []);

  return (
    <div
      className={`${styles.main} bg-${context.state.theme} text-${context.state.textColor}`}
    >
      <form
        method="POST"
        className={`${styles.form}`}
        encType="multipart/form-data"
      >
        {formEdit.map((form) => {
          return (
            <>
              <input
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
              <textarea
                type="text"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
              <input
                type="number"
                min={0}
                name="price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
              />
              <input
                type="number"
                min={1}
                name="quentity"
                onChange={(e) => setQuentity(e.target.value)}
                value={quentity}
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
                value={alt}
                required
              />
            </>
          );
        })}

        <button className="btn btn-secondary mt-2" onClick={editProduct}>
          Edytuj produkt
        </button>
        {message !== "" ? (
          <div className="alert alert-success mt-2">{message} !!</div>
        ) : null}
      </form>
    </div>
  );
}
