import { useNavigate } from "react-router-dom";
import "../styles/colors.css";

export default function Navbar(props) {
  let navigate = useNavigate();
  const clicks = () => {
    console.log("ello");
  };

  return (
    <nav
      className="nav navbar-expand-lg  navbar-dark background-blue"
      style={{ marginBottom: "15px" }}
    >
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav nav-tabs" style={{ padding: "10px" }}>
          <li className="nav-item" onClick={() => navigate("/home")}>
            <a className="nav-link" style={{ color: "black" }}>
              Home
            </a>
          </li>
          <li className="nav-item" onClick={() => navigate("/newreleases")}>
            <a className="nav-link" style={{ color: "black" }}>
              New Releases
            </a>
          </li>
          <li className="nav-item" onClick={() => navigate("/upcoming")}>
            <a className="nav-link" style={{ color: "black" }}>
              Upcoming
            </a>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto ">
          {!props.loggedin && (
            <li className="nav-item" onClick={() => navigate("/login")}>
              <a className="nav-link" style={{ color: "black" }}>
                Log In
              </a>
            </li>
          )}
          {props.loggedin && (
            <li className="nav-item dropdown dropleft">
              <a
                className="nav-link dropdown-toggle "
                style={{ color: "black" }}
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Hi, {props.user.firstname}
              </a>
              <div
                className="dropdown-menu background-blue"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <a
                  className="dropdown-item blue-btn"
                  onClick={() =>
                    navigate("../userprofile", {
                      state: {
                        user: props.user,
                      },
                    })
                  }
                >
                  User lists
                </a>
                <a
                  className="dropdown-item blue-btn"
                  onClick={() => {
                    props.setLoggedin(false);
                    props.setUser({
                      firstname: "",
                      lastname: "",
                      watching: [],
                      watched: [],
                      dropped: [],
                    });
                  }}
                >
                  Sign Out
                </a>
              </div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
