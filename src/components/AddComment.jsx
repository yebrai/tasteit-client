import { Avatar, Button, Comment, Form, Input, List } from "antd";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { addCommentService, getCommentService } from "../services/tasteit.services";

const { TextArea } = Input;

// Comments list: ({ comments }) is props.comments
const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "reseñas" : "reseña"}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

// Comment editor: { onChange, onSubmit, submitting, value } are the destructured props from below in the page
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={2} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
      >
        Añadir Comentario
      </Button>
    </Form.Item>
  </>
);

// Main function
function AddComment(props) {

  // Context
  const { user } = useContext(AuthContext);

  // Current product details where adding the new comment
  const { product } = props;

  // Comments list
  const [comments, setComments] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  // Submitting state
  const [submitting, setSubmitting] = useState(false);

  // Input of the comment box
  const [value, setValue] = useState("");

  // New comment object structure
  const newComment = {
    message: value
  }

  useEffect(() => {
    handleComments();
  }, []);
 
  const handleComments = async () => {
    try {
      let commentsList = await getCommentService(product._id)
      
      let modifiedCommentsList = [];
      // Array copy from commentsList with fields adapted to the required Ant design comment format (author, avatar, content, datetime)
      commentsList.data.forEach(eachComment => {
        modifiedCommentsList.push({
          author: eachComment.user.name,
          avatar: eachComment.user.profileImage,
          content: eachComment.message,
          datetime: new Intl.DateTimeFormat("es-ES", {
            timeStyle: "medium",
            dateStyle: "short",
          }).format(new Date(eachComment.createdAt))
        })
      })

      setComments(modifiedCommentsList)
      setIsFetching(false);

    } catch (error) {
      console.log(error);
    }
  };

  if (isFetching) {
    return <h3>loading...</h3>;
  }

  // Function to execute when comment is submitted
  const handleSubmit = async () => {
    // If there is no input, do nothing
    if (!value) return;
    
    try {
      await addCommentService(product._id, newComment) // Add new comment to the current id product details page
      
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        setValue("");
        handleComments()
      }, 1000);

    } catch(error) {
      console.log(error)
    }
  };

  // Sets the editor input value
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Comment
        avatar={
          <Avatar src={user.profileImage} alt={user.name} />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />

      {/* If comments list contains at least a comment, show it */}
      {comments.length > 0 && <CommentList comments={comments} />}
    </>
  );
}

export default AddComment;
