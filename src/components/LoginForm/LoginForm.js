import { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import { useHistory, useLocation } from "react-router-dom";

import Form from "../Form";
import FormGroup from "../FormGroup";

const LoginForm = () => {
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
    handleResponse(response);
  };

  const clearFields = () => {
    setUsername("");
    setPassword("");
  };

  const handleResponse = (response) => {
    if (response.user) {
      clearFields();
      history.replace(from);
    } else {
      setError({ name: response.name, message: response.message });
    }
  };

  return (
    <Form image="1" click={handleClick} btn="Log In" title="Log In">
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
    </Form>
  );
};

export default LoginForm;
