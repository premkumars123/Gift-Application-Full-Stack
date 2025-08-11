import React from "react";
import "../styles/ApplicantDashboard.css";

export default function ApplicantDashboard() {
    const applications = [
        { id: "A101", date: "2025-08-01", status: "Pending" },
        { id: "A102", date: "2025-08-05", status: "Approved" }
    ];

    return (
        <div className="applicant-dashboard">
            <h2>Applicant Dashboard</h2>
            <table>
                <thead>
                    <tr>
                        <th>Application ID</th>
                        <th>Submission Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((app) => (
                        <tr key={app.id}>
                            <td>{app.id}</td>
                            <td>{app.date}</td>
                            <td>{app.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="new-application-btn">Submit New Application</button>
        </div>
    );
}
