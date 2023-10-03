import React, { createContext, useContext, useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import Landing from "./pages/landing/landing";
import Shelf from "./pages/bookshelf/shelf";
import TBR from "./pages/tbr/tbr";
import Navigation from "./components/Navigation";
import Search from "./pages/search/search";
import "./App.css";
import NotePage from "./pages/notepage/notepage";
import BookInfo from "./pages/bookInfo/bookInfo";
import SignUpNav from "./components/SignUpNav";


const UserContext = createContext();

function UseLocationEffect() {
    const location = useLocation();

    useEffect(() => {
        const isLandingPage = location.pathname === "/";

        const display = document.querySelector(".display");
        display.classList.toggle("landing-background", isLandingPage);
    }, [location]);

    return null;
}

function App() {
    const [LoggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

useEffect(() => {
    const checkUserSession = () => {
        const token = localStorage.getItem("token");

        if (token) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    };

    checkUserSession();
}, []);

useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (storedToken) {
        setLoggedIn(true);
        setUser(user);
    }
}, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Router>
                <div className="App">
                    <UseLocationEffect />
                    {LoggedIn ? (
                        <Navigation setLoggedIn={setLoggedIn} />
                    ) : (
                        <SignUpNav setLoggedIn={setLoggedIn} />
                    )}
                    <Routes>
                        <Route path="/" exact element={<Landing />} />
                        <Route path="/shelf" element={<Shelf />} />
                        <Route path="/tbr" element={<TBR />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/search/:query" element={<Search />} />
                        <Route path="/note/:title" element={<NotePage />} />
                        <Route path="/book/:title" element={<BookInfo />} />
                    </Routes>
                </div>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
export { UserContext };
