import React from "react";
import { Link } from "react-router-dom";
import '../styles/Home.css';

function Home() {
    return (
        <div>
            <h2>Welcome to the Gift Application</h2>
            <p>
                Join our community of skilled gift providers and bring joy to every occasion!
            </p>
            <div className="center-btn">
            <Link to="/apply" className="btn-link">
                Become a Gift Provider
            </Link>
            </div>
        </div>
    );
}

export default Home;