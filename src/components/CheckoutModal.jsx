import React, { useState } from "react";
import { Button, Modal, Form } from "antd";
import { useNavigate } from "react-router-dom";


function CheckoutModal({requestPurchase}) {
  
  //Navigate
  const navigate = useNavigate()

  // Modal configuration
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);



  
  const handleSubmit = () => {
    setConfirmLoading(true);
    
    // todo esto va despues de la llamada post
    //setConfirmLoading(true); 
    // requestPurchase() 
    
    setTimeout(() => {
      navigate("/purchases")
      
    },3000)
    
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
        <div>
          <Form>
          <label htmlFor="">Hola!</label>
            {/* <CardElement /> */}
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default CheckoutModal;
