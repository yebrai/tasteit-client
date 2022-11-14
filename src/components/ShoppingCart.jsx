import {
  FaBackward
} from "react-icons/fa";

//Context
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

function ShoppingCart() {
  const {setShowCart} = useContext(AuthContext)

  return (
    <div className="shopping-cart-wrapper">
    <div className="shopping-cart">
    <div className="shopping-card-container">
    <button
          type="button"
          className="cart-back-heading"
          onClick={()=>setShowCart(false)}
        >
          <FaBackward />
          <span className="top-title">Tu cesta</span>
          <span className="quantity-items">10 Productos</span>
        </button>

    </div>
    </div>
    </div>
  )
}

export default ShoppingCart