import React from 'react';

function CapacityStatus({ capacity }) {
  const sizes = ['SMALL', 'MEDIUM', 'LARGE'];

  const getProgressColor = (used, total) => {
    const percentage = (used / total) * 100;
    if (percentage < 50) return '#667eea';
    if (percentage < 80) return '#f6a623';
    return '#f56565';
  };

  return (
    <div className="card">
      <h2>📊 Warehouse Capacity</h2>
      <div className="capacity-grid">
        {sizes.map((size) => {
          const data = capacity[size] || { used: 0, available: 0, total: 0 };
          const used = data.used || 0;
          const total = data.total || 0;
          const available = data.available || 0;
          const percentage = total > 0 ? (used / total) * 100 : 0;

          return (
            <div key={size} className="capacity-item">
              <h3>{size}</h3>
              <div style={{ marginBottom: '10px' }}>
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  height: '8px',
                }}>
                  <div style={{
                    backgroundColor: getProgressColor(used, total),
                    width: `${percentage}%`,
                    height: '100%',
                    transition: 'width 0.3s ease',
                  }} />
                </div>
              </div>
              <div className="capacity-stats">
                <div className="stat">
                  <div className="stat-value">{used}</div>
                  <div className="stat-label">Used</div>
                </div>
                <div className="stat">
                  <div className="stat-value">{available}</div>
                  <div className="stat-label">Available</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CapacityStatus;
