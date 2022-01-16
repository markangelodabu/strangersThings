import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const [token, message] = await login(username, password);
    localStorage.setItem("token", token);
    setMessage(message);
    setToken(token);
    navigate("/");
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        value={username}
        placeholder="username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
        //control input tag by creating the value as a state variable.
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
        <Link to="/register">Don't have an account? Register Here!</Link>
        {message}
      </div>
    </form>
  );
};

export default Login;
