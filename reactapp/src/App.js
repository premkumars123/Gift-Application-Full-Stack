import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApplicantDashboard from "./components/ApplicantDashboard/ApplicantDashboard";
import PrivateRoute from "./components/PrivateRoute";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import ApplyForm from "./components/ApplyForm";
import DisplayGift from "./components/DisplayGift";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

function App() {
    return (
        <AuthProvider>
            <Router>
                <NavBar />
                <main className="app-main">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/apply" element={<ApplyForm />} />
                        <Route path="/getAllGifts" element={<DisplayGift />} />
                        {/* Placeholder routes removed to prevent undefined component references */}

                        {/* Admin & Reviewer Routes */}
                        {/* <Route path="/reviewer-dashboard" element={<ReviewerAdminDashboard />} /> */}
                        {/* <Route path="/provider-dashboard" element={<ProviderDashboard />} /> */}
                    </Routes>
                </main>
                <Footer />
            </Router>
        </AuthProvider>
    );
}

export default App;
