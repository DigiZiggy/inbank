import React from "react"
import Header from "./layouts/header/Header";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
import Footer from "./layouts/footer/Footer";
import About from "./pages/about/About";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App