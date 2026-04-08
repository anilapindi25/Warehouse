import React, { useEffect } from 'react';

function Alert({ message, type, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const alertClass = type === 'error' ? 'alert-error' : 'alert-success';

  return (
    <div className={`alert ${alertClass}`}>
      <div className="alert-icon">
        {type === 'error' ? '⚠️' : '✓'}
      </div>
      <div className="alert-content">
        <p>{message}</p>
      </div>
      <button 
        className="alert-close" 
        onClick={onClose}
        aria-label="Close alert"
      >
        ✕
      </button>
    </div>
  );
}

export default Alert;
