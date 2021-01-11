import "./SidenavItem.css";
import { Link } from "react-router-dom";

const SidenavItem = ({ data, children }) => {
  const { onClick, href, title } = data;

  return (
    <Link to={href} className="sidenav-item" onClick={onClick}>
      {children}
      <span className="sidenav-item-heading">{title}</span>
    </Link>
  );
};

export default SidenavItem;
