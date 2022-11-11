import { Button, Modal } from "antd";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";


function EditProfileModal() {
    const navigate = useNavigate();
    

    // Modal configuration
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSignup = async () => {
        // const { authenticateUser } = useContext(AuthContext)
    
        try {
          // Call backend route, create
        //   await signupService(newUser);
        //   const response = await loginService(userCredentials);
        //   localStorage.setItem("authToken", response.data.authToken);
          setConfirmLoading(true);
          setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            // authenticateUser();
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
 
        </form>
      </div>
    </Modal>
  </>
  )
}

export default EditProfileModal