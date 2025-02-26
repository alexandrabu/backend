jest.mock('../config/keycloak');

const request = require('supertest');
const app = require('../app');
const { DepartmentManager, Department, User } = require('../models');
const { sequelize } = require('../config/db');

jest.mock('../models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(async () => {
  await sequelize.close();
  jest.resetAllMocks();
  console.error.mockRestore();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Managers API', () => {
  /** GET /api/managers */
  describe('GET /api/managers', () => {
    it('should return all managers', async () => {
      const mockManagers = [
        { id: 1, user_id: 1, department_id: 1 },
        { id: 2, user_id: 2, department_id: 2 },
      ];

      DepartmentManager.findAll.mockResolvedValue(mockManagers);

      const response = await request(app).get('/api/managers');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(mockManagers.length);
    });

    it('should handle server errors', async () => {
      DepartmentManager.findAll.mockRejectedValue(new Error('Database Error'));

      const response = await request(app).get('/api/managers');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
  });

  /** GET /api/managers/:id */
  describe('GET /api/managers/:id', () => {
    it('should get a manager by ID', async () => {
      const mockManager = { id: 1, user_id: 1, department_id: 1 };

      DepartmentManager.findByPk.mockResolvedValue(mockManager);

      const response = await request(app).get('/api/managers/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockManager);
    });

    it('should return 404 if manager not found', async () => {
      DepartmentManager.findByPk.mockResolvedValue(null);

      const response = await request(app).get('/api/managers/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Manager not found' });
    });

    it('should return 400 for invalid ID', async () => {
      const response = await request(app).get('/api/managers/invalid');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Invalid ID' });
    });

    it('should handle server errors', async () => {
      DepartmentManager.findByPk.mockRejectedValue(new Error('Database Error'));

      const response = await request(app).get('/api/managers/1');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
  });

  /** POST /api/managers */
  describe('POST /api/managers', () => {
    it('should create a new manager', async () => {
      const newManager = {
        user_id: 1,
        department_id: 2,
        name: 'Charlie',
        email: 'charlie@example.com',
      };

      Department.findByPk.mockResolvedValue({ id: 2, name: 'Engineering' });
      User.findByPk.mockResolvedValue({ id: 1, name: 'Charlie' });
      DepartmentManager.create.mockResolvedValue({ id: 3, ...newManager });

      const response = await request(app)
        .post('/api/managers')
        .send(newManager)
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Charlie');
    });

    it('should return 400 for missing fields', async () => {
      const response = await request(app)
        .post('/api/managers')
        .send({}) // Missing required fields
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Missing required fields' });
    });

    it('should return 400 for invalid fields', async () => {
      const response = await request(app)
        .post('/api/managers')
        .send({ user_id: 'invalid', department_id: 'invalid' })
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Missing required fields' });
    });

    it('should handle server errors', async () => {
      const newManager = {
        user_id: 1,
        department_id: 2,
        name: 'Charlie',
        email: 'charlie@example.com',
      };

      // Mock findByPk to throw an error
      Department.findByPk.mockRejectedValue(new Error('Database Error'));

      const response = await request(app)
        .post('/api/managers')
        .send(newManager)
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
  });

  /** DELETE /api/managers/:id */
  describe('DELETE /api/managers/:id', () => {
    it('should delete a manager', async () => {
      const mockManager = { id: 1, destroy: jest.fn() };

      DepartmentManager.findByPk.mockResolvedValue(mockManager);

      const response = await request(app).delete('/api/managers/1');

      expect(response.status).toBe(204);
      expect(mockManager.destroy).toHaveBeenCalled();
    });

    it('should return 404 if manager not found for delete', async () => {
      DepartmentManager.findByPk.mockResolvedValue(null);

      const response = await request(app).delete('/api/managers/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Manager not found' });
    });

    it('should return 400 for invalid ID', async () => {
      const response = await request(app).delete('/api/managers/invalid');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Invalid ID' });
    });

    it('should handle server errors', async () => {
      DepartmentManager.findByPk.mockRejectedValue(new Error('Database Error'));

      const response = await request(app).delete('/api/managers/1');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
  });
});
