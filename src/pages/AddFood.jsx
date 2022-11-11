import { Button, Form, Input, Select } from 'antd';
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

  const navigate = useNavigate()
  
  const onFinish = async(values) => {
    
    try {
      await addProductService(values)
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
        name="category"
        label="Categoria"
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
      
      <Form.Item {...tailLayout}>
      <div style={{margin: "10px"}}>
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