import React from 'react';

function PackageList({ packages, loading, onRemovePackage }) {
  const getSizeBadgeClass = (size) => {
    switch (size) {
      case 'SMALL':
        return 'size-badge size-small';
      case 'MEDIUM':
        return 'size-badge size-medium';
      case 'LARGE':
        return 'size-badge size-large';
      default:
        return 'size-badge';
    }
  };

  const getSizeCardClass = (size) => {
    switch (size) {
      case 'SMALL':
        return 'size-small';
      case 'MEDIUM':
        return 'size-medium';
      case 'LARGE':
        return 'size-large';
      default:
        return '';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return <div className="loading">Loading packages...</div>;
  }

  return (
    <div className="packages-section">
      <h2>📫 Stored Packages ({packages.length})</h2>

      {packages.length === 0 ? (
        <div className="empty-state">
          <h3>No packages stored yet</h3>
          <p>Add your first package using the form above</p>
        </div>
      ) : (
        <div className="package-list">
          {packages.map((pkg) => (
            <div key={pkg._id} className={`package-item ${getSizeCardClass(pkg.size)}`}>
              <div className="package-header">
                <div className="package-info">
                  <div className="package-tracking">
                    {pkg.trackingNumber}
                  </div>
                  <span className={getSizeBadgeClass(pkg.size)}>
                    {pkg.size}
                  </span>
                </div>
              </div>

              <div className="package-details">
                <div className="package-detail">
                  <span>From:</span>
                  <span>{pkg.senderName}</span>
                </div>
                <div className="package-detail">
                  <span>To:</span>
                  <span>{pkg.recipientName}</span>
                </div>
                <div className="package-detail">
                  <span>Status:</span>
                  <span style={{ textTransform: 'capitalize' }}>
                    {pkg.status}
                  </span>
                </div>
                {pkg.createdAt && (
                  <div className="package-detail">
                    <span>Added:</span>
                    <span>{formatDate(pkg.createdAt)}</span>
                  </div>
                )}
              </div>

              <div className="package-footer">
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to remove this package?')) {
                      onRemovePackage(pkg._id);
                    }
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PackageList;
