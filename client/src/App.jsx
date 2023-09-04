import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Shelf from "./pages/Shelf";
import TBR from "./pages/tbr";
import Navigation from "./components/Navigation";
import "./App.css";
import Search from "./pages/search";

function App() {
    return (
        <Router>
            <div className="App">
                <Navigation />
                <Routes>
                    <Route path="/" exact element={<Landing />} />
                    <Route path="/shelf" element={<Shelf />} />
                    <Route path="/tbr" element={<TBR />} />
                    <Route path="/search/:query" element={<Search />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
