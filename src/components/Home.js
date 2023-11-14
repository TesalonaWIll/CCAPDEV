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
                <button type="button" className="primary-button">
                  Post It!
                </button>
              </div>
            </div>
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
                        {post.comments} comments
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

            <div className="d-flex">
              <div className="rank">1</div>
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center mb-1">
                  <div className="spritesheet user-profile-dark"></div>
                  <div className="d-flex flex-column align-items-start">
                    <div className="popular-title">
                      Eve, Psyche & The Bluebeard's wife
                    </div>
                    <div className="popular-user">@LESSERAFIM</div>
                  </div>
                </div>
                <div
                  id="post-categories"
                  className="d-flex justify-content-start mt-1"
                >
                  <div className="category">Music</div>
                  <div className="category">K-pop</div>
                </div>

                <div className="popular-content-container">
                  <div className="popular-content">
                    I'm a mess, mess, mess, mess, mess, mess, mess I'm a mess,
                    mess, mess, mess, mess, mess, mess I'm a mess in distress
                    But we're still the best dressed
                  </div>
                </div>
              </div>
            </div>
            <div className="line-break flex-fill mt-2 mb-3"></div>

            <div className="d-flex">
              <div className="rank">2</div>
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center mb-1">
                  <div className="spritesheet user-profile-dark"></div>
                  <div className="d-flex flex-column align-items-start">
                    <div className="popular-title">Motivation Monday</div>
                    <div className="popular-user">@mandythemotivator</div>
                  </div>
                </div>
                <div
                  id="post-categories"
                  className="d-flex justify-content-start mt-1"
                >
                  <div className="category">Casual</div>
                  <div className="category">General</div>
                </div>

                <div className="popular-content-container">
                  <div className="popular-content">
                    Waking up to another beautiful day with a cup of steaming
                    hot coffee in hand. ☕️ There's something magical about the
                    early morning tranquility. 🌅
                    <br></br>
                    <br></br>
                    Spent the weekend exploring a hidden gem in the countryside.
                    🌳 Nature has a way of rejuvenating the soul. If you haven't
                    taken a break in a while, I highly recommend it. 🚗
                    <br></br>
                    <br></br>
                    Now it's back to the hustle. Time to conquer those Monday
                    goals! 💪 #MondayMotivation #NatureLover #MorningCoffee
                  </div>
                </div>
              </div>
            </div>
            <div className="line-break flex-fill mt-2 mb-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
