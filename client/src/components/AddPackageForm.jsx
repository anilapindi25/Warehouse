import React, { useState } from 'react';

function AddPackageForm({ onAddPackage }) {
  const [size, setSize] = useState('SMALL');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all required fields
    if (!trackingNumber.trim()) {
      alert('⚠️ Please enter a tracking number');
      return;
    }
    
    if (!senderName.trim()) {
      alert('⚠️ Please enter the sender name');
      return;
    }
    
    if (!recipientName.trim()) {
      alert('⚠️ Please enter the recipient name');
      return;
    }

    // Check for duplicate tracking number
    if (trackingNumber.trim().length < 3) {
      alert('⚠️ Tracking number must be at least 3 characters');
      return;
    }

    setLoading(true);
    try {
      await onAddPackage({
        size,
        trackingNumber: trackingNumber.trim(),
        senderName: senderName.trim(),
        recipientName: recipientName.trim(),
        senderEmail: 'sender@example.com',
        recipientEmail: 'recipient@example.com',
        content: 'Package contents',
      });

      // Reset form after successful submission
      setSize('SMALL');
      setTrackingNumber('');
      setSenderName('');
      setRecipientName('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>➕ Add New Package</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="size">Package Size *</label>
          <select
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
          >
            <option value="SMALL">SMALL (5 slots)</option>
            <option value="MEDIUM">MEDIUM (3 slots)</option>
            <option value="LARGE">LARGE (2 slots)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="tracking">Tracking Number *</label>
          <input
            id="tracking"
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="e.g., PKG-2024-001"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="sender">Sender Name *</label>
          <input
            id="sender"
            type="text"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="John Sender"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="recipient">Recipient Name *</label>
          <input
            id="recipient"
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="Jane Recipient"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Package'}
        </button>
      </form>
    </div>
  );
}

export default AddPackageForm;
