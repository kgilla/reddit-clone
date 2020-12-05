import "./NavLink.css";
import { Link } from "react-router-dom";

const NavLink = ({ href, style, onClick, children }) => {
  return (
    <Link to={href}>
      <button className={`nav-link ${style}`} onClick={onClick}>
        {children}
      </button>
    </Link>
  );
};

export default NavLink;
