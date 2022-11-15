import { FaBackward } from "react-icons/fa";

//Context
import { AuthContext } from "../context/auth.context";
import { useContext, useEffect, useState } from "react";
import { deleteShoppingCartService, getShoppingCartService } from "../services/shoppingCart.services";
import { addPurchaseService } from "../services/purchase.services";
import { Button, Divider } from "antd";

// Antd
import { CloseCircleFilled, ShoppingOutlined } from '@ant-design/icons'
import { ThemeContext } from "../context/theme.context";

function ShoppingCart() {
  // Context
  const { cartProducts, findCart } = useContext(AuthContext);
  const { renderCart, toggleCart, renderCartWrapper } = useContext(ThemeContext)

  useEffect(() => {
    findCart();
  }, []);

  // Deletes a product from the shopping cart
  const deleteCartProduct = async (productId) => {
    try {
      await deleteShoppingCartService(productId)
      findCart()
      
    } catch(error) {
      console.log(error)
    }
  }

  const requestPurchase = async() => {
    try {
      await addPurchaseService(cartProducts)
      
    } catch (error) {
      console.log(error)
    }
  }

  // Products and quantities to render in the shopping cart
  let cartProductsToShow = [];
  let subtotalProductsPrice = 0;
  let shippingCosts = 4.50;
  
  cartProducts.forEach(eachProduct => {
    let productToModify = cartProductsToShow.find(product => product._id === eachProduct._id)

    if (productToModify) {
      productToModify.quantity += 1;
      productToModify.price += eachProduct.price;

    } else {
      cartProductsToShow.push({
        _id: eachProduct._id,
        image: eachProduct.image,
        name: eachProduct.name,
        quantity: 1,
        price: eachProduct.price
      })
    }

    subtotalProductsPrice += eachProduct.price;
  })

  // Total price
  let totalPrice = subtotalProductsPrice + shippingCosts;
  
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
            <span className="quantity-items">{cartProducts.length} productos</span>
          </button>
          {cartProducts.length === 0
          ?
          (
            <div>
              <h1>Carrito vacío</h1>
              <h2>No tiene artículos en su cesta de la compra</h2>
              <Button type="primary" icon={<ShoppingOutlined />} onClick={toggleCart}>Seguir comprando</Button>
            </div>
          )
          :
          (<div style={{padding: 20, height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
            <div>
              {cartProductsToShow.map((eachProduct) => {
                return (
                  <div key={eachProduct._id} style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", margin: "40px 0", fontSize: 20, border: "1px solid lightgray", padding: 5, borderRadius: 5}}>
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
            <div style={{display: "flex", flexDirection: "column"}}>
              <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <h3>Subtotal:</h3>
                <h3>{subtotalProductsPrice}€</h3>
              </div>
              <Divider style={{margin: 0}}></Divider>
              <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <h3>Gastos de envío:</h3>
                <h3>{shippingCosts}€</h3>
              </div>
              <Divider style={{margin: 0}}></Divider>
              <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <h2>Total:</h2>
                <h2>{totalPrice}€</h2>
              </div>
              <Button type="primary" onClick={requestPurchase} danger>PAGAR</Button>
            </div>
          </div>)}
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
