import "./Sidebar.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";

const Sidebar = ({ sub }) => {
  let { path, url } = useRouteMatch();
  return (
    <div id="sidebar-container">
      <div className="sidebar-item">
        <header className="sidebar-item-header">
          {" "}
          <h2>{sub.name}</h2>
        </header>
        <main className="sidebar-item-content">
          {" "}
          <p>{sub.description}</p>
        </main>
        <footer className="sidebar-item-footer">{sub.dateCreated}</footer>
      </div>
      <div className="sidebar-item">
        <header className="sidebar-item-header">
          <h2>Add Content</h2>
        </header>
        <main className="sidebar-item-content">
          {" "}
          <Link to={`${url}/submit`}>
            {" "}
            <button>Create Post</button>
          </Link>
          <Link to="/newSub">
            {" "}
            <button>Create Community</button>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
