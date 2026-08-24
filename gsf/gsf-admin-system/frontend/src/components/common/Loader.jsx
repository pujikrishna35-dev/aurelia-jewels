import React from 'react';

const Loader = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeMap = {
    small: '24px',
    medium: '40px',
    large: '60px',
  };

  const spinnerSize = sizeMap[size] || sizeMap.medium;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        gap: '12px',
      }}
    >
      <div
        style={{
          width: spinnerSize,
          height: spinnerSize,
          border: '3px solid #e2e8f0',
          borderTopColor: '#2563eb',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      {text && (
        <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>
          {text}
        </span>
      )}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
