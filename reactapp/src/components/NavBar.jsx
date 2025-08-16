import React from "react";
import { Link } from "react-router-dom";
import '../styles/NavBar.css';

function NavBar() {
    return (
        <nav>
            <h1>Gift Application</h1>
            <ul>
                <li>
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li>
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li>
                    <Link className="nav-link" to="/getAllGifts">Gift Details</Link>
                </li>
                <li>
                    <Link className="nav-link" to="/applicant-dashboard">Dashboard</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;