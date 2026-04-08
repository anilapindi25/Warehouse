import React from 'react';

function CapacityStatus({ capacity }) {
  const sizes = ['SMALL', 'MEDIUM', 'LARGE'];

  // ✅ Default capacity (fallback when API not loaded yet)
  const DEFAULT_CAPACITY = {
    SMALL: 5,
    MEDIUM: 3,
    LARGE: 2,
  };

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
          const data = capacity?.[size] || {};

          // ✅ Safe values with fallback
          const used = data.used ?? 0;
          const total = data.total ?? DEFAULT_CAPACITY[size];
          const available = data.available ?? (total - used);

          const percentage = total > 0 ? (used / total) * 100 : 0;

          return (
            <div key={size} className="capacity-item">
              <h3>{size}</h3>

              {/* Progress Bar */}
              <div style={{ marginBottom: '10px' }}>
                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    height: '8px',
                  }}
                >
                  <div
                    style={{
                      backgroundColor: getProgressColor(used, total),
                      width: `${percentage}%`,
                      height: '100%',
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>
              </div>

              {/* Stats */}
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