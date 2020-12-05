import "./Signup.css";
import { useState } from "react";
import FormGroup from "../../FormGroup";

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
        <button onClick={handleClick}>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
