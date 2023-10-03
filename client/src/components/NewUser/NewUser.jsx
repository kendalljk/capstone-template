import React, { useState, useContext } from "react";
import axios from "axios";
import "../NewUser/newUser.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

const NewUser = ({ handleModalClose, setLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();

const handleRegistration = async (e) => {
    e.preventDefault();

    const newUser = {
        username,
        email,
        password,
        firstName,
        lastName,
    };

    try {
        await axios.post("http://localhost:3001/api/auth/register", newUser);
        console.log("User registered:", newUser);

        const response = await axios.post(
            "http://localhost:3001/api/auth/login",
            {
                email,
                password,
          }
          );
          console.log("response", response)

        if (response.data && response.data.token) {
            const { token, user } = response.data;
          localStorage.setItem("token", token);
          console.log("token", token)

            setUser(user);

            setLoggedIn(true);
            navigate("/shelf");
            handleModalClose();
        } else {
            setError("Login after registration failed. Please try again.");
        }
    } catch (registrationError) {
        console.error("Error during registration:", registrationError.message);

        // Let's also check for login error
        if (
            registrationError.response &&
            registrationError.response.config &&
            registrationError.response.config.url.endsWith("/api/auth/login")
        ) {
            setError("Login failed. Please try logging in manually.");
        } else {
            setError(
                registrationError.response?.data?.message ||
                    "An error occurred. Please try again."
            );
        }
    }
};

    return (
        <div className="">
            <form
                onSubmit={handleRegistration}
                className="d-flex flex-column align-items-center bg-white justify-content-center"
            >
                {error && <p className="text-danger">{error}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    className="w-100 rounded-5 py-2 px-3 mb-3"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Email Address"
                    className="w-100 rounded-5 py-2 px-3 mb-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-100 rounded-5 py-2 px-3 mb-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="First Name"
                    className="w-100 rounded-5 py-2 px-3 mb-3"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    className="w-100 rounded-5 py-2 px-3 mb-3"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <button type="submit" className="w-100 register-button">
                    Register
                </button>
            </form>
        </div>
    );
};

export default NewUser;
