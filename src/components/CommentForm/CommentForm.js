import { useState } from "react";
import { fetchPostData } from "../../api";
import { useParams } from "react-router-dom";
import FormGroup from "../FormGroup";
import "./CommentForm.css";
import { useAuth } from "../../hooks/use-auth";

const CommentForm = (props) => {
  const auth = useAuth();
  const { parent, handleNewComment, handleClick } = props;
  const { subID, postID } = useParams();
  const [content, setContent] = useState("");

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchPostData(
        `http://localhost:3000/api/s/${subID}/posts/${postID}/comments/create`,
        { content, parent },
        auth.token
      );
      handleNewComment(response.comment);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="comment-form">
      {parent ? null : <span>Leave a comment</span>}
      <FormGroup
        name="content"
        type="textarea"
        handleChange={handleChange}
        value={content}
        placeholder="What are your thoughts?"
      ></FormGroup>
      <div className="form-button-container">
        {parent ? (
          <button
            className="button-outline"
            id="cancel-form"
            onClick={handleClick}
          >
            Cancel
          </button>
        ) : null}
        <button className="button-filled" onClick={handleSubmit}>
          Comment
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
