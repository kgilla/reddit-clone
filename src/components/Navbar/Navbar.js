import "./Navbar.css";
import { Link, useHistory } from "react-router-dom";
import Sidenav from "../Sidenav";
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
          {auth.user ? (
            <Sidenav logout={handleLogout} />
          ) : (
            <div className="nav-buttons">
              <Link to="/signup" className="button-outline nav-button">
                Sign Up
              </Link>
              <Link to="/login" className="button-filled nav-button">
                Log In
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
