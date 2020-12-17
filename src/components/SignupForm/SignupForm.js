import { useState } from "react";
import FormGroup from "../FormGroup";
import Form from "../Form";
import { useAuth } from "../../hooks/use-auth";

const SignupForm = () => {
  const auth = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    e.target.name === "username"
      ? setUsername(e.target.value)
      : e.target.name === "password"
      ? setPassword(e.target.value)
      : setEmail(e.target.value);
  };

  const handleBlur = (e) => {};

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await auth.signup(username, password, email);
    handleResponse(response);
  };

  const handleResponse = async (response) => {
    if (response.errors) {
      console.log(response.errors);
    } else if (response.user) {
      console.log(response);
      const response = await auth.login(username, password);
    }
  };

  return (
    <Form image="1" click={handleClick} btn="Sign Up" title="Sign Up">
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
    </Form>
  );
};

export default SignupForm;
