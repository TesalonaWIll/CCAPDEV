import {
  fetchPostsFromDatabase,
  updatePostContentInDatabase,
} from "../Model/PostModel";
import {
  addPostToDatabase,
  updatePostInDatabase,
  deletePostFromDatabase,
} from "../Model/PostModel";
import { useCurrentUser } from "./AuthController";

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

export const addPost = async (postTitle, postText, username, userID) => {
  try {
    const postTime = new Date();
    const post = {
      postTitle: postTitle,
      postContent: postText,
      postUser: username,
      postTime: postTime,
      comments: [],
      downvoted: false,
      upvoted: false,
      upvotedBy: [],
      downvotedBy: [],
    };
    console.log(post, username);
    await addPostToDatabase(post, userID);
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

export const deletePost = async (postID) => {
  try {
    console.log("deleting");
    await deletePostFromDatabase(postID);
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

export const handlePostSearch = async (searchTerm, navigate) => {
  try {
    let posts = await getPosts();
    let searchedPosts = posts.filter((post) => {
      return (
        post.postTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.postContent.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    navigate("/searchpost", { state: { searchedPosts } });
  } catch (error) {
    console.error(error);
  }
};

export const handlePostEdit = async (post, newContent) => {
  try {
    console.log("editing");
    await updatePostContentInDatabase(post.id, newContent);
  } catch (error) {
    console.error(error);
  }
};
