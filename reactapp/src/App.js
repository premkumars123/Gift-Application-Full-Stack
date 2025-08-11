import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import ApplyForm from "./components/ApplyForm";
import DisplayGift from "./components/DisplayGift";
import Footer from "./components/Footer";
import ReviewerAdminDashboard from "./components/ReviewerAdminDashboard";
import ProviderManagement from "./components/ProviderManagement";
import LoginRegister from "./components/LoginRegister";
import { AuthProvider } from "./context/AuthContext";

function App() {
    return (
        <AuthProvider>
            <Router>
                <NavBar />
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/apply" element={<ApplyForm />} />
                    <Route path="/getAllGifts" element={<DisplayGift />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Admin & Reviewer Routes */}
                    <Route path="/reviewer-dashboard" element={<ReviewerAdminDashboard />} />
                    <Route path="/provider-dashboard" element={<ProviderDashboard />} />
                </Routes>
                <Footer />
            </Router>
        </AuthProvider>
    );
}

export default App;
