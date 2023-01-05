import { Avatar, Button, Comment, Form, Input, List } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import {
  addCommentService,
  getCommentService,
} from "../services/tasteit.services";

// Antd
import IsOwner from "./IsOwner";
import CommentDeletionModal from "./CommentDeletionModal";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

// Comments list: ({ comments, setIsDeleted }) are the destructured props from AddComment
const CommentList = ({ comments, setIsDeleted }) => {
  return (
    <List
      className="comment-list"
      dataSource={comments}
      header={`${comments.length} ${
        comments.length > 1 ? "reseñas" : "reseña"
      }`}
      itemLayout="horizontal"
      renderItem={(props) => {
        return (
          <div className="comment-btn-container">
            <Comment {...props} className="comment-user" />

            {/* Checks if product owner is the same as current online user */}
            <IsOwner owner={props.user}>
              <CommentDeletionModal
                comment={props}
                setIsDeleted={setIsDeleted}
              />
            </IsOwner>
          </div>
        );
      }}
    />
  );
};

// Comment editor: { onChange, onSubmit, submitting, value } are the destructured props from AddComment component
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={2} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit}>
        Añadir Comentario
      </Button>
    </Form.Item>
  </>
);

// Main function
function AddComment(props) {
  // Context
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Current product details where adding the new comment
  const { product } = props;

  // Comments list
  const [comments, setComments] = useState([]);

  // To check if a comment has been deleted or not
  const [isDeleted, setIsDeleted] = useState(false);

  // Submitting state
  const [submitting, setSubmitting] = useState(false);

  // Input of the comment box
  const [value, setValue] = useState("");

  const newComment = {
    message: value,
  };

  // To re-render if product details page changes or a comment is deleted
  useEffect(() => {
    handleComments();
  }, [product._id, isDeleted]);

  const handleComments = async () => {
    try {
      let commentsList = await getCommentService(product._id);
        let modifiedCommentsList = [];
      // Array copy from commentsList with fields adapted to the required Ant design comment format (author, avatar, content, datetime)
      commentsList.data.forEach((eachComment) => {
        modifiedCommentsList.unshift({
          _id: eachComment._id,
          user: eachComment.user._id,
          author: eachComment.user.name,
          avatar: eachComment.user.profileImage,
          content: eachComment.message,
          datetime: new Intl.DateTimeFormat("es-ES", {
            timeStyle: "medium",
            dateStyle: "short",
          }).format(new Date(eachComment.createdAt)),
        });
      });
      setComments(modifiedCommentsList);
      setIsDeleted(false);
    } catch (error) {
      navigate("/error");
    }
  };


  // Function to execute when comment is submitted
  const handleSubmit = async () => {
    // If there is no input, do nothing
    if (!value) return;
    setSubmitting(true);

    try {
      await addCommentService(product._id, newComment);
        setSubmitting(false);
        setValue("");
        handleComments();
    } catch (error) {
      navigate("/error");
    }
  };

  // Sets the editor input value
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="comments-container">
      <h2 id="comments-title">Reseñas de los usuarios en TasteIt</h2>
      <Comment
        avatar={<Avatar src={user.profileImage} alt={user.name} />}
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
        className="comment-box"
      />

      {/* If comments list contains at least a comment, show it */}
      {comments.length > 0 && (
        <CommentList comments={comments} setIsDeleted={setIsDeleted} />
      )}
    </div>
  );
}

export default AddComment;
