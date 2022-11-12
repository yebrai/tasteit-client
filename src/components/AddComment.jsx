import { Avatar, Button, Comment, Form, Input, List } from "antd";
import moment from "moment";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { addCommentService } from "../services/tasteit.services";

const { TextArea } = Input;

// Comments list: ({ comments }) is props.comments
const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

// Comment editor: { onChange, onSubmit, submitting, value } are the destructured props from below in the page
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
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

  const navigate = useNavigate();

  // Context
  const { user } = useContext(AuthContext);

  // Current product details where adding the new comment
  const { product } = props;

  // Comments list
  const [comments, setComments] = useState([]);

  // Submitting state
  const [submitting, setSubmitting] = useState(false);

  // Input of the comment box
  const [value, setValue] = useState("");

  // New comment object structure
  const newComment = {
    message: value
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
        setComments([])
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
      {/* If comments list contains at least a comment, show it */}
      {comments.length > 0 && <CommentList comments={comments} />}

      <Comment
        avatar={
          <Avatar src={user.profileImage} alt="Han Solo" />
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
    </>
  );
}

export default AddComment;
