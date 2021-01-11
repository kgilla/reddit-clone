import "./Sidenav.css";

// functions
import { useState, useEffect } from "react";
import { fetchGetData } from "../../api";
import { useAuth } from "../../hooks/use-auth";
import { baseUrl } from "../../config/const";

//components
import SidenavItem from "../SidenavItem";

//icons
// import { SpaceShip } from "@styled-icons/remix-fill";
import { TrendingUp, CreateNewFolder } from "@styled-icons/material";
import { Home } from "@styled-icons/boxicons-solid";
import { World } from "@styled-icons/boxicons-regular";
import { User } from "@styled-icons/fa-solid";
import { Menu, Close } from "@styled-icons/evaicons-solid";
import { Create } from "@styled-icons/ionicons-solid";

const Sidenav = ({ logout }) => {
  const auth = useAuth();
  const [subs, setSubs] = useState(null);
  const [showSidenav, setShowSidenav] = useState(false);

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
  }, [auth.token, showSidenav]);

  const handleClick = () => {
    showSidenav ? setShowSidenav(false) : setShowSidenav(true);
  };

  const createData = (href, title) => {
    return {
      href,
      title,
      onClick: handleClick,
    };
  };

  return (
    <div id="nav-subs">
      <button id="sub-nav-button" onClick={handleClick}>
        <Menu className="menu-icon" />
        <span className="sidenav-button-text">Menu</span>
      </button>
      {showSidenav ? (
        <div>
          <div id="sidenav-overlay" onClick={handleClick}></div>

          <div
            id="sub-sidenav"
            className={showSidenav ? "sidenav-show" : "sidenav-hide"}
          >
            <header className="sidenav-profile-header">
              <h5 className="sidenav-username">{auth.user.username}</h5>
              <button className="close-button" onClick={handleClick}>
                <Close className="close-button-icon" />
              </button>
            </header>
            <div className="sidenav-section">
              <SidenavItem
                data={createData(`/users/${auth.user.username}`, "Profile")}
              >
                <User className="sidenav-item-icon" />
              </SidenavItem>
              <SidenavItem data={createData("/", "Home")}>
                <Home className="sidenav-item-icon" />
              </SidenavItem>
              <SidenavItem data={createData("/s/all", "All")}>
                <World className="sidenav-item-icon" />
              </SidenavItem>
              <SidenavItem data={createData("/s/browse", "Browse Communities")}>
                <TrendingUp className="sidenav-item-icon" />
              </SidenavItem>
            </div>
            <div className="sidenav-section">
              <h6 className="sidenav-heading">My Communities</h6>
              {subs.length > 0
                ? subs.map((sub) => (
                    <SidenavItem
                      key={sub._id}
                      data={createData(`/s/${sub._id}`, sub.name)}
                    >
                      <div
                        className="sidenav-item-circle"
                        style={
                          sub.color ? { backgroundColor: sub.color } : null
                        }
                      ></div>
                    </SidenavItem>
                  ))
                : null}
            </div>
            <div className="sidenav-section">
              <h6 className="sidenav-heading">Other</h6>
              <SidenavItem data={createData("/submit", "Create Post")}>
                <Create className="sidenav-item-icon" />
              </SidenavItem>
              <SidenavItem data={createData("/s/create", "Create Community")}>
                <CreateNewFolder className="sidenav-item-icon" />
              </SidenavItem>
            </div>
            <div className="sidenav-button-box">
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

export default Sidenav;
