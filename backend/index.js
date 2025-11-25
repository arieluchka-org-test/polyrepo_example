/**
 * Backend API Server
 * @module backend
 */

const express = require('express');

class BackendServer {
  constructor(port = 3000) {
    this.port = port;
    this.app = express();
    this.setupRoutes();
  }

  setupRoutes() {
    this.app.get('/api/health', (req, res) => {
      res.json({ status: 'healthy', version: '1.0.0' });
    });

    this.app.get('/api/users', (req, res) => {
      res.json([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ]);
    });
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Backend server running on port ${this.port}`);
    });
  }
}

module.exports = BackendServer;

// Start server if run directly
if (require.main === module) {
  const server = new BackendServer();
  server.start();
}
