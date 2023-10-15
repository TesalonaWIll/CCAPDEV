import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
import HeaderAlt from "./components/HeaderAlt";
import Register from "./pages/Register";
import Confirmation from "./components/Confirmation";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setLoginTrue = (val = Boolean) => {
    setIsLoggedIn(val);
  };

  return (
    <div>
      <Router>
        {!isLoggedIn && <Header />}
        {isLoggedIn && <HeaderAlt />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route
            path="/login"
            element={<Login setLoginTrue={setLoginTrue} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/success" element={<Confirmation />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
