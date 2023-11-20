import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import SearchComment from "./components/SearchComment";
import SearchPost from "./components/SearchPost";
import About from "./components/About";
import Contact from "./components/Contact";
import { getPosts } from "./controller/PostController";
import { AuthListener } from "./controller/AuthController";
import {
  useCurrentUser,
  getCurrentUserName,
  getCurrentBio,
  getCurrentUserPosts,
} from "./controller/AuthController";

function App() {
  const [post, setPost] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [bio, setBio] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const currentUser = useCurrentUser();

  // set login status
  const setLoginTrue = (val = false) => {
    setIsLoggedIn(val);
  };

  // get current user
  useEffect(() => {
    if (!currentUser) {
      return;
    }

    setUser(currentUser);
  }, [currentUser]);

  // fetch posts from database
  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      setPost(posts);
    };

    fetchPosts();
  }, []);

  // get current user's username
  useEffect(() => {
    const fetchUsername = async () => {
      if (!currentUser) {
        return;
      }

      const result = await getCurrentUserName(currentUser);
      setUsername(result);
    };

    fetchUsername();
  }, [currentUser]);

  // get current user's bio
  useEffect(() => {
    const fetchBio = async () => {
      if (!currentUser) {
        return;
      }

      const result = await getCurrentBio(currentUser);
      setBio(result);
    };

    fetchBio();
  }, [currentUser]);

  // get current user's posts
  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!currentUser) {
        return;
      }

      const result = await getCurrentUserPosts(currentUser);
      setUserPosts(result);
    };

    fetchUserPosts();
  }, [currentUser]);

  return (
    <div>
      <Router>
        <AuthListener setIsLoggedIn={setIsLoggedIn} />
        {isLoggedIn ? <HeaderAlt element={setIsLoggedIn} /> : <Header />}
        <Routes>
          <Route
            path="/"
            element={<Home post={post} user={user} username={username} />}
          />
          <Route
            path="/profile"
            element={
              <Profile
                post={post}
                setPost={setPost}
                user={user}
                username={username}
                bio={bio}
                userPosts={userPosts}
                setUserPosts={setUserPosts}
              />
            }
          />
          <Route
            path="/edit-profile"
            element={
              <EditProfile
                user={user}
                username={username}
                setUsername={setUsername}
                bio={bio}
                setBio={setBio}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route
            path="/login"
            element={<Login setLoginTrue={setLoginTrue} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/success" element={<Confirmation />} />
          <Route
            path="/view-post/:id"
            element={<ViewPost user={user} username={username} />}
          />
          <Route path="/searchcomment" element={<SearchComment />} />
          <Route path="/searchpost" element={<SearchPost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
