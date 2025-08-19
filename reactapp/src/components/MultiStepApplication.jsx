import React, { useState } from "react";
import "../styles/MultiStepApplication.css";

function MultiStepApplication() {
	const [step, setStep] = useState(1);
	const [submitting, setSubmitting] = useState(false);
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");

	const [form, setForm] = useState({
		applicantId: 1,
		// Personal Details
		name: "",
		email: "",
		phone: "",
		// Business Details
		businessName: "",
		contactPerson: "",
		portfolioLink: "",
		// Portfolio / References
		comments: ""
	});

	const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

	const next = () => {
		setError("");
		if (step === 1) {
			if (!form.name || !form.email || !form.phone) {
				setError("Please complete all personal details");
				return;
			}
		}
		if (step === 2) {
			if (!form.businessName) {
				setError("Business name is required");
				return;
			}
		}
		setStep((s) => s + 1);
	};

	const back = () => {
		setError("");
		setStep((s) => Math.max(1, s - 1));
	};

	const submit = async () => {
		setSubmitting(true);
		setError("");
		setSuccess("");
		try {
			const res = await fetch("/api/applications", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					applicantId: form.applicantId,
					businessName: form.businessName,
					contactPerson: form.contactPerson,
					portfolioLink: form.portfolioLink,
					status: "PENDING",
					comments: form.comments
				})
			});
			if (!res.ok) {
				const txt = await res.text();
				throw new Error(txt || "Failed to submit application");
			}
			setSuccess("Application submitted successfully!");
			setStep(1);
			setForm({
				applicantId: 1,
				name: "",
				email: "",
				phone: "",
				businessName: "",
				contactPerson: "",
				portfolioLink: "",
				comments: ""
			});
		} catch (e) {
			setError(e.message);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="msa-container card">
			<h2>Application Submission</h2>
			<div className="msa-steps">
				<div className={`step ${step >= 1 ? "active" : ""}`}>1. Personal Details</div>
				<div className={`step ${step >= 2 ? "active" : ""}`}>2. Business Details</div>
				<div className={`step ${step >= 3 ? "active" : ""}`}>3. Portfolio / References</div>
			</div>
			{error && <div className="msa-error" role="alert">{error}</div>}
			{success && <div className="msa-success" role="status">{success}</div>}

			{step === 1 && (
				<div className="msa-form">
					<label htmlFor="name">Full Name</label>
					<input id="name" value={form.name} onChange={update("name")} placeholder="Alex Applicant" />
					<label htmlFor="email">Email</label>
					<input id="email" type="email" value={form.email} onChange={update("email")} placeholder="you@example.com" />
					<label htmlFor="phone">Phone</label>
					<input id="phone" value={form.phone} onChange={update("phone")} placeholder="+911234567890" />
				</div>
			)}

			{step === 2 && (
				<div className="msa-form">
					<label htmlFor="businessName">Business Name</label>
					<input id="businessName" value={form.businessName} onChange={update("businessName")} placeholder="Rose Shop" />
					<label htmlFor="contactPerson">Contact Person</label>
					<input id="contactPerson" value={form.contactPerson} onChange={update("contactPerson")} placeholder="Alex" />
					<label htmlFor="portfolioLink">Portfolio Link</label>
					<input id="portfolioLink" value={form.portfolioLink} onChange={update("portfolioLink")} placeholder="https://portfolio.example.com" />
				</div>
			)}

			{step === 3 && (
				<div className="msa-form">
					<label htmlFor="comments">References / Comments</label>
					<textarea id="comments" rows={4} value={form.comments} onChange={update("comments")} placeholder="Any notes or references"></textarea>
				</div>
			)}

			<div className="msa-actions">
				{step > 1 && (
					<button type="button" onClick={back} className="secondary">Back</button>
				)}
				{step < 3 && (
					<button type="button" onClick={next}>Next</button>
				)}
				{step === 3 && (
					<button type="button" onClick={submit} disabled={submitting}>{submitting ? "Submitting..." : "Submit Application"}</button>
				)}
			</div>
		</div>
	);
}

export default MultiStepApplication;
