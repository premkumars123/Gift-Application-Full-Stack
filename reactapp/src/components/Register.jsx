import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE } from "../api";
import "../styles/Login.css";

function Register() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
            setError("Please enter a valid email");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        if (password !== confirm) {
            setError("Passwords do not match");
            return;
        }
        // Persist the new user locally so the login page can authenticate them later
        try {
            const raw = localStorage.getItem("giftapp_users");
            const users = raw ? JSON.parse(raw) : [];
            const exists = users.some(u => (u.email || "").toLowerCase() === email.toLowerCase());
            if (exists) {
                setError("An account with this email already exists");
                return;
            }
            users.push({ email, password });
            localStorage.setItem("giftapp_users", JSON.stringify(users));
        } catch (_) {
            // ignore storage errors in demo mode
        }

        // Attempt to sync user to backend (best-effort, non-blocking)
        try {
            await fetch(`${API_BASE}/api/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, passwordHash: 'N/A', role: 'APPLICANT', name: email.split('@')[0] })
            });
        } catch (_) { /* ignore failures */ }

        // Also put the current session user for immediate sign-in
        sessionStorage.setItem("giftapp_user", JSON.stringify({ email }));
        login(email, "user");
        navigate("/");
    };

    return (
        <div className="login-container card">
            <h2>Create your account</h2>
            {error && <div className="login-error" role="alert">{error}</div>}
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" required />

                <label htmlFor="password">Password</label>
                <input id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter a password" required />

                <label htmlFor="confirm">Confirm Password</label>
                <input id="confirm" type="password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} placeholder="Re-enter password" required />

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;


