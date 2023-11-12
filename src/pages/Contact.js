import React from "react";
import "../Contact.css";
import ribbitLogo from '../images/Frame 7Logo.png'

const Contact = () => {
    return(
        <div className="container-fluid">
            <div className="row pt-10">
                <div className="col-1" />

                <div className="col-4">
                    <div className="d-flex flex-column align-items-center mt-5">
                        <img src={ribbitLogo} alt="RibbitLogo" />
                        <div className="rec-container">
                            <div className="a_Rec1">About Ribbit</div>
                            <div className="a_Rec2" />
                        </div>
                        <p>
                            Got concerns? Send a message!
                        </p>
                    </div>
                </div>

                <div className="col-1"/>

                <div className="col-5">
                    <div className="contact-container">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex flex-column input-container">
                                <h1>First Name</h1>
                                <input id="c_firstName" maxLength={40} className="text-input"/>
                            </div>

                            <div className="d-flex flex-column input-container">
                                <h1>Last Name</h1>
                                <input id="c_lastName" maxLength={40} className="text-input"/>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between mt-4">
                            <div className="d-flex flex-column input-container">
                                <h1>Email</h1>
                                <input id="c_email" maxLength={40} className="text-input"/>
                            </div>

                            <div className="d-flex flex-column input-container">
                                <h1>Contact Number</h1>
                                <input id="c_number" maxLength={40} className="text-input"/>
                            </div>
                        </div>

                        <h1 className="mt-4">Message</h1>
                            <textarea id="c_message" placeholder="Write a message..."/>
                    </div>
                </div>

                <div className="col-1"/>
            </div>
        </div>
    );
};

export default Contact;