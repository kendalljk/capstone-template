import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import logo from "../images/logo.png";

function Navigation() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        const searchParams = document.querySelector(".searchParams").value;

        navigate(`/search/${searchParams}`);
    };

    return (
        <Navbar
            expand="lg"
            bg="transparent"
            className="d-flex align-items-center"
        >
            <Navbar.Brand className="d-flex align-items-center">
                <Link to="/">
                    <img
                        src={logo}
                        alt="books logo"
                        style={{
                            padding: "0 2rem",
                            maxHeight: "3rem",
                        }}
                    />
                </Link>
                <h1 className="nav-title w-25">Shelf Help</h1>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" className="mx-2" />

            <Navbar.Collapse
                id="basic-navbar-nav"
                className="justify-content-between"
            >
                <div className="d-flex">
                    <Nav className="mr-auto">
                        <Nav.Item>
                            <NavLink
                                to="/"
                                exact="true"
                                activeclassname="active-nav-link"
                                className="nav-link"
                            >
                                home
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink
                                to="/shelf"
                                activeclassname="active-nav-link"
                                className="nav-link"
                            >
                                shelf
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink
                                to="/tbr"
                                activeclassname="active-nav-link"
                                className="nav-link"
                            >
                                tbr
                            </NavLink>
                        </Nav.Item>
                    </Nav>
                </div>

                <div className="search-form">
            <Form onSubmit={handleSearch} className="d-flex align-items-center" >
                        <FormControl
                            type="search"
                            className="searchParams nav-search"
                            placeholder="search books..."
                        />
                    </Form>
                </div>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Navigation;
