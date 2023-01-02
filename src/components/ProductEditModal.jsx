import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { editProductService } from "../services/tasteit.services";

// Antd
import { Modal, Form, Input, Select } from "antd";
const { Option } = Select;
const { Item } = Form;

function ProductEditModal(props) {
  // Redirect hook
  const navigate = useNavigate();

  // Props
  const { product } = props;

  // Context
  const { authenticateUser } = useContext(AuthContext);

  // Modal configuration
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  // Cloudinary State for the product image
  const [image, setImage] = useState("");

  // Form states
  const [editProductForm, setEditProductForm] = useState();

  const [errorMessage, setErrorMessage] = useState("");

  //Form submit function
  const handleEditProduct = async () => {
    // Data transmission element
    const formValue = new FormData();
    formValue.append("name", editProductForm.name);
    formValue.append("price", editProductForm.price);
    formValue.append("location", editProductForm.location);
    formValue.append("description", editProductForm.description);
    formValue.append("category", editProductForm.category);
    formValue.append("image", image);

    setConfirmLoading(true);

    try {
      await editProductService(product._id, formValue);

      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
        authenticateUser();
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
        setConfirmLoading(false);
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
    handleEditProduct();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditProductForm({ ...editProductForm, [name]: value });
  };

  return (
    <>
      <button className="main-buttons edit-button" onClick={showModal}>
        Editar producto
      </button>
      <Modal
        title="Editar Producto"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
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
                  setEditProductForm({ ...editProductForm, category: event })
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
            {errorMessage !== "" && (
              <p className="error-message">{errorMessage}</p>
            )}
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default ProductEditModal;
