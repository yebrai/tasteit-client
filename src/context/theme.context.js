import { createContext, useState } from "react";
import gifFood from "../assets/spinners/food-spinner.gif"

const ThemeContext = createContext()

function ThemeWrapper(props) {

    // creamos todos los estados y funciones que queremos pasar por contexto
    const [showCart, setShowCart] = useState(false);
      
      const shoppingCartOn = {
        width: "35vw",
        height: "100vh",
        backgroundColor: "white",
        position: "fixed",
        right: "0",
        top: "0",
        zIndex: "100",
        transition: "all s ease-in-out"
      }

      const shoppingCartOff = {
        width: "0vw",
        height: "100vh",
        backgroundColor: "white",
        position: "fixed",
        right: "0",
        top: "0",
        zIndex: "100",
        transition: "all 1s ease-in-out"
      }

      const cartWrapperOn = {
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.6)",
        position: "fixed",
        right: "0",
        top: "0",
        transition: "all 1s ease-in-out"
      }

      const cartWrapperOff = {
        width: "0vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0)",
        position: "fixed",
        right: "0",
        top: "0",
        transition: "all 1s ease-in-out"
      }
  
      const toggleCart = () => {
        setShowCart(!showCart)
      }
    
      const renderCart = () => {
        return showCart ? shoppingCartOn : shoppingCartOff
      }

      const renderCartWrapper = () => {
        return showCart ? cartWrapperOn : cartWrapperOff
      }

      const loadingSpinner = () => {
        return (
          <div className="spinner-container">
        <h2 className="spinner-title blinking">Taste It...</h2>
        <img className="spinner" src={gifFood} alt="" />
        </div>
        );
      }

      const passedContext = {
        renderCart,
        toggleCart,
        renderCartWrapper,
        loadingSpinner
      }

  
    return (
      <ThemeContext.Provider value={passedContext}>
        {props.children}
      </ThemeContext.Provider>
    )
  }

  export {
    ThemeWrapper, 
    ThemeContext
  }