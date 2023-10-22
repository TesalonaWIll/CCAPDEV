import React from "react";
import { NavLink } from "react-router-dom";

const Confirmation = () => {
  return (
    <div className="container-fluid">
      <div className="row p-5">
        <div className="col-7 align-content-center justify-content-center mt-lg-5">
          <div className="welcome">Welcome to Ribbit!</div>
          <div className="welDisc">Ribbit is a General Community something blabla enter <br />
          some other dummy text i dont know what to write
          </div>
        </div>

        <div className="col-5 d-flex flex-column justify-content-center align-items-center">
          <div className="Confirm">
            <div className="mx-auto spritesheet checkMark"></div>
            <div className="TyForReg">Thank you for registering!</div>
            <div className="d-flex  justify-content-center mt-4">
              <div id="goodToGo">You're good to go!</div>
            </div>
            <NavLink
              to="/login"
              className="d-flex  justify-content-center mt-4"
              id="backToLogin">
              Go to Login
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
