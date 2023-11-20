import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSignUp } from "../controller/AuthController";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

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
                <input
                  type="text"
                  value={username}
                  spellCheck="false"
                  maxLength="60"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label>Username *</label>
              </div>

              <div className="input-field mt-4">
                <input
                  type="email"
                  value={email}
                  spellCheck="false"
                  maxLength="60"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Email *</label>
              </div>

              <div className="input-field mt-4">
                <input
                  type="password"
                  value={password}
                  spellCheck="false"
                  maxLength="60"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>Password *</label>
              </div>
            </div>

            <div className="d-flex justify-content-center mt-48">
              <button
                onClick={() => {
                  handleSignUp(email, password, username, navigate);
                }}
                className="main-button"
                id="signup-button"
              >
                SIGN UP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;