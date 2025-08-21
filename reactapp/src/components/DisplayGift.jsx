import React, { useEffect, useState, useMemo } from "react";
import '../styles/DisplayGift.css';

function DisplayGift() {
    const [gifts, setGifts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGift, setSelectedGift] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [actionType, setActionType] = useState("");
    const [comments, setComments] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    useEffect(() => {
        fetch("https://8080-becebdeeecebfeacfffeefcfffbafabfbdcaeedf.premiumproject.examly.io/getAllGifts", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched gifts:", data);
                setGifts(data);
            })
            .catch((err) => console.error(err));
    }, []);

    const filteredGifts = useMemo(() => {
        if (!searchQuery.trim()) return gifts;
        const query = searchQuery.toLowerCase();
        return gifts.filter(gift => 
            gift.name?.toLowerCase().includes(query) ||
            gift.giftCategories?.toLowerCase().includes(query) ||
            gift.specialization?.toLowerCase().includes(query) ||
            gift.phoneNumber?.includes(query)
        );
    }, [gifts, searchQuery]);

    const handleAction = (gift, type) => {
        setSelectedGift(gift);
        setActionType(type);
        setComments("");
        setShowModal(true);
    };

    const submitAction = async () => {
        if (!selectedGift) return;

        const endpoint = actionType === 'approve' ? `https://8080-becebdeeecebfeacfffeefcfffbafabfbdcaeedf.premiumproject.examly.io/approveGift/${selectedGift.id}` : `https://8080-becebdeeecebfeacfffeefcfffbafabfbdcaeedf.premiumproject.examly.io/rejectGift/${selectedGift.id}`;
        
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
                // Try to use server response first; fall back to optimistic update
                let updatedFromServer = null;
                try {
                    updatedFromServer = await response.json();
                } catch (_) {
                    // ignore parse errors and fall back
                }

                const nextStatus = actionType === 'approve' ? 'APPROVED' : 'REJECTED';
                setGifts(prevGifts => prevGifts.map(gift => {
                    if (gift.id !== selectedGift.id) return gift;
                    const merged = {
                        ...gift,
                        ...(updatedFromServer || {}),
                        status: (updatedFromServer && updatedFromServer.status) ? updatedFromServer.status : nextStatus,
                        comments: (updatedFromServer && typeof updatedFromServer.comments !== 'undefined') ? updatedFromServer.comments : comments
                    };
                    return merged;
                }));
                setShowModal(false);
                setSelectedGift(null);
                const wasApprove = actionType === 'approve';
                setActionType("");
                setComments("");
                
                // Show success popup
                setSuccessMessage(wasApprove ? "Approved Successfully!" : "Rejected Successfully!");
                setShowSuccess(true);
                console.log('Success popup should show:', wasApprove ? "Approved Successfully!" : "Rejected Successfully!");
                
                // Hide popup after 3 seconds
                setTimeout(() => {
                    setShowSuccess(false);
                    console.log('Hiding success popup');
                }, 3000);
                
                if (wasApprove) {
                    // Navigate to approved list page for easy filtering without Router dependency
                    if (typeof window !== 'undefined' && window.location) {
                        window.location.href = '/approvedGifts';
                    }
                }
            }
        } catch (error) {
            console.error('Error updating gift status:', error);
            // Show error popup for debugging
            setSuccessMessage("Error: " + error.message);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
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
        <div className="table-wrapper card" style={{padding: '12px 0'}}>
            <h2>Submitted Gift Applications</h2>
            
            {/* Search Bar */}
            <div className="search-container">
                <input
                    type="text" class="search-bar"
                    placeholder="Search by name, category, specialization, or phone number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                <div className="search-count">Total: {filteredGifts.length}</div>
            </div>

            <table>
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
                    {filteredGifts.map((gift, index) => (
                        <tr key={index}>
                            <td>{gift.name}</td>
                            <td>{gift.giftCategories}</td>
                            <td>{gift.experience}</td>
                            <td>{gift.specialization}</td>
                            <td>{gift.phoneNumber}</td>
                            <td>{getStatusBadge(gift.status)}</td>
                            <td className="action-buttons">
                                {(!gift.status || gift.status === 'PENDING') && (
                                    <>
                                        <button 
                                            className="btn-approve"
                                            onClick={() => handleAction(gift, 'approve')}
                                        >
                                            Approve
                                        </button>
                                        <button 
                                            className="btn-reject"
                                            onClick={() => handleAction(gift, 'reject')}
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                                {gift.comments && (
                                    <div className="comments-display">
                                        <strong>Comments:</strong> {gift.comments}
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Action Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>{actionType === 'approve' ? 'Approve' : 'Reject'} Application</h3>
                        <p><strong>Applicant:</strong> {selectedGift?.name}</p>
                        <p><strong>Category:</strong> {selectedGift?.giftCategories}</p>
                        
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
            
            {/* Success Popup */}
            {showSuccess && (
                <div className="success-popup" style={{zIndex: 9999}}>
                    <div className="success-content">
                        <span className="success-icon">✓</span>
                        <span className="success-text">{successMessage}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DisplayGift;
