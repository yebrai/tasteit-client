import React, { useContext, useState } from "react";
import { Button, Modal, Form } from "antd";
import { useNavigate } from "react-router-dom";

import creditImg from "../assets/credit-card.png"

import { AuthContext } from "../context/auth.context.js";

// stripe
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import {
  deleteAllShoppingCartService,
  sendStripePaymentService,
} from "../services/shoppingCart.services.js";

function CheckoutModal({ requestPurchase, totalPrice }) {
  const { user } = useContext(AuthContext);

  const stripe = useStripe(); // Stripe Hook which returns connection to stripe
  const elements = useElements(); // Stripe Hook which allows to access and manipulate stripe elements like <CardElement />

  //Navigate
  const navigate = useNavigate();

  // Modal configuration
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleSubmit = async (e) => {
    console.log("wtf")
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
          amount: totalPrice,
        });
        await deleteAllShoppingCartService(); // Remove the entire shoppingCart

        elements.getElement(CardElement).clear();
        requestPurchase();
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
        cancelText="Rechazar"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        destroyOnClose
      >
        <Form>
          <div className="payment-container">
            <div className="payment-header">
            <img src={creditImg} alt="" />
            <div>
            <h2><b></b> Cargo de: <span>{totalPrice}€</span></h2>
              <h3><b>Solicitante:</b>  <p>{user.name}</p></h3>
              </div>
            </div>
            <div>
              <p>Introduzca los datos de su tarjeta de credito:</p>
              <div className="card-element">
                <CardElement />
              </div>
              <select>
                <option>Visa</option>
                <option>Master Card</option>
                <option>American Express</option>
              </select>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
}

export default CheckoutModal;
