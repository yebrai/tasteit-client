import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProductService } from "../services/tasteit.services";

import { useModalForm } from "../hooks/useModal";
//icon
import { IoAddCircleOutline } from "react-icons/io5";

//Antd
import { Button, Modal, Form, Input, Select } from "antd";
import { AuthContext } from "../context/auth.context";
const { Item } = Form;
const { Option } = Select;

function AddFoodModal() {
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
    setFormData
  } = useModalForm();

  // Navigate
  const navigate = useNavigate();
  // Context
  const { authenticateUser } = useContext(AuthContext);


  // Create a state for the image which is transmited in a different way
  const [image, setImage] = useState("");

  const handleAddProduct = async () => {
    setLoading(true)
    // Data transmission element
    const formValue = new FormData();
    formValue.append("name", showFormData().name);
    formValue.append("price", showFormData().price);
    formValue.append("location", showFormData().location);
    formValue.append("description", showFormData().description);
    formValue.append("category", showFormData().category);
    formValue.append("image", image);
    try {
      await addProductService(formValue);
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
      <Button
        className="icons"
        type="text"
        icon={<IoAddCircleOutline size="1.7rem" color="white" />}
        onClick={showModal}
      ></Button>
      <Modal
        title="Añadir Producto"
        open={isOpen()}
        onOk={handleAddProduct}
        confirmLoading={showLoading()}
        onCancel={handleCancel}
        destroyOnClose
      >
        <div>
          <Form>
            <Item label="Producto">
              <Input name="name" onChange={handleChange} />
            </Item>
            <Item label="Precio">
              <Input name="price" onChange={handleChange} />
            </Item>
            <Item label="Localidad">
              <Input name="location" onChange={handleChange} />
            </Item>
            <Item label="Descripcion">
              <Input name="description" onChange={handleChange} />
            </Item>
            <Item label="Category">
              <Select
                placeholder="Elige el tipo de producto"
                name="category"
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
            <Item label="Image">
              <Input
                type="file"
                onChange={(event) => setImage(event.target.files[0])}
              />
            </Item>
            {showErrorMesage !== "" && <p>{showErrorMesage()}</p>}
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default AddFoodModal;
