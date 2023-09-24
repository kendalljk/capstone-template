import React, { useState } from "react";
import "../LogIn/logIn.css";
import NewUser from "../NewUser/NewUser";

const LogIn = () => {
    const [logIn, setLogIn] = useState(true);

    return (
        <div>
            {logIn ? (
                <form
                    action=""
                    className="d-flex flex-column align-items-center bg-white justify-content-center rounded border"
                >
                    <input type="text" placeholder="Email" className="w-100" />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-100"
                    />
                    <button className="w-100 log-button">Log In</button>
                    <a href="" className="mt-2">
                        Forgot Password?
                    </a>
                    <p className="mt-2 mb-0">or</p>
                    <button
                        className="w-100 log-button"
                        onClick={() => setLogIn(false)}
                    >
                        Create new account
                    </button>
                </form>
            ) : (
                <NewUser />
            )}
        </div>
    );
};

export default LogIn;
