import React, { useContext, useState } from "react";

import toast, { Toaster } from 'react-hot-toast';

// Antd
import { Button } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { AuthContext } from "../context/auth.context";
import { addShoppingCartService } from "../services/shoppingCart.services";
import { ThemeContext } from "../context/theme.context";


function Counter(props) {
  const {toggleCart} = useContext(ThemeContext)

  // To update cart products when "añadir al carrito" button is pressed
  const {findCart} = useContext(AuthContext)

  // Counter for adding quantities of product to shoppingCart
  const [counter, setCounter] = useState(1);
  const {product} = props

  // Increment counter
  const increaseCounter = () => {
    setCounter(counter + 1);
  };

  // Decrement counter
  const reduceCounter = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  let totalProducts = []

  // Add quantity of product to the cart
  const addToCart = async () => {
    for (let i = 0; i < counter; i++) {
      totalProducts.push(props.product._id)
    }

    try {
      await addShoppingCartService(totalProducts)
      setCounter(1)
      findCart()
      success()

    } catch(error) {
      console.log(error);
    }
  }

  const quickPurchase = () => {
    addToCart()
    toggleCart()
  }
  //toast Message
  const success = () => toast(`${product.name} añadido al carrito`, {icon: '✔️'})

  return (
    <div className="counter-quantity-container">
      <div className="counter-quantity-buttons">
        <Button icon={<MinusOutlined />} onClick={reduceCounter}></Button>
        <p className="counter">{counter}</p>
        <Button icon={<PlusOutlined />} onClick={increaseCounter}></Button>
      </div>

      <div>
        <Button onClick={addToCart} style={{ margin: "0 10px 0 0" }}>Añadir al carrito</Button>
        <Button style={{ margin: "0" }} onClick={quickPurchase}>Comprar</Button>
      </div>
      <Toaster />
    </div>
  );
}

export default Counter;
