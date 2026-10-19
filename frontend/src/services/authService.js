import { apiClient, handleMockOrApiCall } from './api';

export const authService = {
  login: async (email, password) => {
    const mockUser = {
      token: 'jwt_mock_token_987654321',
      user: {
        id: 101,
        name: email.split('@')[0].toUpperCase(),
        email: email,
        role: 'STUDENT',
        department: 'Computer Science & Engineering',
        semester: '7th Semester',
      },
    };
    return handleMockOrApiCall(
      () => apiClient.post('/auth/login', { email, password }),
      mockUser
    );
  },

  register: async (userData) => {
    const mockRegisterResponse = {
      message: 'User registered successfully!',
      userId: 102,
    };
    return handleMockOrApiCall(
      () => apiClient.post('/auth/register', userData),
      mockRegisterResponse
    );
  },
};
