jest.mock('../config/keycloak');

const request = require('supertest');
const app = require('../app');
const { User, Department } = require('../models');
const { sequelize } = require('../config/db');

jest.mock('../models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
  jest.resetAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Users API', () => {
  // GET /api/users
  describe('GET /api/users', () => {
    it('should return all users', async () => {
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
      ];

      User.findAll.mockResolvedValue(mockUsers);

      const response = await request(app).get('/api/users');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(mockUsers.length);
    });

    it('should handle server errors', async () => {
      User.findAll.mockRejectedValue(new Error('Database Error'));

      const response = await request(app).get('/api/users');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
  });

  // GET /api/users/:id
  describe('GET /api/users/:id', () => {
    it('should return a user by ID', async () => {
      const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };

      User.findByPk.mockResolvedValue(mockUser);

      const response = await request(app).get('/api/users/1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
    });

    it('should return 404 if user not found', async () => {
      User.findByPk.mockResolvedValue(null);

      const response = await request(app).get('/api/users/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'User not found' });
    });

    it('should handle server errors', async () => {
      User.findByPk.mockRejectedValue(new Error('Database Error'));

      const response = await request(app).get('/api/users/1');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
  });

  // POST /api/users
  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      Department.findByPk.mockResolvedValue({ id: 1, name: 'HR' });

      const newUser = { name: 'New User', email: 'newuser@example.com', department_id: 1 };

      User.create.mockResolvedValue({ id: 3, ...newUser });

      const response = await request(app)
        .post('/api/users')
        .send(newUser)
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.name).toBe('New User');
    });

    it('should return 400 for missing fields', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({ name: 'Incomplete' })
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Missing required fields' });
    });

    it('should return 400 if email already exists', async () => {
      Department.findByPk.mockResolvedValue({ id: 1, name: 'HR' });
      User.findOne.mockResolvedValue({ id: 2, email: 'existing@example.com' });

      const response = await request(app)
        .post('/api/users')
        .send({
          name: 'Duplicate Email',
          email: 'existing@example.com',
          department_id: 1,
        })
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Email already exists' });
    });
  });

  // PUT /api/users/:id
  describe('PUT /api/users/:id', () => {
    it('should update a user by ID', async () => {
      const mockUser = { id: 1, name: 'Old Name', email: 'old@example.com', update: jest.fn() };

      User.findByPk.mockResolvedValue(mockUser);

      const updatedUser = { name: 'Updated Name', email: 'updated@example.com' };

      const response = await request(app)
        .put('/api/users/1')
        .send(updatedUser)
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(200);
      expect(mockUser.update).toHaveBeenCalledWith(updatedUser);
    });

    it('should return 404 if user not found', async () => {
      User.findByPk.mockResolvedValue(null);

      const response = await request(app)
        .put('/api/users/999')
        .send({ name: 'Updated Name' })
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'User not found' });
    });

    it('should handle server errors', async () => {
      User.findByPk.mockRejectedValue(new Error('Database Error'));

      const response = await request(app)
        .put('/api/users/1')
        .send({ name: 'Updated Name' })
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
  });

  // DELETE /api/users/:id
  describe('DELETE /api/users/:id', () => {
    it('should delete a user by ID', async () => {
      const mockUser = { id: 1, destroy: jest.fn() };

      User.findByPk.mockResolvedValue(mockUser);

      const response = await request(app).delete('/api/users/1');

      expect(response.status).toBe(204);
      expect(mockUser.destroy).toHaveBeenCalled();
    });

    it('should return 404 if user not found', async () => {
      User.findByPk.mockResolvedValue(null);

      const response = await request(app).delete('/api/users/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'User not found' });
    });

    it('should handle server errors', async () => {
      User.findByPk.mockRejectedValue(new Error('Database Error'));

      const response = await request(app).delete('/api/users/1');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
  });
});
