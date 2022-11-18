import { Button, Modal } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { deleteCommentService } from "../services/tasteit.services";
import { CloseCircleFilled } from "@ant-design/icons";

const { confirm } = Modal;

function CommentDeletionModal(props) {
  const navigate = useNavigate();

  // Current comment in props
  const { comment, setIsDeleted } = props;

  // To execute when "Sí" button in Modal is pressed
  const handleDeletion = async () => {
    try {
      await deleteCommentService(comment._id);

      // Updates the page because the useEffect contains isDeleted
      setIsDeleted(true);
    } catch (error) {
      navigate("/error");
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
      ></Button>
    </>
  );
}

export default CommentDeletionModal;
