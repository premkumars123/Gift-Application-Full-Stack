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
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<LoginRegister />} /> 
                    <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                    <Route path="/apply" element={<PrivateRoute><ApplyForm /></PrivateRoute>} />
                    <Route path="/getAllGifts" element={<DisplayGift />} />
                    <Route path="/applicant-dashboard" element={<PrivateRoute><ApplicantDashboard/></PrivateRoute>} />
                    {/* Placeholder routes removed to prevent undefined component references */}

                    {/* Admin & Reviewer Routes */}
                    {/* <Route path="/reviewer-dashboard" element={<ReviewerAdminDashboard />} /> */}
                    {/* <Route path="/provider-dashboard" element={<ProviderDashboard />} /> */}
                </Routes>
                <Footer />
            </Router>
        </AuthProvider>
    );
}

export default App;
