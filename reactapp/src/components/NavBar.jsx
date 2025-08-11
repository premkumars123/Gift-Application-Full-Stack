import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
    return (
        <nav className="navbar">
            <h1 className="navbar-title">Gift Application</h1>
            <ul className="nav-links">
                <li>
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li>
                    <Link className="nav-link" to="/getAllGifts">Gift Details</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;