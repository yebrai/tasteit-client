import { Button, Form, Input, Select } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProductService } from '../services/tasteit.services';

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
const AddFood = () => {

  const [image, setImage] = useState("")

  const navigate = useNavigate()
  
  const onFinish = async(values) => {
    // Data transmission element
    const valoresFrom = new FormData()
    valoresFrom.append("name", values.name)
    valoresFrom.append("price", values.price)
    valoresFrom.append("location", values.location)
    valoresFrom.append("description", values.description)
    valoresFrom.append("category", values.category)
    valoresFrom.append("image", image)

    try {
      await addProductService(valoresFrom)
      console.log(values)
      navigate("/all/products")
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <div style={{width:"70%", margin:"100px 10%", padding:"50px", border:"1px solid"}}>
    <Form {...layout} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Nombre"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="price"
        label="Precio"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
        
      </Form.Item>
      <Form.Item
        name="location"
        label="Localidad"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Descripción"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      
      
      <Form.Item
        name="category"
        label="Categoría"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Elige el tipo de producto"
          allowClear
        >
          <Option value="drinks">Bebida</Option>
          <Option value="desserts">Postre</Option>
          <Option value="foods">Comida</Option>
        </Select>
      </Form.Item>
      
      <Form.Item
        name="image"
        label="Imagen"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="file" onChange={(event)=> setImage(event.target.files[0])}/>
      </Form.Item>
      
      <Form.Item {...tailLayout}>
      <div>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        </div>
      </Form.Item>
    </Form>
    </div>
  );
};


export default AddFood