import { addPostsToUser } from "./AuthModel";
import { db } from "./firebase";
import {
  doc,
  getDocs,
  updateDoc,
  collection,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

export const fetchPostsFromDatabase = async () => {
  const postsCollectionRef = collection(db, "posts");
  const data = await getDocs(postsCollectionRef);

  const posts = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
    postTime: doc.data().postTime.toDate().toDateString(),
  }));

  return posts;
};

export const fetchCategoriesFromDatabase = async () => {
  const categoriesCollectionRef = collection(db, "categories");
  const data = await getDocs(categoriesCollectionRef);

  return data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

export const addPostToDatabase = async (post, userID) => {
  const postsCollectionRef = collection(db, "posts");
  await addDoc(postsCollectionRef, post);
  await addPostsToUser(post.postUser, userID);
  console.log("posted");
  window.location.reload();
};

export const updatePostContentInDatabase = async (postID, newContent) => {
  const postRef = doc(db, "posts", postID);
  await updateDoc(postRef, { postContent: newContent });
  console.log("edited");
  window.location.reload();
};

export const updatePostVotesInDatabase = async (post) => {
  const postsCollectionRef = collection(db, "posts");
  const postDoc = doc(postsCollectionRef, post.id);

  const updatedPost = {
    upvotedBy: Array.isArray(post.upvotedBy) ? post.upvotedBy : [],
    downvotedBy: Array.isArray(post.downvotedBy) ? post.downvotedBy : [],
  };

  await updateDoc(postDoc, updatedPost);
  console.log("voted");
};

export const deletePostFromDatabase = async (postID) => {
  const postsCollectionRef = collection(db, "posts");
  const postDoc = doc(postsCollectionRef, postID);
  await deleteDoc(postDoc);
  window.location.reload();
};
