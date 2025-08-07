import React, { useState, useEffect } from 'react';
import { LockClosedIcon, EyeIcon, EyeSlashIcon, UserIcon, InformationCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import Navbar from "../components/Navbar";
import { authAPI, farmerAuthAPI, adminAuthAPI, utils } from "../utils/eelApi";
import { useNavigate } from 'react-router-dom';
import loginimage from "../assests/LoginCredImage.png"

const LoginCred = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [captchaText, setCaptchaText] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const [captchaError, setCaptchaError] = useState('');
    
    // Get user type and identifier from localStorage
    const userType = localStorage.getItem('userType') || 'taxpayer';
    const userPAN = localStorage.getItem('userPAN') || 'CUOPJ2683J';
    const userEmployeeId = localStorage.getItem('userEmployeeId') || 'ADMIN001';
    const userIdentifier = userType === 'taxpayer' ? userPAN : userEmployeeId;

    // Generate CAPTCHA text
    const generateCaptcha = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptchaText(result);
        setCaptchaInput('');
        setCaptchaError('');
    };

    // Generate CAPTCHA on component mount
    useEffect(() => {
        generateCaptcha();
    }, []);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleShowPasswordClick = () => {
        setShowPassword(!showPassword);
    };

    const handleConfirmationChange = (event) => {
        setIsConfirmed(event.target.checked);
    };

    const handleCaptchaInputChange = (event) => {
        setCaptchaInput(event.target.value);
        setCaptchaError('');
    };

    const handleRefreshCaptcha = () => {
        generateCaptcha();
    };

    const [loginStatus, setLoginStatus] = useState(null);
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleContinue = async () => {
        if (captchaInput.toLowerCase() !== captchaText.toLowerCase()) {
            setCaptchaError('Incorrect CAPTCHA. Please try again.');
            return;
        }

        setIsLoggingIn(true);
        setLoginStatus(null);

        try {
            // Attempt to login with the appropriate API based on user type
            let loginResult;
            if (userType === 'taxpayer') {
                loginResult = await farmerAuthAPI.login({
                    pan_card: userIdentifier,
                    password: password
                });
            } else {
                loginResult = await adminAuthAPI.login({
                    employee_id: userIdentifier,
                    password: password
                });
            }

            if (loginResult.success) {
                // Store the token
                utils.storeToken(loginResult.token);
                
                // Store user profile in localStorage
                if (loginResult.user) {
                    localStorage.setItem('farmer_profile', JSON.stringify(loginResult.user));
                }
                
                setLoginStatus({ success: true, message: 'Login successful!' });
                console.log('Login successful:', loginResult);
                
                // Redirect based on user type
                if (userType === 'admin') {
                    // Redirect to admin dashboard after a short delay
                    setTimeout(() => {
                        navigate('/admin-dashboard');
                    }, 1500);
                } else {
                    // Redirect to farmer dashboard
                    setTimeout(() => {
                        navigate('/farmer-dashboard');
                    }, 1500);
                }
            } else {
                setLoginStatus({ success: false, message: loginResult.message || 'Login failed' });
            }
        } catch (error) {
            console.error('Login error:', error);
            setLoginStatus({ 
                success: false, 
                message: 'Connection error. Please check if the backend is running.' 
            });
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleBack = () => {
        console.log('Going back');
    };

    // Check if all conditions are met for enabling continue button
    const canContinue = isConfirmed && password.length > 0 && captchaInput.toLowerCase() === captchaText.toLowerCase();

    return (
        <div className="min-h-screen bg-gray-100 font-sans antialiased flex flex-col">
             <Navbar />  
             <div className="bg-white py-3 px-6 md:px-12 shadow-sm border-b border-gray-200">
        <nav className="text-sm text-gray-500">
          <a href="#" className="hover:underline">Home</a> &gt; <a href="#" className="hover:underline">Register</a>
        </nav>
      </div>
            <div className="flex-grow flex items-center justify-center">
                <div className="flex bg-white rounded-lg shadow-lg p-8 w-11/12 max-w-5xl h-[750px]">
                    {/* Left Section */}
                    <div className="w-1/2 pr-8 border-r border-gray-200 flex flex-col justify-center">
                        <div className="flex items-center mb-4">
                            <UserIcon className="h-10 w-10 text-gray-500 mr-2" />
                            <div>
                                <h2 className="text-2xl font-bold">Login</h2>
                            </div>
                        </div>

                        <p className="mt-6 mb-2 text-sm font-semibold">Secure Access Message</p>
                        <div className="bg-gray-50 border border-gray-300 rounded p-3 mb-4">
                            <p className="text-lg font-medium">{userType === 'taxpayer' ? 'PAN' : 'Employee ID'}: {userIdentifier}</p>
                        </div>

                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                checked={isConfirmed}
                                onChange={handleConfirmationChange}
                                className="form-checkbox h-6 w-6 text-blue-600 rounded"
                            />
                            <label className="ml-2 text-sm text-gray-700">
                                Please confirm your {userType === 'taxpayer' ? 'PAN' : 'Employee ID'} displayed above *
                            </label>
                            <InformationCircleIcon className="h-4 w-4 text-gray-500 ml-1 cursor-pointer" />
                        </div>

                        <p className="mb-2 text-sm">Enter password for your {userType === 'taxpayer' ? 'taxerpay' : 'admin'} account</p>
                        <div className="relative mb-4">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="Password *"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={handleShowPasswordClick}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                            >
                                {showPassword ? (
                                    <EyeSlashIcon className="h-5 w-5" />
                                ) : (
                                    <EyeIcon className="h-5 w-5" />
                                )}
                            </button>
                        </div>

                        {/* CAPTCHA Section */}
                        <div className="mb-4">
                            <p className="mb-2 text-sm font-semibold">Enter CAPTCHA *</p>
                            <div className="flex items-center space-x-3 mb-2">
                                <div className="flex-1 bg-gray-100 border border-gray-300 rounded p-3 text-center">
                                    <span className="text-xl font-mono font-bold tracking-wider text-gray-800 select-none">
                                        {captchaText}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleRefreshCaptcha}
                                    className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                                    title="Refresh CAPTCHA"
                                >
                                    <ArrowPathIcon className="h-5 w-5" />
                                </button>
                            </div>
                            <input
                                type="text"
                                value={captchaInput}
                                onChange={handleCaptchaInputChange}
                                placeholder="Enter CAPTCHA *"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {captchaError && (
                                <p className="text-red-500 text-sm mt-1">{captchaError}</p>
                            )}
                        </div>

                        <div className="text-blue-600 text-sm mb-6 flex items-center cursor-pointer hover:underline">
                            Forgot Password?
                            <InformationCircleIcon className="h-4 w-4 ml-1" />
                        </div>

                        {/* Login Status Display */}
                        {loginStatus && (
                            <div className={`mb-4 p-3 rounded text-sm ${
                                loginStatus.success 
                                    ? 'bg-green-100 text-green-800 border border-green-200' 
                                    : 'bg-red-100 text-red-800 border border-red-200'
                            }`}>
                                {loginStatus.message}
                            </div>
                        )}

                        <button
                            onClick={handleContinue}
                            disabled={!canContinue || isLoggingIn}
                            className={`w-full py-3 mb-2 rounded font-semibold text-white transition duration-200 ${
                                canContinue && !isLoggingIn ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'
                            }`}
                        >
                            {isLoggingIn ? 'Logging in...' : 'Continue'}
                        </button>

                        <button
                            onClick={handleBack}
                            className="w-full py-3 rounded border border-gray-300 text-gray-800 font-semibold bg-gray-50 hover:bg-gray-100 transition duration-200"
                        >
                            &lt; Back
                        </button>
                    </div>

                    {/* Right Section - Image Placeholder */}
                    <div className="w-1/2 flex items-center justify-center">
                        <div className="text-center">
                            {/* You can import your image here */}
                            <img src={loginimage} alt="Secure Login" className="h-full w-full object-contain" />
                            
                            {/* Adjust the styling of the div above to match the lock image's appearance */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginCred;