import React, { useState } from "react";
import axios from "axios";
import "../NewUser/newUser.css";
import { useNavigate } from "react-router-dom";

const NewUser = ({ handleModalClose }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
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
            await axios.post("http://localhost:3001/api/users/register", newUser);

            console.log("User registered:", newUser);
            handleModalClose();
            navigate("/shelf");
        } catch (registrationError) {
            console.error(
                "Error during registration:",
                registrationError.message
            );
            setError(registrationError.message);
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
