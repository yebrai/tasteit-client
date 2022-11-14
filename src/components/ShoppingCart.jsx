import { FaBackward } from "react-icons/fa";

//Context
import { AuthContext } from "../context/auth.context";
import { useContext, useEffect, useState } from "react";
import { deleteShoppingCartService, getShoppingCartService } from "../services/shoppingCart.services";
import { Button } from "antd";

// Antd
import { CloseCircleFilled } from '@ant-design/icons'
import { ThemeContext } from "../context/theme.context";

function ShoppingCart() {
  const { cartProducts, setCartProducts } =
    useContext(AuthContext);

  const {renderCart, toggleCart, renderCartWrapper} = useContext(ThemeContext)

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
  
  // Deletes a product from the shopping cart
  const deleteCartProduct = async (productId) => {
    try {
      await deleteShoppingCartService(productId)
    } catch(error) {
      console.log(error)
    }
  }


  return (
    <div style={renderCartWrapper()}>
      <div style={renderCart()}>
        <div className="shopping-card-container">
          <button
            type="button"
            className="cart-back-heading"
            onClick={toggleCart}
          >
            <FaBackward />
            <span className="top-title">Tu cesta</span>
            <span className="quantity-items">10 Productos</span>
          </button>
          <div>
            {cartProducts.map((eachProduct, index) => {
              return (
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", margin: "40px 0", fontSize: 20, border: "1px solid lightgray", padding: 5, borderRadius: 5}}>
                  <img src={eachProduct.image} alt={eachProduct.name} style={{width: 60, height: 50, borderRadius: 2}} />
                  <div style={{width: "100%", padding: 6, display: "flex", flexDirection: "column", margin: "0 0 0 10px"}}>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                      <p style={{margin: 0}}>{eachProduct.name}</p>
                      <p style={{margin: 0, fontWeight: "bolder"}}>{eachProduct.price} €</p>
                    </div>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                      <p style={{margin: 0}}>Cantidad: {eachProduct.quantity}</p>
                      <Button danger icon={<CloseCircleFilled />} onClick={() => deleteCartProduct(eachProduct._id)}></Button>
                    </div>
                  </div>
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
