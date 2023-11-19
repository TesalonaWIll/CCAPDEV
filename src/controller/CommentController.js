import {
  fetchCommentsFromDatabase,
  addCommentToDatabase,
  updateCommentInDatabase,
  deleteCommentFromDatabase,
  addCommentsToPosts,
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

export const deleteComment = async (commentID) => {
  try {
    console.log("deleting");
    await deleteCommentFromDatabase(commentID);
  } catch (error) {
    console.error(error);
  }
};

export const handleCommentSubmit = async (postID, username, commentText) => {
  try {
    const comment = {
      postID: postID,
      commentContent: commentText,
      commentUser: username,
      upvoted: false,
      downvoted: false,
      upvotedBy: [],
      downvotedBy: [],
    };
    await addCommentToDatabase(comment);
    await addCommentsToPosts(postID);
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

export const handleUpvoteComment = async (commentID, userID) => {
  try {
    let comments = await getComments();
    comments.map((comment) => {
      if (comment.id === commentID) {
        comment.upvoted = !comment.upvoted;
        comment.downvoted = false;
        comment.upvotedBy.push(userID) && comment.downvotedBy.pop(userID);
        updateCommentInDatabase(this.comment);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export const handleDownvoteComment = async (commentID, userID) => {
  try {
    let comments = await getComments();
    comments.map((comment) => {
      if (comment.id === commentID) {
        comment.downvoted = !comment.downvoted;
        comment.upvoted = false;
        comment.downvotedBy.push(userID) && comment.upvotedBy.pop(userID);
        updateCommentInDatabase(this.comment);
      }
    });
  } catch (error) {
    console.error(error);
  }
};
