import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/ReviewerAdminDashboard.css";

function ReviewerAdminDashboard() {
    const { user } = useAuth();
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("/getAllGifts", { headers: { "Content-Type": "application/json" } })
            .then((r) => r.json())
            .then((data) => {
                setApps(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => {
                setError("Unable to fetch application summary");
                setLoading(false);
            });
    }, []);

    // Summary counts based on status
    const summary = useMemo(() => {
        const total = apps.length;
        const newCount = apps.filter(a => !a.status || a.status === 'PENDING').length;
        const approvedCount = apps.filter(a => a.status === 'APPROVED').length;
        return { total, newCount, approvedCount };
    }, [apps]);

    const isAdmin = (user?.role || "").toLowerCase() === "admin";

    return (
        <div className="ra-layout">
            <aside className="ra-sidebar">
                <h3>Navigation</h3>
                <ul>
                    <li><Link to="/manage/applications">Application Management</Link></li>
                    <li><Link to="/manage/providers">Provider Management</Link></li>
                    <li className={!isAdmin ? "disabled" : ""}>
                        {isAdmin ? <Link to="#">User Management</Link> : <span>User Management (Admin only)</span>}
                    </li>
                </ul>
            </aside>
            <main className="ra-content">
                <h2>Reviewer/Admin Dashboard</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="error-text">{error}</p>
                ) : (
                    <div className="ra-cards">
                        <div className="ra-card">
                            <div className="label">Total Applications</div>
                            <div className="value">{summary.total}</div>
                        </div>
                        <div className="ra-card">
                            <div className="label">New Applications</div>
                            <div className="value">{summary.newCount}</div>
                        </div>
                        <div className="ra-card">
                            <div className="label">Approved Applications</div>
                            <div className="value">{summary.approvedCount}</div>
                        </div>
                    </div>
                )}
                <div className="ra-help">
                    <p>
                        Tip: Login with <strong>admin@example.com / Admin@123</strong> to enable the
                        User Management item.
                    </p>
                </div>
            </main>
        </div>
    );
}

export default ReviewerAdminDashboard;


