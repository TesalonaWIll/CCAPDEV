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
import {
  getPosts,
  getComments,
  getCurrentPost,
  getUser,
} from "./controller/PostController";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";

function App() {
  const [post, setPost] = useState([]);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { postID } = useParams();
  const userID = "hFbdmOAT7tKe4QCogqRA";

  // fetch user from database
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser(userID);
      setUser(user);
    };
    fetchUser();
  });

  // fetch posts from database
  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      setPost(posts);
    };

    fetchPosts();
  }, []);

  // set login status
  const setLoginTrue = (val = Boolean) => {
    setIsLoggedIn(val);
  };

  return (
    <div>
      <Router>
        {isLoggedIn ? <HeaderAlt element={setIsLoggedIn} /> : <Header />}
        <Routes>
          <Route
            path="/"
            element={<Home post={post} setPost={setPost} user={user} />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route
            path="/login"
            element={<Login setLoginTrue={setLoginTrue} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/success" element={<Confirmation />} />
          <Route path="/view-post/:id" element={<ViewPost user={user} />} />
          <Route path="/searchcomment" element={<SearchComment />} />
          <Route path="/searchpost" element={<SearchPost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
