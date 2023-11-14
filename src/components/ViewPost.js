import { useRef } from "react";
import { useParams } from "react-router-dom";

const ViewPost = ({ post, setPost, comment, setComment }) => {
  const { id } = useParams();
  const currentPost = post.find((post) => post.id === id);
  const updatedCommentRef = useRef();

  // Reset comments
  post.forEach((post) => {
    post.comments = [];
  });

  // Add comments to posts
  post.forEach((post) => {
    comment.forEach((comment) => {
      if (comment.postId === post.id) {
        post.comments.push(comment);
      }
    });
  });

  // Handle post downvote
  const handleUpvote = (id) => {
    const newPosts = post.map((post) => {
      if (post.id === id) {
        return { ...post, upvoted: !post.upvoted, downvoted: false };
      }
      return post;
    });
    setPost(newPosts);
  };

  // Handle post upvote
  const handleDownvote = (id) => {
    const newPosts = post.map((post) => {
      if (post.id === id) {
        return { ...post, downvoted: !post.downvoted, upvoted: false };
      }
      return post;
    });
    setPost(newPosts);
  };

  // Handle comment upvote
  const handleCommentUpvote = (id) => {
    const newComments = comment.map((comment) => {
      if (comment.id === id) {
        return { ...comment, upvoted: !comment.upvoted, downvoted: false };
      }
      return comment;
    });
    setComment(newComments);
  };

  // Handle comment downvote
  const handleCommentDownvote = (id) => {
    const newComments = comment.map((comment) => {
      if (comment.id === id) {
        return { ...comment, downvoted: !comment.downvoted, upvoted: false };
      }
      return comment;
    });
    setComment(newComments);
  };

  // Handle comment edit
  const changeEditMode = (id) => {
    id = id - 1;
    setComment((prevComment) => {
      const newComment = [...prevComment];
      newComment[id] = {
        ...newComment[id],
        isInEditMode: !newComment[id].isInEditMode,
      };
      updatedCommentRef.value = newComment[id].commentContent;
      return newComment;
    });
  };

  // Handle comment edit
  const handleCommentEdit = (id) => {
    id = id - 1;
    setComment((prevComment) => {
      const newComment = [...prevComment];
      newComment[id] = {
        ...newComment[id],
        commentContent: updatedCommentRef.current.value,
        isInEditMode: !newComment[id].isInEditMode,
      };
      return newComment;
    });
  };

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
              ></textarea>
              <button className="view-button">Comment</button>
            </div>

            <div className="view-separator">
              <div className="view-filter">Comments</div>
              <div className="view-line-break flex-fill"></div>
            </div>
            {currentPost.comments.map((comment) => (
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
                            <div
                              className="dropdown-item d-flex align-items-center p-2"
                              onClick={() => changeEditMode(comment.id)}
                            >
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
                      {comment.isInEditMode ? (
                        <>
                          <input
                            type="text"
                            defaultValue={comment.commentContent}
                            ref={updatedCommentRef}
                          />
                          <button onClick={() => handleCommentEdit(comment.id)}>
                            Save
                          </button>
                          <button onClick={() => changeEditMode(comment.id)}>
                            Cancel
                          </button>
                        </>
                      ) : (
                        comment.commentContent
                      )}
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                      <div className="d-flex">
                        <div
                          className={`spritesheet upvote${
                            comment.upvoted ? " active" : ""
                          }`}
                          onClick={() => {
                            handleCommentUpvote(comment.id);
                          }}
                        ></div>

                        <div
                          className={`spritesheet downvote${
                            comment.downvoted ? " active" : ""
                          }`}
                          onClick={() => {
                            handleCommentDownvote(comment.id);
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
