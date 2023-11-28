import { Post } from "../Model/PostModel";
import { getComments } from "./CommentController";
import { addPostsToUser } from "./UserController";

export const getPosts = async () => {
  try {
    const posts = await Post.fetchPostsFromDatabase();
    return posts;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getCurrentPost = async (postID) => {
  try {
    const posts = await Post.fetchPostsFromDatabase();
    const currentPost = posts.find((post) => post.id === postID);
    return currentPost;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const getPostById = (posts, id) => {
  return Post.getPostById(posts, id);
};

export const addPost = async (postTitle, postText, username, userID) => {
  try {
    const post = Post.createPost(postTitle, postText, username);
    await Post.addPostToDatabase(post, userID);
    await addPostsToUser(username, userID);
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

export const sortPosts = (posts) => {
  return Post.sortPosts(posts);
};

export const deletePost = async (postID) => {
  try {
    await Post.deletePostFromDatabase(postID);
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

export const handleUpvote = async (postID, userID, caller) => {
  try {
    let posts = await getPosts();
    let updatedPost;
    for (let post of posts) {
      if (post.id === postID) {
        post = Post.handleUpvote(post, userID);
        await Post.updatePostVotesInDatabase(post);
        updatedPost = post;
      }
    }
    return caller === "ViewPost" ? updatedPost : await getPosts();
  } catch (error) {
    console.error(error);
  }
};

export const handleDownvote = async (postID, userID, caller) => {
  try {
    let posts = await getPosts();
    let updatedPost;
    for (let post of posts) {
      if (post.id === postID) {
        post = Post.handleDownvote(post, userID);
        await Post.updatePostVotesInDatabase(post);
        updatedPost = post;
      }
    }
    return caller === "ViewPost" ? updatedPost : await getPosts();
  } catch (error) {
    console.error(error);
  }
};

export const checkIfUserUpvoted = (post, userID) => {
  return Post.checkIfUserUpvoted(post, userID);
};

export const checkIfUserDownvoted = (post, userID) => {
  return Post.checkIfUserDownvoted(post, userID);
};

export const goToViewPost = async (post, navigate) => {
  try {
    const comments = await getComments(post.id);
    navigate(`/view-post/${post.id}`, { state: { post, comments } });
  } catch (error) {
    console.error(error);
  }
};

export const handlePostSearch = async (searchTerm, navigate) => {
  try {
    let posts = await getPosts();
    let searchedPosts = Post.handlePostSearch(posts, searchTerm);
    navigate("/searchpost", { state: { searchedPosts } });
  } catch (error) {
    console.error(error);
  }
};

export const handlePostEdit = async (post, newContent) => {
  try {
    await Post.updatePostContentInDatabase(post.id, newContent);
  } catch (error) {
    console.error(error);
  }
};

export const refreshPosts = async (setPosts, setSortedPosts) => {
  const updatedPosts = await getPosts();
  setPosts(updatedPosts);
  setSortedPosts(sortPosts(updatedPosts));
};

export const refreshPost = async (postID, setCurrentPost) => {
  const updatedPost = await getCurrentPost(postID);
  setCurrentPost(updatedPost);
};
