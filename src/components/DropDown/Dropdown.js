import "./Dropdown.css";
import DropdownItem from "../DropdownItem";
import { useState } from "react";
import { SpaceShip } from "@styled-icons/remix-fill";
import { TrendingUp } from "@styled-icons/material";

const Dropdown = ({ subs, showDropdown, changeShowDropdown }) => {
  const [selectedSub, setSelectedSub] = useState(null);

  const handleClick = () => {
    changeShowDropdown();
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
        <div id="sub-dropdown">
          <div className="dropdown-section">
            <h6 className="dropdown-heading">My Feeds</h6>
            <DropdownItem data={createData("/home", "Home")}>
              <TrendingUp className="dropdown-item-icon" />
            </DropdownItem>
            <DropdownItem data={createData("/s/all", "All")}>
              <SpaceShip className="dropdown-item-icon" />
            </DropdownItem>
            <DropdownItem data={createData("/s/browse", "Browse Communities")}>
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
      ) : null}
    </div>
  );
};

export default Dropdown;
