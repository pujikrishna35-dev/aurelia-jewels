export const notificationService = {
  success(message) {
    alert(`✅ Success: ${message}`);
  },
  error(message) {
    alert(`⚠️ Error: ${message}`);
  },
  info(message) {
    alert(`ℹ️ Info: ${message}`);
  },
};

export default notificationService;
