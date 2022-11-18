import React from 'react';
import { Link } from 'react-router-dom';
import imgNotFound from "../assets/notFound.png";

function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-wrapper">
        <img src={imgNotFound} alt="error-404" className="not-found-logo"/>
        <Link className="main-buttons edit-button not-found-btn" to="/">Volver a TasteIt</Link>
        <h2>La página a la que tratas de acceder no existe</h2>
      </div>

    </div>
  )
}

export default NotFound