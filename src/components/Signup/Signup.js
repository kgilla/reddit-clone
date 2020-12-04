import "./Signup.css";
import { useState } from "react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const createUser = async () => {
    try {
      const URL = `http://localhost:3000/api/users/create`;
      const response = await fetch(URL, {
        method: "post",
        body: JSON.stringify({ username, password, email }),
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
      : tar === "password"
      ? setPassword(e.target.value)
      : setEmail(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    createUser();
  };

  return (
    <div className="modal-centered">
      <form>
        <h2>Signup</h2>
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
        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input
            type="email"
            data="email"
            value={email}
            onChange={handleChange}
          ></input>
        </div>
        <button onClick={handleClick}>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
