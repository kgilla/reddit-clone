import "./PostForm.css";
import { fetchGetData, fetchPostData, fetchPutData } from "../../api/index";
import { useState, useEffect } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { useFlash } from "../../hooks/use-flash-message";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { baseUrl } from "../../config/const";
import { Input, Textarea, Form, Select } from "../FormComponents";

const PostForm = ({ edit }) => {
  const location = useLocation();
  console.log(location);
  const auth = useAuth();
  const flash = useFlash();
  const history = useHistory();
  const { subID, postID } = useParams() || "";

  const [type, setType] = useState("text");
  const [subs, setSubs] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {}, [type]);

  const makeSchema = () => {
    return type === "text"
      ? yup.object().shape({
          title: yup
            .string()
            .required("Title is required")
            .min(3)
            .max(300)
            .trim(),
          content: yup.string().max(2000).trim(),
        })
      : type === "image"
      ? yup.object().shape({
          title: yup
            .string()
            .required("Title is required")
            .min(3)
            .max(300)
            .trim(),
          image: yup
            .string()
            .url("Something doesn't look right")
            .required("Valid URL is required")
            .max(100)
            .min(1)
            .trim(),
        })
      : type === "video"
      ? yup.object().shape({
          title: yup
            .string()
            .required("Title is required")
            .min(3)
            .max(300)
            .trim(),
          video: yup
            .string()
            .url("Something doesn't look right")
            .required("A link is required")
            .matches(
              /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,
              {
                message: "Must be a valid YouTube URL",
              }
            )
            .max(100)
            .min(1)
            .trim(),
        })
      : yup.object().shape({
          title: yup
            .string()
            .required("Title is required")
            .min(3)
            .max(300)
            .trim(),
          link: yup
            .string()
            .url("Something doesn't look right")
            .required("Valid URL is required")
            .max(100)
            .min(1)
            .trim(),
        });
  };

  const { register, handleSubmit, errors, setValue } = useForm({
    resolver: yupResolver(makeSchema()),
    shouldUnregister: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchGetData(`${baseUrl}/api/s/user`, auth.token);
      setSubs(response.subs);
    };
    if (!edit) fetchData();
  }, [auth.token, edit]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchGetData(
        `${baseUrl}/api/s/${subID}/posts/${postID}`
      );
      console.log(response);
      if (response.post.type) {
        setType(response.post.type);
      }
      if (response.post.type && response.post.type === "video") {
        setValue(response.post.type, response.post.content, {
          shouldValidate: true,
        });
      }
      setValue("title", response.post.title, { shouldValidate: true });
    };
    if (edit) {
      fetchData();
    }
  }, [edit, postID, setValue, subID]);

  const onSubmit = (data) => {
    let { title, sub, content, video, link, image } = data;
    if (type === "video") {
      data = { title, content: video, type, sub };
    } else if (type === "image") {
      data = { title, sub, type, content: image };
    } else if (type === "link") {
      data = { title, sub, type, content: link };
    } else {
      data = { title, sub, type, content };
    }
    edit ? updatePost(data) : createPost(data);
  };

  const makeInput = () => {
    return type === "text" ? (
      <Textarea
        name="content"
        label="Content"
        placeholder="optional"
        ref={register}
        error={errors.content ? errors.content.message : null}
      />
    ) : type === "video" ? (
      <Input
        name="video"
        type="text"
        label="YouTube Video"
        placeholder="Please include the full url"
        ref={register}
        error={errors.video ? errors.video.message : null}
      />
    ) : type === "link" ? (
      <div className="form-group">
        <label className="form-group-label" htmlFor="link">
          Link
        </label>
        <input
          className={
            errors.link ? "form-group-input-error" : "form-group-input"
          }
          name="link"
          type="text"
          placeholder="Please include the full url"
          ref={register}
        />
        {errors.link ? (
          <span className="error">{errors.link.message}</span>
        ) : null}
      </div>
    ) : (
      <div className="form-group">
        <label className="form-group-label" htmlFor="image">
          Image Link
        </label>
        <input
          className={
            errors.image ? "form-group-input-error" : "form-group-input"
          }
          name="image"
          type="text"
          placeholder="Please include the full url"
          ref={register}
        />
        {errors.image ? (
          <span className="error">{errors.image.message}</span>
        ) : null}
      </div>
    );
  };

  const createPost = async (data) => {
    const response = await fetchPostData(
      `${baseUrl}/api/s/${subID}/posts/create`,
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
      const url = `${baseUrl}/api/s/${subID}/posts/${postID}/update`;
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

  const changeType = (e) => {
    setType(e.target.name);
  };

  return (
    <Form
      handleSubmit={handleSubmit(onSubmit)}
      title={edit ? "Edit Post" : "Create Post"}
      error={error}
      art="1"
      button={edit ? "Save Changes" : "Create Post"}
    >
      <div className="type-selector">
        <button
          type="button"
          name="text"
          onClick={changeType}
          className={
            type === "text" ? "type-selection selected" : "type-selection"
          }
        >
          Text
        </button>
        <button
          type="button"
          name="image"
          onClick={changeType}
          className={
            type === "image" ? "type-selection selected" : "type-selection"
          }
        >
          {" "}
          Image
        </button>
        <button
          type="button"
          name="video"
          onClick={changeType}
          className={
            type === "video" ? "type-selection selected" : "type-selection"
          }
        >
          Video
        </button>
        <button
          type="button"
          name="link"
          onClick={changeType}
          className={
            type === "link" ? "type-selection selected" : "type-selection"
          }
        >
          Link
        </button>
      </div>
      {subs ? (
        <Select
          name="sub"
          label="Community"
          defaultValue={location.state ? location.state.subID : null}
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
      {makeInput()}
    </Form>
  );
};

export default PostForm;
