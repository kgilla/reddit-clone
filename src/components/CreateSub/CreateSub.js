import { useState, useEffect } from "react";
import { fetchGetData, fetchPostData } from "../../api";
import FormGroup from "../FormGroup";
import { Redirect } from "react-router-dom";

const CreateSub = ({ user }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [allSubs, setAllSubs] = useState(null);
  const [error, setError] = useState(null);
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
      : setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetchPostData(
      `http://localhost:3000/api/s/create`,
      {
        name,
        description,
      },
      user.token
    );
    console.log(response);
    setSubCreated(response.response);
  };

  return (
    <form className="centered-form">
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
      <button onClick={handleSubmit}>Submit</button>
      {subCreated ? <Redirect to={`/s/${subCreated._id}`} /> : null}
    </form>
  );
};

export default CreateSub;
