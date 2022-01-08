import './App.css';
import {Routes, Route, Link} from 'react-router-dom'
import { Posts, Login, Register } from './Components'
import { useState, useEffect } from 'react';
import {getUser} from './api';

function App() {
  const[token,setToken] = useState ('');
  const[user, setUser] = useState ({});

  const handleUser = async () => {
    if (token) {
      const userObject = await getUser(token);
      setUser(userObject);
    } else {
      setUser({});
    }
  }
  //setToken('') <- used for when logging out

  console.log(user);

  useEffect(() => {
    // fetch for the user object
    handleUser();
    //runs when token changes (log in, log out)

  }, [token])

  return (
    <div className="App">
      <nav>
        {Object.keys(user).length > 0 && <h2>Welcome, {user.username}</h2>}
        <Link to='/'>Home</Link>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
      </nav>
      <Routes>
        <Route path='/' element= {<Posts />} />
        <Route path='/login' element= {<Login />} />
        <Route path='/register' element= {<Register token={token} setToken={setToken} />} />
      </Routes>
    </div>
  );
} 

export default App;
