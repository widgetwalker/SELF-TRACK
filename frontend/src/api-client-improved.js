/**
 * Enhanced API Client with improved error handling, retry logic, and response parsing
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';
const REQUEST_TIMEOUT = 10000; // 10 seconds
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

class APIError extends Error {
  constructor(message, code, status, data = {}) {
    super(message);
    this.code = code;
    this.status = status;
    this.data = data;
    this.name = 'APIError';
  }
}

class APIClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = this.getToken();
    this.listeners = new Set(); // For progress/status updates
  }

  getToken() {
    try {
      const user = localStorage.getItem('worktrack_user');
      return user ? JSON.parse(user).token : null;
    } catch {
      localStorage.removeItem('worktrack_user');
      return null;
    }
  }

  setToken(token) {
    this.token = token;
    if (token) {
      const user = localStorage.getItem('worktrack_user');
      if (user) {
        const userData = JSON.parse(user);
        userData.token = token;
        localStorage.setItem('worktrack_user', JSON.stringify(userData));
      }
    }
  }

  // Listen to API events (for loading states, errors, etc.)
  on(event, callback) {
    this.listeners.add({ event, callback });
  }

  off(event, callback) {
    this.listeners.forEach(listener => {
      if (listener.event === event && listener.callback === callback) {
        this.listeners.delete(listener);
      }
    });
  }

  emit(event, data) {
    this.listeners.forEach(listener => {
      if (listener.event === event) {
        listener.callback(data);
      }
    });
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async requestWithRetry(endpoint, options = {}, retryCount = 0) {
    try {
      return await this.request(endpoint, options);
    } catch (error) {
      // Retry on network errors and 5xx errors (not on 4xx client errors)
      if (
        retryCount < MAX_RETRIES &&
        (error instanceof TypeError || (error.status && error.status >= 500))
      ) {
        await this.sleep(RETRY_DELAY * (retryCount + 1));
        return this.requestWithRetry(endpoint, options, retryCount + 1);
      }
      throw error;
    }
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    this.emit('request:start', { endpoint });

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const error = new APIError(
          data?.message || `HTTP ${response.status}`,
          data?.code || 'HTTP_ERROR',
          response.status,
          data
        );

        // Handle 401 - token expired
        if (response.status === 401) {
          localStorage.removeItem('worktrack_user');
          this.token = null;
          this.emit('auth:unauthorized');
        }

        this.emit('request:error', { endpoint, error });
        throw error;
      }

      this.emit('request:success', { endpoint, data });
      return data;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof APIError) {
        throw error;
      }

      const apiError = new APIError(
        error.name === 'AbortError' ? 'Request timeout' : error.message,
        error.name === 'AbortError' ? 'TIMEOUT' : 'NETWORK_ERROR',
        null,
        {}
      );

      this.emit('request:error', { endpoint, error: apiError });
      throw apiError;
    }
  }

  // Auth endpoints
  async register(fullName, email, password, role = 'employee') {
    return this.requestWithRetry('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ fullName, email, password, role }),
    });
  }

  async login(email, password) {
    return this.requestWithRetry('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getMe() {
    return this.request('/auth/me');
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST'
    });
  }

  // Task endpoints
  async getTasks(filter = '') {
    return this.request(`/tasks/my${filter ? `?status=${filter}` : ''}`);
  }

  async createTask(taskData) {
    return this.request('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  async updateTaskStatus(taskId, status) {
    return this.request(`/tasks/${taskId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Leave endpoints
  async applyLeave(leaveData) {
    return this.request('/leaves', {
      method: 'POST',
      body: JSON.stringify(leaveData),
    });
  }

  async getMyLeaves() {
    return this.request('/leaves/my');
  }

  // Skills endpoints
  async getMySkills() {
    return this.request('/skills/my');
  }

  async updateMySkills(skills) {
    return this.request('/skills/my', {
      method: 'PUT',
      body: JSON.stringify({ skills }),
    });
  }

  async addMySkill(skill) {
    return this.request('/skills/my', {
      method: 'POST',
      body: JSON.stringify(skill),
    });
  }

  // Salary endpoints
  async getMySalary() {
    return this.request('/salary/my');
  }

  // Notifications endpoints
  async getNotifications() {
    return this.request('/notifications/my');
  }

  async markNotificationAsRead(notificationId) {
    return this.request(`/notifications/${notificationId}/read`, {
      method: 'PUT',
    });
  }

  // ML endpoints
  async predictProductivity(data) {
    return this.request('/ml/productivity', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async predictBurnout(data) {
    return this.request('/ml/burnout', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async detectAnomaly(data) {
    return this.request('/ml/anomaly', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async generateInsights(data) {
    return this.request('/ml/insights', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Analytics endpoints
  async getAnalytics() {
    return this.request('/analytics');
  }

  // Admin endpoints
  async getAdminDashboard() {
    return this.request('/admin/dashboard');
  }

  async getAllEmployees() {
    return this.request('/admin/employees');
  }

  async getEmployeeDetails(employeeId) {
    return this.request(`/admin/employees/${employeeId}`);
  }

  // Health check
  async checkHealth() {
    try {
      return await this.request('/health', { method: 'GET' });
    } catch {
      return { healthy: false };
    }
  }

  async checkMLServiceHealth() {
    try {
      return await this.request('/health/ml-service', { method: 'GET' });
    } catch {
      return { healthy: false, mlService: { status: 'unavailable' } };
    }
  }
}

// Create singleton instance
const apiClient = new APIClient();

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = apiClient;
}
