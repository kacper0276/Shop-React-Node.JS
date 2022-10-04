import { useContext } from "react";
import ReducerContext from "../../context/reducerContext";

export default function LoadingIcon(props) {
  const theme = useContext(ReducerContext);

  return (
    <>
      <div className={`d-flex justify-content-center bg-${theme.state.theme}`}>
        <div className={`spinner-border m-5 text-primary`} role="status">
          <span className={`sr-only text-${theme.state.theme}`}>
            Ładowanie...
          </span>
        </div>
      </div>
    </>
  );
}
