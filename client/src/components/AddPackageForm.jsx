import React, { useState } from 'react';

function AddPackageForm({ onAddPackage }) {
  const [formData, setFormData] = useState({
    size: 'SMALL',
    trackingNumber: '',
    senderName: '',
    recipientName: '',
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
      !formData.recipientName
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
      recipientName: '',
    });
  };

  return (
    <div className="card">
      <h2>➕ Add New Package</h2>

      <form onSubmit={handleSubmit}>
        <label>Package Size *</label>
        <select name="size" value={formData.size} onChange={handleChange}>
          <option value="SMALL">SMALL (5 slots)</option>
          <option value="MEDIUM">MEDIUM (3 slots)</option>
          <option value="LARGE">LARGE (2 slots)</option>
        </select>

        <label>Tracking Number *</label>
        <input
          type="text"
          name="trackingNumber"
          value={formData.trackingNumber}
          onChange={handleChange}
          placeholder="e.g., PKG-001"
        />

        <label>Sender Name *</label>
        <input
          type="text"
          name="senderName"
          value={formData.senderName}
          onChange={handleChange}
          placeholder="John Sender"
        />

        <label>Recipient Name *</label>
        <input
          type="text"
          name="recipientName"
          value={formData.recipientName}
          onChange={handleChange}
          placeholder="Jane Recipient"
        />

        <button type="submit">Add Package</button>
      </form>
    </div>
  );
}

export default AddPackageForm;