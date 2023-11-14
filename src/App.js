import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Header from "./components/Header";
import HeaderAlt from "./components/HeaderAlt";
import Register from "./components/Register";
import Confirmation from "./components/Confirmation";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import ViewPost from "./components/ViewPost";
import comments from "./components/Comments";
import SearchComment from "./components/SearchComment";
import SearchPost from "./components/SearchPost";
import { getPosts } from "./controller/PostController";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [post, setPost] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [comment, setComment] = useState(comments);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      setPost(posts);
    };

    fetchPosts();
  }, []);

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
