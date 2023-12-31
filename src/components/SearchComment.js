import React from "react";
import { NavLink } from "react-router-dom";

const SearchComment = () => {
  return (
    <div className="container-fluid mb-5">
      <div className="row">
        <div className="col-3"></div>

        {/* PAGE CONTENT */}
        <div className="col-6">
          <div className="d-flex justify-content-start">
            <button className="result-filter" id="post-result">
              <NavLink to="/searchpost" className="remove-deco">
                Posts
              </NavLink>
            </button>

            <button className="result-filter" id="comment-result">
              <NavLink to="/searchcomment" className="remove-deco">
                Comments
              </NavLink>
            </button>
          </div>

          {/* ACTUAL RESULT */}
          <div className="result-post d-flex flex-column justify-content-between mb-3">
            <div className="d-flex align-items-end">
              <div className="result-title">
                does dlsu clinic give check ups?
              </div>
              <div className="ms-3 result-post-user">by @mocha_bear</div>
            </div>

            <div
              id="post-categories"
              className="d-flex justify-content-start mt-2"
            >
              <div className="category">DLSU</div>
              <div className="category">Health</div>
            </div>

            <div className="d-flex mt-3 mb-2 p-2 result-comment">
              <div className="spritesheet" id="result-user"></div>

              <div className="d-flex flex-column justify-content-between ms-3 flex-fill">
                <div>
                  <div className="result-comment-user">@mochi</div>
                  <div>email the HSO regarding your concern</div>
                </div>

                <div className="d-flex justify-content-between mt-4">
                  <div>1 like</div>
                  <div>3 months ago</div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between result-interaction">
              <div className="d-flex">
                <div className="me-3">10 likes</div>
                <div>0 comments</div>
              </div>

              <div>5 months ago</div>
            </div>
          </div>
        </div>

        <div className="col-3"></div>
      </div>
    </div>
  );
};

export default SearchComment;
