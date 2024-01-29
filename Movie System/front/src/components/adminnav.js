import React from "react";
import { useNavigate } from "react-router-dom";

function AdminNavbar({ setIsadmin }) {
  let navigate = useNavigate();

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <span className="navbar-brand">YOU ARE IN THE ADMIN PANEL</span>
        <button
          className="btn btn-danger"
          onClick={() => handleLogout(setIsadmin, navigate)}
        >
          Log Out
        </button>
      </div>
    </nav>
  );
}

const handleLogout = (setIsadmin, navigate) => {
  setIsadmin(false);
  navigate("/");
};

export default AdminNavbar;
