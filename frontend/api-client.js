// API Client for all frontend-backend communication
const API_BASE_URL = '/api';
const REQUEST_TIMEOUT = 10000; // 10 seconds

class APIClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = this.getToken();
  }

  getToken() {
    const user = localStorage.getItem('worktrack_user');
    return user ? JSON.parse(user).token : null;
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

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      console.error(`API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(fullName, email, password, role) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ fullName, email, password, role }),
    });
  }

  async getMe() {
    return this.request('/auth/me');
  }

  // Task endpoints
  async getTasks(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    return this.request(`/tasks${query ? '?' + query : ''}`);
  }

  async getTask(id) {
    return this.request(`/tasks/${id}`);
  }

  async createTask(data) {
    return this.request('/tasks', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTask(id, data) {
    return this.request(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getMyTasks() {
    return this.request('/tasks/my');
  }

  async updateTaskStatus(id, data) {
    return this.request(`/tasks/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Dashboard endpoints
  async getDashboard() {
    return this.request('/dashboard');
  }

  // ML endpoints
  async runProductivityML() {
    return this.request('/ml/productivity', { method: 'POST' });
  }

  async runBurnoutDetection() {
    return this.request('/ml/burnout', { method: 'POST' });
  }

  async runAnomalyDetection() {
    return this.request('/ml/anomaly', { method: 'POST' });
  }

  async getPerformanceInsights() {
    return this.request('/ml/insights', { method: 'POST' });
  }

  // Leave endpoints
  async getLeaves() {
    return this.request('/leaves');
  }

  async createLeave(data) {
    return this.request('/leaves', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMyLeaves() {
    return this.request('/leaves/my');
  }

  async applyLeave(data) {
    return this.request('/leaves', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getAllLeaves() {
    return this.request('/leaves');
  }

  async updateLeaveStatus(id, data) {
    return this.request(`/leaves/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Analytics endpoints
  async getAnalytics() {
    return this.request('/analytics');
  }

  // Notification endpoints
  async getNotifications() {
    return this.request('/notifications');
  }

  // Skill endpoints
  async getMySkills() {
    return this.request('/skills/my');
  }

  async updateMySkills(data) {
    return this.request('/skills/my', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getAllSkills() {
    return this.request('/skills/all');
  }

  // Notification endpoints
  async getMyNotifications() {
    return this.request('/notifications/my');
  }

  async markNotificationAsRead(id) {
    return this.request(`/notifications/${id}/read`, {
      method: 'PUT',
    });
  }

  // Salary endpoints
  async getMySalary() {
    return this.request('/salary/my');
  }

  async createSalary(data) {
    return this.request('/salary', {
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
    return this.request('/admin/dashboard', {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  async getProductivityOverview() {
    return this.request('/ml/admin/productivity');
  }

  async getBurnoutOverview() {
    return this.request('/ml/admin/burnout');
  }

  async getAnomalyOverview() {
    return this.request('/ml/admin/anomaly');
  }

  async getAllEmployees() {
    return this.request('/admin/employees');
  }

  async getEmployeeProfile(id) {
    return this.request(`/admin/employees/${id}`);
  }

  async getEmployeeAnalytics(id) {
    return this.request(`/admin/employees/${id}/analytics`);
  }
}

const api = new APIClient();
