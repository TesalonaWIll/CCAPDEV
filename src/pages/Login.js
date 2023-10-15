import React from "react";
import { NavLink } from "react-router-dom";

function Login({ setLoginTrue }) {
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
            <div className="HopRightIn">Hop Right In!</div>
            <div className="LoginWithYourAccount">Login with your account</div>

            <div className="d-flex flex-column align-items-center mt-48">
              <div className="input-field mt-4 mb-4">
                <input type="text" required spellCheck="false" maxLength="60" />
                <label>Username</label>
              </div>

              <div className="input-field mt-4">
                <input
                  type="password"
                  required
                  spellCheck="false"
                  maxLength="60"
                />
                <label>Password</label>
              </div>
            </div>

            <div className="d-flex justify-content-around extra-buttons mt-2">
              <form>
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  value="true"
                  className="my-auto checkmark"
                />
                <label htmlFor="remember">Remember me</label>
              </form>

              <NavLink to="/">Forgot Password?</NavLink>
            </div>

            <div className="d-flex justify-content-center mt-48">
              <NavLink to="/">
                <button
                  onClick={() => {
                    setLoginTrue(true);
                    console.log("clicked");
                  }}
                  className="main-button"
                  id="login-button">
                  LOGIN
                </button>
              </NavLink>
            </div>
          </div>

          <div
            className="d-flex align-content-center justify-content-center mt-4"
            id="Group-1">
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
}

export default Login;
