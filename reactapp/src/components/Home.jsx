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
            <Link to="/apply">
            <button className="button">Become a Gift Provider</button>
            </Link>
        </div>
    );
}

export default Home;