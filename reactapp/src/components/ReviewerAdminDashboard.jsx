import React from "react";
import "../styles/ReviewerAdminDashboard.css";

export default function ReviewerAdminDashboard() { 
const stats = {
    newApplications: 3,
    approvedApplications: 5,
    pendingApplications: 2
};

return (
    <div className="reviewer-admin-dashboard">
        {/* Sidebar Navigation */}
        <aside className="sidebar">
            <h3>Menu</h3>
            <ul>
                <li><a href="/application-management">Application Management</a></li>
                <li><a href="/provider-management">Provider Management</a></li>
                <li className="admin-only"><a href="/user-management">User Management (Admin)</a></li>
            </ul>
        </aside>

        {/* Main Content */}
        <main className="dashboard-content">
            <h2>Reviewer / Admin Dashboard</h2>
            <div className="stats-grid">
                <div className="stat-card new">
                    <h4>New Applications</h4>
                    <p>{stats.newApplications}</p>
                </div>
                <div className="stat-card approved">
                    <h4>Approved Applications</h4>
                    <p>{stats.approvedApplications}</p>
                </div>
                <div className="stat-card pending">
                    <h4>Pending Applications</h4>
                    <p>{stats.pendingApplications}</p>
                </div>
            </div>
        </main>
    </div>
);
}