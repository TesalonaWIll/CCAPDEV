import React from "react";
import { NavLink } from "react-router-dom";

const Profile = () => {
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
                    <div className="row post-title">Title</div>
                    <div
                      className="spritesheet edit-post"
                      id="edit-post-icon"></div>
                  </div>
                  <div className="row post-user">username</div>
                </div>
              </div>

              <div
                id="post-categories"
                className="d-flex justify-content-start mt-3">
                <div className="category">Games</div>
                <div className="category">CS2</div>
              </div>

              <div className="post-content">
                Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
                (a week)Monday, Tuesday, Wednesday, Thursday, Friday. Seven days
                a week. Every hour, every minute, every second. You know night
                after night. I'll be lovin' you right, seven days a week (yeah)
                Monday, Tuesday, Wednesday, Thursday, FridaySaturday, Sunday (a
                week)Monday, Tuesday, Wednesday, Thursday, Friday (oh, oh)Seven
                days a weekEvery hour, every minute, every secondYou know night
                after nightI'll be lovin' you right, seven days a week Monday,
                Tuesday, Wednesday, Thursday, FridaySaturday, Sunday (a
                week)Monday, Tuesday, Wednesday, Thursday, Friday (oh, oh)Seven
                days a weekEvery hour, every minute, every secondYou know night
                after nightI'll be lovin' you right, seven days a week
              </div>

              <div className="d-flex justify-content-between mt-4">
                <div className="d-flex">
                  <div className="spritesheet upvote"></div>
                  <div className="spritesheet downvote"></div>
                  <NavLink to="/" className="comment-link">
                    5 Comments
                  </NavLink>
                </div>

                <div className="post-time">6 Days Ago</div>
              </div>
            </div>

            <div className="post-wide">
              <div className="row">
                <div className="col-1 spritesheet user-profile"></div>
                <div className="col my-auto">
                  <div className="d-flex justify-content-between">
                    <div className="row post-title">Title</div>
                    <div
                      className="spritesheet edit-post"
                      id="edit-post-icon"></div>
                  </div>
                  <div className="row post-user">username</div>
                </div>
              </div>

              <div
                id="post-categories"
                className="d-flex justify-content-start mt-3">
                <div className="category">Valorant</div>
                <div className="category">Discord</div>
                <div className="category">E-girls</div>
              </div>

              <div className="post-content">
                Not funny I didn't laugh. Your joke is so bad I would have
                preferred the joke went over my head and you gave up re-telling
                me the joke. To be honest this is a horrid attempt at trying to
                get a laugh out of me. Not a chuckle, not a hehe, not even a
                subtle burst of air out of my esophagus. Science says before you
                laugh your brain preps your face muscles but I didn't even feel
                the slightest twitch. 0/10 this joke is so bad I cannot believe
                anyone legally allowed you to be creative at all. The amount of
                brain power you must have put into that joke has the potential
                to power every house on Earth. Get a personality and learn how
                to make jokes, read a book. I'm not saying this to be funny I
                genuinely mean it on how this is just bottom barrel
                embarrassment at comedy. You've single handedly killed humor and
                every comedic act on the planet. I'm so disappointed that
                society has failed as a whole in being able to teach you how to
                be funny. Honestly if I put in all my power and time to try and
                make your joke funny it would require Einstein himself to build
                a device to strap me into so I can be connected to the energy of
                a billion stars to do it, and even then all that joke would get
                from people is a subtle scuff. You're lucky I still have the
                slightest of empathy for you after telling that joke otherwise I
                would have committed every war crime in the book just to prevent
                you from attempting any humor ever again. We should put that
                joke in text books so future generations can be wary of becoming
                such an absolute comedic failure. Im disappointed, hurt, and
                outright offended that my precious time has been wasted in my
                brain understanding that joke.
              </div>

              <div className="d-flex justify-content-between mt-4">
                <div className="d-flex">
                  <div className="spritesheet upvote"></div>
                  <div className="spritesheet downvote"></div>
                  <NavLink to="/" className="comment-link">
                    5 Comments
                  </NavLink>
                </div>

                <div className="post-time">6 Days Ago</div>
              </div>
            </div>

            <div className="post-wide">
              <div className="row">
                <div className="col-1 spritesheet user-profile"></div>
                <div className="col my-auto">
                  <div className="d-flex justify-content-between">
                    <div className="row post-title">Title</div>
                    <div
                      className="spritesheet edit-post"
                      id="edit-post-icon"></div>
                  </div>
                  <div className="row post-user">username</div>
                </div>
              </div>

              <div
                id="post-categories"
                className="d-flex justify-content-start mt-3">
                <div className="category">Music</div>
                <div className="category">Spotify</div>
              </div>

              <div className="post-content">
                Shawty had them apple bottom jeans (jeans) Boots with the fur
                (with the fur) The whole club was lookin' at her She hit the
                floor (she hit the floor) Next thing you know Shawty got low,
                low, low, low, low, low, low, low Them baggy sweat pants and the
                Reeboks with the straps (with the straps) She turned around and
                gave that big booty a slap (hey) She hit the floor (she hit the
                floor) Next thing you know Shawty got low, low, low, low, low,
                low, low, low
              </div>

              <div className="d-flex justify-content-between mt-4">
                <div className="d-flex">
                  <div className="spritesheet upvote"></div>
                  <div className="spritesheet downvote"></div>
                  <NavLink to="#" className="comment-link">
                    5 Comments
                  </NavLink>
                </div>

                <div className="post-time">6 Days Ago</div>
              </div>
            </div>

            <div className="post-wide">
              <div className="row">
                <div className="col-1 spritesheet user-profile"></div>
                <div className="col my-auto">
                  <div className="d-flex justify-content-between">
                    <div className="row post-title">Title</div>
                    <div
                      className="spritesheet edit-post"
                      id="edit-post-icon"></div>
                  </div>
                  <div className="row post-user">username</div>
                </div>
              </div>

              <div
                id="post-categories"
                className="d-flex justify-content-start mt-3">
                <div className="category">Games</div>
                <div className="category">CS2</div>
              </div>

              <div className="post-content">
                Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
              </div>

              <div className="d-flex justify-content-between mt-4">
                <div className="d-flex">
                  <div className="spritesheet upvote"></div>
                  <div className="spritesheet downvote"></div>
                  <NavLink to="#" className="comment-link">
                    5 Comments
                  </NavLink>
                </div>

                <div className="post-time">6 Days Ago</div>
              </div>
            </div>

            <div className="post-wide">
              <div className="row">
                <div className="col-1 spritesheet user-profile"></div>
                <div className="col my-auto">
                  <div className="d-flex justify-content-between">
                    <div className="row post-title">Title</div>
                    <div
                      className="spritesheet edit-post"
                      id="edit-post-icon"></div>
                  </div>
                  <div className="row post-user">username</div>
                </div>
              </div>

              <div
                id="post-categories"
                className="d-flex justify-content-start mt-3">
                <div className="category">Games</div>
                <div className="category">CS2</div>
              </div>

              <div className="post-content">
                Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
                (a week)Monday, Tuesday, Wednesday, Thursday, Friday. Seven days
                a week. Every hour, every minute, every second. You know night
                after night. I'll be lovin' you right, seven days a week (yeah)
                Monday, Tuesday, Wednesday, Thursday, FridaySaturday, Sunday (a
                week)Monday, Tuesday, Wednesday, Thursday, Friday (oh, oh)Seven
                days a weekEvery hour, every minute, every secondYou know night
                after nightI'll be lovin' you right, seven days a week Monday,
                Tuesday, Wednesday, Thursday, FridaySaturday, Sunday (a
                week)Monday, Tuesday, Wednesday, Thursday, Friday (oh, oh)Seven
                days a weekEvery hour, every minute, every secondYou know night
                after nightI'll be lovin' you right, seven days a week
              </div>

              <div className="d-flex justify-content-between mt-4">
                <div className="d-flex">
                  <div className="spritesheet upvote"></div>
                  <div className="spritesheet downvote"></div>
                  <NavLink to="/" className="comment-link">
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
