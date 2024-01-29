import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Index from "./pages/index";
import Upcoming from "./pages/upcoming";
import Newreleases from "./pages/new-releases";
import Moviedetails from "./pages/moviedetails";
import { useState } from "react";
import UserProfile from "./pages/userprofile";

function App() {

  const [user, setUser] = useState({
    userID: null, // or initialize with the actual userID if available
    firstname: "",
    lastname: "",
    watching: [],
    watched: [],
    dropped: [],
  });
  
  const [loggedin, setLoggedin] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                setUser={setUser}
                user={user}
                setLoggedin={setLoggedin}
                loggedin={loggedin}
              />
            }
          />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/upcoming"
            element={
              <Upcoming
                user={user}
                setUser={setUser}
                loggedin={loggedin}
                setLoggedin={setLoggedin}
              />
            }
          />
          <Route
            path="/newreleases"
            element={
              <Newreleases
                user={user}
                setUser={setUser}
                loggedin={loggedin}
                setLoggedin={setLoggedin}
              />
            }
          />
          <Route
            path="/moviedetails"
            element={
              <Moviedetails
                user={user}
                setUser={setUser}
                loggedin={loggedin}
                setLoggedin={setLoggedin}
              />
            }
          />
          <Route
            path="/userprofile"
            element={
              <UserProfile
                user={user}
                setUser={setUser}
                loggedin={loggedin}
                setLoggedin={setLoggedin}
              />
            }
          />
          <Route
            path="/home"
            element={
              <Home
                user={user}
                setUser={setUser}
                loggedin={loggedin}
                setLoggedin={setLoggedin}
              />
            }
          />

          <Route
            path="/"
            element={
              <Index
                user={user}
                setUser={setUser}
                loggedin={loggedin}
                setLoggedin={setLoggedin}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
