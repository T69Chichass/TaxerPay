import React, { useState } from 'react';
import { LockClosedIcon, EyeIcon, EyeSlashIcon, UserIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import Navbar from "../components/Navbar";
// import Navbar from './Navbar'; // This is where you would import your Navbar component

const LoginCred = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    
    // Get PAN from localStorage
    const userPAN = localStorage.getItem('userPAN') || 'CUOPJ2683J';

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleShowPasswordClick = () => {
        setShowPassword(!showPassword);
    };

    const handleConfirmationChange = (event) => {
        setIsConfirmed(event.target.checked);
    };

    const handleContinue = () => {
        console.log('Continuing with password:', password);
    };

    const handleBack = () => {
        console.log('Going back');
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans antialiased flex flex-col">
             <Navbar />  
             <div className="bg-white py-3 px-6 md:px-12 shadow-sm border-b border-gray-200">
        <nav className="text-sm text-gray-500">
          <a href="#" className="hover:underline">Home</a> &gt; <a href="#" className="hover:underline">Register</a>
        </nav>
      </div>
            <div className="flex-grow flex items-center justify-center">
                <div className="flex bg-white rounded-lg shadow-lg p-8 w-11/12 max-w-4xl h-[500px]">
                    {/* Left Section */}
                    <div className="w-1/2 pr-8 border-r border-gray-200 flex flex-col justify-center">
                        <div className="flex items-center mb-4">
                            <UserIcon className="h-10 w-10 text-gray-500 mr-2" />
                            <div>
                                <h2 className="text-2xl font-bold">Login</h2>
                                <p className="text-sm text-gray-500">PAN : {userPAN}</p>
                            </div>
                        </div>

                        <p className="mt-6 mb-2 text-sm font-semibold">Secure Access Message</p>
                        <div className="bg-gray-50 border border-gray-300 rounded p-3 mb-4">
                            <p className="text-lg font-medium">PBEMS</p>
                        </div>

                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                checked={isConfirmed}
                                onChange={handleConfirmationChange}
                                className="form-checkbox h-6 w-6 text-blue-600 rounded"
                            />
                            <label className="ml-2 text-sm text-gray-700">
                                Please confirm your secure access message displayed above *
                            </label>
                            <InformationCircleIcon className="h-4 w-4 text-gray-500 ml-1 cursor-pointer" />
                        </div>

                        <p className="mb-2 text-sm">Enter password for your e-Filing account</p>
                        <div className="relative mb-2">
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

                        <div className="text-blue-600 text-sm mb-6 flex items-center cursor-pointer hover:underline">
                            Forgot Password?
                            <InformationCircleIcon className="h-4 w-4 ml-1" />
                        </div>

                        <button
                            onClick={handleContinue}
                            disabled={!isConfirmed || password.length === 0}
                            className={`w-full py-3 mb-2 rounded font-semibold text-white transition duration-200 ${
                                isConfirmed && password.length > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'
                            }`}
                        >
                            Continue
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
                            {/* <img src="/path/to/your/image.png" alt="Secure Login" className="h-40 w-40 object-contain" /> */}
                            <div className="relative">
                                <div className="rounded-full h-36 w-36 bg-blue-100 flex items-center justify-center">
                                    <LockClosedIcon className="h-20 w-20 text-blue-600" />
                                </div>
                                <p className="absolute bottom-0 left-1/2 -translate-x-1/2 text-3xl -mb-2 text-blue-600">*****</p>
                            </div>
                            {/* Adjust the styling of the div above to match the lock image's appearance */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginCred;