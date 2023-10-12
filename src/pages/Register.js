import React from "react";

class Register extends React.Component {
  render() {
    return (
      <div id="homePage">
        <div class="something">
          <span id="one">
            <div class="welcome">Welcome to Ribbit!</div>
            <div class="welDisc">
              Ribbit is a General Community something blabla enter <br />
              some other dummy text i dont know what to write
            </div>
          </span>
        </div>
        <div class="signup">
          <div class="signR1"></div>
          <div class="SignCreateAnAccount">Create an account</div>
          <div class="signG1">
            <div class="Rectangle9"></div>
            <input class="SignUsername" placeholder="Username *" />
          </div>
          <div class="signG2">
            <div class="signR2"></div>
            <input class="SignEmail" placeholder="Email *" />
          </div>
          <div class="signG3">
            <div class="signR2"></div>
            <input class="SignPassword" placeholder="Password *" />
          </div>
          <div class="signG4">
            <div class="signR2"></div>
            <input class="SignCPassword" placeholder="Confirm Password *" />
          </div>
          <div class="signG5">
            <div class="signR3"></div>
            <div class="SignUp">SIGN UP</div>
          </div>
          <div class="ComeHopInTheFun">Come hop in the fun!</div>
        </div>
      </div>
    );
  }
}

export default Register;
