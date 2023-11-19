import { NavLink, useNavigate } from "react-router-dom";
import { handlePostSearch } from "../controller/PostController";
import logo from "../images/AvatarLogo.png";

const Header = () => {
  const navigate = useNavigate();
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigate("/searchpost");
    }
  };
  return (
    <header className="header">
      <NavLink to="/" className="logo">
        <img src={logo} id="logo-image" alt="ribbit logo" />
        Ribbit
      </NavLink>
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
        <NavLink to="/login">Login</NavLink>
        <NavLink className="ms-4" to="/register">
          Register
        </NavLink>
        <NavLink className="ms-4" to="/faq">
          FAQ
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
