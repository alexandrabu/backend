const request = require('supertest');
const app = require('../app'); x
let server;

beforeAll((done) => {
  server = app.listen(0, () => {
    console.log('Test server running');
    done();
  });
});

afterAll((done) => {
  server.close(() => {
    console.log('Test server closed');
    done();
  });
});

describe('API Endpoints Testing', () => {
  it('GET /api/public should return public message', async () => {
    const res = await request(server).get('/api/public');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'This is a public route.');
  }, 30000); 

  it('GET /api/protected should return 403 without authentication', async () => {
    const res = await request(server).get('/api/protected');
    expect(res.statusCode).toEqual(403);
  }, 30000); 

  it('GET /api/users should return 403 without authentication', async () => {
    const res = await request(server).get('/api/users');
    expect(res.statusCode).toEqual(403);
  }, 30000); 

  it('GET /api/unknown should return 404', async () => {
    const res = await request(server).get('/api/unknown');
    expect(res.statusCode).toEqual(404);
  }, 30000); 
});
