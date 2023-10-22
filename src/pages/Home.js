import React from "react";
import { NavLink } from "react-router-dom";

const Home = ({ post, setPost }) => {
  const handleUpvote = (id) => {
    const newPosts = post.map((post) => {
      if (post.id === id) {
        return { ...post, upvoted: !post.upvoted, downvoted: false };
      }
      return post;
    });
    setPost(newPosts);
  };

  const handleDownvote = (id) => {
    const newPosts = post.map((post) => {
      if (post.id === id) {
        return { ...post, downvoted: !post.downvoted, upvoted: false };
      }
      return post;
    });
    setPost(newPosts);
  };

  return (
    <div className="container-fluid">
      <div className="row px-5">
        <div className="col-3"></div>
        <div className="col-6">
          <div className="post-container">
            <div className="post-wide">
              <div className="row">
                <div className="d-flex flex-column justify-content-start">
                  <form>
                    <input
                      type="text"
                      id="title"
                      className="post-title-input"
                      maxLength="200"
                      placeholder="Title"
                    />
                  </form>
                </div>
              </div>

              <div
                id="post-categories"
                className="d-flex justify-content-start mt-3"
              >
                <div className="category-search">🔎 Search</div>
                <div className="category">CS2</div>
              </div>
              <div
                style={{ color: "white", margin: ".4rem", fontSize: "0.8rem" }}
              >
                * add up to 3 categories
              </div>
              <div>
                <form>
                  <textarea
                    id="post"
                    placeholder="What's up?"
                    maxLength="250"
                  ></textarea>
                </form>
              </div>
              <div className="d-flex justify-content-center mb-2">
                <button type="button" className="post-button">
                  Post It!
                </button>
              </div>
            </div>
            <div className="separator">
              <div className="filter">Recent Posts</div>
              <div className="spritesheet dropdown"></div>
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
                        <div
                          className="spritesheet edit-post"
                          id="edit-post-icon"
                        ></div>
                      </div>
                      <div className="row post-user">{post.postUser}</div>
                    </div>
                  </div>

                  <div
                    id="post-categories"
                    className="d-flex justify-content-start mt-3"
                  >
                    <div className="category">Games</div>
                    <div className="category">CS2</div>
                  </div>

                  <div className="post-content">{post.postContent}</div>

                  <div className="d-flex justify-content-between mt-4">
                    <div className="d-flex">
                      <div
                        className={`spritesheet upvote${
                          post.upvoted ? " active" : ""
                        }`}
                        onClick={() => {
                          handleUpvote(post.id);
                        }}
                      ></div>

                      <div
                        className={`spritesheet downvote${
                          post.downvoted ? " active" : ""
                        }`}
                        onClick={() => {
                          handleDownvote(post.id);
                        }}
                      ></div>
                      <NavLink
                        to={`/view-post/${post.id}`}
                        className="comment-link"
                      >
                        {post.commentLink}
                      </NavLink>
                    </div>
                    <div className="post-time">{post.postTime}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="col-3">
            <div id="popular">
              <div className="separator" id="popposts">
                <div className="filter" style={{ fontSize: "1.6rem" }}>
                  Popular posts
                </div>
                <div className="line-break flex-fill"></div>
              </div>
              <div className="row">
                <div className="col-1 rank">1</div>
                <div className="col-2 spritesheet user-profile-dark"></div>
                <div className="col my-auto">
                  <div className="d-flex justify-content-between">
                    <div className="row post-title" style={{ color: "black" }}>
                      Title
                    </div>
                  </div>
                  <div className="row post-user" style={{ color: "black" }}>
                    student
                  </div>
                </div>
              </div>

              <div
                id="post-categories"
                className="d-flex justify-content-start mt-3"
              >
                <div className="category">Games</div>
                <div className="category">CS2</div>
              </div>
              <div id="content">
                <div id="message">
                  i checked my bfs phone and saw sa chat na he complimented this
                  girl with her new look lmao is that ok?
                </div>

                <div className="line-break flex-fill"></div>
              </div>
              <div id="popular">
                <div className="row">
                  <div className="col-1 rank">2</div>
                  <div className="col-2 spritesheet user-profile-dark"></div>
                  <div className="col my-auto">
                    <div className="d-flex justify-content-between">
                      <div
                        className="row post-title"
                        style={{ color: "black" }}
                      >
                        Title
                      </div>
                    </div>
                    <div className="row post-user" style={{ color: "black" }}>
                      student
                    </div>
                  </div>
                </div>

                <div
                  id="post-categories"
                  className="d-flex justify-content-start mt-3"
                >
                  <div className="category">Games</div>
                  <div className="category">CS2</div>
                </div>
                <div id="content">
                  <div id="message">
                    i checked my bfs phone and saw sa chat na he complimented
                    this girl with her new look lmao is that ok?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
