import React from "react";
import { NavLink } from "react-router-dom";

const Register = () => {
  return (
    <div className="container-fluid">
      <div className="row p-5">
        <div className="col-7 d-flex flex-column align-content-center justify-content-center">
          <div className="welcome">Welcome to Ribbit!</div>
          <div className="welDisc">
            Ribbit is a General Community something blabla enter <br />
            some other dummy text i dont know what to write
          </div>
        </div>

        <div className="col-5 d-flex flex-column align-items-center">
          <div className="Login">
            <div className="HopRightIn">Create an Account</div>
            <div className="LoginWithYourAccount">Come hop in the fun!</div>

            <div className="d-flex flex-column align-items-center mt-48">
              <div className="input-field mt-4 ">
                <input type="text" required spellCheck="false" maxLength="60" />
                <label>Username *</label>
              </div>

              <div className="input-field mt-4">
                <input type="text" required spellCheck="false" maxLength="60" />
                <label>Email *</label>
              </div>

              <div className="input-field mt-4">
                <input
                  type="password"
                  required
                  spellCheck="false"
                  maxLength="60"
                />
                <label>Password *</label>
              </div>

              <div className="input-field mt-4">
                <input
                  type="password"
                  required
                  spellCheck="false"
                  maxLength="60"
                />
                <label>Confirm Password *</label>
              </div>
            </div>

            <div className="d-flex justify-content-center mt-48">
              <NavLink to="/success" className="main-button" id="signup-button">
                SIGN UP
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
