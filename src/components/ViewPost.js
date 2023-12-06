import { useState, useRef, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { handleUpvote, handleDownvote, checkIfUserUpvoted, checkIfUserDownvoted, refreshPost } from "../controller/PostController";
import {
  handleEditComment,
  handleUpvoteComment,
  handleDownvoteComment,
  handleCommentSubmit,
  handleUpvoteReply,
  handleDownvoteReply,
  handleAddReply,
  handleEditReply,
  checkIfUserUpvotedComment,
  checkIfUserDownvotedComment,
  checkIfUserUpvotedReply,
  checkIfUserDownvotedReply,
  deleteComment,
  deleteReply,
  refreshComments,
  refreshReplies,
} from "../controller/CommentController";

const ViewPost = ({ user, username }) => {
  const { id } = useParams();
  const location = useLocation();
  const post = location.state ? location.state.post : null;
  const commentsLocation = location.state ? location.state.comments : [];
  const commentRef = useRef(null);
  const [currentPost, setCurrentPost] = useState(null);
  const [comments, setComments] = useState([...commentsLocation]);
  const [replies, setReplies] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState();
  const [commentText, setCommentText] = useState("");
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [editedReply, setEditedReply] = useState("");
  const [replyId, setReplyId] = useState(null);

  useEffect(() => {
    if (post) {
      refreshPost(post.id, setCurrentPost);
    }
  }, [post]);
  useEffect(() => {
    refreshPost(id, setCurrentPost);
  }, [id]);
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
    return <div className="center">Loading...</div>;
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
                    <div className="row post-title">{currentPost.postTitle}</div>
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
                    className={`spritesheet upvote${checkIfUserUpvoted(currentPost, user.uid) ? " active" : ""}`}
                    onClick={async () => {
                      const updatedPosts = await handleUpvote(currentPost.id, user.uid, "ViewPost");
                      setCurrentPost(updatedPosts);
                    }}
                  ></div>

                  <div
                    className={`spritesheet downvote${checkIfUserDownvoted(currentPost, user.uid) ? " active" : ""}`}
                    onClick={async () => {
                      const updatedPosts = await handleDownvote(currentPost.id, user.uid, "ViewPost");
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
                  const updatedComments = await handleCommentSubmit(currentPost.id, username, commentText);
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
                        <div className="row view-username">@{comment.commentUser}</div>
                        <div className="dropdown">
                          {comment.commentUser === username ? (
                            <button
                              className="btn spritesheet edit-post"
                              type="button"
                              id="edit-post-icon"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            ></button>
                          ) : null}
                          <ul className="dropdown-menu" aria-labelledby="change-post">
                            <li>
                              <div
                                className="dropdown-item d-flex align-items-center p-2"
                                onClick={() => {
                                  setEditingCommentId(comment.id);
                                  setEditedComment(comment.commentContent);
                                }}
                              >
                                <div className="spritesheet edit-icon me-3"></div>
                                Edit
                              </div>
                            </li>
                            <li>
                              <div
                                className="dropdown-item d-flex align-items-center p-2"
                                onClick={async () => {
                                  const updatedComment = await deleteComment(currentPost.id, comments, comment.id, username);
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
                      <div className="row view-comment-content" ref={commentRef}>
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
                              onClick={async () => {
                                await handleEditComment(comment, editedComment);
                                setEditingCommentId(null);
                                setEditedComment(comment.commentContent);
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
                            className={`spritesheet upvote${checkIfUserUpvotedComment(comment, user.uid) ? " active" : ""}`}
                            onClick={async () => {
                              const updatedComments = await handleUpvoteComment(currentPost.id, comment.id, user.uid);
                              setComments(updatedComments);
                            }}
                          ></div>

                          <div
                            className={`spritesheet downvote${checkIfUserDownvotedComment(comment, user.uid) ? " active" : ""}`}
                            onClick={async () => {
                              const updatedComments = await handleDownvoteComment(currentPost.id, comment.id, user.uid);
                              setComments(updatedComments);
                            }}
                          ></div>
                          <button onClick={() => setReplyId(comment.id)} className="comment-link no-style-button">
                            Reply
                          </button>
                          {replyId === comment.id && (
                            <form
                              onSubmit={async (e) => {
                                e.preventDefault();
                                const updatedReplies = await handleAddReply(comment.id, e.target.elements.replyText.value, username);
                                setReplies(updatedReplies);
                                setReplyId(null);
                              }}
                            >
                              <input name="replyText" type="text" placeholder="Type your reply..." />
                              <button type="submit">Submit</button>
                            </form>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {replies
                    .filter((reply) => {
                      return reply.commentID === comment.id;
                    })
                    .map((filteredReply) => {
                      return (
                        <div className="sub-comment" key={filteredReply.id}>
                          <div className="row">
                            <div className="col-1 spritesheet user-profile"></div>
                            <div className="col my-auto">
                              <div className="d-flex justify-content-between">
                                <div className="row view-username">@{filteredReply.replyUser}</div>
                                <div className="dropdown">
                                  {filteredReply.replyUser === username ? (
                                    <button
                                      className="btn spritesheet edit-post"
                                      type="button"
                                      id="edit-post-icon"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    ></button>
                                  ) : null}
                                  <ul className="dropdown-menu" aria-labelledby="change-post">
                                    <li>
                                      <div
                                        className="dropdown-item d-flex align-items-center p-2"
                                        onClick={() => {
                                          setEditingReplyId(filteredReply.id);
                                          setEditedReply(filteredReply.replyContent);
                                        }}
                                      >
                                        <div className="spritesheet edit-icon me-3"></div>
                                        Edit
                                      </div>
                                    </li>
                                    <li>
                                      <div
                                        className="dropdown-item d-flex align-items-center p-2"
                                        onClick={async () => {
                                          const updatedReplies = await deleteReply(comment.id, replies, filteredReply.id, username);
                                          setReplies(updatedReplies);
                                        }}
                                      >
                                        <div className="spritesheet delete-icon me-3"></div>
                                        Delete
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              {editingReplyId === filteredReply.id ? (
                                <textarea
                                  className="view-edit-reply"
                                  type="text"
                                  placeholder="Edit your reply..."
                                  value={editedReply}
                                  onChange={(e) => setEditedReply(e.target.value)}
                                />
                              ) : (
                                <div className="row view-comment-content">{filteredReply.replyContent}</div>
                              )}
                              {editingReplyId === filteredReply.id && (
                                <button
                                  className="view-button"
                                  onClick={async () => {
                                    await handleEditReply(filteredReply.id, editedReply);
                                    setEditingReplyId(null);
                                    setEditedReply("");
                                  }}
                                >
                                  Save
                                </button>
                              )}
                              <div className="d-flex justify-content-between mt-3">
                                <div className="d-flex">
                                  <div
                                    className={`spritesheet upvote${checkIfUserUpvotedReply(filteredReply, user.uid) ? " active" : ""}`}
                                    onClick={async () => {
                                      const updatedReplies = await handleUpvoteReply(comment.id, filteredReply.id, user.uid);
                                      setReplies(updatedReplies);
                                    }}
                                  ></div>

                                  <div
                                    className={`spritesheet downvote${checkIfUserDownvotedReply(filteredReply, user.uid) ? " active" : ""}`}
                                    onClick={async () => {
                                      const updatedReplies = await handleDownvoteReply(comment.id, filteredReply.id, user.uid);
                                      setReplies(updatedReplies);
                                    }}
                                  ></div>
                                  <button
                                    onClick={() => {
                                      setReplyId(filteredReply.id);
                                    }}
                                    className="comment-link no-style-button"
                                  >
                                    Reply
                                  </button>
                                  {replyId === filteredReply.id && (
                                    <form
                                      onSubmit={async (e) => {
                                        e.preventDefault();
                                        const updatedReplies = await handleAddReply(comment.id, e.target.elements.replyText.value, username);
                                        setReplies(updatedReplies);
                                        setReplyId(null);
                                      }}
                                    >
                                      <input name="replyText" type="text" placeholder="Type your reply..." />
                                      <button type="submit">Submit</button>
                                    </form>
                                  )}
                                </div>
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
