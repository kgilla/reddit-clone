import "./Navbar.css";
import { Link } from "react-router-dom";
import Dropdown from "../DropDown";
import { User } from "@styled-icons/fa-solid";
import { useAuth } from "../../hooks/use-auth";

const Navbar = ({ openModal, user, token, logout }) => {
  const auth = useAuth();

  return (
    <div id="nav-container">
      <nav id="top-nav">
        <Link to="/" id="nav-brand">
          S/eddit
        </Link>
        {auth.user ? <Dropdown /> : null}
        <input id="nav-search" type="search" placeholder="Search"></input>
        {auth.user ? (
          <ul id="nav-buttons">
            <Link
              to={`/users/${auth.user.username}`}
              className="button-outline nav-button"
            >
              <User className="nav-icon" />
            </Link>
            <button className="button-filled nav-button" onClick={auth.logout}>
              LOG OUT
            </button>
          </ul>
        ) : (
          <ul id="nav-buttons">
            <button
              name="signup"
              className="button-outline nav-button"
              onClick={(e) => openModal(e.target.name)}
            >
              SIGN UP
            </button>
            <button
              name="login"
              className="button-filled nav-button"
              onClick={(e) => openModal(e.target.name)}
            >
              LOG IN
            </button>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
