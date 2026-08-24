const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('gsf_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const api = {
  async login(email, password) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  async getDashboardStats() {
    const res = await fetch(`${API_BASE_URL}/dashboard/stats`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async getLeads(classificationFilter = 'ALL', searchQuery = '') {
    const params = new URLSearchParams();
    if (classificationFilter !== 'ALL') params.append('classification', classificationFilter);
    if (searchQuery) params.append('search', searchQuery);

    const res = await fetch(`${API_BASE_URL}/leads?${params.toString()}`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async getLeadById(id) {
    const res = await fetch(`${API_BASE_URL}/leads/${id}`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async updateLead(id, data) {
    const res = await fetch(`${API_BASE_URL}/leads/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async addNote(id, note) {
    const res = await fetch(`${API_BASE_URL}/leads/${id}/notes`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ note })
    });
    return res.json();
  },

  async addFollowUp(id, followupData) {
    const res = await fetch(`${API_BASE_URL}/leads/${id}/follow-up`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(followupData)
    });
    return res.json();
  },

  async getFollowUps() {
    const res = await fetch(`${API_BASE_URL}/follow-ups`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async postStudentUpdate(id, message, visibleToStudent = true) {
    const res = await fetch(`${API_BASE_URL}/leads/${id}/student-update`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ message, visibleToStudent })
    });
    return res.json();
  },

  async updateStudentDocument(id, documentName, status, visibleToStudent = true) {
    const res = await fetch(`${API_BASE_URL}/leads/${id}/student-documents`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ documentName, status, visibleToStudent })
    });
    return res.json();
  },

  async getCmsData(key) {
    const res = await fetch(`${API_BASE_URL}/cms/${key}`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async updateCmsData(key, data) {
    const res = await fetch(`${API_BASE_URL}/cms/${key}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ data })
    });
    return res.json();
  },

  async getAnalytics() {
    const res = await fetch(`${API_BASE_URL}/analytics/stats`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async createLeadManual(data) {
    const res = await fetch(`${API_BASE_URL}/leads/manual`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async getBranches() {
    const res = await fetch(`${API_BASE_URL}/branches`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async createBranch(data) {
    const res = await fetch(`${API_BASE_URL}/branches`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async updateBranch(id, data) {
    const res = await fetch(`${API_BASE_URL}/branches/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async deleteBranch(id) {
    const res = await fetch(`${API_BASE_URL}/branches/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  }
};
