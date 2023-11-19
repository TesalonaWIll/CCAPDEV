import { db } from "./firebase";
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../Model/firebase";

export const getUsername = async (userId) => {
  if (!userId) {
    console.log("userId is undefined");
    return;
  }
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    return userDocSnap.data().username;
  } else {
    console.log("No such document!");
    return null;
  }
};

export const getBio = async (userId) => {
  if (!userId) {
    console.log("userId is undefined");
    return;
  }
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    return userDocSnap.data().bio;
  } else {
    console.log("No such document!");
    return null;
  }
};

export const getUserPosts = async (userId) => {
  if (!userId) {
    console.log("userId is undefined");
    return;
  }
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    return userDocSnap.data().posts;
  } else {
    console.log("No such document!");
    return null;
  }
};

export const addPostsToUser = async (username, userID) => {
  console.log(username, userID);
  const postsCollectionRef = collection(db, "posts");
  const q = query(postsCollectionRef, where("postUser", "==", username));
  const querySnapshot = await getDocs(q);
  const userPosts = querySnapshot.docs.map((doc) => doc.id);

  const userRef = doc(db, "users", userID);
  await updateDoc(userRef, { posts: userPosts });
};

export const updateUserInDatabase = async (userId, username, bio) => {
  if (!userId) {
    console.log("userId is undefined");
    return;
  }
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    await setDoc(userDocRef, {
      ...userDocSnap.data(),
      username: username,
      bio: bio,
    });
    alert("Profile updated!");
  } else {
    console.log("No such document!");
  }
};

export const signIn = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      return user;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const createUser = async (email, password, username) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, { username: username });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
