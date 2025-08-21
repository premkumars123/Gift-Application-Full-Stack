import React, { useEffect, useMemo, useState } from "react";
import "../styles/DisplayGift.css";
import { API_BASE } from "../api";

function ApprovedGiftList() {
    const [gifts, setGifts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`${API_BASE}/getAllGifts`, { headers: { "Content-Type": "application/json" } })
            .then((r) => r.json())
            .then((data) => {
                setGifts(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => {
                setError("Unable to load approved applications.");
                setLoading(false);
            });
    }, []);

    const approved = useMemo(() => {
        const onlyApproved = gifts.filter(g => g.status === 'APPROVED');
        const q = searchQuery.trim().toLowerCase();
        if (!q) return onlyApproved;
        return onlyApproved.filter(gift =>
            gift.name?.toLowerCase().includes(q) ||
            gift.giftCategories?.toLowerCase().includes(q) ||
            gift.specialization?.toLowerCase().includes(q) ||
            String(gift.phoneNumber || '').includes(q)
        );
    }, [gifts, searchQuery]);

    const getStatusBadge = (status) => {
        if (!status || status === 'PENDING') {
            return <span className="status-badge pending">Pending</span>;
        } else if (status === 'APPROVED') {
            return <span className="status-badge approved">Approved</span>;
        } else if (status === 'REJECTED') {
            return <span className="status-badge rejected">Rejected</span>;
        }
        return <span className="status-badge pending">Pending</span>;
    };

    return (
        <div className="table-wrapper card" style={{padding: '12px 0'}}>
            <h2>Approved Gift Applications</h2>

            <div className="search-section">
                <input
                    type="text"
                    placeholder="Search by name, category, specialization, or phone number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                <div className="search-count">Total: {approved.length}</div>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="error-text">{error}</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gift Categories</th>
                            <th>Experience</th>
                            <th>Specialization</th>
                            <th>Phone Number</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {approved.map((gift, index) => (
                            <tr key={index}>
                                <td>{gift.name}</td>
                                <td>{gift.giftCategories}</td>
                                <td>{gift.experience}</td>
                                <td>{gift.specialization}</td>
                                <td>{gift.phoneNumber}</td>
                                <td>{getStatusBadge(gift.status)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ApprovedGiftList;









