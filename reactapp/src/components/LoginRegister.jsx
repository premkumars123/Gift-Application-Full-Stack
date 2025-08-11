import React, { useState } from "react";
import "../styles/LoginRegister.css";

export default function LoginRegister({ onLogin }) {
    const [form, setForm] = useState({ email: "", password: "", role: "applicant" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(form.role); // Pass role to parent for routing
    };

    return (
        <div className="login-container">
            <h2>Login / Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <select name="role" onChange={handleChange}>
                    <option value="applicant">Applicant</option>
                    <option value="reviewer">Reviewer</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
