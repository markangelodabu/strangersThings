import { useState } from "react";
import { login } from "../api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = await login(username, password);
    console.log(token);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
        //control input tag by creating the value as a state variable.
      />
      <input
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button>Submit</button>
    </form>
  );
};

export default Login;
