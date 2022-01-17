import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { Posts, Login, Register, MessageForm} from "./Components";
import { useState, useEffect } from "react";
import { getUser} from "./api";


function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  const handleUser = async () => {
    if (token) {
      const userObject = await getUser(token);
      setUser(userObject);
    } else {
      setUser({});
    }
  };  
  console.log(user);

  useEffect(() => {
    handleUser();
  }, [token]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    //place the nav bar inside the routes tag
    <div className="App">
      <nav>
        {token && <h2 className="greeting">Welcome to Stranger's Things, {user.username}!</h2>}
        <Link className="home" to="/">Home</Link>
        {!token && <Link className="login" to="/login">Login</Link>}
        {!token && <Link className="register" to="/register">Register</Link>}
        {token && (
          <button
            className="logout"
            onClick={() => {
              setToken("");
              localStorage.removeItem("token");
            }}
          >
            Log Out
          </button>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Posts token={token} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route
          path="/register"
          element={<Register token={token} setToken={setToken} />}
        />
        <Route path="/posts/:postID/messages" element={<MessageForm posts={posts} setPosts={setPosts} setToken={setToken} token={token}/>} />
      </Routes>
    </div>
  );
}

export default App;
