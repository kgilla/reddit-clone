import "./Dropdown.css";

// functions
import { useState, useEffect } from "react";
import { fetchGetData } from "../../api";
import { useAuth } from "../../hooks/use-auth";
import { baseUrl } from "../../config/const";

//components
import DropdownItem from "../DropdownItem";

//icons
import { SpaceShip } from "@styled-icons/remix-fill";
import { TrendingUp } from "@styled-icons/material";
import { Home } from "@styled-icons/boxicons-solid";
import { World } from "@styled-icons/boxicons-regular";
import { User } from "@styled-icons/fa-solid";
import { Menu, Close } from "@styled-icons/evaicons-solid";

const Dropdown = ({ logout }) => {
  const auth = useAuth();
  const [subs, setSubs] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchGetData(
          `${baseUrl}/api/s/user`,
          auth.token
        );
        setSubs(response.subs);
      } catch (err) {
        console.log(err);
      }
    };
    auth.token ? fetchData() : setSubs(null);
  }, [auth.token, showDropdown]);

  const handleClick = () => {
    showDropdown ? setShowDropdown(false) : setShowDropdown(true);
  };

  const createData = (href, title) => {
    return {
      href,
      title,
      onClick: handleClick,
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
        <Menu className="menu-icon" />
        <span className="dropdown-button-text">Menu</span>
      </button>
      {showDropdown ? (
        <div>
          <div id="dropdown-overlay" onClick={handleClick}></div>

          <div
            id="sub-dropdown"
            className={showDropdown ? "dropdown-show" : "dropdown-hide"}
          >
            <header className="dropdown-profile-header">
              <h5 className="dropdown-username">{auth.user.username}</h5>
              <button className="close-button" onClick={handleClick}>
                <Close className="close-button-icon" />
              </button>
            </header>
            <div className="dropdown-section">
              <DropdownItem
                data={createData(`/users/${auth.user.username}`, "Profile")}
              >
                <User className="dropdown-item-icon" />
              </DropdownItem>
              <DropdownItem data={createData("/", "Home")}>
                <Home className="dropdown-item-icon" />
              </DropdownItem>
              <DropdownItem data={createData("/s/all", "All")}>
                <World className="dropdown-item-icon" />
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
                      <div
                        className="dropdown-item-circle"
                        style={
                          sub.color ? { backgroundColor: sub.color } : null
                        }
                      ></div>
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
            <div className="dropdown-button-box">
              <button className="button-outline logout-button" onClick={logout}>
                Logout
              </button>
            </div>
            <div className="blue-box"></div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
