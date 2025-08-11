import React, { useEffect, useState } from "react";
import "./DisplayGift.css";

const DisplayGift = () => {
    const [gifts, setGifts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/getAllGifts", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
            .then((res) => res.json())
            .then((data) => setGifts(data))
            .catch((err) => console.error("Error fetching gifts:", err));
    }, []);

    return (
        <div className="gift-table-container">
            <h2>Submitted Gift Applications</h2>
            <table>
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
                    {gifts.map((gift, index) => (
                        <tr key={index}>
                            <td>{gift.name}</td>
                            <td>{gift.giftCategories}</td>
                            <td>{gift.experience}</td>
                            <td>{gift.specialization}</td>
                            <td>{gift.phoneNumber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DisplayGift;