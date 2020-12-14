import FormGroup from "../FormGroup";
import { fetchGetData, fetchPostData } from "../../api/index";
import { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import "./CreatePost.css";

const CreatePost = ({ user }) => {
  const { subID } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sub, setSub] = useState(subID);
  const [subs, setSubs] = useState(null);
  const [postCreated, setPostCreated] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGetData("http://localhost:3000/api/s/");
      setSubs(data.allSubs);
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
    console.log({ sub, title, content });
    const response = await fetchPostData(
      `http://localhost:3000/api/s/${sub}/posts/create`,
      {
        sub,
        title,
        content,
      },
      user.token
    );
    console.log(response);
    setPostCreated(response.savedPost);
  };

  return (
    <div class="form-container">
      <div class="form-picture"></div>
      <form className="form-left">
        <h2 className="form-heading">New Post</h2>
        {subs ? (
          <div className="form-group">
            <label className="form-group-label" htmlFor="sub">
              Community
            </label>
            <select name="sub" onChange={handleChange}>
              {subs.map((sub) => (
                <option
                  key={sub._id}
                  value={sub._id}
                  selected={subID === sub._id ? true : null}
                >
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
    </div>
  );
};

export default CreatePost;
