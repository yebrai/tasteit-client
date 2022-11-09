import { Button, Modal } from "antd";
import React, { useState } from "react";

function SignupModal() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      //Meter aqui el axios.post
      
    }, 1000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Signup
      </Button>
      <Modal
        title="User Login"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>
          <form>
            <label htmlFor="">Nombre</label>
            <input type="text" />
            <br />
            <label htmlFor="">Email</label>
            <input type="text" />
            <br />
            <label htmlFor="">Edad</label>
            <input type="text" />
            <br />
            <label htmlFor="">Password</label>
            <input type="text" />
            <label htmlFor="">Password Confirmation</label>
            <input type="text" />
            <br />
          </form>
        </div>
      </Modal>
    </>
  )
}

export default SignupModal