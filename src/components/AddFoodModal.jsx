import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProductService } from '../services/tasteit.services';

//icon
import { IoIosAddCircle } from "react-icons/io";


//Antd
import { Button, Modal, Form, Input, Select } from "antd";
const { Item } = Form;
const { Option } = Select

function AddFoodModal() {
  // Navigate
  const navigate = useNavigate();

  // Error message from backend
  const [errorMessage, setErrorMessage] = useState("");

  // Modal configuration
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  // Form states
  const [addProduct, setAddProduct] = useState({
    name: "",
    price: "",
    location: "",
    description: "",
    category: ""
  });
  const [image, setImage] = useState("")
  

  const handleAddProduct = async () => {

        // Data transmission element
        const formValue = new FormData()
        formValue.append("name", addProduct.name)
        formValue.append("price", addProduct.price)
        formValue.append("location", addProduct.location)
        formValue.append("description", addProduct.description)
        formValue.append("category", addProduct.category)
        formValue.append("image", image)
        console.log(addProduct);
    try {
      await addProductService(formValue);
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
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
    handleAddProduct();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddProduct({ ...addProduct, [name]: value });
  };

  // Render
  return (
    <>
      <Button  icon={<IoIosAddCircle />} onClick={showModal}>
      </Button>
      <Modal
        title="Añadir Producto"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        destroyOnClose
      >
        <div>
          <Form>
            <Item label="Producto" >
              <Input name="name" onChange={handleChange} />
            </Item>
            <Item label="Precio" >
              <Input name="price" onChange={handleChange} />
            </Item>
            <Item label="Localidad" >
              <Input name="location" onChange={handleChange} />
            </Item>
            <Item label="Descripcion" >
              <Input name="description" onChange={handleChange} />
            </Item>
            <Item label="Category">
            <Select
          placeholder="Elige el tipo de producto"
          name="category" 
          onChange={(event) => setAddProduct({...addProduct, category: event})}
          allowClear
        >
          <Option value="drinks">Bebida</Option>
          <Option value="desserts">Postre</Option>
          <Option value="foods">Comida</Option>
        </Select>            
        </Item>
            <Item label="Image">
            <Input type="file" onChange={(event)=> setImage(event.target.files[0])}/>
            </Item>
            {errorMessage !== "" && <p>{errorMessage}</p>}
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default AddFoodModal;
