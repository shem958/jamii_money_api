import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { connectInMemoryDB, closeInMemoryDB } from './setup';

describe('Global E2E Suite (App)', () => {
  let app: INestApplication;
  let server: any;
  let userId: string;
  let walletId: string;
  let chamaId: string;

  beforeAll(async () => {
    await connectInMemoryDB();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

    await app.init();
    server = app.getHttpServer();
  });

  afterAll(async () => {
    await closeInMemoryDB();
    await app.close();
  });

  // 🧍 USERS TESTS
  describe('Users Module', () => {
    it('POST /users → should create a user', async () => {
      const res = await request(server)
        .post('/users')
        .send({
          name: 'John Doe',
          email: 'john@test.com',
          phone: '0700111222',
          password: '123456',
        })
        .expect(201);

      expect(res.body.success).toBe(true);
      userId = res.body.data._id;
    });

    it('GET /users → should return all users', async () => {
      const res = await request(server).get('/users').expect(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });

  // 💰 WALLETS TESTS
  describe('Wallets Module', () => {
    it('POST /wallets → should create a wallet for a user', async () => {
      const res = await request(server)
        .post('/wallets')
        .send({
          userId,
          provider: 'M-Pesa',
          balance: 1000,
        })
        .expect(201);

      expect(res.body.data.provider).toBe('M-Pesa');
      walletId = res.body.data._id;
    });

    it('GET /wallets → should fetch all wallets', async () => {
      const res = await request(server).get('/wallets').expect(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  // 🧾 TRANSACTIONS TESTS
  describe('Transactions Module', () => {
    it('POST /transactions → should create a transaction', async () => {
      const res = await request(server)
        .post('/transactions')
        .send({
          userId,
          amount: 500,
          category: 'Food',
          type: 'expense',
        })
        .expect(201);

      expect(res.body.data.amount).toBe(500);
    });

    it('GET /transactions → should return transactions', async () => {
      const res = await request(server).get('/transactions').expect(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });

  // 🎯 GOALS TESTS
  describe('Goals Module', () => {
    it('POST /goals → should create a goal', async () => {
      const res = await request(server)
        .post('/goals')
        .send({
          userId,
          title: 'Buy a car',
          target: 500000,
          deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        })
        .expect(201);

      expect(res.body.data.title).toBe('Buy a car');
    });

    it('GET /goals → should return user goals', async () => {
      const res = await request(server).get('/goals').expect(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  // 👥 CHAMAS TESTS
  describe('Chamas Module', () => {
    it('POST /chamas → should create a chama', async () => {
      const res = await request(server)
        .post('/chamas')
        .send({ name: 'Savers Club' })
        .expect(201);

      expect(res.body.data.name).toBe('Savers Club');
      chamaId = res.body.data._id;
    });

    it('GET /chamas → should return chamas', async () => {
      const res = await request(server).get('/chamas').expect(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  // 🧍‍♂️ CHAMA MEMBERS TESTS
  describe('Chama Members Module', () => {
    it('POST /chama-members → should add a member', async () => {
      const res = await request(server)
        .post('/chama-members')
        .send({
          userId,
          chamaId,
          role: 'member',
          amount: 1000,
        })
        .expect(201);

      expect(res.body.data.role).toBe('member');
    });

    it('GET /chama-members → should return chama members', async () => {
      const res = await request(server).get('/chama-members').expect(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  // 💬 NUDGES TESTS
  describe('Nudges Module', () => {
    it('POST /nudges → should create a nudge', async () => {
      const res = await request(server)
        .post('/nudges')
        .send({
          userId,
          message: 'Save for your goal!',
          type: 'reminder',
          scheduledAt: new Date(),
        })
        .expect(201);

      expect(res.body.data.message).toBe('Save for your goal!');
    });

    it('GET /nudges → should return nudges', async () => {
      const res = await request(server).get('/nudges').expect(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });
});
