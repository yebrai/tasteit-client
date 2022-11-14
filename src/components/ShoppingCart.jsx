import { FaBackward } from "react-icons/fa";

//Context
import { AuthContext } from "../context/auth.context";
import { useContext, useEffect, useState } from "react";
import { getShoppingCartService } from "../services/shoppingCart.services";

function ShoppingCart() {
  const { setShowCart, cartProducts, setCartProducts } =
    useContext(AuthContext);

  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    findCart();
  }, []);

  const findCart = async () => {
    try {
      const shoppingCartCurrentProducts = await getShoppingCartService();
      setCartProducts(shoppingCartCurrentProducts.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isFetching) {
    return <h3>loading...</h3>;
  }

  return (
    <div className="shopping-cart-wrapper">
      <div className="shopping-cart">
        <div className="shopping-card-container">
          <button
            type="button"
            className="cart-back-heading"
            onClick={() => setShowCart(false)}
          >
            <FaBackward />
            <span className="top-title">Tu cesta</span>
            <span className="quantity-items">10 Productos</span>
          </button>
          <div>
            {cartProducts.map((eachProduct, index) => {
              return (
                <div>
                  {index === cartProducts.lastIndexOf(eachProduct) ? (<p>{eachProduct.name}</p>) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
