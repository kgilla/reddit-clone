import "./DropdownItem.css";
import { Link } from "react-router-dom";

const DropdownItem = ({ href, onClick, changeSelectedSub, icon, children }) => {
  const handleClick = () => {
    changeSelectedSub(children);
    onClick();
  };

  return (
    <Link to={href} className="dropdown-item" onClick={handleClick}>
      {icon}
      <span className="dropdown-item-heading">{children}</span>
    </Link>
  );
};

export default DropdownItem;
