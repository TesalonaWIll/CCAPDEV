import { NavLink } from "react-router-dom";
import { handlePostSearch } from "../controller/PostController";
import logo from "../images/AvatarLogo.png";

const Header = () => {
  return (
    <header className="header">
      <div>
        <NavLink to="/" className="logo">
          <img src={logo} id="logo-image" alt="ribbit logo" />
          Home
        </NavLink>
      </div>

      <div className="searchbar">
        <div className="search-icon"></div>
        <input
          type="text"
          placeholder="Search..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handlePostSearch(e.target.value);
            }
          }}
        />
      </div>
      <nav className="navbar">
        <NavLink to="/about">About</NavLink>
        <NavLink className="ms-4" to="/contact-us">
          Help
        </NavLink>
        <NavLink className="ms-4" to="/login">
          Login
        </NavLink>
        <NavLink className="ms-4" to="/register">
          Register
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
