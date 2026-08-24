import React from 'react';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'whatsapp'
  size = 'md', // 'sm' | 'md' | 'lg'
  disabled = false,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: '600',
    borderRadius: '8px',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.2s ease',
    textDecoration: 'none',
    width: fullWidth ? '100%' : 'auto',
  };

  const variantStyles = {
    primary: {
      background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
      color: '#ffffff',
      boxShadow: '0 4px 12px rgba(30, 58, 138, 0.25)',
    },
    secondary: {
      background: '#f1f5f9',
      color: '#1e293b',
      border: '1px solid #cbd5e1',
    },
    outline: {
      background: 'transparent',
      color: '#1e3a8a',
      border: '2px solid #1e3a8a',
    },
    whatsapp: {
      background: '#25D366',
      color: '#ffffff',
      boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
    },
  };

  const sizeStyles = {
    sm: { padding: '6px 14px', fontSize: '13px' },
    md: { padding: '10px 20px', fontSize: '15px' },
    lg: { padding: '14px 28px', fontSize: '17px' },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...baseStyle,
        ...variantStyles[variant],
        ...sizeStyles[size],
      }}
      className={`gsf-btn ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
