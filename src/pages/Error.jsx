import React from 'react'
import { Link } from 'react-router-dom'
import imgError from "../assets/error.png";

function Error() {
  return (
    <div className="error-container">
      <div className="error-wrapper">
        <img src={imgError} alt="error-500" className="error-logo"/>
        <Link className="main-buttons edit-button error-btn" to="/">Volver a TasteIt</Link>
        <h2>El servidor se encuentra en tareas de mantenimiento. Disculpa las molestias.</h2>
      </div>
    </div>
  )
}

export default Error