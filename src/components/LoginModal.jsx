import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/auth.services";

//Context
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

//Antd
import { Modal, Form, Input } from "antd";
const { Item } = Form;

function LoginModal() {
  // Context/navigate
  const { authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Error message from backend
  const [errorMessage, setErrorMessage] = useState("");

  // Modal configuration
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  // Form states
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      // Login user
      const response = await loginService(loginForm);
      // Store Token in browser local storage
      localStorage.setItem("authToken", response.data.authToken);

      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
        authenticateUser();
      }, 1000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  // Modal functions
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    handleLogin();
  };

  const handleCancel = () => {
    setOpen(false);
    setErrorMessage("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  // Render
  return (
    <>
      <button className="main-buttons" onClick={showModal}>
        Iniciar Sesión
      </button>
      <Modal
        title="Iniciar Sesión"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
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
            {errorMessage !== "" && (
              <p className="error-message">{errorMessage}</p>
            )}
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default LoginModal;
