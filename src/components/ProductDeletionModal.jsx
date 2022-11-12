import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { deleteProductService } from "../services/tasteit.services";

const { confirm } = Modal;

function ProductDeletionModal(props) {

  // Redirect hook
  const navigate = useNavigate();

  // Current product in props
  const { product } = props;

  // To execute when "Sí" button in Modal is pressed
  const handleDeletion = async () => {
    try {
      await deleteProductService(product._id)
      setTimeout(() => {
        navigate("/")
      }, 1000)
    } catch(error) {
      console.log(error);
    }
  }

  // Confirmation Modal
  const showDeleteConfirm = () => {
    confirm({
      title: 'Eliminar producto',
      icon: <ExclamationCircleOutlined />,
      content: '¿Estás seguro/a de que deseas eliminar este producto?',
      okText: 'Sí',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDeletion() // Function which deletes the current product id
      },
      onCancel() {},
    });
  };

  return (
    <>
      <Button onClick={showDeleteConfirm}>Eliminar producto</Button>
    </>
  );
}



export default ProductDeletionModal;