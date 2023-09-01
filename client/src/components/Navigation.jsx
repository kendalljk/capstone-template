import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../images/logo.png";

function Navigation() {
    const location = useLocation();

    return (
        <nav
            style={{
                maxHeight: "4rem",
                position: "fixed",
                top: 0,
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <NavLink to="/">
                    <img
                        src={logo}
                        alt="books logo"
                        style={{
                            padding: "0 2rem",
                            maxHeight: "3rem",
                        }}
                    />
                </NavLink>
                <ul>
                    <li>
                        <h1 className="nav-title">Shelf Help</h1>
                    </li>
                    <li>
                        <NavLink
                            to="/"
                            exact="true"
                            activeclassname="active-nav-link"
                            className="nav-link"
                        >
                            home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/shelf"
                            activeclassname="active-nav-link"
                            className="nav-link"
                        >
                            shelf
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/tbr"
                            activeclassname="active-nav-link"
                            className="nav-link"
                        >
                            tbr
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <input
                    type="text"
                    placeholder="search books..."
                    style={{
                        fontSize: "1rem",
                        height: "2rem",
                        width: "20rem",
                        borderRadius: "5px",
                        border: "1px solid #414141a8",
                        paddingLeft: "1rem",
                        marginRight: "5rem",
                        backgroundColor: "#abd1ff9f",
                        color: "#414141",
                    }}
                />
            </div>
        </nav>
    );
}

export default Navigation;
