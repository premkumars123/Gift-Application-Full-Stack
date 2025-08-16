import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './LoginRegister.css';

const LoginRegister = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();
    const { login } = useAuth();

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isLogin && formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        login(formData.email);
        alert(`${isLogin ? 'Logging in' : 'Registering'} with ${formData.email}`);
        navigate('/');
    };

    return (
        <div className="login-register-container">
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                />
                {!isLogin && (
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                )}
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>
            <p onClick={toggleForm} className="toggle">
                {isLogin ? 'Don’t have an account? Register' : 'Already have an account? Login'}
            </p>
        </div>
    );
};

export default LoginRegister;