import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService, signupService } from "../services/auth.services";


//Context
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

//Antd
import { Button, Modal, Form, Input } from "antd";
const { Item } = Form;

function SignupModal() {
  // navigate use configuration
  const { authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Sign up states configuration
  const [errorMessage, setErrorMessage] = useState("");

  // Modal states
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
    passwordConfirmation: "",
  });

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignupForm({ ...signupForm, [name]: value });
  };

  // Render
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Registrarse
      </Button>
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

            {errorMessage !== "" && <p>{errorMessage}</p>}
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default SignupModal;
