import "./DropdownItem.css";
import { Link } from "react-router-dom";

const DropdownItem = ({ data, children }) => {
  const { changeSelectedSub, onClick, href, title } = data;

  const handleClick = () => {
    changeSelectedSub(title);
    onClick();
  };

  return (
    <Link to={href} className="dropdown-item" onClick={handleClick}>
      {children}
      <span className="dropdown-item-heading">{title}</span>
    </Link>
  );
};

export default DropdownItem;
