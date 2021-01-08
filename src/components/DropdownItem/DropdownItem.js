import "./DropdownItem.css";
import { Link } from "react-router-dom";

const DropdownItem = ({ data, children }) => {
  const { onClick, href, title } = data;

  return (
    <Link to={href} className="dropdown-item" onClick={onClick}>
      {children}
      <span className="dropdown-item-heading">{title}</span>
    </Link>
  );
};

export default DropdownItem;
