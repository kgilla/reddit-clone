import "./Sidebar.css";
import { Link, useRouteMatch } from "react-router-dom";
import SidebarItem from "../SidebarItem";
import moment from "moment";

const Sidebar = ({ sub }) => {
  let { url } = useRouteMatch();
  sub = sub ? sub : { name: "Home", description: "Your homepage" };
  return (
    <div id="sidebar-container">
      <SidebarItem
        heading="About Community"
        footing={"Created: " + moment(sub.dateCreated).format("MMMM Do YYYY")}
      >
        <p>{sub.description}</p>
      </SidebarItem>
      <SidebarItem heading="Create Content">
        <div className="button-box">
          <Link to={`${url}/submit`} className="button-filled">
            CREATE POST
          </Link>
          <Link to="/newSub" className="button-outline">
            CREATE COMMUNITY
          </Link>
        </div>
      </SidebarItem>
    </div>
  );
};

export default Sidebar;
