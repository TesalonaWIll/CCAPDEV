import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/AvatarLogo.png";

class HeaderAlt extends React.Component {
  render() {
    return (
      <header className="header">
        <NavLink to="/" className="logo">
          <img src={logo} id="logo-image" alt="Ribbit Logo" />
          Ribbit
        </NavLink>
        <div className="searchbar">
          <div className="search-icon"></div>
          <input type="text" placeholder="Search..." />
        </div>
        <nav className="navbar">
          <NavLink to="/notifications" className="icon">
            <div className="spritesheet" id="notif"></div>
          </NavLink>
          <NavLink to="/profile" className="icon">
            <div className="spritesheet user"></div>
          </NavLink>
          <NavLink to="/faq">FAQ</NavLink>
        </nav>
      </header>
    );
  }
}

export default HeaderAlt;
