import "./Sidebar.css";
import { useAuth } from "../../hooks/use-auth";
import { useWindowSize } from "../../hooks/use-window-size";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchGetData } from "../../api";
import SidebarItem from "../SidebarItem";
import moment from "moment";

const Sidebar = ({ sub, user, score }) => {
  const auth = useAuth();
  const size = useWindowSize();
  const [subs, setSubs] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchGetData("http://localhost:3000/api/s/");
      shuffleArray(response.subs);
      setSubs(response.subs.slice(0, 5));
    };

    fetchData();
  }, [sub]);

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  const subSidebar = () => {
    return (
      <div id="sidebar-container">
        <SidebarItem
          color={sub.color}
          heading="About Community"
          footing={"Created: " + moment(sub.dateCreated).format("MMMM Do YYYY")}
        >
          <p>{sub.description}</p>
        </SidebarItem>
        {auth.user ? (
          <SidebarItem heading="Create Content" color={sub.color}>
            <div className="button-box">
              <Link to="/submit" className="button-filled">
                Create Post
              </Link>
              <Link to="/s/create" className="button-outline">
                Create Community
              </Link>
            </div>
          </SidebarItem>
        ) : null}
        <SidebarItem
          color={sub.color}
          heading="Other Communities"
          footing={
            <div className="button-box">
              <Link className="button-filled" to="/s/browse">
                All Communities
              </Link>
            </div>
          }
        >
          {subs
            ? subs.map((sub) => (
                <Link
                  to={`/s/${sub._id}`}
                  key={sub._id}
                  className="sub-preview-link"
                >
                  <div className="sub-preview">
                    <div className="small-sub-image sub-image"></div>
                    {sub.name}
                  </div>
                </Link>
              ))
            : null}
        </SidebarItem>
      </div>
    );
  };

  const userSidebar = () => {
    return (
      <div id="sidebar-container">
        <SidebarItem heading={<div className="profile-picture"></div>}>
          <h2>{user.username}</h2>
          <div className="user-stats">
            <div className="user-stat-group">
              <h5 className="user-stat-label">Score</h5>
              <span className="user-stat">{score}</span>
            </div>
            <div className="user-stat-group">
              <h5 className="user-stat-label">Date Joined</h5>
              <span className="user-stat">
                {moment(user.dateJoined).format("MMMM DD YYYY")}
              </span>
            </div>
          </div>
        </SidebarItem>
        {auth.user ? (
          <SidebarItem heading="Create Content">
            <div className="button-box">
              <Link to="/submit" className="button-filled">
                Create Post
              </Link>
              <Link to="/s/create" className="button-outline">
                Create Community
              </Link>
            </div>
          </SidebarItem>
        ) : null}
      </div>
    );
  };

  return size.width > 950 ? (user ? userSidebar() : subSidebar()) : null;
};

export default Sidebar;
