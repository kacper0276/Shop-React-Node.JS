import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingIcon from "../../../components/UI/LoadingIcon";
import ReducerContext from "../../../context/reducerContext";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import styles from "./ShowAllProducts.module.css";

export default function ShowAllProducts() {
  useWebsiteTitle("Wszystkie twoje aukcje");

  const context = useContext(ReducerContext);
  const owner = context.state.login;
  const [productsUser, setProductsUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useNavigate();

  const fetchProducts = async () => {
    await axios
      .get(`http://localhost:3001/getalluserproducts/${owner}`)
      .then((response) => {
        const allProducts = response.data.products;

        setProductsUser(allProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
      });
  };

  const removeItem = async (id) => {
    await axios.get(`http://localhost:3001/deleteuserproduct/${id}`);

    history("/profil");
  };

  const editItem = async (id) => {
    history("/profil/edytujprodukt", {
      state: {
        id: id,
      },
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div
      className={`${styles.main} bg-${context.state.theme} text-${context.state.textColor}`}
    >
      {loading ? (
        <LoadingIcon />
      ) : productsUser.length > 0 ? (
        <table className={`table text-${context.state.textColor}`}>
          <thead>
            <tr>
              <th scope="col">ID.</th>
              <th scope="col">Nazwa</th>
              <th scope="col">Opis</th>
              <th scope="col">Cena</th>
              <th scope="col">Ilość</th>
              <th scope="col">Zdjęcia</th>
              <th scope="col">Alt</th>
              <th scope="col">Edytuj</th>
              <th scope="col">Usuń</th>
            </tr>
          </thead>
          <tbody>
            {productsUser.map((product, index) => {
              return (
                <tr key={product.id}>
                  <th>{index + 1}</th>
                  <th>{product.name}</th>
                  <th>{product.description}</th>
                  <th>{product.price}</th>
                  <th>{product.quentity}</th>
                  <th>{product.img}</th>
                  <th>{product.alt}</th>
                  <th>
                    <button
                      className="btn btn-warning"
                      onClick={() => editItem(`${product.id}`)}
                    >
                      Edytuj
                    </button>
                  </th>
                  <th>
                    <button
                      onClick={() => removeItem(`${product.id}`)}
                      className="btn btn-danger"
                    >
                      Usuń
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>Brak aktywnych aukcji !!</p>
      )}
    </div>
  );
}
