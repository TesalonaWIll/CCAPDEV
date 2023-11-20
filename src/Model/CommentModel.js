import { db } from "./firebase";
import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  arrayRemove,
  collection,
  addDoc,
  query,
  where,
} from "firebase/firestore";

export const fetchCommentsFromDatabase = async (postID) => {
  const commentsCollectionRef = collection(db, "comments");
  const q = query(commentsCollectionRef, where("postID", "==", postID));
  const data = await getDocs(q);
  return data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

export const fetchRepliesFromDatabase = async (commentID) => {
  const repliesCollectionRef = collection(db, "replies");
  const q = query(repliesCollectionRef, where("commentID", "==", commentID));
  const data = await getDocs(q);
  return data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

export const addCommentToDatabase = async (newComment) => {
  const commentsCollectionRef = collection(db, "comments");
  await addDoc(commentsCollectionRef, newComment);
  console.log("commented");
};

export const addCommentsToPosts = async (postID) => {
  const commentsCollectionRef = collection(db, "comments");
  const q = query(commentsCollectionRef, where("postID", "==", postID));
  const querySnapshot = await getDocs(q);
  const postComments = querySnapshot.docs.map((doc) => doc.id);

  const postRef = doc(db, "posts", postID);
  await updateDoc(postRef, { comments: postComments });
  console.log("comments added");
  /*   window.location.reload();
   */
};

export const addReplyToDatabase = async (newReply) => {
  const repliesCollectionRef = collection(db, "replies");
  await addDoc(repliesCollectionRef, newReply);
  console.log("replied");
};

export const updateCommentInDatabase = async (commentID, editedComment) => {
  const commentsRef = doc(db, "comments", commentID);
  await updateDoc(commentsRef, { commentContent: editedComment });
  console.log("edited");
  window.location.reload();
};

export const updateCommentVotesInDatabase = async (comment) => {
  const commentsCollectionRef = collection(db, "comments");
  const commentDoc = doc(commentsCollectionRef, comment.id);

  const updatedComment = {
    upvotedBy: Array.isArray(comment.upvotedBy) ? comment.upvotedBy : [],
    downvotedBy: Array.isArray(comment.downvotedBy) ? comment.downvotedBy : [],
  };

  await updateDoc(commentDoc, updatedComment);
};

export const deleteCommentFromDatabase = async (commentID) => {
  const commentsCollectionRef = collection(db, "comments");
  const commentDoc = doc(commentsCollectionRef, commentID);
  await deleteDoc(commentDoc);

  const postsCollectionRef = collection(db, "posts");
  const postSnapshot = await getDocs(postsCollectionRef);
  postSnapshot.forEach(async (postDoc) => {
    if (postDoc.data().comments.includes(commentID)) {
      const postRef = doc(db, "posts", postDoc.id);
      await updateDoc(postRef, { comments: arrayRemove(commentID) });
    }
  });
};

export const deleteReplyFromDatabase = async (replyID) => {
  const repliesCollectionRef = collection(db, "replies");
  const replyDoc = doc(repliesCollectionRef, replyID);
  await deleteDoc(replyDoc);

  const commentsCollectionRef = collection(db, "comments");
  const commentSnapshot = await getDocs(commentsCollectionRef);
  commentSnapshot.forEach(async (commentDoc) => {
    if (commentDoc.data().replies.includes(replyID)) {
      const commentRef = doc(db, "comments", commentDoc.id);
      await updateDoc(commentRef, { replies: arrayRemove(replyID) });
    }
  });
};
