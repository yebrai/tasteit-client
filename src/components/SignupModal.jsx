import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService, signupService } from "../services/auth.services";

//Context
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

//Antd
import { Modal, Form, Input } from "antd";
const { Item } = Form;

function SignupModal() {
  // Context/navigate
  const { authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Error message from backend
  const [errorMessage, setErrorMessage] = useState("");

  // Modal states
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [signupForm, setSignupForm] = useState();

  const handleSignup = async () => {
    try {
      // Create user
      await signupService(signupForm);
      //login user and Store Token in browser local storage,
      const response = await loginService(signupForm);
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
    handleSignup();
  };

  const handleCancel = () => {
    setOpen(false);
    setErrorMessage("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignupForm({ ...signupForm, [name]: value });
  };

  // Render
  return (
    <>
      <button className="main-buttons" onClick={showModal}>
        Registrarse
      </button>
      <Modal
        title="Registrarse"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
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

            {errorMessage !== "" && (
              <p className="error-message">{errorMessage}</p>
            )}
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default SignupModal;
