import { useState } from "react";
import { fetchPostData } from "../../api";
import { useParams } from "react-router-dom";
import FormGroup from "../FormGroup";

const CommentForm = ({ user, parent, handleNewComment }) => {
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
        user.token
      );
      handleNewComment(response.comment);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form>
      <FormGroup
        name="content"
        type="textarea"
        handleChange={handleChange}
        value={content}
      >
        Comment
      </FormGroup>
      <button onClick={handleSubmit}>Submit</button>
    </form>
  );
};

export default CommentForm;
