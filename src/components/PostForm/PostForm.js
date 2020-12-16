import "./PostForm.css";

import { fetchGetData, fetchPostData } from "../../api/index";
import { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

import FormGroup from "../FormGroup";

const PostForm = () => {
  const auth = useAuth();

  const { subID } = useParams() || "";
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sub, setSub] = useState(subID);
  const [subs, setSubs] = useState(null);
  const [postCreated, setPostCreated] = useState(null);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchGetData(
        "http://localhost:3000/api/s/user",
        auth.token
      );
      setSubs(response.subs);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    e.target.name === "title"
      ? setTitle(e.target.value)
      : e.target.name === "content"
      ? setContent(e.target.value)
      : setSub(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetchPostData(
      `http://localhost:3000/api/s/${sub}/posts/create`,
      {
        sub,
        title,
        content,
      },
      auth.token
    );
    console.log(response);
    setPostCreated(response.savedPost);
  };

  return (
    <div className="form-container">
      <div className="form-picture"></div>
      <form className="form-left">
        <h2 className="form-heading">New Post</h2>
        {subs ? (
          <div className="form-group">
            <label className="form-group-label" htmlFor="sub">
              Community
            </label>
            <select name="sub" onChange={handleChange} defaultValue={subID}>
              {subs.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
        ) : null}
        <FormGroup
          name="title"
          type="text"
          handleChange={handleChange}
          value={title}
        >
          Title
        </FormGroup>
        <FormGroup
          name="content"
          type="textarea"
          handleChange={handleChange}
          value={content}
        >
          Body
        </FormGroup>
        <button onClick={handleSubmit} className="button-filled">
          Submit
        </button>
        {postCreated ? (
          <Redirect to={`/s/${sub}/posts/${postCreated._id}`} />
        ) : null}
      </form>
      {!auth.user ? <Redirect to={"/login"} /> : null}
    </div>
  );
};

export default PostForm;
