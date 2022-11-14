import React, { useContext, useState } from "react";

import toast, { Toaster } from 'react-hot-toast';

// Antd
import { Button } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { AuthContext } from "../context/auth.context";
import { getNextKeyDef } from "@testing-library/user-event/dist/keyboard/getNextKeyDef";

function Counter(props) {
  // Counter for adding quantities of product to shoppingCart
  const [counter, setCounter] = useState(1);
  const {cartProducts, setCartProducts} = useContext(AuthContext)
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

  // Add quantity of product to the cart
  const addToCart = () => {
    setCartProducts([...cartProducts, product])
  }

  const succes = () => toast(`${props.name} añadido al carrito`)

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          width: 200,
        }}
      >
        <p>Cantidad:</p>
        <Button icon={<MinusOutlined />} onClick={reduceCounter}></Button>
        <span>{counter}</span>
        <Button icon={<PlusOutlined />} onClick={increaseCounter}></Button>
      </div>

      <div>
        <Button onClick={addToCart}style={{ margin: "0 10px 0 0" }}>Añadir al carrito</Button>
        <Button style={{ margin: "0" }}>Comprar</Button>
      </div>
    </div>
  );
}

export default Counter;
