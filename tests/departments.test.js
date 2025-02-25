jest.mock('../config/keycloak');

const request = require('supertest');
const app = require('../app');
const { Department } = require('../models');
const { sequelize } = require('../config/db');

jest.mock('../models');

beforeAll(async () => {
    await sequelize.sync({ force: true });

    // Silence console.error during tests
    jest.spyOn(console, 'error').mockImplementation(() => { });
});

afterAll(async () => {
    await sequelize.close();
    jest.resetAllMocks();

    // Restore console.error after tests
    console.error.mockRestore();
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('Departments API', () => {
    //  GET /api/departments
    describe('GET /api/departments', () => {
        it('should return all departments', async () => {
            const mockDepartments = [
                { id: 1, name: 'HR' },
                { id: 2, name: 'Engineering' }
            ];

            Department.findAll.mockResolvedValue(mockDepartments);

            const response = await request(app).get('/api/departments');

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body).toHaveLength(mockDepartments.length);
        });

        it('should handle server errors', async () => {
            Department.findAll.mockRejectedValue(new Error('Database Error'));

            const response = await request(app).get('/api/departments');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Internal Server Error' });
        });
    });

    //  GET /api/departments/:id
    describe('GET /api/departments/:id', () => {
        it('should get a department by ID', async () => {
            const mockDepartment = { id: 1, name: 'HR' };

            Department.findByPk.mockResolvedValue(mockDepartment);

            const response = await request(app).get('/api/departments/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockDepartment);
        });

        it('should return 404 if department not found', async () => {
            Department.findByPk.mockResolvedValue(null);

            const response = await request(app).get('/api/departments/999');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Department not found' });
        });

        it('should handle server errors', async () => {
            Department.findByPk.mockRejectedValue(new Error('Database Error'));

            const response = await request(app).get('/api/departments/1');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Internal Server Error' });
        });
    });

    //  POST /api/departments
    describe('POST /api/departments', () => {
        it('should create a new department', async () => {
            const newDepartment = {
                name: 'Marketing',
                manager_id: 1
            };

            Department.create.mockResolvedValue({ id: 3, ...newDepartment });

            const response = await request(app)
                .post('/api/departments')
                .send(newDepartment)
                .set('Content-Type', 'application/json');

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.name).toBe('Marketing');
        });

        it('should return 400 for missing fields', async () => {
            const response = await request(app)
                .post('/api/departments')
                .send({ name: 'Incomplete' }) // Missing manager_id
                .set('Content-Type', 'application/json');

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'Missing required fields' });
        });


        it('should handle server errors', async () => {
            Department.create.mockRejectedValue(new Error('Database Error'));

            const newDepartment = {
                name: 'IT',
                manager_id: 1
            };

            const response = await request(app)
                .post('/api/departments')
                .send(newDepartment)
                .set('Content-Type', 'application/json');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Internal Server Error' });
        });
    });

    // DELETE /api/departments/:id
    describe('DELETE /api/departments/:id', () => {
        it('should delete a department', async () => {
            const mockDepartment = { id: 1, name: 'HR', destroy: jest.fn() };

            Department.findByPk.mockResolvedValue(mockDepartment);

            const response = await request(app).delete('/api/departments/1');

            expect(response.status).toBe(204);
            expect(mockDepartment.destroy).toHaveBeenCalled();
        });

        it('should return 404 if department not found for delete', async () => {
            Department.findByPk.mockResolvedValue(null);

            const response = await request(app).delete('/api/departments/999');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Department not found' });
        });

        it('should handle server errors', async () => {
            Department.findByPk.mockRejectedValue(new Error('Database Error'));

            const response = await request(app).delete('/api/departments/1');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Internal Server Error' });
        });
    });
});
