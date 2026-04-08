import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddPackageForm from './components/AddPackageForm';
import CapacityStatus from './components/CapacityStatus';
import PackageList from './components/PackageList';
import Alert from './components/Alert';
import './App.css';

const API_BASE_URL = 'https://warehouse-33lv.onrender.com';

function App() {
  const [packages, setPackages] = useState([]);
  const [capacity, setCapacity] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch all packages
  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_BASE_URL);
      setPackages(response.data.data || []);
      setError(null);
    } catch (err) {
      let errorMsg = '❌ Failed to fetch packages';
      
      if (!err.response) {
        errorMsg = '❌ Network error. Please check your connection';
      } else if (err.response?.status === 500) {
        errorMsg = '❌ Server error. Please try again later';
      }
      
      setError(errorMsg);
      console.error('Error fetching packages:', err);
      
      // Clear error after 5 seconds
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  // Fetch capacity status
  const fetchCapacity = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/capacity`);
      setCapacity(response.data.data || {});
    } catch (err) {
      console.error('Failed to fetch capacity:', err);
      // Don't show error message for capacity fetch, just log it
      // as it's not critical to the main functionality
    }
  };

  // Initial load
  useEffect(() => {
    fetchPackages();
    fetchCapacity();
  }, []);

  // Handle add package
  const handleAddPackage = async (packageData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/add`, packageData);
      console.log(response)
      
      // Show success message with details
      setSuccess(`✅ Package "${packageData.trackingNumber}" added successfully!`);
      setError(null);
      
      fetchPackages();
      fetchCapacity();
      
      // Clear success message after 4 seconds
      setTimeout(() => setSuccess(null), 4000);
    } catch (err) {
      let errorMsg = 'Failed to add package';
      
      // Parse specific error messages
      if (err.response?.status === 409) {
        // Capacity exceeded
        const details = err.response?.data?.details;
        if (details) {
          errorMsg = `❌ No space available for ${details.size} packages! (${details.current}/${details.capacity} slots used)`;
        } else {
          errorMsg = '❌ No space available for this package size';
        }
      } else if (err.response?.status === 400) {
        // Validation error
        errorMsg = `⚠️ ${err.response?.data?.error || 'Invalid package data'}`;
      } else if (err.response?.status === 500) {
        errorMsg = '❌ Server error. Please try again later';
      } else if (!err.response) {
        errorMsg = '❌ Network error. Please check your connection';
      }
      
      setError(errorMsg);
      console.error('Error adding package:', err);
      
      // Clear error message after 5 seconds
      setTimeout(() => setError(null), 5000);
    }
  };

  // Handle remove package
  const handleRemovePackage = async (id) => {
    try {
      const removedPackage = packages.find(p => p._id === id);
      const trackingNumber = removedPackage?.trackingNumber || 'Package';
      
      await axios.delete(`${API_BASE_URL}/remove/${id}`);
      
      setSuccess(`✅ ${trackingNumber} removed successfully!`);
      setError(null);
      
      fetchPackages();
      fetchCapacity();
      
      // Clear success message after 4 seconds
      setTimeout(() => setSuccess(null), 4000);
    } catch (err) {
      let errorMsg = 'Failed to remove package';
      
      // Parse specific error messages
      if (err.response?.status === 404) {
        errorMsg = '❌ Package not found. It may have already been removed';
      } else if (err.response?.status === 400) {
        errorMsg = '⚠️ Invalid package ID';
      } else if (err.response?.status === 500) {
        errorMsg = '❌ Server error. Please try again later';
      } else if (!err.response) {
        errorMsg = '❌ Network error. Please check your connection';
      }
      
      setError(errorMsg);
      console.error('Error removing package:', err);
      
      // Clear error message after 5 seconds
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <div className="app">
      <div className="header">
        <h1>📦 Warehouse Package System</h1>
        <p>Manage and track your packages efficiently</p>
      </div>

      <Alert 
        message={error} 
        type="error" 
        onClose={() => setError(null)}
      />
      <Alert 
        message={success} 
        type="success" 
        onClose={() => setSuccess(null)}
      />

      <div className="container">
        <AddPackageForm onAddPackage={handleAddPackage} />
        <CapacityStatus capacity={capacity} />
      </div>

      <PackageList 
        packages={packages} 
        loading={loading}
        onRemovePackage={handleRemovePackage}
      />
    </div>
  );
}

export default App;
