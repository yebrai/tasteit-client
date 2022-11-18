import React from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { deleteProductService } from "../services/tasteit.services";

const { confirm } = Modal;

// Modal which opens when "eliminar producto" option in details is selected
function ProductDeletionModal(props) {
  const navigate = useNavigate();

  // Current product in props
  const { product } = props;

  // To execute when "Sí" button in Modal is pressed
  const handleDeletion = async () => {
    try {
      await deleteProductService(product._id);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      navigate("/error");
    }
  };

  // Confirmation Modal
  const showDeleteConfirm = () => {
    confirm({
      title: "Eliminar producto",
      icon: <ExclamationCircleOutlined />,
      content: "¿Estás seguro/a de que deseas eliminar este producto?",
      okText: "Sí",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDeletion(); // Function which deletes the current product id
      },
      onCancel() {},
    });
  };

  return (
    <>
      <button
        className="main-buttons edit-button button-delete"
        onClick={showDeleteConfirm}
      >
        Eliminar producto
      </button>
    </>
  );
}

export default ProductDeletionModal;
