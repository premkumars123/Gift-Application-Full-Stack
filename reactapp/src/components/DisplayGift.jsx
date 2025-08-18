import React, { useEffect, useState } from "react";
import '../styles/DisplayGift.css';

function DisplayGift() {
    const [gifts, setGifts] = useState([]);

    useEffect(() => {
        fetch("/getAllGifts", {
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

    return (
        <div className="table-wrapper card" style={{padding: '12px 0'}}>
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
}

export default DisplayGift;
