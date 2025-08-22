// API Endpoints configuration
const API_BASE_URL = 'https://api.thoughtpro.com/v1'; // Replace with your actual API URL

export const Endpoints = {
  // Authentication endpoints
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh`,
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
    VERIFY_EMAIL: `${API_BASE_URL}/auth/verify-email`,
  },

  // User endpoints
  USER: {
    PROFILE: `${API_BASE_URL}/user/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/user/profile`,
    CHANGE_PASSWORD: `${API_BASE_URL}/user/change-password`,
    DELETE_ACCOUNT: `${API_BASE_URL}/user/delete`,
    UPLOAD_AVATAR: `${API_BASE_URL}/user/avatar`,
  },

  // App-specific endpoints (customize based on your app needs)
  MENTAL_HEALTH: {
    ASSESSMENTS: `${API_BASE_URL}/assessments`,
    SESSIONS: `${API_BASE_URL}/sessions`,
    THERAPISTS: `${API_BASE_URL}/therapists`,
    RESOURCES: `${API_BASE_URL}/resources`,
    MOOD_TRACKING: `${API_BASE_URL}/mood-tracking`,
  },

  // General endpoints
  GENERAL: {
    SUPPORT: `${API_BASE_URL}/support`,
    FEEDBACK: `${API_BASE_URL}/feedback`,
    CONTACT: `${API_BASE_URL}/contact`,
    FAQ: `${API_BASE_URL}/faq`,
  },
};

export default Endpoints;
