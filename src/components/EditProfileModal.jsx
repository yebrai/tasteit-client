import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { editUserService } from "../services/tasteit.services.js";

import { useModalForm } from "../hooks/useModal";
//Antd
import { Modal, Form, Input } from "antd";
const { Item } = Form;

function EditProfileModal() {
  // Context/navigate
  const navigate = useNavigate();

  const {
    showModal,
    isOpen,
    setLoading,
    showLoading,
    handleCancel,
    handleSetErrorMessage,
    showErrorMesage,
    handleChange,
    showFormData
  } = useModalForm();
  
  const { user, authenticateUser } = useContext(AuthContext);

  // Cloudinary State
  const [image, setImage] = useState("");

  //Form submit function
  const handleEditProfile = async () => {
    setLoading(true);
    // Data transmission element
    const formValue = new FormData();
    formValue.append("name", showFormData().name);
    formValue.append("email", showFormData().email);
    formValue.append("age", showFormData().age);
    formValue.append("password", showFormData().password);
    formValue.append("image", image);
    try {
      await editUserService(user._id, formValue);
        showModal();
        authenticateUser();
        setLoading(false);
    } catch (error) {
      setLoading(false)
      if (error.response && error.response.status === 400) {
        handleSetErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  // Modal functions

  return (
    <>
      <button
        className="main-buttons edit-button profile-btn"
        onClick={showModal}
      >
        Editar Perfil
      </button>
      <Modal
        title="Editar perfil"
        open={isOpen()}
        onOk={handleEditProfile}
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
            <Item label="Foto de perfil">
              <Input
                type="file"
                onChange={(event) => setImage(event.target.files[0])}
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

export default EditProfileModal;
