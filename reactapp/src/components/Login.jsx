import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";

const validUsers = [
    { email: "admin@example.com", password: "Admin@123", role: "admin" },
    { email: "provider@example.com", password: "Provider@123", role: "provider" },
    { email: "reviewer@example.com", password: "Reviewer@123", role: "reviewer" }
];

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const found = validUsers.find(
            (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase() && u.password === password
        );
        if (found) {
            login(found.email, found.role);
            navigate("/");
        } else {
            setError("Invalid credentials. Try admin@example.com / Admin@123");
        }
    };

    return (
        <div className="login-container card">
            <h2>Sign in to Gift Application</h2>
            {error && <div className="login-error" role="alert">{error}</div>}
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                />

                <button type="submit">Login</button>
            </form>
            <div className="login-hint">
                <p><strong>Sample credentials</strong></p>
                <p>admin@example.com / Admin@123</p>
                <p>provider@example.com / Provider@123</p>
                <p>reviewer@example.com / Reviewer@123</p>
                <p style={{marginTop:8}}>
                    New user? <Link to="/register">Create an account</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;


