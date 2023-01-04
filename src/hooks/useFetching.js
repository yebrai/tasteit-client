import { useState } from "react";
import gifFood from "../assets/spinners/food-spinner.gif";

export const useFetching = () => {
  const [isFetching, setIsFetching] = useState(true);

  const loadingSpinner = () => {
        return (
          <div className="spinner-container">
            <h2 className="spinner-title blinking">Taste It...</h2>
            <img className="spinner" src={gifFood} alt="" />
          </div>
        );
  };

  const disableFetching = () => setIsFetching(false)
  const showIsFetching = () => isFetching

  return {
    loadingSpinner,
    showIsFetching,
    disableFetching
  };
};
