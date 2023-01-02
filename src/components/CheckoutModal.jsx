import React, { useContext } from "react";
import { Modal, Form } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context.js";
import creditImg from "../assets/credit-card.png";

import { useModalForm } from "../hooks/useModal";

// Stripe
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import {
  deleteAllShoppingCartService,
  sendStripePaymentService,
} from "../services/shoppingCart.services.js";

function CheckoutModal({ requestPurchase, totalPrice }) {
  // Context
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    showModal,
    isOpen,
    handleCancel,
    showLoading,
    setLoading,
  } = useModalForm();

  const stripe = useStripe(); // Stripe Hook which returns connection to stripe
  const elements = useElements(); // Stripe Hook which allows to access and manipulate stripe elements like <CardElement />

  // Modal configuration

  const handleSubmit = async (e) => {
    setLoading(true);
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
        setLoading(true);
      } catch (error) {
        navigate("/error");
      }
    }
  };


  return (
    <>
      <button className="intro-link-start payment-button" onClick={showModal}>
        Pagar
      </button>
      <Modal
        title="Realizar pago"
        open={isOpen()}
        onOk={handleSubmit}
        okText="Realizar pago"
        confirmLoading={showLoading()}
        onCancel={handleCancel}
        destroyOnClose
      >
        <Form>
          <div className="payment-container">
            <div className="payment-header">
              <img src={creditImg} alt="" />
              <div>
                <h2>
                  <b></b> Cargo de: <span>{totalPrice}€</span>
                </h2>
                <h3>
                  <b>Solicitante:</b> <p>{user.name}</p>
                </h3>
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
