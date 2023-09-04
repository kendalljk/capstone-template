import React from "react";
import { Link, NavLink, useLocation, Navigate, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const searchParams = document.querySelector(".searchParams").value;

    navigate(`/search/${searchParams}`)
    };

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
                <form
                    onSubmit={handleSearch}
                    style={{
                        position: "relative",
                        display: "inline-block",
                        marginRight: "5rem",
                    }}
                >
                    <input
                        type="search"
                        className="searchParams"
                        placeholder="search books..."
                        style={{
                            fontSize: "1rem",
                            height: "2rem",
                            width: "20rem",
                            borderRadius: "5px",
                            border: "1px solid #414141a8",
                            paddingLeft: "2.5rem",
                            backgroundColor: "#abd1ff9f",
                            color: "#414141",
                        }}
                    />
                    <i
                        className="fa fa-search"
                        aria-hidden="true"
                        style={{
                            position: "absolute",
                            left: "0.5rem",
                            top: "50%",
                            transform: "translateY(-50%)",
                            fontSize: "1rem",
                        }}
                    ></i>
                </form>
            </div>
        </nav>
    );
}

export default Navigation;
