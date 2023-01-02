import React from "react";
import { loginService } from "../services/auth.services";
// CustomHook
import { useModalForm } from "../hooks/useModal";

//Antd
import { Modal, Form, Input } from "antd";
const { Item } = Form;

function LoginModal() {
  // Custom hook
  const {
    showModal,
    isOpen,
    handleCancel,
    showLoading,
    showErrorMesage,
    handleChange,
    handleAuth
  } = useModalForm();

  // Render
  return (
    <>
      <button className="main-buttons" onClick={showModal}>
        Iniciar Sesión
      </button>
      <Modal
        title="Iniciar Sesión"
        open={isOpen()}
        onOk={()=>handleAuth(loginService)}
        confirmLoading={showLoading()}
        onCancel={handleCancel}
        destroyOnClose
      >
        <div>
          <Form>
            <Item label="Email">
              <Input name="email" onChange={handleChange} />
            </Item>
            <Item label="Password">
              <Input.Password name="password" onChange={handleChange} />
            </Item>
            {showErrorMesage && (
              <p className="error-message">{showErrorMesage()}</p>
            )}
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default LoginModal;
