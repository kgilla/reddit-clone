import "./CommentForm.css";
import { fetchPostData, fetchPutData } from "../../api";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { useFlash } from "../../hooks/use-flash-message";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Textarea } from "../FormComponents";
import { useEffect } from "react";
import { baseUrl } from "../../config/const";

const schema = yup.object().shape({
  content: yup.string().required().min(1).max(600),
});

const CommentForm = (props) => {
  const auth = useAuth();
  const flash = useFlash();
  const { parentComment, refreshPost, handleForm, edit } = props;
  const { subID, postID } = useParams();
  const parent = parentComment ? parentComment._id : null;
  const { register, handleSubmit, errors, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (edit) {
      setValue("content", parentComment.content, { shouldValidate: true });
    }
  }, [parentComment, edit, setValue]);

  const handleClick = (e) => {
    e.preventDefault();
    handleForm(e);
  };

  const createComment = async (content) => {
    try {
      parentComment ? console.log(true) : console.log(false);
      const response = await fetchPostData(
        `${baseUrl}/api/s/${subID}/posts/${postID}/comments/create`,
        parentComment ? { content, parent: parentComment._id } : { content },
        auth.token
      );
      if (response.comment) {
        flash.changeMessage("Comment created successfully");
        refreshPost();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateComment = async (content) => {
    try {
      const url = `${baseUrl}/api/s/${subID}/posts/${postID}/comments/${parent}/update`;
      const response = await fetchPutData(url, { content }, auth.token);
      if (response.ok) {
        flash.changeMessage("Comment edited successfully");
        refreshPost();
      } else {
        flash.changeMessage("Oops! Something went wrong.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = (data) => {
    const { content } = data;
    edit ? updateComment(content) : createComment(content);
  };

  return auth.user ? (
    <form className="comment-form" onSubmit={handleSubmit(onSubmit)}>
      <Textarea
        name="content"
        placeholder="What are your thoughts?"
        ref={register}
        error={errors.content ? errors.content.message : null}
      />
      <div className="form-button-container">
        {parentComment ? (
          <button
            className="button-outline"
            id="cancel-form"
            onClick={handleClick}
          >
            Cancel
          </button>
        ) : null}
        <button className="button-filled" onClick={handleSubmit}>
          {edit ? "Edit" : "Comment"}
        </button>
      </div>
    </form>
  ) : (
    <div className="no-user-box">
      <span>Log in or sign up to leave a comment</span>
      <div className="nav-buttons">
        <Link to="/signup" className="button-outline nav-button">
          Sign Up
        </Link>
        <Link to="/login" className="button-filled nav-button">
          Log In
        </Link>
      </div>
    </div>
  );
};

export default CommentForm;
