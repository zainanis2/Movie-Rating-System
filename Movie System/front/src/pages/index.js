// HomePage.js
import React from "react";
import { useState, useEffect } from "react";

// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import '../styles/homepage.css'; // Import your homepage styles
import Search from "../components/search"; // Adjust the path based on your project structure
import largeLogo from "../logo.png"; // Replace with the path to your large logo image
import { Link } from "react-router-dom"; // If you're using React Router for navigation
import "../styles/colors.css";

export default function HomePage() {
  const [search, setSearch] = useState("");
  return (
    <div className="" style={{ height: "100vh" }}>
      <div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="large-logo-container text-center mb-4">
              <img
                style={{}}
                width={600}
                height={600}
                src={largeLogo}
                alt="Large Logo"
                className="img-fluid"
              />
            </div>

            <Search         search={search}
        setSearch={setSearch} />

            <div className="go-to-home-container text-center mt-4 ">
              <Link to="/home" className="btn blue-btn">
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
