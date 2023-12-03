import React from "react";
import "../About.css";
import ribbitLogo from "../images/Frame 7Logo.png";

const About = () => {
  return (
    <div className="container-fluid">
      <div className="row p-5">
        <div className="d-flex flex-column align-items-center mt-5">
          <img src={ribbitLogo} alt="RibbitLogo" />
          <div className="rec-container">
            <div className="a_Rec1">About Ribbit</div>
            <div className="a_Rec2" />
          </div>
          <p className="about-p">
            Ribbit is a General Community Forum where communities can get together and share their thoughts, ideas, and sentiments. People can ask for
            help, advice, or even just be proud of their achievements!
          </p>
          <p className="list-header">Dependencies used for the web app:</p>
          <ul>
            <li>@svgr/webpack</li>
            <li>@testing-library/jest-dom</li>
            <li>@testing-library/react</li>
            <li>@testing-library/user-event</li>
            <li>eslint</li>
            <li>firebase</li>
            <li>react</li>
            <li>react-dom</li>
            <li>react-hook-form</li>
            <li>react-router-dom</li>
            <li>web-vitals</li>
          </ul>
    
          <div className="d-flex flex-column align-items-center">
            <p className="list-header mt-5">DevDependencies used for the web app:</p>
            <ul>
              <li>@babel/plugin-proposal-private-property-in-object</li>
              <li>bootstrap</li>
              <li>react-scripts</li>
            </ul>
          </div>
          
        </div>
      </div>
      <div className="row p-5 mb-9">
        <div className="d-flex flex-column align-items-center mt-3">
          <div className="rec-container">
            <div className="a_Rec1">What Can I Do?</div>
            <div className="a_Rec2" />
          </div>
          <div className="mx-auto to-do-container">
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-column align-items-center">
                <div className="icon-container">
                  <div id="about-comment" className="spritesheet"></div>
                </div>
                <div className="text-box_1 text-center mt-4">Registered users can comment under posts</div>
              </div>

              <div className="d-flex flex-column align-items-center">
                <div className="icon-container">
                  <div id="about-post" className="spritesheet"></div>
                </div>
                <div className="text-box_2 text-center mt-4">Registered users can write their own posts with different categories they choose</div>
              </div>

              <div className="d-flex flex-column align-items-center">
                <div className="icon-container">
                  <div id="about-vote" className="spritesheet"></div>
                </div>
                <div className="text-box_1 text-center mt-4">Registered users can like or dislike a post</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
