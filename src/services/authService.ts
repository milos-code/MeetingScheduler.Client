import { axiosClient } from '../api/axiosClient';

export const authService = {
  setTokens(accessToken: string, refreshToken: string) {
    sessionStorage.setItem('token', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);
  },

  getAccessToken() {
    return sessionStorage.getItem('token');
  },

  getRefreshToken() {
    return sessionStorage.getItem('refreshToken');
  },

  clearTokens() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refreshToken');
  },

async refreshTokens(): Promise<string> {
    const refreshToken = this.getRefreshToken();
    const accessToken = this.getAccessToken();

    if (!refreshToken || !accessToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await axiosClient.post('/Authentication/RefreshToken', {
        accessToken,
        refreshToken
      });

      const newAccessToken = response.data.token;
      const newRefreshToken = response.data.refreshToken;

      this.setTokens(newAccessToken, newRefreshToken);
      return newAccessToken;
    } catch (error) {
      this.clearTokens();
      throw error;
    }
  }
};
