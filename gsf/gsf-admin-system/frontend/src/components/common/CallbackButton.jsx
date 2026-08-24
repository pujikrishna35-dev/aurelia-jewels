import React from 'react';
import { Phone } from 'lucide-react';

const CallbackButton = ({ onClick, text = "Talk to a Loan Expert", className = "" }) => {
  return (
    <button className={`btn btn-primary ${className}`} onClick={onClick}>
      <Phone size={18} />
      <span>{text}</span>
    </button>
  );
};

export default CallbackButton;
