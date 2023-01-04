import gifFood from "../assets/spinners/food-spinner.gif";

export default function LoadingSpinner() {
    return (
      <div className="spinner-container">
        <h2 className="spinner-title blinking">Taste It...</h2>
        <img className="spinner" src={gifFood} alt="" />
      </div>
    );
  };