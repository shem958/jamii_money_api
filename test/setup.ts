// test/setup.ts
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer: MongoMemoryServer;

/**
 * Bootstraps an in-memory MongoDB instance for e2e tests.
 * Automatically connects before tests run and disconnects afterward.
 */
export const connectInMemoryDB = async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri, {
        dbName: 'jamii_money_test',
    });
};

/**
 * Cleans up all collections between tests.
 */
export const clearDatabase = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
};

/**
 * Stops MongoDB and disconnects Mongoose.
 */
export const closeInMemoryDB = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    if (mongoServer) await mongoServer.stop();
};

// Optional global hooks if you want Jest to handle setup automatically:
beforeAll(async () => {
    await connectInMemoryDB();
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await closeInMemoryDB();
});
