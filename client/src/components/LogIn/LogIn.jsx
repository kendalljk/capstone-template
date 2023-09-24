import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import "../LogIn/logIn.css";
import NewUser from "../NewUser/NewUser";
import { UserContext } from "../../App";

const LogIn = ({ handleModalClose, setLoggedIn }) => {
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Logging in...");
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const loggedInUser = userCredential.user;
            setUser(loggedInUser);
            setLoggedIn(true);
            navigate("/shelf");
            handleModalClose();
        } catch (error) {
            console.error("Failed to log in:", error.message);
            setError(error.message);
        }
    };

    return (
        <div>
            <form
                onSubmit={handleLogin}
                className="d-flex flex-column align-items-center bg-white justify-content-center rounded border"
            >
                {error && <p className="text-danger">{error}</p>}
                <input
                    type="text"
                    placeholder="Email"
                    className="w-100"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-100"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="w-100 log-button">
                    Log In
                </button>
                <a href="" className="mt-2">
                    Forgot Password?
                </a>
                <p className="mt-2 mb-0">or</p>
                <button type="button" className="w-100 log-button">
                    Create new account
                </button>
            </form>
        </div>
    );
};

export default LogIn;
