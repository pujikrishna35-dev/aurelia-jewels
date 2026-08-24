import apiClient from './api';

export const applicationService = {
  async submitLead(leadData) {
    try {
      const response = await apiClient.post('/leads', leadData);
      return response;
    } catch (err) {
      console.error('Submit lead error:', err);
      return { success: false, message: 'Network error submitting lead application.' };
    }
  },

  async getStudentApplications(phone) {
    try {
      const response = await apiClient.get(`/leads?search=${phone}`);
      return response;
    } catch (err) {
      console.error('Fetch lead applications error:', err);
      return { success: false, data: [] };
    }
  },
};

export default applicationService;
