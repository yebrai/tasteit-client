import React, { useState } from "react";
import { Button, Modal, Form } from "antd";
import { useNavigate } from "react-router-dom";

// stripe
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { sendStripePaymentService } from "../services/shoppingCart.services.js";

function CheckoutModal({ requestPurchase }) {

  const stripe = useStripe(); // Stripe Hook which returns connection to stripe
  const elements = useElements(); // Stripe Hook which allows to access and manipulate stripe elements like <CardElement />

  //Navigate
  const navigate = useNavigate();

  // Modal configuration
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleSubmit = async() => {
    setConfirmLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement), // getElement gets CardElement input (the number)
    });

    // If there is not error when payment is created, send it to BE
    if (!error) {
      const { id } = paymentMethod;


      try {
        // Response from backend
        await sendStripePaymentService({
          id,
          amount: 100000,
        });
        elements.getElement(CardElement).clear();
        requestPurchase()
        navigate("/purchases");
        setConfirmLoading(true);
        
      } catch (error) {
        console.log(error);
      }
    }
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" danger onClick={showModal}>
        Pagar
      </Button>
      <Modal
        title="Realizar pago"
        open={open}
        onOk={handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        destroyOnClose
      >
        <Form>
          <label htmlFor=""></label>
          <CardElement />
        </Form>
      </Modal>
    </>
  );
}

export default CheckoutModal;
