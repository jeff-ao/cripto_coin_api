import request from 'supertest';
import app from '../api';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('User routes', () => {
  it('should signup a new user', async () => {
    const res = await request(app)
      .post('/user')
      .send({ email: 'testuser@email.com', password: 'senha123' });
    console.log('Signup response:', res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('email', 'testuser@email.com');
  }, 15000);

  it('should login an existing user', async () => {
    await request(app)
      .post('/user')
      .send({ email: 'testlogin@email.com', password: 'senha123' });
    const res = await request(app)
      .post('/user/login')
      .send({ email: 'testlogin@email.com', password: 'senha123' });
    console.log('Login response:', res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('email', 'testlogin@email.com');
  }, 15000);

  afterAll(async () => {
    await prisma.user.deleteMany({});
    await prisma.$disconnect();
  });
});
