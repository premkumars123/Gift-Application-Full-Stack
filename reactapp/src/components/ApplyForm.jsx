import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/ApplyForm.css';

const ApplyForm = () => {
    const [formData, setFormData] = useState({
        applicantId: 1,
        businessName: '',
        contactPerson: '',
        portfolioLink: '',
        comments: '',
        phone: ''
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        setErrors({ ...errors, [field]: null });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!formData.businessName) newErrors.businessName = 'Name is required';
        if (!formData.contactPerson) newErrors.contactPerson = 'Gift categories are required';
        if (!formData.portfolioLink) newErrors.portfolioLink = 'Experience is required';
        if (!formData.comments) newErrors.comments = 'Specialization is required';
        if (!formData.phone) newErrors.phone = 'Phone Number is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const res = await fetch('http://localhost:8080/addGift', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    applicantId: formData.applicantId,
                    name: formData.businessName,
                    giftCategories: formData.contactPerson,
                    experience: formData.portfolioLink,
                    specialization: formData.comments
                })
            });

            if (res.ok) {
                setSuccessMessage('Application submitted successfully!');
                setFormData({
                    applicantId: 1,
                    businessName: '',
                    contactPerson: '',
                    portfolioLink: '',
                    comments: '',
                    phone: ''
                });
                setErrors({});
            } else {
                setErrors({ general: 'Something went wrong. Please try again.' });
            }
        } catch (error) {
            setErrors({ general: 'Error submitting the form. Try again later.' });
        }
    };

    return (
        <div className="page-container">
        <div className="apply-form-container">
            <h2>Apply Form</h2>
            <form onSubmit={handleSubmit}>
                    <label htmlFor="businessName">Name:</label>
                    <input
                        id="businessName"
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => handleChange('businessName', e.target.value)}
                    />
                    {errors.businessName && <p>{errors.businessName}</p>}

                    <label htmlFor="contactPerson">Gift Categories:</label>
                    <input
                        id="contactPerson"
                        type="text"
                        value={formData.contactPerson}
                        onChange={(e) => handleChange('contactPerson', e.target.value)}
                    />
                    {errors.contactPerson && <p>{errors.contactPerson}</p>}

                    <label htmlFor="portfolioLink">Experience (Years):</label>
                    <input
                        id="portfolioLink"
                        type="text"
                        value={formData.portfolioLink}
                        onChange={(e) => handleChange('portfolioLink', e.target.value)}
                    />
                    {errors.portfolioLink && <p>{errors.portfolioLink}</p>}

                    <label htmlFor="comments">Specialization:</label>
                    <input
                        id="comments"
                        type="text"
                        value={formData.comments}
                        onChange={(e) => handleChange('comments', e.target.value)}
                    />
                    {errors.comments && <p>{errors.comments}</p>}


                    <label htmlFor="phone">Phone Number:</label>
                    <input
                        id="phone"
                        type="text"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                    />
                    {errors.phone && <p>{errors.phone}</p>}
                
                <button type="submit">Submit Application</button>
            </form>

            {successMessage && <div>{successMessage}</div>}
            {errors.general && <div style={{color:'red'}}>{errors.general}</div>}
        </div>
        </div>
    );
};

export default ApplyForm;