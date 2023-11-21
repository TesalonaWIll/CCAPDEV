import {
  fetchPostsFromDatabase,
  updatePostContentInDatabase,
} from "../Model/PostModel";
import {
  addPostToDatabase,
  updatePostVotesInDatabase,
  deletePostFromDatabase,
} from "../Model/PostModel";
import { getComments } from "./CommentController";

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
      upvotedBy: [],
      downvotedBy: [],
    };
    await addPostToDatabase(post, userID);
  } catch (error) {
    console.error(error);
  }
};

export const sortPosts = (posts) => {
  return [...posts].sort(
    (a, b) =>
      b.upvotedBy.length -
      b.downvotedBy.length +
      b.comments.length -
      (a.upvotedBy.length - a.downvotedBy.length + a.comments.length)
  );
};

export const deletePost = async (postID) => {
  try {
    console.log("deleting");
    await deletePostFromDatabase(postID);
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
        if (!checkIfUserUpvoted(post, userID)) {
          post.upvotedBy.push(userID);
          const index = post.downvotedBy.indexOf(userID);
          if (index > -1) {
            post.downvotedBy.splice(index, 1);
          }
        } else {
          const index = post.upvotedBy.indexOf(userID);
          if (index > -1) {
            post.upvotedBy.splice(index, 1);
          }
        }
        await updatePostVotesInDatabase(post);
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
        if (!checkIfUserDownvoted(post, userID)) {
          post.downvotedBy.push(userID);
          const index = post.upvotedBy.indexOf(userID);
          if (index > -1) {
            post.upvotedBy.splice(index, 1);
          }
        } else {
          const index = post.downvotedBy.indexOf(userID);
          if (index > -1) {
            post.downvotedBy.splice(index, 1);
          }
        }
        await updatePostVotesInDatabase(post);
        updatedPost = post;
      }
    }
    return caller === "ViewPost" ? updatedPost : await getPosts();
  } catch (error) {
    console.error(error);
  }
};

export const checkIfUserUpvoted = (post, userID) => {
  return post.upvotedBy ? post.upvotedBy.includes(userID) : false;
};

export const checkIfUserDownvoted = (post, userID) => {
  return post.downvotedBy ? post.downvotedBy.includes(userID) : false;
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

export const refreshPosts = async (setPosts, setSortedPosts) => {
  const updatedPosts = await getPosts();
  setPosts(updatedPosts);
  setSortedPosts(sortPosts(updatedPosts));
};

export const refreshPost = async (postID, setCurrentPost) => {
  const updatedPost = await getCurrentPost(postID);
  setCurrentPost(updatedPost);
};
