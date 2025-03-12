jest.mock('../config/keycloak');

const request = require('supertest');
const app = require('../app');
const { Department, User } = require('../models');
const { sequelize } = require('../config/db');

jest.mock('../models');

beforeAll(async () => {
    await sequelize.sync({ force: true });
    jest.spyOn(console, 'error').mockImplementation(() => { }); // Suppress error logs in tests
});

afterAll(async () => {
    await sequelize.close();
    jest.resetAllMocks();
    console.error.mockRestore();
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('Combined Routes API', () => {
    /** GET /api/combined-data */
    describe('GET /api/combined-data', () => {
        it('should return structured combined data', async () => {
            const mockDepartments = [
                {
                    id: 1,
                    name: 'Engineering',
                    manager_id: 101,
                    users: [
                        { id: 201, name: 'Alice', email: 'alice@example.com' },
                        { id: 202, name: 'Bob', email: 'bob@example.com' },
                    ],
                },
                {
                    id: 2,
                    name: 'Marketing',
                    manager_id: 102,
                    users: [],
                },
            ];

            Department.findAll.mockResolvedValue(mockDepartments);

            const response = await request(app).get('/api/combined-data');

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body).toHaveLength(mockDepartments.length);
            expect(response.body[0]).toHaveProperty('manager_id', 101);
            expect(response.body[0].users).toHaveLength(2);
        });

        it('should handle server errors gracefully', async () => {
            Department.findAll.mockRejectedValue(new Error('Database Error'));

            const response = await request(app).get('/api/combined-data');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Database Error' });
        });
    });
});
