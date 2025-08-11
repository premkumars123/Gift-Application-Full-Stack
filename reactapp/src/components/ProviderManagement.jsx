import React from "react";
import "../styles/ProviderManagement.css";

export default function ProviderManagement() {
    const providers = [
        { name: "Provider A", contact: "providerA@email.com" },
        { name: "Provider B", contact: "providerB@email.com" }
    ];

    return (
        <div className="provider-management">
            <h2>Provider Management</h2>
            <input type="text" placeholder="Search providers..." />
            <ul>
                {providers.map((p, index) => (
                    <li key={index}>
                        <strong>{p.name}</strong> - {p.contact}
                    </li>
                ))}
            </ul>
        </div>
    );
}