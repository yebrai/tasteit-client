import React from "react";
import { Link } from "react-router-dom";
import imgNotFound from "../assets/notFound.png";

function NotFound() {
  // Error 404
  return (
    <div className="error-container">
      <div className="error-wrapper">
        <img src={imgNotFound} alt="error-404" className="not-found-logo" />
        <Link className="main-buttons edit-button error-btn" to="/">
          Volver a TasteIt
        </Link>
        <h2>La página a la que tratas de acceder no existe.</h2>
      </div>
    </div>
  );
}

export default NotFound;
