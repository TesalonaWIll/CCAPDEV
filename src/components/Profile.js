import { NavLink, useNavigate } from "react-router-dom";
import {
  goToViewPost,
  refreshPosts,
  handleUpvote,
  handleDownvote,
  checkIfUserUpvoted,
  checkIfUserDownvoted,
  deletePost,
  handlePostEdit,
} from "../controller/PostController";
import { useState, useRef, useEffect } from "react";

const Profile = ({ post, user, username, bio, userPosts }) => {
  const [posts, setPosts] = useState([...post]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const navigate = useNavigate();
  const postRef = useRef(null);
  useEffect(() => {
    setPosts([...post]);
  }, [post]);

  useEffect(() => {
    refreshPosts(setPosts);
  }, [post, navigate]);

  return (
    <div className="container-fluid">
      <div className="row px-5">
        <div className="col-2"></div>

        <div className="col-8">
          <div id="profile">
            <div className="profile-background ms-1">
              <NavLink to="/edit-profile">
                <div className="spritesheet edit-profile" id="edit-profile-icon"></div>
              </NavLink>
              <div className="profile-pic"></div>
              <div id="profile-bio-container">
                <div className="username">@{username}</div>
                <div className="biography">{bio}</div>
              </div>
            </div>
          </div>
          <div className="separator">
            <div className="filter">Recent Posts</div>
            <div className="spritesheet dropdown"></div>
            <div className="line-break flex-fill"></div>
          </div>
          {Array.isArray(posts) &&
            posts
              .filter((post) => Array.isArray(userPosts) && userPosts.includes(post.id))
              .map((post) => {
                return (
                  <NavLink style={{ textDecoration: "none" }} onClick={() => goToViewPost(post, navigate)} key={post.id}>
                    <div className="post-container">
                      <div className="post-wide">
                        <div className="row">
                          <div className="col-1 spritesheet user-profile"></div>
                          <div className="col my-auto">
                            <div className="d-flex justify-content-between">
                              <div className="row post-title">{post.postTitle}</div>
                              <div className="dropdown">
                                <button
                                  className="btn spritesheet edit-post"
                                  type="button"
                                  id="edit-post-icon"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                ></button>
                                <ul className="dropdown-menu" aria-labelledby="change-post">
                                  <li>
                                    <div className="dropdown-item d-flex align-items-center p-2" onClick={() => setIsEditing(!isEditing)}>
                                      <div className="spritesheet edit-icon me-3"></div>
                                      Edit
                                    </div>
                                  </li>

                                  <li>
                                    <div className="dropdown-item d-flex align-items-center p-2" onClick={() => deletePost(post.id)}>
                                      <div className="spritesheet delete-icon me-3"></div>
                                      Delete
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="row post-user">{post.postUser}</div>
                          </div>
                        </div>

                        {/* <div id="post-categories" className="d-flex justify-content-start mt-3">
                        <div className="category">Category</div>
                      </div> */}

                        <div className="post-content" ref={postRef}>
                          {isEditing ? (
                            <div className="d-flex flex-column">
                              <div>
                                <textarea className="editing-post" value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
                              </div>
                              <div className="d-flex justify-content-end">
                                <button className="primary-button me-3" onClick={() => handlePostEdit(post, editedContent)}>
                                  Save
                                </button>
                                <button className="secondary-button" onClick={() => (isEditing ? setIsEditing(false) : null)}>
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div>{post.postContent}</div>
                          )}
                        </div>

                        <div className="d-flex justify-content-between mt-4">
                          <div className="d-flex">
                            <div
                              className={`spritesheet upvote${checkIfUserUpvoted(post, user.uid) ? " active" : ""}`}
                              onClick={async (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const updatedPosts = await handleUpvote(post.id, user.uid, "Home");
                                setPosts(updatedPosts);
                              }}
                            ></div>
                            <div
                              className={`spritesheet downvote${checkIfUserDownvoted(post, user.uid) ? " active" : ""}`}
                              onClick={async (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const updatedPosts = await handleDownvote(post.id, user.uid, "Home");
                                setPosts(updatedPosts);
                              }}
                            ></div>

                            <div className="comment-link"> {post.comments.length} comments</div>
                          </div>

                          <div className="post-time">{post.postTime}</div>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                );
              })}
        </div>

        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default Profile;
