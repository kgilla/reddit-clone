import "./Login.css";
import { useState } from "react";
import { fetchPostData } from "../../../api/index";
import FormGroup from "../../FormGroup";

const Login = ({ sendUserUp, removeModal }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setError(null);
    e.target.name === "username"
      ? setUsername(e.target.value)
      : setPassword(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await fetchPostData(
      "http://localhost:3000/api/users/login",
      { username, password }
    );
    handleResponse(response);
  };

  const clearFields = () => {
    setUsername("");
    setPassword("");
  };

  const handleResponse = (response) => {
    if (response.user) {
      clearFields();
      removeModal();
      sendUserUp(response);
    } else {
      setError({ name: response.name, message: response.message });
    }
  };

  return (
    <form className="modal-form">
      <h2>Login</h2>
      <FormGroup
        name="username"
        type="text"
        handleChange={handleChange}
        value={username}
        error={
          error ? (error.name === "username" ? error.message : null) : null
        }
      >
        Username
      </FormGroup>
      <FormGroup
        name="password"
        type="password"
        handleChange={handleChange}
        value={password}
        error={
          error ? (error.name === "password" ? error.message : null) : null
        }
      >
        Password
      </FormGroup>
      <button className="form-button" onClick={handleClick}>
        Log In
      </button>
    </form>
  );
};

export default Login;