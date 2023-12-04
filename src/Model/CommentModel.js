import { db } from "./firebase";
import { doc, getDocs, updateDoc, deleteDoc, collection, addDoc, query, where, arrayRemove } from "firebase/firestore";

export class Comment {
  constructor({ commentContent = "", commentUser = "", upvotedBy = [], downvotedBy = [], postID = "", replies = [], id = "" }) {
    this.commentContent = commentContent;
    this.commentUser = commentUser;
    this.upvotedBy = upvotedBy;
    this.downvotedBy = downvotedBy;
    this.postID = postID;
    this.replies = replies;
    this.id = id;
  }

  static async fetchCommentsFromDatabase(postID) {
    const commentsCollectionRef = collection(db, "comments");
    const q = query(commentsCollectionRef, where("postID", "==", postID));
    const data = await getDocs(q);
    return data.docs.map(
      (doc) =>
        new Comment({
          ...doc.data(),
          id: doc.id,
        })
    );
  }

  static async getCommentById(comments, id) {
    return comments.find((comment) => comment.id === id);
  }

  static async fetchRepliesFromDatabase(commentID) {
    const repliesCollectionRef = collection(db, "replies");
    const q = query(repliesCollectionRef, where("commentID", "==", commentID));
    const data = await getDocs(q);
    return data.docs.map(
      (doc) =>
        new Reply({
          ...doc.data(),
          id: doc.id,
        })
    );
  }

  static async handleCommentSubmit(postID, username, commentText) {
    let comment = new Comment({
      postID: postID,
      commentContent: commentText,
      commentUser: username,
      upvotedBy: [],
      downvotedBy: [],
    });
    await comment.create();
    await this.addCommentsToPosts(postID);
    const comments = await this.fetchCommentsFromDatabase(postID);
    return comments;
  }

  static async addCommentsToPosts(postID) {
    const commentsCollectionRef = collection(db, "comments");
    const q = query(commentsCollectionRef, where("postID", "==", postID));
    const querySnapshot = await getDocs(q);
    const postComments = querySnapshot.docs.map((doc) => doc.id);

    const postRef = doc(db, "posts", postID);
    await updateDoc(postRef, { comments: postComments });
  }

  static async deleteCommentFromDatabase(commentID) {
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
  }

  async create() {
    const commentRef = collection(db, "comments");
    const docRef = await addDoc(commentRef, {
      commentContent: this.commentContent,
      commentUser: this.commentUser,
      upvotedBy: this.upvotedBy,
      downvotedBy: this.downvotedBy,
      postID: this.postID,
      replies: this.replies,
    });
    this.id = docRef.id;
  }

  async save(fieldsToUpdate) {
    const commentRef = doc(db, "comments", this.id);
    await updateDoc(commentRef, fieldsToUpdate);
  }

  static async handleEditComment(comment, editedComment) {
    try {
      await comment.save({ commentContent: editedComment });
    } catch (error) {
      console.error(error);
    }
  }

  async updateComment(newContent) {
    this.commentContent = newContent;
    await this.save({ commentContent: this.commentContent });
  }

  async updateCommentVotes(upvotedBy, downvotedBy) {
    this.upvotedBy = upvotedBy;
    this.downvotedBy = downvotedBy;
    await this.save({
      upvotedBy: this.upvotedBy,
      downvotedBy: this.downvotedBy,
    });
  }

  async deleteComment() {
    const commentRef = doc(db, "comments", this.id);
    await deleteDoc(commentRef);
  }

  static async handleUpvoteComment(comment, userID) {
    if (!this.checkIfUserUpvotedComment(comment, userID)) {
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
    await comment.save({
      upvotedBy: comment.upvotedBy,
      downvotedBy: comment.downvotedBy,
    });
  }

  static async handleDownvoteComment(comment, userID) {
    if (!this.checkIfUserDownvotedComment(comment, userID)) {
      comment.downvotedBy.push(userID);
      const index = comment.upvotedBy.indexOf(userID);
      if (index > -1) {
        comment.upvotedBy.splice(index, 1);
      }
    } else {
      const index = comment.downvotedBy.indexOf(userID);
      if (index > -1) {
        comment.downvotedBy.splice(index, 1);
      }
    }
    await comment.save({
      upvotedBy: comment.upvotedBy,
      downvotedBy: comment.downvotedBy,
    });
  }

  static checkIfUserUpvotedComment(comment, userID) {
    if (comment && comment.upvotedBy) {
      return comment.upvotedBy.includes(userID);
    }
    return false;
  }

  static checkIfUserDownvotedComment(comment, userID) {
    if (comment && comment.downvotedBy) {
      return comment.downvotedBy.includes(userID);
    }
    return false;
  }
}

export class Reply {
  constructor({ replyContent, replyUser, upvotedBy, downvotedBy, commentID, replies, id }) {
    this.replyContent = replyContent;
    this.replyUser = replyUser;
    this.upvotedBy = upvotedBy;
    this.downvotedBy = downvotedBy;
    this.commentID = commentID;
    this.replies = replies;
    this.id = id;
  }

