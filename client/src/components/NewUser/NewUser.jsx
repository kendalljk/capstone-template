import React from "react";
import "../NewUser/newUser.css";

const NewUser = () => {
    return (
        <div className="">
            <form
                action=""
                className="d-flex flex-column align-items-center bg-white justify-content-center "
            >
                <input
                    type="text"
                    placeholder="Username"
                    className="w-100 rounded-5 py-2 px-3 mb-3"
                />
                <input
                    type="text"
                    placeholder="Email Address"
                    className="w-100 rounded-5 py-2 px-3 mb-3"
                />
                <input
                    type="text"
                    placeholder="Password"
                    className="w-100 rounded-5 py-2 px-3 mb-3"
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    className="w-100 rounded-5 py-2 px-3 mb-3"
                />
                <input
                    type="text"
                    placeholder="First Name"
                    className="w-100 rounded-5 py-2 px-3 mb-3"
                />
                <button className="w-100 register-button">Register</button>
            </form>
        </div>
    );
};

export default NewUser;
