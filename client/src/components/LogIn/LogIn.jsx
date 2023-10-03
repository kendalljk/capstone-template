import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../LogIn/logIn.css";
import { UserContext } from "../../App";

const LogIn = ({ handleModalClose, setLoggedIn }) => {
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3001/api/auth/login",
                {
                    email: email,
                    password: password,
                }
            );
            console.log("response", response);

            if (response.data && response.data.token) {
                const { token, user } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("user", user);

                setUser(user);

                setLoggedIn(true);
                navigate("/shelf");
                handleModalClose();
            } else {
                setError("Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Failed to log in:", error);

            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setError(error.response.data.message);
            } else {
                setError("An error occurred during login. Please try again.");
            }
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
            </form>
        </div>
    );
};

export default LogIn;
