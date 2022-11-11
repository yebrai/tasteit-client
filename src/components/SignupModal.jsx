import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService, signupService } from "../services/auth.services";

import { useContext } from "react"
import { AuthContext } from "../context/auth.context";

function SignupModal() {
  // navigate use configuration
  const { authenticateUser } = useContext(AuthContext)
  const navigate = useNavigate();

  // Sign up states configuration
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Modal configuration
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  // Form states functions
  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleAgeChange = (event) => setAge(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handlePasswordConfirmationChange = (event) => setPasswordConfirmation(event.target.value);

  const handleSignup = async () => {
    // event.preventDefault();

    const newUser = {
      name: name,
      email: email,
      age: age,
      password: password,
      passwordConfirmation: passwordConfirmation,
    };

    const userCredentials = {
      email: email,
      password: password,
    };

    try {
      // Call backend route, create
      await signupService(newUser);
      const response = await loginService(userCredentials);
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
        // Error 500
        navigate("/error");
      }
    }
  };

  // Modal functions
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    handleSignup();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // Render
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
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
            />
            <br />
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
            <br />
            <label htmlFor="age">Edad</label>
            <input
              type="number"
              name="age"
              value={age}
              onChange={handleAgeChange}
            />
            <br />
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <br />
            <label htmlFor="passwordConfirmation">Confirma la contraseña</label>
            <input
              type="password"
              name="passwordConfirmation"
              value={passwordConfirmation}
              onChange={handlePasswordConfirmationChange}
            />
            <br />
            {errorMessage !== "" && <p>{errorMessage}</p>}
          </form>
        </div>
      </Modal>
    </>
  );
}

export default SignupModal;
