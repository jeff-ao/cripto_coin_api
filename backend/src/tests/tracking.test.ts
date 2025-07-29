import request from 'supertest';
import app from '../api';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Tracking routes', () => {
  beforeAll(async () => {
    await prisma.coin.upsert({
      where: { symbol: 'bitcoin' },
      update: {},
      create: { name: 'Bitcoin', symbol: 'bitcoin' }
    });
  });

  it('should create a new tracking', async () => {
    const res = await request(app)
      .post('/tracking')
      .send({ email: 'track@email.com', coinSymbol: 'bitcoin', intervalMin: 5 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('coinSymbol', 'bitcoin');
    expect(res.body).toHaveProperty('intervalMin', 5);
  }, 15000);

  afterAll(async () => {
    await prisma.tracking.deleteMany({});
    await prisma.coin.deleteMany({});
    await prisma.$disconnect();
  });
});
