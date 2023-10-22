import React, {useState, useRef} from "react";
import { NavLink } from "react-router-dom";

const Profile = () => {
  const initialContent = "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday (a week) Monday, Tuesday, Wednesday, Thursday, Friday. Seven days a week. Every hour, every minute, every second. You know night after night. I'll be lovin' you right, seven days a week (yeah)";
  const [postContent, setPostContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(initialContent);
  const postRef = useRef(null);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedContent(postContent);
  };

  const handleSaveClick = () => {
    setPostContent(editedContent);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setPostContent(initialContent);
    setIsEditing(false);
  }
    
  return (
    <div className="container-fluid">
      <div className="row px-5">
        <div className="col-2"></div>

        <div className="col-8">
          <div id="profile">
            <div className="profile-background ms-1">
              <NavLink to="/edit-profile">
                <div
                  className="spritesheet edit-profile"
                  id="edit-profile-icon"></div>
              </NavLink>
              <div className="profile-pic"></div>
              <div id="profile-bio-container">
                <div className="username">ailajanelle</div>
                <div className="biography">
                  I'm on my way up (top-top)Run to the top (ah, woo)난 언제든
                  straight up (alright)원래 두려운 게 없어 난 상관없어, call me
                  trouble Or you can call me weirdo 나로 살고 싶어턱 끝을
                  치켜올린 채로다 가질 듯한 attitude 그거면 돼 (ah)
                </div>
              </div>
            </div>
          </div>

          <div className="separator">
            <div className="filter">Recent Posts</div>
            <div className="spritesheet dropdown"></div>
            <div className="line-break flex-fill"></div>
          </div>

          <div className="post-container">
            <div className="post-wide">
              <div className="row">
                <div className="col-1 spritesheet user-profile"></div>
                <div className="col my-auto">
                  <div className="d-flex justify-content-between">
                    <div className="row post-title">Seven Days A Week</div>
                    <div className="dropdown">
                      <button className="btn spritesheet edit-post" type="button" id="edit-post-icon" data-bs-toggle="dropdown" aria-expanded="false"></button>
                      <ul className="dropdown-menu" aria-labelledby="change-post">
                        <li>
                          <div className="dropdown-item d-flex align-items-center p-2" onClick={handleEditClick}>
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
                  <div className="row post-user">@ailajanelle</div>
                </div>
              </div>

              <div
                id="post-categories"
                className="d-flex justify-content-start mt-3">
                <div className="category">K-pop</div>
                <div className="category">Music</div>
              </div>

              <div className="post-content" ref={postRef}>
                {isEditing ? (
                <div className="d-flex flex-column">
                  <div>
                    <textarea
                      className="editing-post"
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="primary-button me-3" onClick={handleSaveClick}>Save</button>
                    <button className="secondary-button" onClick={handleCancelClick}>Cancel</button>
                  </div>
                </div>
                
                  ) : (
                    <div>
                      {postContent}
                    </div>
                  )}
                
              </div>

              <div className="d-flex justify-content-between mt-4">
                <div className="d-flex">
                  <div className="spritesheet upvote"></div>
                  <div className="spritesheet downvote"></div>
                  <NavLink to="/profile" className="comment-link">
                    5 Comments
                  </NavLink>
                </div>

                <div className="post-time">6 Days Ago</div>
              </div>
            </div>

            
          </div>
        </div>

        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default Profile;
