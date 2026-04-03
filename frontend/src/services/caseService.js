import api from './api';

export const caseService = {
  getAllCases: async () => {
    const response = await api.get('/cases');
    return response.data;
  },

  searchCases: async (query) => {
    const response = await api.get(`/cases/search?query=${encodeURIComponent(query)}`);
    return response.data;
  },

  getCaseById: async (id) => {
    const response = await api.get(`/cases/${id}`);
    return response.data;
  },

  createCase: async (caseData) => {
    const response = await api.post('/cases', caseData);
    return response.data;
  },

  updateCase: async (id, caseData) => {
    const response = await api.put(`/cases/${id}`, caseData);
    return response.data;
  },

  deleteCase: async (id) => {
    const response = await api.delete(`/cases/${id}`);
    return response.data;
  }
};
