import { Comment, Reply } from "../Model/CommentModel";

export const getComments = async (postID) => {
  try {
    const comments = await Comment.fetchCommentsFromDatabase(postID);
    return comments;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getReplies = async (commentID) => {
  try {
    const replies = await Reply.fetchRepliesFromDatabase(commentID);
    return replies;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteComment = async (postID, commentID) => {
  try {
    console.log("deleting");
    await Comment.deleteCommentFromDatabase(commentID);
    const comments = await getComments(postID);
    return comments;
  } catch (error) {
    console.error(error);
  }
};

export const deleteReply = async (commentID, replyID) => {
  try {
    console.log("deleting");
    await Reply.deleteReplyFromDatabase(replyID);
    const replies = await getReplies(commentID);
    return replies;
  } catch (error) {
    console.error(error);
  }
};

export const handleCommentSubmit = async (postID, username, commentText) => {
  try {
    const comments = await Comment.handleCommentSubmit(postID, username, commentText);
    return comments;
  } catch (error) {
    console.error(error);
  }
};

export const handleEditComment = async (comment, editedComment) => {
  try {
    await Comment.handleEditComment(comment, editedComment);
  } catch (error) {
    console.error(error);
  }
};

export const handleEditReply = async (replyID, editedReply) => {
  try {
    await Reply.handleEditReply(replyID, editedReply);
  } catch (error) {
    console.error(error);
  }
};

export const handleUpvoteComment = async (postID, commentID, userID) => {
  try {
    let comments = await getComments(postID);
    for (let comment of comments) {
      if (comment.id === commentID) {
        await Comment.handleUpvoteComment(comment, userID);
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
        await Comment.handleDownvoteComment(comment, userID);
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
    const replies = await Reply.handleAddReply(commentID, reply, username);
    console.log(replies);
    return replies;
  } catch (error) {
    console.error(error);
  }
};

export const handleUpvoteReply = async (commentID, replyID, userID) => {
  try {
    const replies = await Reply.handleUpvoteReply(commentID, replyID, userID);
    return replies;
  } catch (error) {
    console.error(error);
  }
};

export const handleDownvoteReply = async (commentID, replyID, userID) => {
  try {
    const replies = await Reply.handleDownvoteReply(commentID, replyID, userID);
    return replies;
  } catch (error) {
    console.error(error);
  }
};

export const checkIfUserUpvotedComment = (comment, userID) => {
  return Comment.checkIfUserUpvotedComment(comment, userID);
};

export const checkIfUserDownvotedComment = (comment, userID) => {
  return Comment.checkIfUserDownvotedComment(comment, userID);
};

export const checkIfUserUpvotedReply = (reply, userID) => {
  return Reply.checkIfUserUpvotedReply(reply, userID);
};

export const checkIfUserDownvotedReply = (reply, userID) => {
  return Reply.checkIfUserDownvotedReply(reply, userID);
};

export const refreshComments = async (postID, setComments) => {
  const updatedComments = await getComments(postID);
  setComments(updatedComments);
};

export const refreshReplies = async (comments, setReplies) => {
  const updatedReplies = await Promise.all(comments.map((comment) => getReplies(comment.id)));
  setReplies(updatedReplies.flat());
};
