import React, { useContext, useState } from "react";

import toast, { Toaster } from 'react-hot-toast';

// Antd
import { Button } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { AuthContext } from "../context/auth.context";
import { addShoppingCartService } from "../services/shoppingCart.services";

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
  const addToCart = async () => {
    
    try {
      for (let i = 1; i <= counter; i++) {
        await addShoppingCartService(product._id)
        success()
      }
      
    } catch(error) {
      console.log(error);
    }
  }

  const success = () => toast(`${props.product.name} añadido al carrito`, {icon: '✔️'})

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
        <Button onClick={addToCart} style={{ margin: "0 10px 0 0" }}>Añadir al carrito</Button>
        <Button style={{ margin: "0" }}>Comprar</Button>
      </div>
      <Toaster />
    </div>
  );
}

export default Counter;
