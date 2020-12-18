import "./CommentForm.css";

import { useState } from "react";
import { fetchPostData } from "../../api";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input, Form, Textarea } from "../FormComponents";

const schema = yup.object().shape({
  content: yup.string().required().min(1).max(600),
});

const CommentForm = (props) => {
  // const auth = useAuth();
  const { parent, handleNewComment, handleClick } = props;
  // const { subID, postID } = useParams();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetchPostData(
  //       `http://localhost:3000/api/s/${subID}/posts/${postID}/comments/create`,
  //       { content, parent },
  //       auth.token
  //     );
  //     handleNewComment(response.comment);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <form className="comment-form" onSubmit={handleSubmit(onSubmit)}>
      <Textarea
        name="content"
        placeholder="What are your thoughts?"
        ref={register}
        error={errors.content ? errors.content.message : null}
      />
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
