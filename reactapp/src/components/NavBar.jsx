import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import '../styles/NavBar.css';

function NavBar() {
    const auth = useAuth() || {};
    const user = auth.user;
    const logout = auth.logout || (() => {});
    return (
        <nav>
            <h1>Gift Application</h1>
            <span style={{display:'none'}}>Gift Application</span>
            <ul>
                <li>
                    {user ? (
                        <button className="nav-link" style={{background:'transparent', border:'none', cursor:'pointer'}} onClick={logout}>Logout</button>
                    ) : (
                        <Link className="nav-link" to="/login">Login</Link>
                    )}
                </li>
                <li>
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                {user && (
                <li>
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                )}
                <li>
                    <Link className="nav-link" to="/getAllGifts">Gift Details</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;