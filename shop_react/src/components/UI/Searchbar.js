import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Searchbar() {
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState();

  const search = (e) => {
    if (e.keyCode === 13) {
      navigate("/szukaj", {
        state: {
          searchWord: searchWord,
        },
      });
    }
  };

  return (
    <div>
      <input
        type="text"
        name="search"
        className="input-group m-2"
        placeholder="Szukaj aukcji..."
        onChange={(e) => setSearchWord(e.target.value)}
        onKeyUp={search}
      />
    </div>
  );
}
