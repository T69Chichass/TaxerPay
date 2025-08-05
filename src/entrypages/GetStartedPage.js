import React, { useState } from 'react';
import getstarted from "../assests/GetStartedPageImage.png";
import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';

// This component represents the "Get Started" page of your application.
const GetStartedPage = () => {
  const [registerAs, setRegisterAs] = useState('taxpayer');
  const [pan, setPan] = useState('');

  // Placeholder for the image on the right
  const imageUrl = "https://placehold.co/400x300/e0e0e0/333333?text=Your+Image+Here";
    const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased flex flex-col">
      {/* Header */}
      <Navbar className="sticky top-0 z-50"/>
     

      {/* Sub-header / Breadcrumb */}
      <div className="bg-white py-3 px-6 md:px-12 shadow-sm border-b border-gray-200">
        <nav className="text-sm text-gray-500">
          <a href="#" className="hover:underline">Home</a> &gt; <a href="#" className="hover:underline">Register</a>
        </nav>
      </div>

      {/* Stepper */}
      <div className="bg-white py-6 px-4 md:px-12 flex justify-center items-center space-x-4 md:space-x-8 border-b border-gray-200">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm md:text-base">1</div>
          <span className="mt-2 text-blue-600 text-xs md:text-sm font-medium">Get Started</span>
        </div>
        <div className="flex-1 border-t-2 border-gray-300 mx-2 md:mx-4"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-sm md:text-base">2</div>
          <span className="mt-2 text-gray-600 text-xs md:text-sm">Fill Details</span>
        </div>
        <div className="flex-1 border-t-2 border-gray-300 mx-2 md:mx-4"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-sm md:text-base">3</div>
          <span className="mt-2 text-gray-600 text-xs md:text-sm">Verify Details</span>
        </div>
        <div className="flex-1 border-t-2 border-gray-300 mx-2 md:mx-4"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-sm md:text-base">4</div>
          <span className="mt-2 text-gray-600 text-xs md:text-sm">Secure Your Account</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
          "Your complete tax information, all in one secure place."
          </h2>
          <p className="text-red-500 text-sm mb-6">* Indicates mandatory fields</p>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Section - Form */}
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Let's Get Started</h3>
              <p className="text-gray-600 mb-4">Register as</p>
              <div className="flex mb-6 rounded-md overflow-hidden border border-blue-600">
                <button
                  className={`flex-1 py-2 px-4 text-sm md:text-base font-medium transition-colors duration-200 ${
                    registerAs === 'taxpayer'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-blue-600 hover:bg-blue-50'
                  }`}
                  onClick={() => setRegisterAs('taxpayer')}
                >
                  Taxpayer
                </button>
                <button
                  className={`flex-1 py-2 px-4 text-sm md:text-base font-medium transition-colors duration-200 ${
                    registerAs === 'others'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-blue-600 hover:bg-blue-50'
                  }`}
                  onClick={() => setRegisterAs('others')}
                >
                  Others
                </button>
              </div>

              <div className="mb-6">
                <label htmlFor="pan" className="block text-gray-700 text-sm font-medium mb-2">
                  PAN <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="pan"
                    className="flex-1 border border-gray-300 rounded-l-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={pan}
                    onChange={(e) => setPan(e.target.value)}
                    placeholder="Enter PAN"
                  />
                  <button className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-r-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75">
                    Validate
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                <button className="flex-1 bg-blue-600 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors duration-200"
                    onClick={() => {
                      // Store PAN in localStorage before navigating
                      localStorage.setItem('userPAN', pan);
                      navigate('/logincred');
                    }}
                    >
                  Continue
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-md shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-colors duration-200">
                  Cancel
                </button>
              </div>
            </div>

            {/* Right Section - Image Placeholder */}
            <div className="flex-1 flex items-center justify-center bg-white rounded-lg p-6 md:p-8">
              <img
                src={getstarted}
                alt="Placeholder for your image"
                className="max-w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer (Optional, based on original image) */}
      <footer className="bg-gray-200 text-center py-4 text-gray-600 text-sm mt-8">
        <p>&copy; 2025 e-Filing. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default GetStartedPage;