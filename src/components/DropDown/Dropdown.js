import "./Dropdown.css";
import DropdownItem from "./DropdownItem";

const Dropdown = ({ subs, showDropdown, changeShowDropdown }) => {
  const handleClick = () => {
    changeShowDropdown();
  };

  return (
    <div id="nav-subs">
      <button id="sub-nav-button" onClick={handleClick}>
        Communities
      </button>
      {showDropdown ? (
        <div id="sub-dropdown">
          <button id="sub-nav-button" onClick={handleClick}>
            Communities
          </button>
          {subs.length > 0
            ? subs.map((sub) => (
                <DropdownItem
                  key={sub._id}
                  href={`/s/${sub._id}`}
                  onClick={handleClick}
                >
                  {sub.name}
                </DropdownItem>
              ))
            : null}
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
