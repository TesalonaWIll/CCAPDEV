import React from "react";
import { NavLink } from "react-router-dom";
import { updateUser } from "../controller/AuthController";

const EditProfile = ({ user, username, setUsername, bio, setBio }) => {
  return (
    <div className="container-fluid">
      <div className="row mb-5">
        <div className="col-2"></div>

        <div className="col-8" id="edit-profile-page">
          <div className="flex-column p-4">
            <div className="d-flex justify-content-between mb-5">
              <NavLink
                className="spritesheet back-button my-auto"
                to="/profile"
              ></NavLink>
              <h2 id="edit-title">Edit Profile</h2>
              <div></div>
            </div>

            {/* <div className="d-flex justify-content-start">
              <div>
                <h3 id="avatar-label">Avatar</h3>
              </div>
              <div className="d-flex flex-column justify-content-between">
                <div className="edit-profile-pic">
                  <div
                    className="spritesheet edit-profile"
                    id="edit-avatar"
                  ></div>
                </div>
                <button type="button" className="secondary-button mt-4">
                  Remove Avatar
                </button>
                <div className="note">Optimal Size: 150px x 150px</div>
              </div>
            </div>

            <div className="separator-2"></div>

            <div className="d-flex justify-content-start align-items-center">
              <div>
                <h3>Banner</h3>
              </div>
              <div className="flex-fill">
                <div className="d-flex flex-column justify-content-between">
                  <div className="profile-background">
                    <div
                      className="spritesheet edit-profile"
                      id="edit-banner"
                    ></div>
                  </div>
                  <button type="button" className="secondary-button mt-4">
                    Remove Banner
                  </button>
                  <div className="note">Optimal Size: 900px x 400px</div>
                </div>
              </div>
            </div>

            <div className="separator-2"></div> */}

            <div className="d-flex justify-content-start">
              <div>
                <h3 id="user-label">Username</h3>
              </div>
              <div className="d-flex flex-column justify-content-between">
                <form>
                  <input
                    type="text"
                    value={username || ""}
                    id="username"
                    className="short-input"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </form>
                <div className="note">Maximum Characters: 60</div>
              </div>
            </div>

            <div className="separator-2"></div>

            <div className="d-flex flex-column justify-content-between">
              <div className="d-flex justify-content-start mb-4">
                <div className="password-label">Old Password</div>
                <div className="d-flex flex-column justify-content-between">
                  <form>
                    <input
                      type="text"
                      id="username"
                      className="short-input"
                      maxLength="60"
                    />
                  </form>
                </div>
              </div>

              <div className="d-flex justify-content-start mb-4">
                <div className="password-label">New Password</div>
                <div className="d-flex flex-column justify-content-between">
                  <form>
                    <input
                      type="text"
                      id="username"
                      className="short-input"
                      maxLength="60"
                    />
                  </form>
                  <div className="note">Maximum Characters: 60</div>
                </div>
              </div>

              <div className="d-flex justify-content-start">
                <div className="password-label">Confirm Password</div>
                <div className="d-flex flex-column justify-content-between">
                  <form>
                    <input
                      type="text"
                      id="username"
                      className="short-input"
                      maxLength="60"
                    />
                  </form>
                </div>
              </div>
            </div>

            <div className="separator-2"></div>

            <div className="d-flex justify-content-start">
              <div>
                <h3 id="bio-label">Bio</h3>
              </div>
              <div className="d-flex flex-column justify-content-between flex-fill">
                <form>
                  <textarea
                    id="bio-input"
                    value={bio || ""}
                    placeholder="Bio"
                    maxLength="250"
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>
                </form>
                <div className="note">Maximum Characters: 150</div>
              </div>
            </div>

            <div className="d-flex p-5"></div>

            <div className="d-flex justify-content-center mb-2">
              <button
                type="button"
                className="primary-button me-4"
                id="apply-changes"
                onClick={() => updateUser(user.uid, username, bio)}
              >
                Apply Changes
              </button>
              <button
                onClick={() => {
                  setBio("");
                }}
                className="secondary-button"
                id="clear-changes"
              >
                Clear Changes
              </button>
            </div>
          </div>
        </div>

        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default EditProfile;
