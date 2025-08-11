import React from "react";
import "../styles/ApplicationManagement.css";

export default function ApplicationManagement() {
    const apps = [
        { id: "A101", name: "John Doe", date: "2025-08-01", status: "Pending" },
        { id: "A102", name: "Jane Smith", date: "2025-08-05", status: "Approved" }
    ];

    return (
        <div className="application-management">
            <h2>Application Management</h2>
            <input type="text" placeholder="Search..." />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Applicant</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {apps.map((a) => (
                        <tr key={a.id}>
                            <td>{a.id}</td>
                            <td>{a.name}</td>
                            <td>{a.date}</td>
                            <td>{a.status}</td>
                            <td>
                                <button>View</button>
                                <button>Approve</button>
                                <button>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
