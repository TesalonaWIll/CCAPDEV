import {
  fetchUserFromDatabase,
  fetchPostsFromDatabase,
  fetchCommentsFromDatabase,
} from "../Model/PostModel";
import {
  addPostToDatabase,
  addCommentToDatabase,
  updatePostInDatabase,
  updateCommentInDatabase,
} from "../Model/PostModel";

export const getUser = async (userID) => {
  try {
    const user = await fetchUserFromDatabase(userID);
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getPosts = async () => {
  try {
    const posts = await fetchPostsFromDatabase();
    return posts;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getCurrentPost = async (postID) => {
  try {
    const posts = await fetchPostsFromDatabase();
    const currentPost = posts.find((post) => post.id === postID);
    return currentPost;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const getComments = async (postID) => {
  try {
    const comments = await fetchCommentsFromDatabase(postID);
    return comments;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addPost = async (post) => {
  try {
    await addPostToDatabase(post);
  } catch (error) {
    console.error(error);
  }
};

export const addComment = async (comment, postID) => {
  try {
    await addCommentToDatabase(comment, postID);
  } catch (error) {
    console.error(error);
  }
};

export const updatePost = async (post) => {
  try {
    await updatePostInDatabase(post);
  } catch (error) {
    console.error(error);
  }
};

export const handleUpvote = async (postID, userID) => {
  try {
    let posts = await getPosts();
    posts.map((post) => {
      if (post.id === postID) {
        post.upvoted = !post.upvoted;
        post.downvoted = false;
        post.upvotedBy.push(userID) && post.downvotedBy.pop(userID);
        updatePostInDatabase(this.post);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export const handleDownvote = async (postID, userID) => {
  try {
    let posts = await getPosts();
    posts.map((post) => {
      if (post.id === postID) {
        post.downvoted = !post.downvoted;
        post.upvoted = false;
        post.downvotedBy.push(userID) && post.upvotedBy.pop(userID);
        updatePostInDatabase(this.post);
      }
    });
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

export const handleCommentChange = (event, setCommentText) => {
  setCommentText(event.target.value);
  console.log(event.target.value);
};

export const handleCommentSubmit = (
  postID,
  setCommentText,
) => {
  addCommentToDatabase(setCommentText, postID);
  setCommentText("");
};
