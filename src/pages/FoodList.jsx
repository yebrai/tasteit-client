import React, { Suspense, useContext } from "react";
import { useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import ShoppingCart from "../components/ShoppingCart";
import { ThemeContext } from "../context/theme.context.js";
import { AuthContext } from "../context/auth.context";
import LoadingSpinner from "../components/LodingSpinner";
// import ListOfFood from "../components/ListOfFood";

function FoodList() {

  const ListOfFood = React.lazy(
    () => import('../components/ListOfFood'));

  const { toggleCart } = useContext(ThemeContext);
  const { isLoggedIn, cartProducts } = useContext(AuthContext);

  // Food category received from Home.jsx link
  const { type } = useParams();

  return (
    <div className="cards-list-main">
      <Suspense fallback={<LoadingSpinner />}>
        <ListOfFood type={type} />
      </Suspense>
      {isLoggedIn && (
        <button onClick={toggleCart} className="cart-button">
          <FaShoppingCart size="2em" />
          <div className="cart-button-quantity">
            <span>{cartProducts.length}</span>
          </div>
        </button>
      )}
      <ShoppingCart />
    </div>
  );
}

export default FoodList;
