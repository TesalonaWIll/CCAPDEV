import { db } from "./firebase";
import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
  addDoc,
  query,
  where,
} from "firebase/firestore";

export const fetchUserFromDatabase = async (userID) => {
  const usersCollectionRef = collection(db, "users");
  const userDoc = doc(usersCollectionRef, userID);
  const userSnapshot = await getDoc(userDoc);

  if (userSnapshot.exists()) {
    return { id: userSnapshot.id, ...userSnapshot.data() };
  } else {
    console.log("No such user!");
    return null;
  }
};

export const fetchPostsFromDatabase = async () => {
  const postsCollectionRef = collection(db, "posts");
  const data = await getDocs(postsCollectionRef);

  return data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
    postTime: doc.data().postTime.toDate().toDateString(),
  }));
};

export const fetchCommentsFromDatabase = async (postID) => {
  const commentsCollectionRef = collection(db, "comments");
  const q = query(commentsCollectionRef, where("postID", "==", postID));
  const data = await getDocs(q);
  return data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

export const fetchCategoriesFromDatabase = async () => {
  const categoriesCollectionRef = collection(db, "categories");
  const data = await getDocs(categoriesCollectionRef);

  return data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

export const addPostToDatabase = async (post) => {
  const postsCollectionRef = collection(db, "posts");
  await addDoc(postsCollectionRef, post);
};

export const addCommentToDatabase = async (commentText, postID) => {
  const commentsCollectionRef = collection(db, "comments");
  const newComment = { ...comment, commentContent: commentText, postID };
  await addDoc(commentsCollectionRef, newComment);
};

export const updatePostInDatabase = async (post) => {
  const postsCollectionRef = collection(db, "posts");
  const postDoc = doc(postsCollectionRef, post.id);
  await updateDoc(postDoc, post);
};

export const updateCommentInDatabase = async (comment) => {
  const commentsCollectionRef = collection(db, "comments");
  const commentDoc = doc(commentsCollectionRef, comment.id);
  await updateDoc(commentDoc, comment);
};
