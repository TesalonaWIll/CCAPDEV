import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSignUp } from "../controller/UserController";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  return (
    <div className="container-fluid">
      <div className="row p-5">
        <div className="col-7 d-flex flex-column align-content-center justify-content-center">
          <div className="welcome">Welcome to Ribbit!</div>
          <div className="welDisc">
            Ribbit is a General Community Forum where communities can get together and share their thoughts, ideas, and sentiments. People can ask for
            help, advice, or even just be proud of their achievements
          </div>
        </div>

        <div className="col-5 d-flex flex-column align-items-center">
          <div className="Login">
            <div className="HopRightIn">Create an Account</div>
            <div className="LoginWithYourAccount">Come hop in the fun!</div>

            <div className="d-flex flex-column align-items-center mt-48">
              <div className="input-field mt-4 ">
                <input type="text" value={username} spellCheck="false" maxLength="60" required onChange={(e) => setUsername(e.target.value)} />
                <label>Username *</label>
              </div>

              <div className="input-field mt-4">
                <input type="email" value={email} spellCheck="false" maxLength="60" required onChange={(e) => setEmail(e.target.value)} />
                <label>Email *</label>
              </div>

              <div className="input-field mt-4">
                <input type="password" value={password} spellCheck="false" maxLength="60" required onChange={(e) => setPassword(e.target.value)} />
                <label>Password *</label>
              </div>
            </div>

            <div className="d-flex justify-content-center mt-48">
              {isInvalid && <p style={{ color: "red" }}>Invalid login credentials</p>}
              <button
                onClick={() => {
                  handleSignUp(email, password, username, navigate, setIsInvalid);
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
