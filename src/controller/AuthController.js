import { useEffect, useState } from "react";
import { auth } from "../Model/firebase";
import {
  getUsername,
  getBio,
  getUserPosts,
  updateUserInDatabase,
  signIn,
  createUser,
} from "../Model/AuthModel";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";

export const AuthListener = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        if (
          location.pathname !== "/register" &&
          location.pathname !== "/about" &&
          location.pathname !== "/contact-us" &&
          location.pathname !== "/"
        ) {
          navigate("/login");
        }
      }
    });
  }, [navigate, setIsLoggedIn]);

  return null;
};

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, [auth]);

  return currentUser;
};

export const getCurrentUserName = async (user) => {
  try {
    return await getUsername(user.uid);
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentBio = async (user) => {
  try {
    return await getBio(user.uid);
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUserPosts = async (user) => {
  try {
    return await getUserPosts(user.uid);
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (userId, username, bio) => {
  try {
    await updateUserInDatabase(userId, username, bio);
  } catch (error) {
    console.log(error);
  }
};

export const handleSignIn = async (email, password, navigate, setLoginTrue) => {
  try {
    await signIn(email, password);
    navigate("/");
    setLoginTrue(true);
  } catch (error) {
    console.log(error);
    alert("Invalid email or password");
  }
};

export const handleSignUp = async (email, password, username, navigate) => {
  try {
    await createUser(email, password, username);
    navigate("/success");
  } catch (error) {
    console.log(error);
    alert("Invalid email or password");
  }
};

export const handleSignOut = async (navigate) => {
  try {
    await signOut(auth);
    navigate("/login");
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
