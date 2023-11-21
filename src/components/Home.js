import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  addPost,
  handleUpvote,
  handleDownvote,
  checkIfUserUpvoted,
  checkIfUserDownvoted,
  goToViewPost,
  refreshPosts,
} from "../controller/PostController";

const Home = ({ post, user, username }) => {
  const [posts, setPosts] = useState([...post]);
  const navigate = useNavigate();
  const [postText, setPostText] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [sortedPosts, setSortedPosts] = useState([]);
  useEffect(() => {
    setPosts([...post]);
  }, [post]);
  useEffect(() => {
    refreshPosts(setPosts, setSortedPosts);
  }, [post, navigate]);

  return (
    <div className="container-fluid">
      <div className="row px-5">
        <div className="col-3"></div>
        <div className="col-6">
          <div className="post-container">
            {username && user.uid ? (
              <div className="post-wide remove-hover">
                <div className="row">
                  <div className="d-flex flex-column justify-content-start">
                    <form>
                      <input
                        type="text"
                        id="title"
                        className="post-title-input"
                        maxLength="200"
                        placeholder="Title"
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                      />
                    </form>
                  </div>
                </div>

                <div
                  id="post-categories"
                  className="d-flex justify-content-start mt-3"
                >
                  {/* <div className="category-search">🔎 Search</div>
                  <div className="category">CS2</div> */}
                </div>
                {/* <div
                  style={{
                    color: "white",
                    margin: ".4rem",
                    fontSize: "0.8rem",
                  }}
                >
                  * add up to 3 categories
                </div> */}
                <div>
                  <form>
                    <textarea
                      id="post"
                      placeholder="What's up?"
                      maxLength="250"
                      value={postText}
                      onChange={(e) => setPostText(e.target.value)}
                    ></textarea>
                  </form>
                </div>
                <div className="d-flex justify-content-center mb-2">
                  <button
                    type="button"
                    className="primary-button"
                    onClick={() => {
                      addPost(postTitle, postText, username, user.uid);
                    }}
                  >
                    Post It!
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}

            <div className="separator">
              <div className="filter">All Posts</div>
              <div className="spritesheet category-button"></div>
              <div className="line-break flex-fill"></div>
            </div>

            {posts
              .sort((a, b) => new Date(b.postTime) - new Date(a.postTime))
              .map((post) => {
                return (
                  <NavLink
                    style={{ textDecoration: "none" }}
                    onClick={() => goToViewPost(post, navigate)}
                    key={post.id}
                  >
                    <div to="view-post" className="post-wide">
                      <div className="row">
                        <div className="col-1 spritesheet user-profile"></div>
                        <div className="col my-auto">
                          <div className="d-flex justify-content-between">
                            <div className="row post-title">
                              {post.postTitle}
                            </div>
                          </div>
                          <div className="row post-user">@{post.postUser}</div>
                        </div>
                      </div>

                      <div className="post-content">{post.postContent}</div>

                      <div className="d-flex justify-content-between mt-4">
                        <div className="d-flex">
                          {user ? (
                            <>
                              <div
                                className={`spritesheet upvote${
                                  checkIfUserUpvoted(post, user.uid)
                                    ? " active"
                                    : ""
                                }`}
                                onClick={async (e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  const updatedPosts = await handleUpvote(
                                    post.id,
                                    user.uid,
                                    "Home"
                                  );
                                  setPosts(updatedPosts);
                                }}
                              ></div>

                              <div
                                className={`spritesheet downvote${
                                  checkIfUserDownvoted(post, user.uid)
                                    ? " active"
                                    : ""
                                }`}
                                onClick={async (e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  const updatedPosts = await handleDownvote(
                                    post.id,
                                    user.uid,
                                    "Home"
                                  );
                                  setPosts(updatedPosts);
                                }}
                              ></div>
                            </>
                          ) : (
                            <></>
                          )}
                          <div className="comment-link">
                            {post.comments.length} comments
                          </div>
                        </div>
                        <div className="post-time">{post.postTime}</div>
                      </div>
                    </div>
                  </NavLink>
                );
              })}
          </div>
        </div>
        <div className="col-3">
          <div className="popular">
            <div className="separator" id="popposts">
              <div className="filter" style={{ fontSize: "1.6rem" }}>
                Popular posts
              </div>
              <div className="line-break flex-fill"></div>
            </div>
            {sortedPosts.slice(0, 3).map((post, index) => {
              return (
                <div className="d-flex" key={post.id}>
                  <div className="rank">{index + 1}</div>
                  <div className="d-flex flex-column">
                    <div className="d-flex align-items-center mb-1">
                      <div className="spritesheet user-profile-dark"></div>
                      <div className="d-flex flex-column align-items-start">
                        <div className="popular-title">{post.postTitle}</div>
                        <div className="popular-user">@{post.postUser}</div>
                      </div>
                    </div>
                    {/* <div
                        id="post-categories"
                        className="d-flex justify-content-start mt-1"
                      >
                        <div className="category">Music</div>
                        <div className="category">K-pop</div>
                      </div> */}

                    <div className="popular-content-container">
                      <div className="popular-content">{post.postContent}</div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="line-break flex-fill mt-2 mb-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
