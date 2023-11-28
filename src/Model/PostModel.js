import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

export class Post {
  constructor({ postTitle, postContent, postUser, postTime, upvotedBy, downvotedBy, comments, id }) {
    this.postTitle = postTitle;
    this.postContent = postContent;
    this.postUser = postUser;
    this.postTime = postTime;
    this.upvotedBy = upvotedBy;
    this.downvotedBy = downvotedBy;
    this.comments = comments;
    this.id = id;
  }

  static createPost(postTitle, postText, username) {
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
    return post;
  }

  static async fetchPostsFromDatabase() {
    const postsCollectionRef = collection(db, "posts");
    const data = await getDocs(postsCollectionRef);

    const posts = data.docs.map(
      (doc) =>
        new Post({
          ...doc.data(),
          id: doc.id,
          postTime: doc.data().postTime.toDate().toDateString(),
        })
    );
    return posts;
  }

  static getPostById(posts, id) {
    return posts.find((post) => post.id === id);
  }

  static async addPostToDatabase(post) {
    const postsCollectionRef = collection(db, "posts");
    await addDoc(postsCollectionRef, post);
  }

  static async updatePostContentInDatabase(postID, newContent) {
    const postRef = doc(db, "posts", postID);
    await updateDoc(postRef, { postContent: newContent });
  }

  static async updatePostVotesInDatabase(post) {
    const postsCollectionRef = collection(db, "posts");
    const postDoc = doc(postsCollectionRef, post.id);

    const updatedPost = {
      upvotedBy: Array.isArray(post.upvotedBy) ? post.upvotedBy : [],
      downvotedBy: Array.isArray(post.downvotedBy) ? post.downvotedBy : [],
    };

    await updateDoc(postDoc, updatedPost);
  }

  static async deletePostFromDatabase(postID) {
    const postsCollectionRef = collection(db, "posts");
    const postDoc = doc(postsCollectionRef, postID);
    await deleteDoc(postDoc);
  }

  static sortPosts(posts) {
    return [...posts].sort(
      (a, b) => b.upvotedBy.length - b.downvotedBy.length + b.comments.length - (a.upvotedBy.length - a.downvotedBy.length + a.comments.length)
    );
  }

  static checkIfUserUpvoted(post, userID) {
    return post.upvotedBy ? post.upvotedBy.includes(userID) : false;
  }

  static checkIfUserDownvoted(post, userID) {
    return post.downvotedBy ? post.downvotedBy.includes(userID) : false;
  }

  static handleUpvote(post, userID) {
    if (!this.checkIfUserUpvoted(post, userID)) {
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
    return post;
  }

  static handleDownvote(post, userID) {
    if (!this.checkIfUserDownvoted(post, userID)) {
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
    return post;
  }

  static handlePostSearch(posts, searchTerm) {
    return posts.filter((post) => {
      return post.postTitle.toLowerCase().includes(searchTerm.toLowerCase()) || post.postContent.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }
}
