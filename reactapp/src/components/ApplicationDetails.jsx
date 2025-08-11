import React from "react";
import "../styles/ApplicationDetails.css";

export default function ApplicationDetails() {
    return (
        <div className="application-details">
            <h2>Application ID: A101</h2>
            <p><strong>Applicant Name:</strong> John Doe</p>
            <p><strong>Business Details:</strong> Sample Business</p>
            <textarea placeholder="Add comments..."></textarea>
            <div className="action-buttons">
                <button>Approve</button>
                <button>Reject</button>
            </div>
        </div>
    );
}
