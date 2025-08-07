import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon, 
  EyeSlashIcon,
  MagnifyingGlassIcon,
  UserPlusIcon,
  KeyIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CurrencyRupeeIcon
} from '@heroicons/react/24/outline';
import Navbar from "./Navbar";
import { adminAuthAPI, farmerAuthAPI } from "../utils/eelApi";
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddFarmer, setShowAddFarmer] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Add Farmer Form State
  const [newFarmer, setNewFarmer] = useState({
    pan_card: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    address: {
      street: '',
      village: '',
      district: '',
      state: '',
      pincode: ''
    },
    land_details: {
      total_acres: '',
      irrigated_acres: '',
      crop_type: ''
    },
    bank_details: {
      account_number: '',
      bank_name: '',
      ifsc_code: ''
    }
  });

  // Change Password Form State
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  // Load farmers on component mount
  useEffect(() => {
    loadFarmers();
  }, []);

  const loadFarmers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('taxerpay_token');
      const response = await adminAuthAPI.getAllFarmers(token);
      
      if (response.success) {
        setFarmers(response.farmers || []);
      } else {
        setError('Failed to load farmers: ' + response.message);
      }
    } catch (error) {
      setError('Error loading farmers: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFarmer = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const farmerData = {
        ...newFarmer,
        password: passwordData.newPassword
      };

      const response = await farmerAuthAPI.register(farmerData);
      
      if (response.success) {
        setSuccess('Farmer added successfully!');
        setShowAddFarmer(false);
        resetForms();
        loadFarmers(); // Reload the list
      } else {
        setError('Failed to add farmer: ' + response.message);
      }
    } catch (error) {
      setError('Error adding farmer: ' + error.message);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const token = localStorage.getItem('taxerpay_token');
      const response = await adminAuthAPI.updateFarmerPassword(token, selectedFarmer._id, passwordData.newPassword);
      
      if (response.success) {
        setSuccess('Password changed successfully!');
        setShowChangePassword(false);
        resetForms();
      } else {
        setError('Failed to change password: ' + response.message);
      }
    } catch (error) {
      setError('Error changing password: ' + error.message);
    }
  };

  const resetForms = () => {
    setNewFarmer({
      pan_card: '',
      password: '',
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      address: { street: '', village: '', district: '', state: '', pincode: '' },
      land_details: { total_acres: '', irrigated_acres: '', crop_type: '' },
      bank_details: { account_number: '', bank_name: '', ifsc_code: '' }
    });
    setPasswordData({ newPassword: '', confirmPassword: '' });
    setSelectedFarmer(null);
  };

  const filteredFarmers = farmers.filter(farmer =>
    farmer.pan_card?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalFarmers: farmers.length,
    activeFarmers: farmers.filter(f => f.status !== 'inactive').length,
    totalTaxCollected: farmers.reduce((sum, f) => sum + (f.total_tax_paid || 0), 0),
    pendingPayments: farmers.filter(f => f.has_pending_tax).length
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased flex flex-col">
      <Navbar />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage farmers and tax payments</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowAddFarmer(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
              >
                <UserPlusIcon className="h-5 w-5" />
                Add New Farmer
              </button>
              <button
                onClick={() => {
                  localStorage.clear();
                  navigate('/');
                }}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserGroupIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Farmers</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalFarmers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <DocumentTextIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Farmers</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeFarmers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <CurrencyRupeeIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Tax Collected</p>
                <p className="text-2xl font-bold text-gray-900">₹{stats.totalTaxCollected.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <KeyIcon className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingPayments}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search farmers by PAN, name, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Farmers Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Farmers List</h3>
          </div>
          
          {loading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading farmers...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PAN</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Land Details</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredFarmers.map((farmer) => (
                    <tr key={farmer._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {farmer.first_name?.[0]}{farmer.last_name?.[0]}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {farmer.first_name} {farmer.last_name}
                            </div>
                            <div className="text-sm text-gray-500">{farmer.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {farmer.pan_card}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {farmer.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {farmer.land_details?.total_acres} acres
                        <br />
                        <span className="text-gray-500">{farmer.land_details?.crop_type}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          farmer.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {farmer.status || 'Active'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedFarmer(farmer);
                              setShowChangePassword(true);
                            }}
                            className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                          >
                            <KeyIcon className="h-4 w-4" />
                            Change Password
                          </button>
                          <button
                            onClick={() => {
                              // View farmer details
                            }}
                            className="text-green-600 hover:text-green-900 flex items-center gap-1"
                          >
                            <EyeIcon className="h-4 w-4" />
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredFarmers.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No farmers found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add Farmer Modal */}
      {showAddFarmer && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Add New Farmer</h3>
              <button
                onClick={() => {
                  setShowAddFarmer(false);
                  resetForms();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleAddFarmer} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">PAN Card *</label>
                  <input
                    type="text"
                    required
                    value={newFarmer.pan_card}
                    onChange={(e) => setNewFarmer({...newFarmer, pan_card: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter PAN"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password *</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-400" /> : <EyeIcon className="h-5 w-5 text-gray-400" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name *</label>
                  <input
                    type="text"
                    required
                    value={newFarmer.first_name}
                    onChange={(e) => setNewFarmer({...newFarmer, first_name: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={newFarmer.last_name}
                    onChange={(e) => setNewFarmer({...newFarmer, last_name: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter last name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={newFarmer.phone}
                    onChange={(e) => setNewFarmer({...newFarmer, phone: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={newFarmer.email}
                    onChange={(e) => setNewFarmer({...newFarmer, email: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Acres</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newFarmer.land_details.total_acres}
                    onChange={(e) => setNewFarmer({
                      ...newFarmer, 
                      land_details: {...newFarmer.land_details, total_acres: e.target.value}
                    })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter total acres"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Crop Type</label>
                  <input
                    type="text"
                    value={newFarmer.land_details.crop_type}
                    onChange={(e) => setNewFarmer({
                      ...newFarmer, 
                      land_details: {...newFarmer.land_details, crop_type: e.target.value}
                    })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Wheat, Cotton"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddFarmer(false);
                    resetForms();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Farmer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePassword && selectedFarmer && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
              <button
                onClick={() => {
                  setShowChangePassword(false);
                  resetForms();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Changing password for: <span className="font-medium">{selectedFarmer.first_name} {selectedFarmer.last_name}</span>
              </p>
              <p className="text-sm text-gray-500">PAN: {selectedFarmer.pan_card}</p>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">New Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-400" /> : <EyeIcon className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password *</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-400" /> : <EyeIcon className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowChangePassword(false);
                    resetForms();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Error/Success Messages */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <div className="flex">
            <div className="flex-1">{error}</div>
            <button onClick={() => setError('')} className="ml-2 text-red-700 hover:text-red-900">
              <span className="sr-only">Close</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {success && (
        <div className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <div className="flex">
            <div className="flex-1">{success}</div>
            <button onClick={() => setSuccess('')} className="ml-2 text-green-700 hover:text-green-900">
              <span className="sr-only">Close</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
