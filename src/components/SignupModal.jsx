import {signupService } from "../services/auth.services";
// CustomHook
import { useModalForm } from "../hooks/useModal";

// Antd
import { Modal, Form, Input } from "antd";
const { Item } = Form;

function SignupModal() {
  // CustomHook
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
        Registrarse
      </button>
      <Modal
        title="Registrarse"
        open={isOpen()}
        onOk={()=>handleAuth(signupService, true)}
        confirmLoading={showLoading()}
        onCancel={handleCancel}
        destroyOnClose
      >
        <div>
          <Form>
            <Item label="Nombre">
              <Input name="name" onChange={handleChange} />
            </Item>
            <Item label="Email">
              <Input name="email" onChange={handleChange} />
            </Item>
            <Item label="Edad">
              <Input name="age" onChange={handleChange} />
            </Item>
            <Item label="Contraseña">
              <Input.Password name="password" onChange={handleChange} />
            </Item>
            <Item label="Confirma la contraseña">
              <Input.Password
                name="passwordConfirmation"
                onChange={handleChange}
              />
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

export default SignupModal;
