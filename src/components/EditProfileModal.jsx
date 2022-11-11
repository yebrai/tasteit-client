import { Button, Modal, Form, Input } from "antd";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { editUserService } from "../services/tasteit.services.js";

//Form styles
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function EditProfileModal() {
  const navigate = useNavigate();
  // Context
  const { user, authenticateUser } = useContext(AuthContext);
  

  // Modal configuration
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadings, setLoadings] = useState(false);

  // Cloudinary State
  const [image, setImage] = useState("");

  //Form submit function
  const onFinish = async (values) => {
    
    // Data transmission element
    const formValue = new FormData();
    formValue.append("name", values.name);
    formValue.append("email", values.email);
    formValue.append("age", values.age);
    formValue.append("password", values.password);
    formValue.append("image", image);
    setLoadings(true);
    console.log(values);
    try {
      await editUserService(user._id, formValue);
      setTimeout(() => {
        setOpen(false);
        setLoadings(false);
        authenticateUser()
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
        setLoadings(false)
      } else {
        // Error 500
        navigate("/error");
      }
      console.log("error");
    }
  };
  // Modal functions

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Editar Perfil
      </Button>
      <Modal
        title="User Login"
        open={open}
        footer={null}
        onCancel={handleCancel}
      >
        <div>
          <Form {...layout} name="control-hooks" onFinish={onFinish}>
            <Form.Item name="name" label="Nombre">
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>
            <Form.Item name="age" label="Edad">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Nueva Password">
              <Input.Password />
            </Form.Item>

            <Form.Item name="image" label="Imagen">
              <Input
                type="file"
                onChange={(event)=> setImage(event.target.files[0])}
              />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <div>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loadings}
                >
                  Editar
                </Button>
              </div>
            </Form.Item>
            <br />
            {errorMessage !== "" && <p>{errorMessage}</p>}
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default EditProfileModal;
