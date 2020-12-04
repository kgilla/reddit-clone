import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div id="nav-container">
      <nav id="top-nav">
        <h3>Saidit</h3>
        <div id="nav-buttons">
          <Link to="/signup">
            <button className="button" id="signup-button">
              SIGN UP
            </button>
          </Link>
          <Link to="/login">
            <button className="button" id="login-button">
              LOG IN
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
