import "./Login.css";
import { useState } from "react";
import FormGroup from "../../FormGroup";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      const URL = `http://localhost:3000/api/users/login`;
      const response = await fetch(URL, {
        method: "post",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const tar = e.target.attributes[1].value;
    tar === "username"
      ? setUsername(e.target.value)
      : setPassword(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <form>
      <h2>Login</h2>
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
        type="password"
        handleChange={handleChange}
        value={password}
      >
        Password
      </FormGroup>
      <button onClick={handleClick}>Log In</button>
    </form>
  );
};

export default Login;
