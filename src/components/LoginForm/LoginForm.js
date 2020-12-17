import { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import { useHistory, useLocation } from "react-router-dom";

import Form from "../Form";
import FormGroup from "../FormGroup";

const LoginForm = ({ changeMessage }) => {
  const auth = useAuth();
  const history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

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
    const response = await auth.login(username, password);
    console.log(response);
    // handleResponse(response);
  };

  const clearFields = () => {
    setUsername("");
    setPassword("");
  };

  const handleResponse = (response) => {
    if (!response.user) {
      setError({ name: response.name, message: response.message });
    } else if (response.user) {
      clearFields();
      history.replace(from);
      changeMessage(`Welcome back ${response.user.username}`);
    }
  };

  return (
    <Form image="1" click={handleClick} btn="Log In" title="Log In">
      <FormGroup
        name="username"
        type="text"
        error={
          error ? (error.name === "username" ? error.message : null) : null
        }
        handleChange={handleChange}
        value={username}
        autoComplete="username"
      >
        Username
      </FormGroup>
      <FormGroup
        name="password"
        type="password"
        error={
          error ? (error.name === "password" ? error.message : null) : null
        }
        handleChange={handleChange}
        value={password}
        autoComplete="current-password"
      >
        Password
      </FormGroup>
    </Form>
  );
};

export default LoginForm;
