import "./Navbar.css";
import { useState, useEffect } from "react";
import NavLink from "./NavLink";
import Dropdown from "./DropDown";

const Navbar = ({ openModal }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [subs, setSubs] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = `http://localhost:3000/api/s/`;
        const response = await fetch(URL);
        const data = await response.json();
        setSubs(data.allSubs);
        console.log(data.allSubs);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleShowChange = () => {
    showDropdown ? setShowDropdown(false) : setShowDropdown(true);
  };

  const handleClick = (e) => {
    openModal(e.target.name);
  };

  return (
    <div id="nav-container">
      <nav id="top-nav">
        S/eddit
        <Dropdown
          subs={subs}
          showDropdown={showDropdown}
          changeShowDropdown={handleShowChange}
        />
        <input id="nav-search" type="search" placeholder="Search"></input>
        <ul id="nav-buttons">
          <button name="signup" onClick={handleClick}>
            SIGN UP
          </button>
          <button name="login" onClick={handleClick}>
            LOG IN
          </button>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
