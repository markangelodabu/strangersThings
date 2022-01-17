import "./Register.css"
import { useState } from "react";
import { register } from "../api";
import { Link, useNavigate } from "react-router-dom";

const Register = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    //array destructuring
    const [newToken, message] = await register(username, password);
    setToken(newToken);
    setMessage(message);
    navigate("/");
  };
  return (
    //create a min property for username and password
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        value={username}
        placeholder="username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        value={password}
        placeholder="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button>Submit</button>
      <div>
        <Link to="/login">Already have an account? Login Here!</Link>
        {message}
      </div>
    </form>
  );
};

export default Register;
