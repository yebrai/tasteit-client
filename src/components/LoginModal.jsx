import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/auth.services";

import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function LoginModal() {
  // navigate use configuration
  const { authenticateUser} = useContext(AuthContext);
  const navigate = useNavigate();

  // Sign up states configuration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Modal configuration
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  // Form states functions
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleLogin = async () => {
    // e.preventDefault();

    const userCredentials = {
      email: email,
      password: password,
    };

    try {
      // Token validation
      const response = await loginService(userCredentials);
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
    setEmail("")
    setPassword("")
    setErrorMessage("")
  };

  const handleOk = () => {
    handleLogin();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // Render
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Iniciar Sesión
      </Button>
      <Modal
        title="Iniciar Sesión"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>
          <form>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
            <br />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <br />
            {errorMessage !== "" && <p>{errorMessage}</p>}
          </form>
        </div>
      </Modal>
    </>
  );
}

export default LoginModal;
