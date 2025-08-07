import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock function to simulate Aadhaar API fetch
const fetchAadhaarDetails = async (aadhaarNumber) => {
  // In real use, call the actual Aadhaar API here
  // For now, return mock data
  return {
    aadhaar: aadhaarNumber,
    name: 'SANSKAR',
    phone: '+91 9405015474',
    email: 'sanskarjoshi1805@gmail.com',
    maskedAadhaar: 'XXXXXXXX' + aadhaarNumber.slice(-4),
  };
};

const FarmerDashboard = () => {
  const [farmer, setFarmer] = useState(null);
  const [aadhaarDetails, setAadhaarDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching farmer data from backend (replace with real API call)
    const storedFarmer = JSON.parse(localStorage.getItem('farmer_profile')) || {
      pan_card: 'CUOPJ2683J',
      aadhaar: '123456783380',
      phone: '+91 9405015474',
      email: 'sanskarjoshi1805@gmail.com',
    };
    setFarmer(storedFarmer);
    // Fetch Aadhaar details
    fetchAadhaarDetails(storedFarmer.aadhaar).then(setAadhaarDetails);
  }, []);

  if (!farmer || !aadhaarDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <div className="bg-blue-900 text-white px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-bold tracking-wide">Dashboard</span>
          <nav className="flex gap-6 text-base">
            <span className="font-semibold border-b-2 border-white pb-1">Dashboard</span>
            <span className="hover:underline cursor-pointer">e-File</span>
            <span className="hover:underline cursor-pointer">Authorised Partners</span>
            <span className="hover:underline cursor-pointer">Services</span>
            <span className="hover:underline cursor-pointer">AIS</span>
            <span className="hover:underline cursor-pointer">Pending Actions</span>
            <span className="hover:underline cursor-pointer">Grievances</span>
            <span className="hover:underline cursor-pointer">Help</span>
          </nav>
        </div>
        <div className="text-sm">Session Time <span className="font-mono bg-white text-blue-900 px-2 py-1 rounded">1 4 : 0 3</span></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 flex flex-col md:flex-row gap-8">
        {/* Left Profile Card */}
        <div className="w-full md:w-1/3 bg-white rounded-lg shadow p-6 flex flex-col gap-2">
          <div className="text-lg font-semibold mb-2">Welcome Back, {aadhaarDetails.name}</div>
          <div className="text-gray-700 font-mono text-base">{farmer.pan_card}</div>
          <div className="text-gray-700 font-mono text-base">{aadhaarDetails.maskedAadhaar}</div>
          <div className="text-gray-700 text-base">{aadhaarDetails.phone}</div>
          <div className="text-gray-700 text-base mb-2">{aadhaarDetails.email}</div>
          <div className="flex flex-col gap-1 text-sm">
            <div className="flex items-center justify-between">
              <span>Contact Details</span>
              <button className="text-blue-700 hover:underline">Update</button>
            </div>
            <div className="flex items-center justify-between">
              <span>Bank Account</span>
              <button className="text-blue-700 hover:underline">Update</button>
            </div>
            <div className="flex items-center justify-between">
              <span>Your account is not secure with e-vault</span>
              <button className="text-blue-700 hover:underline">Secure Account</button>
            </div>
          </div>
        </div>

        {/* Right Main Actions */}
        <div className="flex-1 flex flex-col gap-6">
          {/* File Return Card */}
          <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="text-base text-gray-700">File your return for the year ended on <span className="font-semibold">31-Mar-2025</span></div>
              <div className="text-sm text-gray-500">For Assessment Year 2025-26</div>
            </div>
            <div className="flex gap-2">
              <button className="bg-blue-700 text-white px-4 py-2 rounded font-semibold hover:bg-blue-800">File Now</button>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded font-semibold cursor-not-allowed" disabled>Resume Filing</button>
            </div>
          </div>

          {/* Tax Deposit */}
          <div className="bg-white rounded-lg shadow">
            <button className="w-full text-left px-6 py-4 text-lg font-medium text-gray-800 flex items-center justify-between focus:outline-none">
              <span>Tax Deposit</span>
              <span className="text-xl">&#8250;</span>
            </button>
          </div>

          {/* Recent Filed Returns */}
          <div className="bg-white rounded-lg shadow">
            <button className="w-full text-left px-6 py-4 text-lg font-medium text-gray-800 flex items-center justify-between focus:outline-none">
              <span>Recent Filed Returns</span>
              <span className="text-xl">&#8250;</span>
            </button>
          </div>

          {/* Recent Forms Filed */}
          <div className="bg-white rounded-lg shadow">
            <button className="w-full text-left px-6 py-4 text-lg font-medium text-gray-800 flex items-center justify-between focus:outline-none">
              <span>Recent Forms Filed</span>
              <span className="text-xl">&#8250;</span>
            </button>
          </div>

          {/* Income & Tax Estimator */}
          <div className="bg-white rounded-lg shadow">
            <button className="w-full text-left px-6 py-4 text-lg font-medium text-gray-800 flex items-center justify-between focus:outline-none">
              <span>Income & Tax Estimator</span>
              <span className="text-xl">&#128197;</span>
            </button>
          </div>

          {/* Tax Calendar */}
          <div className="bg-white rounded-lg shadow">
            <button className="w-full text-left px-6 py-4 text-lg font-medium text-gray-800 flex items-center justify-between focus:outline-none">
              <span>Tax Calendar</span>
              <span className="text-xl">&#128197;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
