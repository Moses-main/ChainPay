const request = require('supertest');
const app = require('../server');

describe('Auth Endpoints', () => {
  describe('POST /api/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/register')
        .send({
          userId: 'test_user_123',
          phone: '+1234567890'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.wallet).toBeDefined();
      expect(res.body.wallet.address).toMatch(/^0x[a-fA-F0-9]{40}$/);
    });

    it('should return error for invalid phone', async () => {
      const res = await request(app)
        .post('/api/register')
        .send({
          userId: 'test_user_456',
          phone: 'invalid'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should return existing user if already registered', async () => {
      const userData = {
        userId: 'test_user_789',
        phone: '+1234567890'
      };

      // Register first time
      await request(app).post('/api/register').send(userData);
      
      // Register second time
      const res = await request(app).post('/api/register').send(userData);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toContain('already exists');
    });
  });
});