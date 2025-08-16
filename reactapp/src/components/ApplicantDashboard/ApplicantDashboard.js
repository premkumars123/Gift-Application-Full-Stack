import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './ApplicantDashboard.css';

const ApplicantDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch(`/getAllGifts`);
                const data = await response.json();

                // Filter only this user's applications
                const userApps = data.filter(app => app.email === user.email);
                setApplications(userApps);
            } catch (err) {
                console.error("Failed to fetch applications:", err);
            }
        };

        fetchApplications();
    }, [user.email]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleApplyGift = () => {
        navigate('/apply');
    };

    return (
        <div className="applicant-dashboard">
            <h2>Welcome, {user?.email}</h2>

            <div className="dashboard-actions">
                <button onClick={handleApplyGift}>Apply for New Gift</button>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>

            <div className="gift-status">
                <h3>Your Applied Gifts</h3>
                {applications.length === 0 ? (
                    <p>You currently have no applications.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Gift Category</th>
                                <th>Specialization</th>
                                <th>Status</th>
                                <th>Applied Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app, index) => (
                                <tr key={index}>
                                    <td>{app.giftCategories}</td>
                                    <td>{app.specialization}</td>
                                    <td>{app.status}</td>
                                    <td>{app.appliedDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ApplicantDashboard;