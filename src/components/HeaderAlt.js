import logo from "../images/AvatarLogo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { handleSignOut } from "../controller/AuthController";
import { handlePostSearch } from "../controller/PostController";

const HeaderAlt = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <NavLink to="/" className="logo">
        <img src={logo} id="logo-image" alt="logo" />
        Ribbit
      </NavLink>
      <div className="searchbar">
        <div className="search-icon"></div>
        <input
          type="text"
          placeholder="Search..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handlePostSearch(e.target.value, navigate);
            }
          }}
        />
      </div>
      <nav className="navbar">
        {/* <NavLink to="/" className="icon ms-4">
          <div className="spritesheet" id="notif"></div>
        </NavLink> */}
        <div className="dropdown ms-4">
          <button
            className="btn spritesheet user"
            type="button"
            id="user-menu"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></button>
          <ul className="dropdown-menu dropdown-menu-lg-end mt-4">
            <li>
              <NavLink className="dropdown-item" to="/profile">
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink className="dropdown-item" to="/edit-profile">
                Settings
              </NavLink>
            </li>
            <li>
              <NavLink className="dropdown-item" to="/about">
                About
              </NavLink>
            </li>
            <li>
              <NavLink className="dropdown-item" to="/contact-us">
                Help
              </NavLink>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  handleSignOut(navigate);
                }}
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default HeaderAlt;
