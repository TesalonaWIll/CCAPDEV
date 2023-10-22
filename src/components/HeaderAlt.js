import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../images/AvatarLogo.png";

const HeaderAlt = ({ setIsLoggedIn }) => {
  const [open, setOpen] = useState(false);
  const handleDropdown = (state) => {
    setOpen(!open);
  };
  const navigate = useNavigate();
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigate("/searchpost");
    }
  };
  return (
    <header className="header">
      <NavLink to="/" className="logo">
        <img src={logo} id="logo-image" alt="logo" />
        Ribbit
      </NavLink>
      <div
        className="searchbar"
        onKeyDown={(e) => {
          handleKeyPress(e);
        }}
      >
        <div className="search-icon"></div>
        <input type="text" placeholder="Search..." />
      </div>
      <nav className="navbar">
        <NavLink to="/" className="icon ms-4">
          <div className="spritesheet" id="notif"></div>
        </NavLink>
        <div className="dropdown ms-4">
          <button
            className="btn spritesheet user"
            type="button"
            id="user-menu"
            onClick={(e) => handleDropdown(open)}
          ></button>
          {open && (
            <ul>
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
                <NavLink
                  className="dropdown-item"
                  to="/"
                  onClick={!setIsLoggedIn}
                >
                  Sign Out
                </NavLink>
              </li>
            </ul>
          )}
        </div>
        <NavLink to="#" className="ms-4">
          FAQ
        </NavLink>
      </nav>
    </header>
  );
};

export default HeaderAlt;
