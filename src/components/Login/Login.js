import "./Login.css";
import { useState } from "react";

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
    <div className="modal-centered">
      <form>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            data="username"
            value={username}
            onChange={handleChange}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="username">Password</label>
          <input
            type="text"
            data="password"
            value={password}
            onChange={handleChange}
          ></input>
        </div>
        <button onClick={handleClick}>Log In</button>
      </form>
    </div>
  );
};

export default Login;
