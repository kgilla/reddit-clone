import { fetchGetData, fetchPostData, fetchPutData } from "../../api/index";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { useFlash } from "../../hooks/use-flash-message";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input, Textarea, Form, Select } from "../FormComponents";

const schema = yup.object().shape({
  title: yup.string().required().min(3).max(300).trim(),
  content: yup.string().max(2000).trim(),
});

const PostForm = ({ edit }) => {
  const auth = useAuth();
  const flash = useFlash();
  const history = useHistory();
  const { subID, postID } = useParams() || "";

  const { register, handleSubmit, errors, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const [subs, setSubs] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchGetData(
        "http://localhost:3000/api/s/user",
        auth.token
      );
      setSubs(response.subs);
    };
    if (!edit) fetchData();
  }, [auth.token, edit]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchGetData(
        `http://localhost:3000/api/s/${subID}/posts/${postID}`
      );
      console.log(response);
      setValue("title", response.post.title, { shouldValidate: true });
      setValue("content", response.post.content, { shouldValidate: true });
    };
    if (edit) {
      fetchData();
    }
  }, [edit, postID, setValue, subID]);

  const onSubmit = (data) => {
    edit ? updatePost(data) : createPost(data);
  };

  const createPost = async (data) => {
    const response = await fetchPostData(
      `http://localhost:3000/api/s/${subID}/posts/create`,
      data,
      auth.token
    );
    if (response.post) {
      flash.changeMessage(response.message);
      history.push(`/s/${data.sub}/posts/${response.post._id}`);
    } else {
      setError("Something went wrong");
    }
  };

  const updatePost = async (data) => {
    try {
      const url = `http://localhost:3000/api/s/${subID}/posts/${postID}/update`;
      const response = await fetchPutData(url, data, auth.token);
      if (response.ok) {
        flash.changeMessage("Post updated successfully");
        history.push(`/s/${data.sub}/posts/${postID}`);
      } else {
        setError("Something went wrong");
      }
    } catch (err) {
      console.log({ message: "something went wrong", error: err });
    }
  };

  return (
    <Form
      handleSubmit={handleSubmit(onSubmit)}
      title={edit ? "Edit Post" : "Create Post"}
      error={error}
      art="1"
      button="Create Post"
    >
      {subs ? (
        <Select
          name="sub"
          label="Community"
          defaultValue={subID}
          optionsArray={subs}
          ref={register}
          error={errors.sub ? errors.sub.message : null}
        />
      ) : null}
      <Input
        name="title"
        type="text"
        label="Title"
        placeholder="What did you want everyone to know about?"
        ref={register}
        error={errors.title ? errors.title.message : null}
      />
      <Textarea
        name="content"
        label="Content"
        placeholder="optional"
        ref={register}
        error={errors.content ? errors.content.message : null}
      />
    </Form>
  );
};

export default PostForm;
