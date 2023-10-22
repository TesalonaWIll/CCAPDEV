import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
import HeaderAlt from "./components/HeaderAlt";
import Register from "./pages/Register";
import Confirmation from "./components/Confirmation";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ViewPost from "./pages/ViewPost";
import posts from "./components/Posts";
import comments from "./components/Comments";
import SearchComment from "./pages/SearchComment";
import SearchPost from "./pages/SearchPost";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [post, setPost] = useState(posts);
  const [comment, setComment] = useState(comments);

  const setLoginTrue = (val = Boolean) => {
    setIsLoggedIn(val);
  };

  return (
    <div>
      <Router>
        {isLoggedIn ? <HeaderAlt element={setIsLoggedIn} /> : <Header />}
        <Routes>
          <Route path="/" element={<Home post={post} setPost={setPost} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route
            path="/login"
            element={<Login setLoginTrue={setLoginTrue} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/success" element={<Confirmation />} />
          <Route
            path="/view-post/:id"
            element={
              <ViewPost
                post={post}
                setPost={setPost}
                comment={comment}
                setComment={setComment}
              />
            }
          />
          <Route path="/searchcomment" element={<SearchComment />} />
          <Route path="/searchpost" element={<SearchPost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