  static async fetchRepliesFromDatabase(commentID) {
    const repliesCollectionRef = collection(db, "replies");
    const q = query(repliesCollectionRef, where("commentID", "==", commentID));
    const data = await getDocs(q);
    return data.docs.map(
      (doc) =>
        new Reply({
          ...doc.data(),
          id: doc.id,
        })
    );
  }

  static async fetchReplyFromDatabase(replyID) {
    const repliesCollectionRef = collection(db, "replies");
    const q = query(repliesCollectionRef, where("id", "==", replyID));
    const data = await getDocs(q);
    const replies = data.docs.map(
      (doc) =>
        new Reply({
          ...doc.data(),
          id: doc.id,
        })
    );
    return replies[0];
  }

  static async getReplyById(replies, id) {
    return replies.find((reply) => reply.id === id);
  }

  static async handleAddReply(commentID, reply, username) {
    let newReply = {
      commentID: commentID,
      replyContent: reply,
      replyUser: username,
      upvotedBy: [],
      downvotedBy: [],
    };
    await this.addReplyToDatabase(newReply);
    const replies = await this.fetchRepliesFromDatabase(commentID);
    return replies;
  }

  static async handleEditReply(replyID, editedReply) {
    try {
      await this.updateReplyInDatabase(replyID, editedReply);
    } catch (error) {
      console.error(error);
    }
  }

  static async updateReplyVotesInDatabase(reply) {
    const repliesCollectionRef = collection(db, "replies");
    const replyDoc = doc(repliesCollectionRef, reply.id);

    const updatedReply = {
      upvotedBy: Array.isArray(reply.upvotedBy) ? reply.upvotedBy : [],
      downvotedBy: Array.isArray(reply.downvotedBy) ? reply.downvotedBy : [],
    };

    await updateDoc(replyDoc, updatedReply);
  }

  static async deleteReplyFromDatabase(replyID) {
    const repliesCollectionRef = collection(db, "replies");
    const replyDoc = doc(repliesCollectionRef, replyID);
    await deleteDoc(replyDoc);

    const commentsCollectionRef = collection(db, "comments");
    const commentSnapshot = await getDocs(commentsCollectionRef);
    commentSnapshot.forEach(async (commentDoc) => {
      const commentData = commentDoc.data();
      if (commentData.replies && commentData.replies.includes(replyID)) {
        const commentRef = doc(db, "comments", commentDoc.id);
        await updateDoc(commentRef, { replies: arrayRemove(replyID) });
      }
    });
  }

  static async addReplyToDatabase(newReply) {
    const repliesCollectionRef = collection(db, "replies");
    await addDoc(repliesCollectionRef, newReply);
  }

  static async updateReplyInDatabase(replyID, editedReply) {
    const repliesRef = doc(db, "replies", replyID);
    await updateDoc(repliesRef, { replyContent: editedReply });
    window.location.reload();
  }

  static checkIfUserUpvotedReply(reply, userID) {
    if (reply && reply.upvotedBy) {
      return reply.upvotedBy.includes(userID);
    }
    return false;
  }

  static checkIfUserDownvotedReply(reply, userID) {
    if (reply && reply.downvotedBy) {
      return reply.downvotedBy.includes(userID);
    }
    return false;
  }

  static async handleUpvoteReply(commentID, replyID, userID) {
    let replies = await this.fetchRepliesFromDatabase(commentID);
    for (let reply of replies) {
      if (reply.id === replyID) {
        if (!this.checkIfUserUpvotedReply(reply, userID)) {
          reply.upvotedBy.push(userID);
          const index = reply.downvotedBy.indexOf(userID);
          if (index > -1) {
            reply.downvotedBy.splice(index, 1);
          }
        } else {
          const index = reply.upvotedBy.indexOf(userID);
          if (index > -1) {
            reply.upvotedBy.splice(index, 1);
          }
        }
        await this.updateReplyVotesInDatabase(reply);
      }
    }
    replies = await this.fetchRepliesFromDatabase(commentID);
    return replies;
  }

  static async handleDownvoteReply(commentID, replyID, userID) {
    let replies = await this.fetchRepliesFromDatabase(commentID);
    for (let reply of replies) {
      if (reply.id === replyID) {
        if (!this.checkIfUserDownvotedReply(reply, userID)) {
          reply.downvotedBy.push(userID);
          const index = reply.upvotedBy.indexOf(userID);
          if (index > -1) {
            reply.upvotedBy.splice(index, 1);
          }
        } else {
          const index = reply.downvotedBy.indexOf(userID);
          if (index > -1) {
            reply.downvotedBy.splice(index, 1);
          }
        }
        await this.updateReplyVotesInDatabase(reply);
      }
    }
    replies = await this.fetchRepliesFromDatabase(commentID);
    return replies;
  }
}
