import { useEffect, useState } from "react";
import { auth } from "../Model/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { User } from "../Model/UserModel";

export const addPostsToUser = async (username, userID) => {
  await User.addPostsToUser(username, userID);
};

export const updateUser = async (userId, username, bio) => {
  await User.updateUserInDatabase(userId, username, bio);
};

export const handleSignIn = async (email, password, navigate, setLoginTrue, setIsInvalid) => {
  try {
    await User.signIn(email, password);
    navigate("/");
    setIsInvalid(false);
    setLoginTrue(true);
  } catch (error) {
    setIsInvalid(true);
    console.log(error);
  }
};

export const handleSignUp = async (email, password, username, navigate, setIsInvalid) => {
  try {
    const user = await User.createUser(email, password, username);
    if (user) {
      setIsInvalid(false);
      navigate("/success");
    } else {
      setIsInvalid(true);
    }
  } catch (error) {
    setIsInvalid(true);
    console.log(error);
  }
};

export const AuthListener = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        if (location.pathname !== "/register" && location.pathname !== "/about" && location.pathname !== "/contact-us" && location.pathname !== "/") {
          navigate("/login");
        }
      }
    });
  }, [navigate, setIsLoggedIn, location.pathname]);

  return null;
};

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return currentUser;
};

export const getCurrentUserProperty = async (user, property) => {
  if (!user) {
    return;
  }

  try {
    return await User.getUserProperty(user.uid, property);
  } catch (error) {
    console.log(error);
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
