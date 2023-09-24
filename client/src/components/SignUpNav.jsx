import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import LogIn from "../components/LogIn/LogIn";
import NewUser from "../components/NewUser/NewUser";

const SignUpNav = ({ setLoggedIn }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("");

    const handleModalOpen = (type) => {
        setModalType(type);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    return (
        <div>
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
                    <h1 className="fw-bold text-uppercase">Shelf Help</h1>
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    className="mx-2"
                />
                <Navbar.Collapse
                    id="basic-navbar-nav"
                    className="justify-content-end"
                >
                    <div className="d-flex">
                        <Nav className="mr-auto">
                            <Nav.Item>
                                <Link
                                    className="nav-link mx-5 fw-light fs-4"
                                    onClick={() => handleModalOpen("login")}
                                >
                                    Log In
                                </Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link
                                    className="nav-link mx-5 fw-light fs-4"
                                    onClick={() => handleModalOpen("signup")}
                                >
                                    Sign Up
                                </Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                </Navbar.Collapse>
            </Navbar>
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalType === "login" ? "Log In" : "Sign Up"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalType === "login" ? (
                        <LogIn
                            handleModalClose={handleModalClose}
                            setLoggedIn={setLoggedIn}
                        />
                    ) : (
                        <NewUser
                            handleModalClose={handleModalClose}
                            setLoggedIn={setLoggedIn}
                        />
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default SignUpNav;
