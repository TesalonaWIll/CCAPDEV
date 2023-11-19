import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCurrentPost,
  getComments,
  addComment,
  handleUpvote,
  handleDownvote,
  handleUpvoteComment,
  handleDownvoteComment,
  handleCommentChange,
  handleCommentSubmit,
} from "../controller/PostController";

const ViewPost = () => {
  const { id: postID } = useParams();
  const [currentPost, setCurrentPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      const fetchedPost = await getCurrentPost(postID);
      const fetchedComments = await getComments(postID);
      setCurrentPost(fetchedPost);
      setComments(fetchedComments);
      setIsLoading(false);
    };

    fetchPostAndComments();
  }, [postID]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else
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
                    <div className="row post-user">{currentPost.postUser}</div>
                  </div>
                </div>

                <div
                  id="post-categories"
                  className="d-flex justify-content-start mt-3"
                >
                  <div className="category">Games</div>
                  <div className="category">CS2</div>
                </div>

                <div className="view-content">{currentPost.postContent}</div>

                <div className="d-flex justify-content-between mt-4">
                  <div className="d-flex">
                    <div
                      className={`spritesheet upvote${
                        currentPost.upvoted ? " active" : ""
                      }`}
                      onClick={() => {
                        handleUpvote(currentPost.id);
                      }}
                    ></div>

                    <div
                      className={`spritesheet downvote${
                        currentPost.downvoted ? " active" : ""
                      }`}
                      onClick={() => {
                        handleDownvote(currentPost.id);
                      }}
                    ></div>
                    <div className="comment-link">
                      {currentPost.commentLink}
                    </div>
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
                  onChange={(event) =>
                    handleCommentChange(event, setCommentText)
                  }
                ></textarea>
                <button
                  className="view-button"
                  onClick={() =>
                    handleCommentSubmit(postID, commentText, comment)
                  }
                >
                  Comment
                </button>
              </div>

              <div className="view-separator">
                <div className="view-filter">Comments</div>
                <div className="view-line-break flex-fill"></div>
              </div>
              {comments.map((comment) => (
                <div className="view-comments" key={comment.id}>
                  <div className="row">
                    <div className="col-1 spritesheet user-profile"></div>
                    <div className="col my-auto">
                      <div className="d-flex justify-content-between">
                        <div className="row view-username">
                          {comment.commentUser}
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
                              <div className="dropdown-item d-flex align-items-center p-2">
                                <div className="spritesheet edit-icon me-3"></div>
                                Edit
                              </div>
                            </li>
                            <li>
                              <div className="dropdown-item d-flex align-items-center p-2">
                                <div className="spritesheet delete-icon me-3"></div>
                                Delete
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="row view-comment-content">
                        {comment.commentContent}
                      </div>
                      <div className="d-flex justify-content-between mt-3">
                        <div className="d-flex">
                          <div
                            className={`spritesheet upvote${
                              comment.upvoted ? " active" : ""
                            }`}
                            onClick={() => {
                              handleUpvoteComment(comment.id);
                            }}
                          ></div>

                          <div
                            className={`spritesheet downvote${
                              comment.downvoted ? " active" : ""
                            }`}
                            onClick={() => {
                              handleDownvoteComment(comment.id);
                            }}
                          ></div>
                          <a href="/" className="comment-link">
                            Reply
                          </a>
                        </div>
                        <div className="post-time">{comment.commentTime}</div>
                      </div>
                    </div>
                  </div>
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
