import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/AvatarLogo.png";

class Header extends React.Component {
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
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/faq">FAQ</NavLink>
        </nav>
      </header>
    );
  }
}

export default Header;
