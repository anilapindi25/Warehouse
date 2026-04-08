import React, { useState } from 'react';

function AddPackageForm({ onAddPackage }) {
  const [formData, setFormData] = useState({
    size: 'SMALL',
    trackingNumber: '',
    senderName: '',
    senderEmail: '',
    recipientName: '',
    recipientEmail: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Validation
    if (
      !formData.trackingNumber ||
      !formData.senderName ||
      !formData.senderEmail ||
      !formData.recipientName ||
      !formData.recipientEmail
    ) {
      alert('Please fill all fields');
      return;
    }

    // ✅ Send correct data
    onAddPackage(formData);

    // Reset form
    setFormData({
      size: 'SMALL',
      trackingNumber: '',
      senderName: '',
      senderEmail: '',
      recipientName: '',
      recipientEmail: '',
    });
  };

  return (
    <div className="card">
      <h2>➕ Add New Package</h2>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="size">Package Size *</label>
            <select 
              id="size"
              name="size" 
              value={formData.size} 
              onChange={handleChange}
            >
              <option value="SMALL">SMALL (5 slots)</option>
              <option value="MEDIUM">MEDIUM (3 slots)</option>
              <option value="LARGE">LARGE (2 slots)</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="trackingNumber">Tracking Number *</label>
            <input
              id="trackingNumber"
              type="text"
              name="trackingNumber"
              value={formData.trackingNumber}
              onChange={handleChange}
              placeholder="e.g., PKG-001"
            />
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="senderName">Sender Name *</label>
            <input
              id="senderName"
              type="text"
              name="senderName"
              value={formData.senderName}
              onChange={handleChange}
              placeholder="John Sender"
            />
          </div>

          <div className="form-group">
            <label htmlFor="senderEmail">Sender Email *</label>
            <input
              id="senderEmail"
              type="email"
              name="senderEmail"
              value={formData.senderEmail}
              onChange={handleChange}
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="recipientName">Recipient Name *</label>
            <input
              id="recipientName"
              type="text"
              name="recipientName"
              value={formData.recipientName}
              onChange={handleChange}
              placeholder="Jane Recipient"
            />
          </div>

          <div className="form-group">
            <label htmlFor="recipientEmail">Recipient Email *</label>
            <input
              id="recipientEmail"
              type="email"
              name="recipientEmail"
              value={formData.recipientEmail}
              onChange={handleChange}
              placeholder="jane@example.com"
            />
          </div>
        </div>

        <button type="submit" className="btn-primary">Add Package</button>
      </form>
    </div>
  );
}

export default AddPackageForm;