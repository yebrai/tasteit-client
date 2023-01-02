import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { editProductService } from "../services/tasteit.services";

import { useModalForm } from "../hooks/useModal";
// Antd
import { Modal, Form, Input, Select } from "antd";
const { Option } = Select;
const { Item } = Form;

function ProductEditModal(props) {
  // CustomHook
  const {
    showModal,
    isOpen,
    setLoading,
    showLoading,
    handleCancel,
    handleSetErrorMessage,
    showErrorMesage,
    handleChange,
    showFormData,
    setFormData,
  } = useModalForm();

  // Redirect hook
  const navigate = useNavigate();

  // Props
  const { product } = props;

  // Context
  const { authenticateUser } = useContext(AuthContext);

  // Cloudinary State for the product image
  const [image, setImage] = useState("");

  //Form submit function
  const handleEditProduct = async () => {
    setLoading(true);
    // Data transmission element
    const formValue = new FormData();
    formValue.append("name", showFormData().name);
    formValue.append("price", showFormData().price);
    formValue.append("location", showFormData().location);
    formValue.append("description", showFormData().description);
    formValue.append("category", showFormData().category);
    formValue.append("image", image);
    try {
      await editProductService(formValue, product._id, formValue);
      showModal();
      setLoading(false);
      authenticateUser();
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 400) {
        handleSetErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <>
      <button className="main-buttons edit-button" onClick={showModal}>
        Editar producto
      </button>
      <Modal
        title="Editar Producto"
        open={isOpen()}
        onOk={handleEditProduct}
        confirmLoading={showLoading()}
        onCancel={handleCancel}
        destroyOnClose
      >
        <div>
          <Form>
            <Item label="Nombre del producto">
              <Input name="name" onChange={handleChange} />
            </Item>
            <Item label="Descripción">
              <Input name="description" onChange={handleChange} />
            </Item>
            <Item label="Categoría">
              <Select
                placeholder="Elige el tipo de producto"
                onChange={(event) =>
                  setFormData({ ...showFormData(), category: event })
                }
                allowClear
              >
                <Option value="drinks">Bebida</Option>
                <Option value="desserts">Postre</Option>
                <Option value="foods">Comida</Option>
              </Select>
            </Item>
            <Item label="Precio">
              <Input name="price" onChange={handleChange} />
            </Item>
            <Item label="Localidad">
              <Input name="location" onChange={handleChange} />
            </Item>
            <Item label="Imagen">
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

export default ProductEditModal;
