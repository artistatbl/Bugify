import { mockDeep, mockReset } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';

// Create a deep mock of the PrismaClient
const prismaMock = mockDeep<PrismaClient>();

// Optional: Reset all mocks before each test
beforeEach(() => {
  mockReset(prismaMock);
});

export default prismaMock;