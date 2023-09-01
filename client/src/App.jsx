import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Shelf from "./pages/shelf";
import TBR from "./pages/tbr";
import Navigation from "./components/Navigation";
import "./App.css";


function App() {
    return (
        <Router>
            <div className="App">
                <Navigation />
                <Routes>
                    <Route path="/" exact element={<Landing />} />
                    <Route path="/shelf" element={<Shelf />} />
                    <Route path="/tbr" element={<TBR />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
