import { useState } from "react";
import axios from 'axios';

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [registrationMessage, setRegistrationMessage] = useState("");

  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).{8,}$/;
    const isValid = passwordRegex.test(value);
    setIsPasswordValid(isValid);
    return isValid;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordsMatch(newPassword === repeatPassword);
    setIsValid(true);
    validatePassword(newPassword);
  };

  const handleRepeatPasswordChange = (e) => {
    const newRepeatPassword = e.target.value;
    setRepeatPassword(newRepeatPassword);
    setPasswordsMatch(password === newRepeatPassword);
    setIsValid(true);
  };

  

  const handleSubmit = async () => {
  if (
    firstName &&
    lastName &&
    username &&
    password &&
    repeatPassword &&
    email &&
    dateOfBirth
  ) {
    if (password === repeatPassword && validatePassword(password)) {
      try {
        const response = await axios.post("http://localhost:8081/api/register", {
          firstName,
          lastName,
          userName: username,
          password,
          email,
          dob: dateOfBirth,
        });

        const result = response.data;

        if (response.status === 200) {
          setRegistrationMessage(result.success ? "User registered successfully." : "Error registering user.");
        } else {
          setRegistrationMessage(result.error || "Internal server error. Please try again.");
        }
      } catch (error) {
        setRegistrationMessage("Username already in use. Please try a different name.");
      }
    } else {
      setPasswordsMatch(false);
    }
  } else {
    setRegistrationMessage("Please fill in all the fields.");
  }
};

  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card" style={{ minWidth: "400px" }}>
        <div className="card-body">
          <h1 className="mb-4">Sign Up</h1>

          <div className="form-group">
            <label>First name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Type firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label>Last name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Type lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <label>Username:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Type Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label>Password:</label>
            <input
              type="password"
              className={`form-control ${isPasswordValid ? "" : "is-invalid"}`}
              placeholder="Type password"
              value={password}
              onChange={handlePasswordChange}
            />
            {!isPasswordValid && (
              <div className="invalid-feedback">
                Password must contain at least one special character and one
                number, the length should have at least 8 characters
              </div>
            )}

            <label>Repeat password:</label>
            <input
              type="password"
              className={`form-control ${passwordsMatch ? "" : "is-invalid"}`}
              placeholder="Re-type password"
              value={repeatPassword}
              onChange={handleRepeatPasswordChange}
            />
            {!passwordsMatch && (
              <p className="text-danger">Passwords do not match</p>
            )}

            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Type Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Date of Birth:</label>
            <input
              type="date"
              className="form-control"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>

          <button className="btn btn-primary btn-block" onClick={handleSubmit}>
            Submit
          </button>
          
        </div>
        {/* Display the registration message */}
        {registrationMessage && (
          <div className={`alert ${registrationMessage.includes("successfully") ? "alert-success" : "alert-danger"}`} role="alert">
            {registrationMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default Signup;
