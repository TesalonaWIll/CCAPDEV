import { set } from "react-hook-form";
import {
  fetchCommentsFromDatabase,
  fetchRepliesFromDatabase,
  addCommentToDatabase,
  addCommentsToPosts,
  addReplyToDatabase,
  updateCommentInDatabase,
  updateCommentVotesInDatabase,
  deleteCommentFromDatabase,
  deleteReplyFromDatabase,
} from "../Model/CommentModel";

export const getComments = async (postID) => {
  try {
    const comments = await fetchCommentsFromDatabase(postID);
    return comments;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getReplies = async (commentID) => {
  try {
    const replies = await fetchRepliesFromDatabase(commentID);
    return replies;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteComment = async (postID, commentID) => {
  try {
    console.log("deleting");
    await deleteCommentFromDatabase(commentID);
    const comments = await getComments(postID);
    return comments;
  } catch (error) {
    console.error(error);
  }
};

export const deleteReply = async (commentID, replyID) => {
  try {
    console.log("deleting");
    await deleteReplyFromDatabase(replyID);
    const replies = await getReplies(commentID);
    return replies;
  } catch (error) {
    console.error(error);
  }
};

export const handleCommentSubmit = async (postID, username, commentText) => {
  try {
    let comment = {
      postID: postID,
      commentContent: commentText,
      commentUser: username,
      upvotedBy: [],
      downvotedBy: [],
    };
    await addCommentToDatabase(comment);
    await addCommentsToPosts(postID);
    comment = await getComments(postID);
    return comment;
  } catch (error) {
    console.error(error);
  }
};

export const handleEditComment = async (commentID, editedComment) => {
  try {
    console.log("editing");
    await updateCommentInDatabase(commentID, editedComment);
  } catch (error) {
    console.error(error);
  }
};

export const handleUpvoteComment = async (postID, commentID, userID) => {
  try {
    let comments = await getComments(postID);
    for (let comment of comments) {
      if (comment.id === commentID) {
        if (!checkIfUserUpvotedComment(comment, userID)) {
          comment.upvotedBy.push(userID);
          const index = comment.downvotedBy.indexOf(userID);
          if (index > -1) {
            comment.downvotedBy.splice(index, 1);
          }
        } else {
          const index = comment.upvotedBy.indexOf(userID);
          if (index > -1) {
            comment.upvotedBy.splice(index, 1);
          }
        }
        await updateCommentVotesInDatabase(comment);
      }
    }
    comments = await getComments(postID);
    return comments;
  } catch (error) {
    console.error(error);
  }
};

export const handleDownvoteComment = async (postID, commentID, userID) => {
  try {
    let comments = await getComments(postID);
    for (let comment of comments) {
      if (comment.id === commentID) {
        if (!checkIfUserDownvotedComment(comment, userID)) {
          comment.downvotedBy.push(userID);
          const index = comment.downvotedBy.indexOf(userID);
          if (index > -1) {
            comment.upvotedBy.splice(index, 1);
          }
        } else {
          const index = comment.downvotedBy.indexOf(userID);
          if (index > -1) {
            comment.upvotedBy.splice(index, 1);
          }
        }
        await updateCommentVotesInDatabase(comment);
      }
    }
    comments = await getComments(postID);
    return comments;
  } catch (error) {
    console.error(error);
  }
};

export const handleAddReply = async (commentID, reply, username) => {
  try {
    let newReply = {
      commentID: commentID,
      replyContent: reply,
      replyUser: username,
      upvotedBy: [],
      downvotedBy: [],
    };
    await addReplyToDatabase(newReply);
    const replies = await getReplies(commentID);
    return replies;
  } catch (error) {
    console.error(error);
  }
};

export const checkIfUserUpvotedComment = (comment, userID) => {
  if (comment && comment.upvotedBy) {
    return comment.upvotedBy.includes(userID);
  }
  return false;
};

export const checkIfUserDownvotedComment = (comment, userID) => {
  if (comment && comment.downvotedBy) {
    return comment.downvotedBy.includes(userID);
  }
  return false;
};

export const refreshComments = async (postID, setComments) => {
  const updatedComments = await getComments(postID);
  setComments(updatedComments);
};

export const refreshReplies = async (comments, setReplies) => {
  const updatedReplies = await Promise.all(
    comments.map((comment) => getReplies(comment.id))
  );
  setReplies(updatedReplies.flat());
};
