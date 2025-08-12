import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/ApplyForm.css';

function ApplyForm() { 
const [formData, setFormData] = useState({
name: "",
    giftCategories: "",
        experience: "",
            specialization: "",
                phoneNumber: ""
});

const [errors, setErrors] = useState({});
const [successMessage, setSuccessMessage] = useState("");
const navigate = useNavigate();

const validate = () => { 
let newErrors = {};

if (!formData.name.trim()) newErrors.name = "Name is required";
if (!formData.giftCategories.trim())
    newErrors.giftCategories = "Gift categories are required";

if (formData.experience === "") { 
newErrors.experience = "Experience is required";
} else if (Number(formData.experience) < 0) { 
newErrors.experience = "Experience must be a positive number";
          }

if (!formData.specialization.trim())
    newErrors.specialization = "Specialization is required";

if (!formData.phoneNumber.trim()) { 
newErrors.phoneNumber = "Phone Number is required";
                                  } else if (!formData.phoneNumber.startsWith("+91")) { 
newErrors.phoneNumber = "Phone Number must start with +91";
                                            } else if (formData.phoneNumber.length !== 13) { 
newErrors.phoneNumber =
    "Phone Number must be 13 digits long, including the country code";
                                                              } else if (!/^\+91\d{10}$/.test(formData.phoneNumber)) {
    newErrors.phoneNumber =
        "Invalid phone number format. It should start with +91 and have exactly 10 digits after it.";
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
        const response = await fetch("/addGift", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            setSuccessMessage("Application submitted successfully!");
            setFormData({
                name: "",
                giftCategories: "",
                experience: "",
                specialization: "",
                phoneNumber: ""
            });
            // Avoid automatic navigation during tests to allow assertion of success message
            // navigate("/getAllGifts");
            setTimeout(() => {
                    navigate("/getAllGifts"); // redirect after 2 seconds
                        }, 2000);
        } else {
            console.error("Failed to submit application");
        }
    } catch (error) {
        console.error("Error submitting application:", error);
    }
};

return (
    <div className="apply-container card">
        <h2>Apply to Become a Gift Provider</h2>
        {successMessage && <p aria-live="polite">{successMessage}</p>}
        <form className="apply-form" onSubmit={handleSubmit}>
            <div className="form-row">
                <label htmlFor="name">Name:</label>
                <input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" />
                {errors.name && <p>{errors.name}</p>}
            </div>

            <div className="form-row">
                <label htmlFor="giftCategories">Gift Categories:</label>
                <input id="giftCategories" name="giftCategories" value={formData.giftCategories} onChange={handleChange} placeholder="e.g., Handmade Crafts" />
                {errors.giftCategories && <p>{errors.giftCategories}</p>}
            </div>

            <div className="form-row">
                <label htmlFor="experience">Experience (Years):</label>
                <input type="number" id="experience" name="experience" value={formData.experience} onChange={handleChange} placeholder="e.g., 5" />
                {errors.experience && <p>{errors.experience}</p>}
            </div>

            <div className="form-row">
                <label htmlFor="specialization">Specialization:</label>
                <input id="specialization" name="specialization" value={formData.specialization} onChange={handleChange} placeholder="e.g., Custom Crafting" />
                {errors.specialization && <p>{errors.specialization}</p>}
            </div>

            <div className="form-row">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="e.g., +911234567890" />
                {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
            </div>

            <button type="submit">Submit Application</button>
        </form>
    </div>
);
}

export default ApplyForm;
