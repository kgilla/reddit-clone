import "./Dropdown.css";

// functions
import { useState, useEffect } from "react";
import { fetchGetData } from "../../api";
import { useAuth } from "../../hooks/use-auth";

//components
import DropdownItem from "../DropdownItem";

//icons
import { SpaceShip } from "@styled-icons/remix-fill";
import { TrendingUp } from "@styled-icons/material";

const Dropdown = () => {
  const auth = useAuth();
  const [subs, setSubs] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedSub, setSelectedSub] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchGetData(
          "http://localhost:3000/api/s/user",
          auth.token
        );
        setSubs(response.subs);
      } catch (err) {
        console.log(err);
      }
    };
    auth.token ? fetchData() : setSubs(null);
  }, [auth.token, showDropdown]);

  const handleShowChange = () => {
    showDropdown ? setShowDropdown(false) : setShowDropdown(true);
  };

  const handleClick = () => {
    showDropdown ? setShowDropdown(false) : setShowDropdown(true);
  };

  const changeSelectedSub = (sub) => {
    setSelectedSub(sub);
  };

  const createData = (href, title) => {
    return {
      href,
      title,
      onClick: handleClick,
      changeSelectedSub,
    };
  };

  const dropdownStyle = {
    border: "1px solid #eee",
    borderBottom: "0 solid #fff",
    borderRadius: "4px 4px 0 0",
  };

  return (
    <div id="nav-subs">
      <button
        id="sub-nav-button"
        onClick={handleClick}
        style={showDropdown ? dropdownStyle : null}
      >
        {selectedSub ? selectedSub : "Communities"}
      </button>
      {showDropdown ? (
        <div>
          <div id="dropdown-overlay" onClick={handleShowChange}></div>
          <div id="sub-dropdown">
            <div className="dropdown-section">
              <h6 className="dropdown-heading">My Feeds</h6>
              <DropdownItem data={createData("/home", "Home")}>
                <TrendingUp className="dropdown-item-icon" />
              </DropdownItem>
              <DropdownItem data={createData("/s/all", "All")}>
                <SpaceShip className="dropdown-item-icon" />
              </DropdownItem>
              <DropdownItem
                data={createData("/s/browse", "Browse Communities")}
              >
                <TrendingUp className="dropdown-item-icon" />
              </DropdownItem>
            </div>
            <div className="dropdown-section">
              <h6 className="dropdown-heading">My Communities</h6>
              {subs.length > 0
                ? subs.map((sub) => (
                    <DropdownItem
                      key={sub._id}
                      data={createData(`/s/${sub._id}`, sub.name)}
                    >
                      <SpaceShip className="dropdown-item-icon" />
                    </DropdownItem>
                  ))
                : null}
            </div>
            <div className="dropdown-section">
              <h6 className="dropdown-heading">Other</h6>
              <DropdownItem data={createData("/submit", "Create Post")}>
                <SpaceShip className="dropdown-item-icon" />
              </DropdownItem>
              <DropdownItem data={createData("/s/create", "Create Community")}>
                <SpaceShip className="dropdown-item-icon" />
              </DropdownItem>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
