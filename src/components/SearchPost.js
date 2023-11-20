import { NavLink, useLocation, useNavigate } from "react-router-dom";

const SearchPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchedPosts = location.state ? location.state.searchedPosts : [];
  console.log(searchedPosts);

  return (
    <div className="container-fluid mb-5">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <div className="d-flex justify-content-start">
            <button className="result-filter" id="post-result">
              <NavLink to="/searchpost" className="remove-deco">
                Posts
              </NavLink>
            </button>
            {/* <button className="result-filter" id="comment-result">
              <NavLink to="/searchcomment" className="remove-deco">
                Comments
              </NavLink>
            </button> */}
          </div>

          {searchedPosts.map((post) => (
            <div
              key={post.id}
              className="result-post d-flex flex-column justify-content-between mb-3"
              onClick={() => navigate(`/view-post/${post.id}`)}
            >
              <div className="d-flex align-items-end">
                <div className="result-title">{post.postTitle}</div>
                <div className="ms-3 result-post-user">by @{post.postUser}</div>
              </div>

              {/* <div
                id="post-categories"
                className="d-flex justify-content-start"
              >
                {post.postCategories.map((category) => (
                  <div key={category} className="category">
                    {post.postCategories}
                  </div>
                ))}
              </div> */}

              <div className="d-flex justify-content-between result-interaction">
                <div className="d-flex">
                  <div></div>
                </div>

                <div>{post.date}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-3"></div>
      </div>
    </div>
  );
};

export default SearchPost;
