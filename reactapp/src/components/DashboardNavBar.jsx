import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/NavBar.css";

function DashboardNavBar() {
    const { user, logout } = useAuth();
    return (
        <nav>
            <h1>Applicant Dashboard</h1>
            <ul>
                <li>
                    <Link className="nav-link" to="/dashboard">Overview</Link>
                </li>
                <li>
                    <Link className="nav-link" to="/apply">Apply</Link>
                </li>
                <li>
                    <Link className="nav-link" to="/getAllGifts">Applications</Link>
                </li>
                <li>
                    {user ? (
                        <button className="nav-link" style={{background:'transparent', border:'none', cursor:'pointer'}} onClick={logout}>Logout</button>
                    ) : (
                        <Link className="nav-link" to="/login">Login</Link>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default DashboardNavBar;


