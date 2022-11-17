import React, { useState } from "react";

import { Button, Modal } from "antd";

import { TiDocumentText } from "react-icons/ti";

function PurchaseModal({ purchase }) {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
    console.log(purchase.items);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // Products and quantities to render in the shopping cart
  let uniqueProduct = [];
  let subtotalProductsPrice = 0;
  let shippingCosts = 4.5;

  purchase.items.forEach((eachProduct) => {
    let productToModify = uniqueProduct.find(
      (product) => product._id === eachProduct._id
    );

    if (productToModify) {
      productToModify.quantity += 1;
      productToModify.price += eachProduct.price;
    } else {
      uniqueProduct.push({
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
    <>
      <Button
        icon={<TiDocumentText size="1.5rem" />}
        onClick={showModal}
        className="icons"
      ></Button>
      <Modal
        title={`Detalles de pedido: ${purchase._id.slice(0, 5)}`}
        open={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        destroyOnClose
        footer={null}
      >
        <div className="modal-purchase-main">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Producto</th>
                <th>Unidades</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {uniqueProduct.map((eachProduct, index) => {
                return (
                  <tr key={eachProduct._id}>
                    <td>
                      <h3>{`${index + 1}º ${eachProduct.name}`}</h3>
                    </td>
                    <td>
                      <img src={eachProduct.image} alt="" width={80} />
                    </td>
                    <td>{eachProduct.quantity}</td>
                    <td>{eachProduct.price}€</td>
                  </tr>
                );
              })}
            </tbody>

            <tfoot className="modal-purchase-footer">
              <tr>
                <td className="modal-footer-text">Subtotal</td>
                <td className="modal-footer-cost">{subtotalProductsPrice}€</td>
              </tr>

              <tr>
                <td className="modal-footer-text">Costes</td>
                <td className="modal-footer-cost">{shippingCosts}€</td>
              </tr>

              <tr>
                <td className="modal-footer-text">Total</td>
                <td className="modal-footer-cost">{totalPrice}€</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Modal>
    </>
  );
}

export default PurchaseModal;
