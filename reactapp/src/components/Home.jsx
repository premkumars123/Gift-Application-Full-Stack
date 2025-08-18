import React from "react";
import { Link } from "react-router-dom";
import '../styles/Home.css';

function Home() {
    return (
        <div className="home-container card">
            <h2>Welcome to the Gift Application</h2>
            <p>
                Join our community of skilled gift providers and bring joy to every occasion!
            </p>
            <Link className="apply-link" to="/apply">Become a Gift Provider</Link>
        </div>
    );
}

export default Home;