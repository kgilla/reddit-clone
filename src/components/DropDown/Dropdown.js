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

  return (
    <div id="nav-subs">
      <button
        id="sub-nav-button"
        onClick={handleClick}
        style={
          showDropdown
            ? {
                border: "1px solid #eee",
                borderBottom: "0 solid #fff",
                borderRadius: "4px 4px 0 0",
              }
            : null
        }
      >
        {selectedSub ? selectedSub : "Communities"}
      </button>
      {showDropdown ? (
        <div id="sub-dropdown">
          <div className="dropdown-section">
            <h6 className="dropdown-heading">My Feeds</h6>
            <DropdownItem
              href="/home"
              onClick={handleClick}
              changeSelectedSub={changeSelectedSub}
              icon={<TrendingUp className="dropdown-item-icon" />}
            >
              Home
            </DropdownItem>
            <DropdownItem
              href="/s/all"
              onClick={handleClick}
              changeSelectedSub={changeSelectedSub}
              icon={<SpaceShip className="dropdown-item-icon" />}
            >
              All
            </DropdownItem>
          </div>
          <div className="dropdown-section">
            <h6 className="dropdown-heading">My Communities</h6>
            {subs.length > 0
              ? subs.map((sub) => (
                  <DropdownItem
                    key={sub._id}
                    href={`/s/${sub._id}`}
                    onClick={handleClick}
                    changeSelectedSub={changeSelectedSub}
                    icon={<SpaceShip className="dropdown-item-icon" />}
                  >
                    {sub.name}{" "}
                  </DropdownItem>
                ))
              : null}
          </div>
          <div className="dropdown-section">
            <h6 className="dropdown-heading">Other</h6>
            <DropdownItem
              href="/submit"
              onClick={handleClick}
              changeSelectedSub={changeSelectedSub}
              icon={<SpaceShip className="dropdown-item-icon" />}
            >
              Create Post
            </DropdownItem>
            <DropdownItem
              href="/submit"
              onClick={handleClick}
              changeSelectedSub={changeSelectedSub}
              icon={<SpaceShip className="dropdown-item-icon" />}
            >
              Create Community
            </DropdownItem>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
