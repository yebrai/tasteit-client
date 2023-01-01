import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/auth.services";

//Context
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";


//Antd
import { Modal, Form, Input } from "antd";
const { Item } = Form;

const useModal = () => {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false)
  //formData
  const [loginForm, setLoginForm] = useState();
  const loginFormData = () => loginForm

  const showLoading = () => confirmLoading
  const setLoading = (controller) => setConfirmLoading(controller)
  const showErrorMesage = () =>  errorMessage
  const handleSetErrorMessage = (error) => setErrorMessage(error)
  const showModal = () => setOpen(true)
  const isOpen = () => open

  const handleCancel = () => {
    setOpen(false);
    setErrorMessage("");
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  return {
    showModal, isOpen, handleCancel, showLoading, setLoading, showErrorMesage, handleSetErrorMessage, handleChange, loginFormData
  }
}

function LoginModal() {
  //custom hook
  const {showModal, isOpen, handleCancel, showLoading, setLoading, showErrorMesage, handleSetErrorMessage, handleChange, loginFormData} = useModal()
  
  // Context/navigate
  const { authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Login user
      const response = await loginService(loginFormData);
      // Store Token in browser local storage
      localStorage.setItem("authToken", response.data.authToken);
      setLoading(true);
      setTimeout(() => {
        showModal();
        setLoading(false);
        authenticateUser();
      }, 1000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        handleSetErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  // Render
  return (
    <>
      <button className="main-buttons" onClick={showModal}>
        Iniciar Sesión
      </button>
      <Modal
        title="Iniciar Sesión"
        open={isOpen()}
        onOk={handleLogin()}
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
            {showErrorMesage !== "" && (
              <p className="error-message">{showErrorMesage}</p>
            )}
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default LoginModal;
