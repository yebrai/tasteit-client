import gifFood from "../assets/spinners/food-spinner.gif";
import { Helmet } from "react-helmet";
export default function LoadingSpinner() {

  
    return (
      <div className="spinner-container">
      <Helmet>
        <title>Loading...</title>
      </Helmet>
        <h2 className="spinner-title blinking">Taste It...</h2>
        <img className="spinner" src={gifFood} alt="" />
      </div>
    );
  };