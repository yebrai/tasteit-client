import { Button, Modal } from "antd";
import React, { useState } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { deleteCommentService } from "../services/tasteit.services";
import { CloseCircleFilled } from "@ant-design/icons";

const { confirm } = Modal;

function CommentDeletionModal(props) {

  // Current product in props
  const { comment } = props;
  
  // To execute when "Sí" button in Modal is pressed
  const handleDeletion = async () => {
    
    try {
      await deleteCommentService(comment._id);
      
    } catch (error) {
      console.log(error);
    }
  };

  // Confirmation Modal
  const showDeleteConfirm = () => {
    confirm({
      title: "Eliminar comentario",
      icon: <ExclamationCircleOutlined />,
      content: "¿Quieres eliminar este comentario?",
      okText: "Sí",
      okType: "danger",
      cancelText: "No",
      onOk() {
          handleDeletion(); // Function which deletes the current comment id
      },
      onCancel() {},
    });
  };

  return (
    <>
      <Button
        type="text"
        danger
        icon={<CloseCircleFilled />}
        onClick={showDeleteConfirm}
      >
      </Button>
    </>
  );
}

export default CommentDeletionModal;