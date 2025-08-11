import React, { useState } from "react";
import "../styles/ApplicationForm.css";

export default function ApplicationForm() {
    const [form, setForm] = useState({
        personal: "",
        business: "",
        portfolio: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Application Submitted!");
    };

    return (
        <div className="application-form">
            <h2>Application Submission Form</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="personal" placeholder="Personal Details" onChange={handleChange} required />
                <input type="text" name="business" placeholder="Business Details" onChange={handleChange} required />
                <textarea name="portfolio" placeholder="Portfolio / References" onChange={handleChange} required />
                <button type="submit">Submit Application</button>
            </form>
        </div>
    );
}
