/**
 * Client Application
 * @module client
 */

class ClientApp {
  constructor(apiUrl = 'http://localhost:3000') {
    this.apiUrl = apiUrl;
    this.version = '1.0.0';
  }

  /**
   * Fetch users from the backend API
   * @returns {Promise<Array>} List of users
   */
  async fetchUsers() {
    try {
      const response = await fetch(`${this.apiUrl}/api/users`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  /**
   * Check API health
   * @returns {Promise<Object>} Health status
   */
  async checkHealth() {
    try {
      const response = await fetch(`${this.apiUrl}/api/health`);
      return await response.json();
    } catch (error) {
      console.error('Error checking health:', error);
      return { status: 'error' };
    }
  }

  /**
   * Render users to console (demo purposes)
   */
  async displayUsers() {
    console.log('Client version:', this.version);
    console.log('Fetching users...');
    const users = await this.fetchUsers();
    console.log('Users:', users);
  }
}

module.exports = ClientApp;

// Run demo if executed directly
if (require.main === module) {
  const app = new ClientApp();
  app.displayUsers();
}
