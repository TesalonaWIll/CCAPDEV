import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  addPost,
  handleUpvote,
  handleDownvote,
} from "../controller/PostController";

const Home = ({ post, user, username }) => {
  const [postText, setPostText] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [refresh, setRefresh] = useState(false);

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
                      setRefresh((prev) => !prev);
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
              <div className="filter">Recent Posts</div>
              <div className="spritesheet category-button"></div>
              <div className="line-break flex-fill"></div>
            </div>

            {post.map((post) => {
              return (
                <div to="view-post" className="post-wide" key={post.id}>
                  <div className="row">
                    <div className="col-1 spritesheet user-profile"></div>
                    <div className="col my-auto">
                      <div className="d-flex justify-content-between">
                        <div className="row post-title">{post.postTitle}</div>
                        {/* <div
                          className="spritesheet edit-post"
                          id="edit-post-icon"
                        ></div> */}
                      </div>
                      <div className="row post-user">@{post.postUser}</div>
                    </div>
                  </div>

                  {/* <div
                    id="post-categories"
                    className="d-flex justify-content-start mt-3"
                  >
                    <div className="category">Games</div>
                    <div className="category">CS2</div>
                  </div> */}

                  <div className="post-content">{post.postContent}</div>

                  <div className="d-flex justify-content-between mt-4">
                    <div className="d-flex">
                      {user ? (
                        <>
                          <div
                            className={`spritesheet upvote${
                              post.upvoted ? " active" : ""
                            }`}
                            onClick={() => {
                              handleUpvote(post.id, user.id);
                            }}
                          ></div>

                          <div
                            className={`spritesheet downvote${
                              post.downvoted ? " active" : ""
                            }`}
                            onClick={() => {
                              handleDownvote(post.id, user.id);
                            }}
                          ></div>
                        </>
                      ) : (
                        <></>
                      )}
                      <NavLink
                        to={`/view-post/${post.id}`}
                        className="comment-link"
                      >
                        {post.comments.length} comments
                      </NavLink>
                    </div>
                    <div className="post-time">{post.postTime}</div>
                  </div>
                </div>
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
            {post
              .sort((a, b) => b.upvotedBy.length - a.upvotedBy.length)
              .slice(0, 3)
              .map((post, index) => {
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
                        <div className="popular-content">
                          {post.postContent}
                        </div>
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
