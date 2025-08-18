import React, { useEffect, useMemo, useState } from "react";
import "../styles/Management.css";

function ApplicationManagement() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");

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
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ApplicationManagement;


