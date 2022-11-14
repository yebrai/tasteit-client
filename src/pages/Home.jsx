import { useContext } from "react"
import { Link } from "react-router-dom"

import { ThemeContext } from "../context/theme.context";
import { AuthContext } from "../context/auth.context"
import ShoppingCart from "../components/ShoppingCart";

// React icon
import { FaShoppingCart } from "react-icons/fa";

function Home() {
  const {toggleCart} = useContext(ThemeContext)
  const {isLoggedIn} = useContext(AuthContext)
  return (
    <div className="home-main-container">
      <div className="homeBoxContainer">
        <Link to="/all/products" className="container-home all-foods">
          <img/>
          <div className="overlay-home">
            <span>Todas las Comidas</span>
          </div>
        </Link>
        <Link to="/all/products" className="container-home drinks">
          <img/>
          <div className="overlay-home">
            <span>Bebidas</span>
          </div>
        </Link>
      </div>
      <div className="homeBoxContainer">
      <Link to="/all/products" className="container-home food">
          <img/>
          <div className="overlay-home">
            <span>Almuerzos</span>
          </div>
        </Link>
        <Link to="/all/products" className="container-home desserts" >
          <img/>
          <div className="overlay-home">
            <span>Postres</span>
          </div>
        </Link>
      </div>
      {isLoggedIn && <button onClick={toggleCart} className="cart-button">
        <FaShoppingCart />
        <span>12</span>
      </button>}
      
      <ShoppingCart />
    </div>
  );
}

export default Home;
