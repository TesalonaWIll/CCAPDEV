import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  getCurrentPost,
  handleUpvote,
  handleDownvote,
  checkIfUserUpvoted,
  checkIfUserDownvoted,
  refreshPost,
} from "../controller/PostController";
import {
  handleEditComment,
  handleUpvoteComment,
  handleDownvoteComment,
  handleCommentSubmit,
  handleAddReply,
  deleteComment,
  checkIfUserUpvotedComment,
  checkIfUserDownvotedComment,
  refreshComments,
  refreshReplies,
} from "../controller/CommentController";

const ViewPost = ({ user, username }) => {
  const location = useLocation();
  const post = location.state ? location.state.post : null;
  const commentsLocation = location.state ? location.state.comments : [];
  const commentRef = useRef(null);
  const [currentPost, setCurrentPost] = useState(null);
  const [comments, setComments] = useState([...commentsLocation]);
  const [replies, setReplies] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [commentText, setCommentText] = useState("");
  const [reply, setReply] = useState(null);
  const [replyId, setReplyId] = useState(null);

  useEffect(() => {
    if (post) {
      refreshPost(post.id, setCurrentPost);
    }
  }, [post]);
  useEffect(() => {
    if (post) {
      refreshComments(post.id, setComments);
    }
  }, [post]);
  useEffect(() => {
    if (comments && comments.length > 0) {
      refreshReplies(comments, setReplies);
    }
  }, [comments]);

  if (!user || !username || !currentPost) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container-fluid">
      <div className="row px-5">
        <div className="col-2"></div>

        <div className="col-8">
          <div className="view-container">
            <div className="view-post">
              <div className="row">
                <div className="col-1 spritesheet user-profile"></div>
                <div className="col my-auto">
                  <div className="d-flex justify-content-between">
                    <div className="row post-title">
                      {currentPost.postTitle}
                    </div>
                  </div>
                  <div className="row post-user">@{currentPost.postUser}</div>
                </div>
              </div>

              {/* <div
                  id="post-categories"
                  className="d-flex justify-content-start mt-3"
                >
                  <div className="category">Games</div>
                  <div className="category">CS2</div>
                </div> */}

              <div className="view-content">{currentPost.postContent}</div>

              <div className="d-flex justify-content-between mt-4">
                <div className="d-flex">
                  <div
                    className={`spritesheet upvote${
                      checkIfUserUpvoted(currentPost, user.uid) ? " active" : ""
                    }`}
                    onClick={async () => {
                      const updatedPosts = await handleUpvote(
                        currentPost.id,
                        user.uid,
                        "ViewPost"
                      );
                      setCurrentPost(updatedPosts);
                    }}
                  ></div>

                  <div
                    className={`spritesheet downvote${
                      checkIfUserDownvoted(currentPost, user.uid)
                        ? " active"
                        : ""
                    }`}
                    onClick={async () => {
                      const updatedPosts = await handleDownvote(
                        currentPost.id,
                        user.uid,
                        "ViewPost"
                      );
                      setCurrentPost(updatedPosts);
                    }}
                  ></div>
                  <div className="comment-link">{currentPost.commentLink}</div>
                </div>
                <div className="post-time">{currentPost.postTime}</div>
              </div>
            </div>

            <div className="view-write">
              <div className="row">
                <div className="col-1 spritesheet user-profile"></div>
                <div className="col my-auto"></div>
              </div>
              <textarea
                className="view-reply"
                type="text"
                placeholder="Post a reply..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              ></textarea>
              <button
                className="view-button"
                onClick={async () => {
                  const updatedComments = await handleCommentSubmit(
                    currentPost.id,
                    username,
                    commentText
                  );
                  setComments(updatedComments);
                }}
              >
                Comment
              </button>
            </div>

            <div className="view-separator">
              <div className="view-filter">Comments</div>
              <div className="view-line-break flex-fill"></div>
            </div>
            {comments &&
              comments.map((comment) => (
                <div className="view-comments" key={comment.id}>
                  <div className="row">
                    <div className="col-1 spritesheet user-profile"></div>
                    <div className="col my-auto">
                      <div className="d-flex justify-content-between">
                        <div className="row view-username">
                          @{comment.commentUser}
                        </div>
                        <div className="dropdown">
                          <button
                            className="btn spritesheet edit-post"
                            type="button"
                            id="edit-post-icon"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          ></button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="change-post"
                          >
                            <li>
                              <div
                                className="dropdown-item d-flex align-items-center p-2"
                                onClick={() => setEditingCommentId(comment.id)}
                              >
                                <div className="spritesheet edit-icon me-3"></div>
                                Edit
                              </div>
                            </li>
                            <li>
                              <div
                                className="dropdown-item d-flex align-items-center p-2"
                                onClick={async () => {
                                  const updatedComment = await deleteComment(
                                    currentPost.id,
                                    comment.id
                                  );
                                  setComments(updatedComment);
                                }}
                              >
                                <div className="spritesheet delete-icon me-3"></div>
                                Delete
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div
                        className="row view-comment-content"
                        ref={commentRef}
                      >
                        {editingCommentId === comment.id ? (
                          <div className="view-edit-comment">
                            <textarea
                              className="view-edit-comment"
                              type="text"
                              placeholder="Edit your comment..."
                              value={editedComment}
                              onChange={(e) => setEditedComment(e.target.value)}
                            ></textarea>
                            <button
                              className="view-button"
                              onClick={() => {
                                handleEditComment(comment.id, editedComment);
                                setEditingCommentId(null);
                              }}
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <div> {comment.commentContent}</div>
                        )}
                      </div>
                      <div className="d-flex justify-content-between mt-3">
                        <div className="d-flex">
                          <div
                            className={`spritesheet upvote${
                              checkIfUserUpvotedComment(comment, user.uid)
                                ? " active"
                                : ""
                            }`}
                            onClick={async () => {
                              const updatedComments = await handleUpvoteComment(
                                currentPost.id,
                                comment.id,
                                user.uid
                              );
                              setComments(updatedComments);
                            }}
                          ></div>

                          <div
                            className={`spritesheet downvote${
                              checkIfUserDownvotedComment(comment, user.uid)
                                ? " active"
                                : ""
                            }`}
                            onClick={async () => {
                              const updatedComments =
                                await handleDownvoteComment(
                                  currentPost.id,
                                  comment.id,
                                  user.uid
                                );
                              setComments(updatedComments);
                            }}
                          ></div>
                          <a
                            onClick={() => setReplyId(comment.id)}
                            className="comment-link"
                          >
                            Reply
                          </a>
                          {replyId === comment.id && (
                            <form
                              onSubmit={async (e) => {
                                e.preventDefault();
                                const updatedReplies = await handleAddReply(
                                  comment.id,
                                  e.target.elements.replyText.value,
                                  username
                                );
                                setReplies(updatedReplies);
                                setReplyId(null);
                              }}
                            >
                              <input
                                name="replyText"
                                type="text"
                                placeholder="Type your reply..."
                              />
                              <button type="submit">Submit</button>
                            </form>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* FIX SUBCOMMENTS */}

                  {replies
                    .filter((reply) => {
                      return reply.commentID === comment.id;
                    })
                    .map((filteredReplies) => {
                      console.log("here");
                      console.log(filteredReplies);
                      return (
                        <div className="view-comments" key={filteredReplies.id}>
                          <div className="row">
                            <div className="col-1 spritesheet user-profile"></div>
                            <div className="col my-auto">
                              <div className="d-flex justify-content-between">
                                <div className="row view-username">
                                  @{filteredReplies.replyUser}
                                </div>
                                <p>{filteredReplies.replyContent}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                  {/* FIX SUBCOMMENTS */}
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="col-2"></div>
    </div>
  );
};

export default ViewPost;
