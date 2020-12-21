import "./CommentForm.css";
import { fetchPostData, fetchPutData } from "../../api";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Textarea } from "../FormComponents";
import { useState, useEffect } from "react";

const schema = yup.object().shape({
  content: yup.string().required().min(1).max(600),
});

const CommentForm = (props) => {
  const auth = useAuth();
  const {
    parentComment,
    post,
    refreshPost,
    handleForm,
    changeMessage,
    edit,
  } = props;
  const { subID, postID } = useParams();
  const parent = parentComment ? parentComment._id : null;
  const { register, handleSubmit, errors, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (edit) {
      setValue("content", parentComment.content, { shouldValidate: true });
    }
  }, [parentComment]);

  const handleClick = (e) => {
    e.preventDefault();
    handleForm(e);
  };

  const createComment = async (content) => {
    try {
      const response = await fetchPostData(
        `http://localhost:3000/api/s/${subID}/posts/${postID}/comments/create`,
        { content, parent },
        auth.token
      );
      if (response.comment) {
        changeMessage("Comment created successfully");
        refreshPost();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateComment = async (content) => {
    try {
      await fetch(
        `http://localhost:3000/api/s/${subID}/posts/${postID}/comments/${parent}/update`,
        {
          method: "put",
          body: JSON.stringify({ content }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      changeMessage("Comment edited successfully");
      refreshPost();
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = (data) => {
    const { content } = data;
    edit ? updateComment(content) : createComment(content);
  };

  return (
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
  );
};

export default CommentForm;
