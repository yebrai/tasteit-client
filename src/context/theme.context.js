import { createContext, useState } from "react";

const ThemeContext = createContext()

function ThemeWrapper(props) {

    // creamos todos los estados y funciones que queremos pasar por contexto
    const [showCart, setShowCart] = useState(false);
      
      const shoppingCartOn = {
        width: "30vw",
        height: "100vh",
        backgroundColor: "white",
        position: "fixed",
        right: "0",
        top: "0",
        zIndex: "100",
        transition: "all 1s ease-in-out"
      }

      const shoppingCartOf = {
        width: "0vw",
        height: "100vh",
        backgroundColor: "white",
        position: "fixed",
        right: "0",
        top: "0",
        zIndex: "100",
        transition: "all 1s ease-in-out"
      }
  
      const toggleCart = () => {
        setShowCart(!showCart)
      }
    
      const renderCart = () => {
        return showCart ? shoppingCartOn : shoppingCartOf
      }

      const passedContext = {
        renderCart,
        toggleCart
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