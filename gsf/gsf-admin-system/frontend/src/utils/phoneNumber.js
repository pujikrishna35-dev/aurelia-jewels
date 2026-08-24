export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  const cleaned = ('' + phone).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{5})(\d{5})$/);
  if (match) {
    return `${match[1]} ${match[2]}`;
  }
  return phone;
};

export const maskPhoneNumber = (phone) => {
  if (!phone || phone.length < 10) return phone;
  return `${phone.slice(0, 2)}******${phone.slice(-2)}`;
};
