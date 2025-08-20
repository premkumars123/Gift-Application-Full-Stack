import React, { useEffect, useMemo, useState } from "react";
import "../styles/Management.css";

function ApplicationManagement() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [actionType, setActionType] = useState("");
    const [comments, setComments] = useState("");

    useEffect(() => {
        fetch("/getAllGifts", { headers: { "Content-Type": "application/json" } })
            .then((r) => r.json())
            .then((data) => {
                setItems(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return items;
        return items.filter((i) =>
            [i.name, i.giftCategories, i.specialization, i.phoneNumber]
                .filter(Boolean)
                .some((v) => String(v).toLowerCase().includes(q))
        );
    }, [items, query]);

    const handleAction = (item, type) => {
        setSelectedItem(item);
        setActionType(type);
        setComments("");
        setShowModal(true);
    };

    const submitAction = async () => {
        if (!selectedItem) return;

        const endpoint = actionType === 'approve' ? `/approveGift/${selectedItem.id}` : `/rejectGift/${selectedItem.id}`;
        
        try {
            const response = await fetch(endpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'text/plain;charset=UTF-8',
                    'Accept': 'application/json',
                },
                body: comments || ""
            });

            if (response.ok) {
                // Use response JSON if available; otherwise optimistic update
                let updatedFromServer = null;
                try {
                    updatedFromServer = await response.json();
                } catch (_) {}

                const nextStatus = actionType === 'approve' ? 'APPROVED' : 'REJECTED';
                setItems(prevItems => prevItems.map(item => {
                    if (item.id !== selectedItem.id) return item;
                    const merged = {
                        ...item,
                        ...(updatedFromServer || {}),
                        status: (updatedFromServer && updatedFromServer.status) ? updatedFromServer.status : nextStatus,
                        comments: (updatedFromServer && typeof updatedFromServer.comments !== 'undefined') ? updatedFromServer.comments : comments
                    };
                    return merged;
                }));
                setShowModal(false);
                setSelectedItem(null);
                setActionType("");
                setComments("");
            }
        } catch (error) {
            console.error('Error updating item status:', error);
        }
    };

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
        <div className="mgmt-container card">
            <h2>Application Management</h2>
            <div className="mgmt-toolbar">
                <input
                    className="mgmt-search"
                    placeholder="Search by name, category, specialization or phone"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <div className="mgmt-count">Total: {filtered.length}</div>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="mgmt-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gift Categories</th>
                            <th>Experience</th>
                            <th>Specialization</th>
                            <th>Phone Number</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((g, idx) => (
                            <tr key={idx}>
                                <td>{g.name}</td>
                                <td>{g.giftCategories}</td>
                                <td>{g.experience}</td>
                                <td>{g.specialization}</td>
                                <td>{g.phoneNumber}</td>
                                <td>{getStatusBadge(g.status)}</td>
                                <td className="action-buttons">
                                    {(!g.status || g.status === 'PENDING') && (
                                        <>
                                            <button 
                                                className="btn-approve"
                                                onClick={() => handleAction(g, 'approve')}
                                            >
                                                Approve
                                            </button>
                                            <button 
                                                className="btn-reject"
                                                onClick={() => handleAction(g, 'reject')}
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                    {g.comments && (
                                        <div className="comments-display">
                                            <strong>Comments:</strong> {g.comments}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Action Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>{actionType === 'approve' ? 'Approve' : 'Reject'} Application</h3>
                        <p><strong>Applicant:</strong> {selectedItem?.name}</p>
                        <p><strong>Category:</strong> {selectedItem?.giftCategories}</p>
                        
                        <div className="comments-section">
                            <label htmlFor="comments">Comments (Optional):</label>
                            <textarea
                                id="comments"
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                                placeholder="Add comments for the applicant..."
                                rows="4"
                            />
                        </div>

                        <div className="modal-actions">
                            <button 
                                className="btn-cancel"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button 
                                className={actionType === 'approve' ? 'btn-approve' : 'btn-reject'}
                                onClick={submitAction}
                            >
                                {actionType === 'approve' ? 'Approve' : 'Reject'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ApplicationManagement;


