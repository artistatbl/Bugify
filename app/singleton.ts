import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

// Mock the entire Prisma client with jest-mock-extended for deep mocking
const prismaMock: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();

export default prismaMock;