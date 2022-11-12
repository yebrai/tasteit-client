import { Button, Modal, Form, Input, Select } from "antd";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { editProductService } from "../services/tasteit.services";

//Form styles
const { Option } = Select;

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

function ProductEditModal(props) {
  // Redirect hook
  const navigate = useNavigate();

  // Props
  const { product } = props;
  const productId = product._id

  // Context
  const { authenticateUser } = useContext(AuthContext);

  // Modal configuration
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadings, setLoadings] = useState(false);

  // Cloudinary State for the product image
  const [image, setImage] = useState("");

  //Form submit function
  const onFinish = async (values) => {
    // Data transmission element
    const formValue = new FormData();
    formValue.append("name", values.name);
    formValue.append("description", values.description);
    formValue.append("category", values.category);
    formValue.append("price", values.price);
    formValue.append("location", values.location);
    formValue.append("image", image);
    setLoadings(true);
    console.log(values);
    try {
      await editProductService(productId, formValue);
      setTimeout(() => {
        setOpen(false);
        setLoadings(false);
        authenticateUser();
      }, 1000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Error 400
        setErrorMessage(error.response.data.errorMessage);
        setLoadings(false);
      } else {
        // Error 500
        navigate("/error");
      }
      console.log("error");
    }
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={showModal}>
        Editar mi producto
      </Button>
      <Modal
        title="Editar Producto"
        open={open}
        footer={null}
        onCancel={handleCancel}
      >
        <div>
          <Form {...layout} name="control-hooks" onFinish={onFinish}>
            <Form.Item name="name" label="Nombre del producto">
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Descripción">
              <Input />
            </Form.Item>
            <Form.Item name="category" label="Categoría">
              <Select placeholder="Elige el tipo de producto" allowClear>
                <Option value="drinks">Bebida</Option>
                <Option value="desserts">Postre</Option>
                <Option value="foods">Comida</Option>
              </Select>
            </Form.Item>
            <Form.Item name="price" label="Precio">
              <Input />
            </Form.Item>
            <Form.Item name="location" label="Localidad">
              <Input />
            </Form.Item>
            <Form.Item name="image" label="Imagen">
              <Input
                type="file"
                onChange={(event) => setImage(event.target.files[0])}
              />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <div>
                <Button type="primary" htmlType="submit" loading={loadings}>
                  Editar
                </Button>
              </div>
            </Form.Item>
            <br />
            {errorMessage !== "" && <p>{errorMessage}</p>}
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default ProductEditModal;
