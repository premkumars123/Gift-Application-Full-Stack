import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ApplyForm.css";

const ApplyForm = () => { 
const [formData, setFormData] = useState({
name: "",
    giftCategories: "",
        experience: "",
            specialization: "",
                phoneNumber: ""
});

const [errors, setErrors] = useState({});
const [successMsg, setSuccessMsg] = useState("");
const navigate = useNavigate();

const validate = () => { 
let newErrors = {};

if (!formData.name) newErrors.name = "Name is required";
if (!formData.giftCategories) newErrors.giftCategories = "Gift categories are required";

if (!formData.experience) {
    newErrors.experience = "Experience is required";
} else if (Number(formData.experience) < 0) {
    newErrors.experience = "Experience must be a positive number";
}

if (!formData.specialization) newErrors.specialization = "Specialization is required";

if (!formData.phoneNumber) {
    newErrors.phoneNumber = "Phone Number is required";
} else if (!formData.phoneNumber.startsWith("+91")) {
    newErrors.phoneNumber = "Phone Number must start with +91";
} else if (formData.phoneNumber.length !== 13) {
    newErrors.phoneNumber = "Phone Number must be 13 digits long, including the country code";
} else if (!/^\+91\d{10}$/.test(formData.phoneNumber)) {
    newErrors.phoneNumber = "Invalid phone number format. It should start with +91 and have exactly 10 digits after it.";
}

setErrors(newErrors);
return Object.keys(newErrors).length === 0;
};

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
        const res = await fetch("http://localhost:5000/addGift", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            setSuccessMsg("Application submitted successfully!");
            setFormData({
                name: "",
                giftCategories: "",
                experience: "",
                specialization: "",
                phoneNumber: ""
            });
            setTimeout(() => navigate("/getAllGifts"), 1500);
        }
    } catch (err) {
        console.error("Error submitting application:", err);
    }
};

return (
    <div className="apply-form-container">
        <h2>Apply to Become a Gift Provider</h2>
        {successMsg && <p className="success">{successMsg}</p>}
        <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <p className="error">{errors.name}</p>}

            <label>Gift Categories:</label>
            <input name="giftCategories" value={formData.giftCategories} onChange={handleChange} />
            {errors.giftCategories && <p className="error">{errors.giftCategories}</p>}

            <label>Experience (Years):</label>
            <input type="number" name="experience" value={formData.experience} onChange={handleChange} />
            {errors.experience && <p className="error">{errors.experience}</p>}

            <label>Specialization:</label>
            <input name="specialization" value={formData.specialization} onChange={handleChange} />
            {errors.specialization && <p className="error">{errors.specialization}</p>}

            <label>Phone Number:</label>
            <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}

            <button type="submit">Submit Application</button>
        </form>
    </div>
);
};

export default ApplyForm;