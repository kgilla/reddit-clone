import "./Dropdown.css";
import NavLink from "../NavLink";

const Dropdown = ({ subs, showDropdown, changeShowDropdown }) => {
  const handleClick = () => {
    changeShowDropdown();
  };

  return (
    <div id="nav-subs">
      <button id="sub-nav-button" onClick={handleClick}>
        Subseddits
      </button>
      {showDropdown ? (
        <div id="sub-dropdown">
          <button id="sub-nav-button" onClick={handleClick}>
            Subseddits
          </button>
          {subs.length > 0
            ? subs.map((sub) => (
                <NavLink
                  key={sub._id}
                  href={`/s/${sub.name}`}
                  style="nav-dropdown-item"
                  onClick={handleClick}
                >
                  {sub.name}
                </NavLink>
              ))
            : null}
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
