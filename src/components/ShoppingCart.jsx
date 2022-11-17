import { FaBackward } from "react-icons/fa";

//Context
import { AuthContext } from "../context/auth.context";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteShoppingCartService } from "../services/shoppingCart.services";
import { addPurchaseService } from "../services/purchase.services";
import { Button, Divider } from "antd";

// Antd
import { CloseCircleFilled, ShoppingOutlined } from "@ant-design/icons";
import { ThemeContext } from "../context/theme.context";
import CheckoutModal from "./CheckoutModal";

function ShoppingCart() {
  // Context
  const { cartProducts, findCart } = useContext(AuthContext);
  const { renderCart, toggleCart, renderCartWrapper } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    findCart();
  }, []);

  // Deletes a product from the shopping cart
  const deleteCartProduct = async (productId) => {
    try {
      await deleteShoppingCartService(productId);
      findCart();
    } catch (error) {
      navigate("/error")
    }
  };

  const requestPurchase = async () => {
    try {
      await addPurchaseService(cartProducts);
    } catch (error) {
      navigate("/error")
    }
  };

  // Products and quantities to render in the shopping cart
  let cartProductsToShow = [];
  let subtotalProductsPrice = 0;
  let shippingCosts = 4.5;

  cartProducts.forEach((eachProduct) => {
    let productToModify = cartProductsToShow.find(
      (product) => product._id === eachProduct._id
    );

    if (productToModify) {
      productToModify.quantity += 1;
      productToModify.price += eachProduct.price;
    } else {
      cartProductsToShow.push({
        _id: eachProduct._id,
        image: eachProduct.image,
        name: eachProduct.name,
        quantity: 1,
        price: eachProduct.price,
      });
    }

    subtotalProductsPrice += eachProduct.price;
  });

  // Total price
  let totalPrice = subtotalProductsPrice + shippingCosts;

  return (
    <div style={renderCartWrapper()}>
      <div style={renderCart()} className="shopping-container-main">
        <div className="shopping-card-container">
          <button
            type="button"
            className="cart-back-heading"
            onClick={toggleCart}
          >
            <FaBackward />
            <span className="top-title">Tu cesta</span>
            <span className="quantity-items">
              {cartProducts.length} productos
            </span>
          </button>
          {cartProducts.length === 0 ? (
            <div>
              <h1>Carrito vacío</h1>
              <h2>No tiene artículos en su cesta de la compra</h2>
              <Button icon={<ShoppingOutlined />} onClick={toggleCart}>
                Seguir comprando
              </Button>
            </div>
          ) : (
            <div className="cart-main-container">
              <div>
                {cartProductsToShow.map((eachProduct) => {
                  return (
                    <div className="cart-container" key={eachProduct._id}>
                      <img src={eachProduct.image} alt={eachProduct.name} />
                      <div className="product-cart-container">
                        <div className="product-cart-details">
                          <p>{eachProduct.name}</p>
                          <p>{eachProduct.price} €</p>
                        </div>
                        <div className="product-cart-details">
                          <p className="quantity-cart-text">
                            Cantidad: {eachProduct.quantity}
                          </p>
                          <Button
                            danger
                            icon={<CloseCircleFilled />}
                            onClick={() => deleteCartProduct(eachProduct._id)}
                          ></Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="price-cart-container">
                <div className="product-cart-details">
                  <h3>Subtotal:</h3>
                  <h3>{subtotalProductsPrice}€</h3>
                </div>
                <Divider className="divider-cart"></Divider>
                <div className="product-cart-details">
                  <h3>Gastos de envío:</h3>
                  <h3>{shippingCosts}€</h3>
                </div>
                <Divider className="divider-cart"></Divider>
                <div className="product-cart-details">
                  <h2>Total:</h2>
                  <h2>{totalPrice}€</h2>
                </div>
                <CheckoutModal
                  requestPurchase={requestPurchase}
                  totalPrice={totalPrice}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
