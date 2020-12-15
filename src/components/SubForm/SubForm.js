import { useState, useEffect } from "react";
import { fetchGetData } from "../../api";
import FormGroup from "../FormGroup";
import { Redirect } from "react-router-dom";
import "./SubForm.css";

const SubForm = ({ user, token }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#0079d3");
  const [allSubs, setAllSubs] = useState(null);
  // const [error, setError] = useState(null);
  const [subCreated, setSubCreated] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGetData("http://localhost:3000/api/s/");
      setAllSubs(data.allSubs);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    e.target.name === "name"
      ? setName(e.target.value)
      : e.target.name === "description"
      ? setDescription(e.target.value)
      : setColor(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ name, description, color });
    // const response = await fetchPostData(
    //   `http://localhost:3000/api/s/create`,
    //   {
    //     name,
    //     description,
    //     color,
    //     image
    //   },
    //   user.token
    // );
    // console.log(response);
    // setSubCreated(response.response);
  };

  return (
    <div className="form-container">
      <div className="form-picture"></div>
      <form className="form-left">
        <h2 className="form-heading">Create Community</h2>
        <FormGroup
          name="name"
          type="text"
          handleChange={handleChange}
          value={name}
        >
          Community Name
        </FormGroup>
        <FormGroup
          name="description"
          type="textarea"
          handleChange={handleChange}
          value={description}
        >
          Description
        </FormGroup>
        <FormGroup
          name="color"
          type="color"
          id="color-input"
          handleChange={handleChange}
          value={color}
        >
          Community Color
        </FormGroup>
        <button
          onClick={handleSubmit}
          className="button-filled"
          style={{ backgroundColor: `${color}` }}
        >
          Submit
        </button>
        {subCreated ? <Redirect to={`/s/${subCreated._id}`} /> : null}
      </form>
    </div>
  );
};

export default SubForm;