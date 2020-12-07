import "./Signup.css";
import { useState } from "react";
import FormGroup from "../../FormGroup";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    e.target.name === "username"
      ? setUsername(e.target.value)
      : e.target.name === "password"
      ? setPassword(e.target.value)
      : setEmail(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log({ username, password, email });
  };

  return (
    <form className="modal-form">
      <h2 className="form-heading">Signup</h2>
      <FormGroup
        name="username"
        type="text"
        handleChange={handleChange}
        value={username}
      >
        Username
      </FormGroup>
      <FormGroup
        name="password"
        type="text"
        handleChange={handleChange}
        value={password}
      >
        Password
      </FormGroup>
      <FormGroup
        name="email"
        type="email"
        handleChange={handleChange}
        value={email}
      >
        Email
      </FormGroup>
      <button className="form-button" onClick={handleClick}>
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
