import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Login(props) {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
 const isadmin=false;
  const onChangeuser = (e) => {
    setUsername(e.target.value);
  };

  const onChangepass = (e) => {
    setPassword(e.target.value);
  };

  const onButtonclick = () => {
    axios.post('http://localhost:8081/api/login', {
      userName: username,
      password: password,
      isadmin: isadmin
    })
    .then(response => {
      const userData = response.data;
  
 
        // Update the local state to include user information
        props.setUser((prevUser) => ({
          ...prevUser,
          firstname: userData.userName,
          userID: userData.userID // Include userID in the local state
        }));
  
        props.setLoggedin(true);
        navigate("/home");
      
    })
    .catch(error => {
      setErrorMessage("Invalid username or password");
      console.error('Error logging in:', error);
    });
  };
  


  return (
    <div
      className="container-xl mx-auto d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card" style={{ minWidth: "300px" }}>
        <div className="card-body">

          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Type username"
              onChange={onChangeuser}
              value={username}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Type password"
              onChange={onChangepass}
              value={password}
            />
          </div>
          <button className="btn btn-primary btn-block" onClick={onButtonclick}>
            Login
          </button>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <button
            className="btn btn-secondary btn-block"
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;


