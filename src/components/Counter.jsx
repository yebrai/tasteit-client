import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// Antd
import { Button } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { AuthContext } from "../context/auth.context";
import { addShoppingCartService } from "../services/shoppingCart.services";
import { ThemeContext } from "../context/theme.context";

function Counter({product}) {
  const navigate = useNavigate();

  const { toggleCart } = useContext(ThemeContext);
  
  //Products for add to cart
  const [totalProducts, setTotalProducts] = useState([product._id])

  // To update cart products when "añadir al carrito" button is pressed
  const { findCart } = useContext(AuthContext);

  // Increment counter
  const increaseCounter = () => {
    setTotalProducts(totalProducts.concat(product._id))
  };

  // Decrement counter
  const reduceCounter = () => {
    if (totalProducts.length > 1) {
      setTotalProducts(totalProducts.slice(0, -1));
    }
  };

  // Add quantity of product to the cart
  const addToCart = async () => {

    try {
      await addShoppingCartService(totalProducts);
      findCart();
      setTotalProducts([product._id])
      success();
    } catch (error) {
      navigate("/error");
    }
  };

  // Add selected product quantity to the cart and opens the cart
  const quickPurchase = () => {
    addToCart();
    toggleCart();
  };

  // Toast Message
  const success = () =>
    toast(`${product.name} añadido al carrito`, { icon: "✔️" });

  return (
    <div className="counter-quantity-container">
      <div className="counter-quantity-buttons">
        <Button icon={<MinusOutlined />} onClick={reduceCounter}></Button>
        <p className="counter">{totalProducts.length}</p>
        <Button icon={<PlusOutlined />} onClick={increaseCounter}></Button>
      </div>

      <div>
        <Button onClick={addToCart} style={{ margin: "0 10px 0 0" }}>
          Añadir al carrito
        </Button>
        <Button style={{ margin: "0" }} onClick={quickPurchase}>
          Comprar
        </Button>
      </div>
      <Toaster />
    </div>
  );
}

export default Counter;
