import React from "react";

class Login extends React.Component {
  render() {
    return (
      <div id="homePage">
        <div class="something">
          <span id="one">
            <div class="welcome">Welcome to Ribbit!</div>
            <div class="welDisc">
              Ribbit is a General Community something blabla enter
              <br /> some other dummy text i dont know what to write
            </div>
          </span>
        </div>
        <div class="login">
          <div class="Group5">
            <div class="Rectangle8"></div>
            <div class="HopRightIn">Hop Right In!</div>
            <div class="LoginWithYourAccount">Login with your account</div>
            <div class="Group2">
              <div class="Rectangle9"></div>
              <input class="Username" placeholder="Username" />
            </div>
            <div class="Group1">
              <div class="Rectangle10"></div>
              <input type="password" class="Password" placeholder="Password" />
            </div>
            <div class="Group3">
              <div class="Rectangle11"></div>
              <div class="Login">LOGIN</div>
            </div>
          </div>
        </div>
        <div class="Group4">
          <div class="Line1"></div>
          <div class="Rectangle12"></div>
          <div class="Or">OR</div>
        </div>
        <a class="CreateAnAccount" href="SignUpPage.html">
          Create an account
        </a>
      </div>
    );
  }
}

export default Login;
