import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import '../styles/NavBar.css';

function NavBar() {
    const { user, logout } = useAuth();
    return (
        <nav>
            <h1>Gift Application</h1>
            <ul>
                <li>
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li>
                    <Link className="nav-link" to="/getAllGifts">Gift Details</Link>
                </li>
                <li style={{marginLeft:'auto'}}>
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

export default NavBar;