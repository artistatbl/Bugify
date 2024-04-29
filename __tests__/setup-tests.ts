import { afterAll, beforeAll, beforeEach, afterEach } from "vitest";

import { PrismaClient } from '@prisma/client';

// Mocking the Prisma client
const prismaMock = new PrismaClient();

vi.mock('@prisma/client', () => {
  return {
    PrismaClient: vi.fn(() => prismaMock)
  };
});

// Mocking NextAuth session handling
vi.mock('next-auth', () => ({
  getServerSession: vi.fn()
}));

// Mocking custom toast hooks
vi.mock('@/lib/hooks/use-toast', () => ({
  toast: vi.fn()
}));

// Set up global configuration for tes
beforeEach(() => {
  // Clear all mocks before each test
  vi.clearAllMocks();
});

// Global setup and teardown for Prisma
global.beforeAll(async () => {
  await prismaMock.$connect();
});

global.afterAll(async () => {
  await prismaMock.$disconnect();
});


