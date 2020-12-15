import "./Navbar.css";
import { useState, useEffect } from "react";
import { fetchGetData } from "../../api";
import { Link } from "react-router-dom";
import Dropdown from "../DropDown";
import { User } from "@styled-icons/fa-solid";

const Navbar = ({ openModal, user, token, logout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [subs, setSubs] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchGetData(
          "http://localhost:3000/api/s/user",
          token
        );
        console.log(response);
        setSubs(response.subs);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [user]);

  const handleShowChange = () => {
    showDropdown ? setShowDropdown(false) : setShowDropdown(true);
  };

  return (
    <div id="nav-container">
      <nav id="top-nav">
        <Link to="/" id="nav-brand">
          S/eddit
        </Link>
        <Dropdown
          subs={subs}
          showDropdown={showDropdown}
          changeShowDropdown={handleShowChange}
        />
        {showDropdown ? (
          <div id="dropdown-overlay" onClick={handleShowChange}></div>
        ) : null}
        <input id="nav-search" type="search" placeholder="Search"></input>
        {user ? (
          <ul id="nav-buttons">
            <Link
              to={`/users/${user.username}`}
              className="button-outline nav-button"
            >
              <User className="nav-icon" />
            </Link>
            <button className="button-filled nav-button" onClick={logout}>
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
