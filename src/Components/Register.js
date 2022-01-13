import { useState } from "react";
import { register } from "../api";

const Register = ({ token, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //array destructuring
    const [newToken, message] = await register(username, password);
    setToken(newToken);
    setMessage(message);
  }
  return (
      //create a min property for username and password
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button>submit</button>
        <div>
          {message}
        </div>
    </form>
  );
};

export default Register;
