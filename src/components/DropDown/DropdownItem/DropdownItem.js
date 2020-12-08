import "./DropdownItem.css";
import { Link } from "react-router-dom";

const DropdownItem = ({ href, onClick, children }) => {
  return (
    <Link to={href}>
      <button className="dropdown-item" onClick={onClick}>
        {children}
      </button>
    </Link>
  );
};

export default DropdownItem;
