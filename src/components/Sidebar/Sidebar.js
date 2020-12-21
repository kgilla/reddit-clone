import "./Sidebar.css";
import { useAuth } from "../../hooks/use-auth";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchGetData } from "../../api";
import SidebarItem from "../SidebarItem";
import moment from "moment";

const Sidebar = ({ sub }) => {
  const auth = useAuth();
  const [subs, setSubs] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchGetData("http://localhost:3000/api/s/");
      setSubs(response.subs);
    };

    fetchData();
  }, []);

  sub = sub ? sub : { name: "Home", description: "Your homepage" };
  return (
    <div id="sidebar-container">
      <SidebarItem
        heading="About Community"
        footing={"Created: " + moment(sub.dateCreated).format("MMMM Do YYYY")}
      >
        <p>{sub.description}</p>
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
      <SidebarItem
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

export default Sidebar;
