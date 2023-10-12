import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../images/AvatarLogo.png";

class Header extends React.Component {
  render() {
    return (
      <header class="header">
        <NavLink to="/" className="logo">
          <img src={logo} id="logo-image" alt="Ribbit Logo" />
          Ribbit
        </NavLink>
        <div class="searchbar">
          <div class="search-icon" />
          <input type="text" placeholder="Search..." />
        </div>
        <nav class="navbar">
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/">FAQ</NavLink>
        </nav>
      </header>
    );
  }
}

export default Header;
