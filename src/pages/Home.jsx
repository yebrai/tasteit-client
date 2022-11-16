import { useContext } from "react"
import { Link } from "react-router-dom"

import { ThemeContext } from "../context/theme.context";
import { AuthContext } from "../context/auth.context"
import ShoppingCart from "../components/ShoppingCart";

// React icon
import { FaShoppingCart } from "react-icons/fa";

function Home() {
  const {toggleCart} = useContext(ThemeContext)
  const {isLoggedIn, cartProducts} = useContext(AuthContext)


  return (
    <div id="home-card" className="home-main-container">
      <div className="homeBoxContainer">
        <Link to="/all/products" className="container-home all-foods">
          <img/>
          <div className="overlay-home">
            <span>Todas las Comidas</span>
          </div>
        </Link>
        <Link to="/drinks/products" className="container-home drinks">
          <img/>
          <div className="overlay-home">
            <span>Bebidas</span>
          </div>
        </Link>
      </div>
      <div className="homeBoxContainer">
      <Link to="/foods/products" className="container-home food">
          <img/>
          <div className="overlay-home">
            <span>Almuerzos</span>
          </div>
        </Link>
        <Link to="/desserts/products" className="container-home desserts" >
          <img/>
          <div className="overlay-home">
            <span>Postres</span>
          </div>
        </Link>
      </div>
      <div className="cart-button-container">
      {isLoggedIn && 
      <button onClick={toggleCart} className="cart-button">
        <FaShoppingCart size="2em"/>
        <div className="cart-button-quantity">
        <span>{cartProducts.length}</span>
        </div>
      </button>}
      </div>
      
      <ShoppingCart />
    </div>
  );
}

export default Home;
