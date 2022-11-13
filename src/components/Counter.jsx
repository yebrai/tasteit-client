import React, { useState } from "react";

// Antd
import { Button } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

function Counter() {
  // Counter for adding quantities of product to shoppingCart
  const [counter, setCounter] = useState(1);

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

  return (
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
  );
}

export default Counter;
