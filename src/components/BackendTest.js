import React, { useState, useEffect } from 'react';
import { authAPI, taxAPI, eelAPI, systemAPI, utils } from '../utils/eelApi';

const BackendTest = () => {
  const [healthStatus, setHealthStatus] = useState(null);
  const [apiInfo, setApiInfo] = useState(null);
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Test backend health
  const testHealth = async () => {
    setLoading(true);
    try {
      const result = await systemAPI.healthCheck();
      setHealthStatus(result);
    } catch (error) {
      setHealthStatus({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Test API info
  const testApiInfo = async () => {
    setLoading(true);
    try {
      const result = await systemAPI.getApiInfo();
      setApiInfo(result);
    } catch (error) {
      setApiInfo({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Test Eel connection
  const testEelConnection = async () => {
    setLoading(true);
    try {
      const result = await eelAPI.testConnection();
      setTestResult(result);
    } catch (error) {
      setTestResult({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Test tax calculation
  const testTaxCalculation = async () => {
    setLoading(true);
    try {
      const result = await eelAPI.calculateTax(50000, 'federal');
      setTestResult(result);
    } catch (error) {
      setTestResult({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Backend Connection Test</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Health Check */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Health Check</h3>
          <button
            onClick={testHealth}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Health'}
          </button>
          {healthStatus && (
            <div className="mt-3 p-3 bg-gray-50 rounded">
              <pre className="text-sm">{JSON.stringify(healthStatus, null, 2)}</pre>
            </div>
          )}
        </div>

        {/* API Info */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">API Information</h3>
          <button
            onClick={testApiInfo}
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Get API Info'}
          </button>
          {apiInfo && (
            <div className="mt-3 p-3 bg-gray-50 rounded">
              <pre className="text-sm">{JSON.stringify(apiInfo, null, 2)}</pre>
            </div>
          )}
        </div>

        {/* Eel Connection */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Eel Connection</h3>
          <button
            onClick={testEelConnection}
            disabled={loading}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Eel'}
          </button>
          {testResult && (
            <div className="mt-3 p-3 bg-gray-50 rounded">
              <pre className="text-sm">{JSON.stringify(testResult, null, 2)}</pre>
            </div>
          )}
        </div>

        {/* Tax Calculation */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Tax Calculation</h3>
          <button
            onClick={testTaxCalculation}
            disabled={loading}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
          >
            {loading ? 'Calculating...' : 'Calculate Tax ($50k)'}
          </button>
          {testResult && (
            <div className="mt-3 p-3 bg-gray-50 rounded">
              <pre className="text-sm">{JSON.stringify(testResult, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>

      {/* Connection Status */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Connection Status</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${utils.isEelAvailable() ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
          <span className="text-sm">
            {utils.isEelAvailable() ? 'Eel Available' : 'Standalone Mode'}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Backend URL: http://localhost:8000
        </p>
      </div>
    </div>
  );
};

export default BackendTest;
