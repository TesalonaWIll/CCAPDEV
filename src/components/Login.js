import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { handleSignIn } from "../controller/UserController";

const Login = ({ setLoginTrue }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="container-fluid">
      <div className="row p-5">
        <div className="col-7 d-flex flex-column align-content-center justify-content-center">
          <div className="welcome">Welcome to Ribbit!</div>
          <div className="welDisc">
            Ribbit is a General Community Forum where communities can get together and share their thoughts, ideas, and sentiments. People can ask for
            help, advice, or even just be proud of their achievements!
          </div>
        </div>

        <div className="col-5 d-flex flex-column align-items-center">
          <div className="Login">
            <div className="HopRightIn">Hop Right In!</div>
            <div className="LoginWithYourAccount">Login with your account</div>

            <div className="d-flex flex-column align-items-center mt-48">
              <div className="input-field mt-4 mb-4">
                <input
                  type="email"
                  spellCheck="false"
                  maxLength="60"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSignIn(email, password, navigate, setLoginTrue, setIsInvalid);
                    }
                  }}
                />
                <label>Email</label>
              </div>

              <div className="input-field mt-4">
                <input
                  type="password"
                  spellCheck="false"
                  maxLength="60"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSignIn(email, password, navigate, setLoginTrue, setIsInvalid);
                    }
                  }}
                />
                <label>Password</label>
              </div>
              
            </div>
            {isInvalid && <div className="login-error">Wrong email or password</div>}
            <div className="d-flex justify-content-center mt-48">
              <button
                onClick={() => {
                  handleSignIn(email, password, navigate, setLoginTrue, setIsInvalid);
                }}
                className="main-button"
                id="login-button"
              >
                LOGIN
              </button>
            </div>
          </div>

          <div className="d-flex align-content-center justify-content-center mt-4" id="Group-1">
            <div className="flex-fill separator-3 my-auto"></div>
            <div className="Or me-4 ms-4">OR</div>
            <div className="flex-fill separator-3 my-auto"></div>
          </div>

          <NavLink to="/register" className="CreateAnAccount mt-4">
            Create An Account
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
