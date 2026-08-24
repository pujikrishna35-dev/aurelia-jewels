export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone) => {
  const re = /^[6-9]\d{9}$/;
  return re.test(String(phone));
};

export const validatePan = (pan) => {
  const re = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return re.test(String(pan).toUpperCase());
};

export const validateAadhaar = (aadhaar) => {
  const re = /^\d{12}$/;
  return re.test(String(aadhaar));
};
