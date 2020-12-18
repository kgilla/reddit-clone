import "./Navbar.css";
import { Link, useHistory } from "react-router-dom";
import Dropdown from "../DropDown";
import { User } from "@styled-icons/fa-solid";
import { useAuth } from "../../hooks/use-auth";

const Navbar = () => {
  const auth = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    auth.logout();
    history.push("/");
  };

  return (
    <div id="nav-container">
      <nav id="top-nav">
        <Link to="/" id="nav-brand">
          S/eddit
        </Link>
        <div id="nav-sub-container">
          {auth.user ? <Dropdown /> : null}
          {auth.user ? (
            <ul id="nav-buttons">
              <Link
                to={`/users/${auth.user.username}`}
                className="button-outline nav-button"
              >
                <User className="nav-icon" />
              </Link>
              <button
                className="button-filled nav-button"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </ul>
          ) : (
            <ul id="nav-buttons">
              <Link to="/signup" className="button-outline nav-button">
                Sign Up
              </Link>
              <Link to="/login" className="button-filled nav-button">
                Log In
              </Link>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
