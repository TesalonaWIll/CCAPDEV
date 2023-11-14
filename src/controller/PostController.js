// PostController.js
import { fetchPostsFromDatabase } from "../Model/PostModel";

export const getPosts = async () => {
  try {
    const posts = await fetchPostsFromDatabase();
    return posts;
  } catch (error) {
    console.error(error);
    return [];
  }
};
