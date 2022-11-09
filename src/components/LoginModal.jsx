import { Button, Modal } from "antd";
import React, { useState } from "react";

function LoginModal() {
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
        Login
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
            <label htmlFor="">Email</label>
            <input type="text" />
            <br />
            <label htmlFor="">Password</label>
            <input type="text" />
          </form>
        </div>
      </Modal>
    </>
  );
}

export default LoginModal;
