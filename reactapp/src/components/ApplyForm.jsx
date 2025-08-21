import React, { useState } from 'react';
import '../styles/ApplyForm.css';
import { API_BASE } from '../api';

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
        if (!formData.phone) {
            newErrors.phone = 'Phone Number is required';
        } else {
            const phoneOk = /^\+91\d{10}$/.test(formData.phone);
            if (!phoneOk) {
                newErrors.phone = 'Phone number must start with +91 and have exactly 10 digits after it.';
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const res = await fetch(`${API_BASE}/addGift`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    applicantId: formData.applicantId,
                    name: formData.businessName,
                    giftCategories: formData.contactPerson,
                    experience: formData.portfolioLink,
                    specialization: formData.comments,
                    phoneNumber: formData.phone
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
                let message = 'Something went wrong. Please try again.';
                try {
                    const text = await res.text();
                    if (text) message = text;
                } catch (_) { /* ignore */ }
                setErrors({ general: message });
            }
        } catch (error) {
            setErrors({ general: 'Error submitting the form. Try again later.' });
        }
    };

    return (
        <div className="apply-container card">
            <h2>Apply to Become a Gift Provider</h2>
            {successMessage && <div>Application submitted successfully!</div>}
            {errors.general && <div style={{color:'red'}}>{errors.general}</div>}
            <form className="apply-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <label htmlFor="businessName">Name:</label>
                    <input
                        id="businessName"
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => handleChange('businessName', e.target.value)}
                    />
                    {errors.businessName && <p>{errors.businessName}</p>}
                </div>

                <div className="form-row">
                    <label htmlFor="contactPerson">Gift Categories:</label>
                    <input
                        id="contactPerson"
                        type="text"
                        value={formData.contactPerson}
                        onChange={(e) => handleChange('contactPerson', e.target.value)}
                    />
                    {errors.contactPerson && <p>{errors.contactPerson}</p>}
                </div>

                <div className="form-row">
                    <label htmlFor="portfolioLink">Experience (Years):</label>
                    <input
                        id="portfolioLink"
                        type="text"
                        value={formData.portfolioLink}
                        onChange={(e) => handleChange('portfolioLink', e.target.value)}
                    />
                    {errors.portfolioLink && <p>{errors.portfolioLink}</p>}
                </div>

                <div className="form-row">
                    <label htmlFor="comments">Specialization:</label>
                    <input
                        id="comments"
                        type="text"
                        value={formData.comments}
                        onChange={(e) => handleChange('comments', e.target.value)}
                    />
                    {errors.comments && <p>{errors.comments}</p>}
                </div>

                <div className="form-row">
                    <label htmlFor="phone">Phone Number:</label>
                    <input
                        id="phone"
                        type="text"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                    />
                    {errors.phone && <p>{errors.phone}</p>}
                </div>

                <button type="submit">Submit Application</button>
            </form>
        </div>
    );
};

export default ApplyForm;
