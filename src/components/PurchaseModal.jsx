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
   let shippingCosts = 4.50;
   
   purchase.items.forEach(eachProduct => {
     let productToModify = uniqueProduct.find(product => product._id === eachProduct._id)
 
     if (productToModify) {
       productToModify.quantity += 1;
       productToModify.price += eachProduct.price;
 
     } else {
       uniqueProduct.push({
         _id: eachProduct._id,
         image: eachProduct.image,
         name: eachProduct.name,
         quantity: 1,
         price: eachProduct.price
       })
     }
 
     subtotalProductsPrice += eachProduct.price;
   })
 
   // Total price
   let totalPrice = subtotalProductsPrice + shippingCosts;
  return (
    <>
      <Button
        icon={<TiDocumentText size="1.5rem" />}
        onClick={showModal}
      ></Button>
      <Modal
        title={`Detalles de pedido: ${purchase._id.slice(0, 5)}`}
        open={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        destroyOnClose
      >
        <div>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
              </tr>
            </thead>

            <tbody>
              {uniqueProduct.map((eachProduct) => {
                return (
                  <tr>
                    <td>
                      <strong>{eachProduct.name}</strong>
                    </td>
                    <td>{eachProduct.price}</td>
                  </tr>
                );
              })}
            </tbody>

            <tfoot>
              <tr>
                <td>Subtotal</td>
                <td>{subtotalProductsPrice}€</td>
              </tr>

              <tr>
                <td>Gastos de envio</td>
                <td>{shippingCosts}€</td>
              </tr>

              <tr>
                <td>total</td>
                <td>{totalPrice}€€€</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Modal>
    </>
  );
}

export default PurchaseModal;
