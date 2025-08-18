import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/ApplicantDashboard.css";

function ApplicantDashboard() {
	const { user } = useAuth();
	const [gifts, setGifts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		fetch("/getAllGifts", {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		})
			.then((res) => res.json())
			.then((data) => {
				setGifts(Array.isArray(data) ? data : []);
				setLoading(false);
			})
			.catch(() => {
				setError("Unable to load recent applications.");
				setLoading(false);
			});
	}, []);

	const recent = gifts.slice(0, 5);

	return (
		<div className="dashboard-container card">
			<h2>Applicant Dashboard</h2>
			<p className="welcome">Welcome{user?.email ? `, ${user.email}` : ""}!</p>

			<div className="quick-actions">
				<Link className="qa-btn" to="/apply">Apply Now</Link>
				<Link className="qa-btn outline" to="/getAllGifts">View All Gift Applications</Link>
			</div>

			<div className="recent-card">
				<h3>Recent Submissions</h3>
				{loading ? (
					<p>Loading...</p>
				) : error ? (
					<p className="error-text">{error}</p>
				) : recent.length === 0 ? (
					<p>No applications found.</p>
				) : (
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
							{recent.map((g, idx) => (
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

			{/* Informational spec section (non-intrusive, text-only) */}
			<div className="spec-card">
				<h3>Application Submission Form (Applicant View)</h3>
				<p>
					A multi-step form with fields for <strong>Personal Details</strong>, <strong>Business Details</strong>,
					 and <strong>Portfolio/References</strong>.
				</p>
			</div>
		</div>
	);
}

export default ApplicantDashboard;


