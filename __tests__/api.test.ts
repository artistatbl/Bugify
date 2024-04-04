import { describe, expect, it, jest } from '@jest/globals';
import { NextRequest } from 'next/server';
import { POST } from '../app/api/ground/route';
import { Prisma } from '@prisma/client';
import prismaMock from '@/app/singleton';  
// Assuming you have a mock setup for Prisma

// Mocking getServerSession and NextResponse for the tests
jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
}));
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((body) => ({
      body,
      status: jest.fn((statusCode) => ({ statusCode })),
    })),
  },
}));

const { getServerSession } = require('next-auth');
const { NextResponse } = require('next/server');

describe('POST /api/ground', () => {
  it('should create a new ground if under the limit', async () => {
    // Mock session and prisma response
    getServerSession.mockResolvedValue({ user: { id: 'user123' } });
    prismaMock.organization.count.mockResolvedValue(2); // Under the limit
    prismaMock.organization.create.mockResolvedValue({
      id: 'ground123',
      name: 'New Ground',
      creatorId: 'user123',
    });

    const request = new NextRequest('http://localhost/api/ground', {
      method: 'POST',
      body: JSON.stringify({ name: 'New Ground', userId: 'user123' }),
    });

    const response = await POST(request);

    expect(response.body).toEqual({
      id: 'ground123',
      name: 'New Ground',
    });
    expect(response.status).toBe(201);
  });

  it('should return 403 if the user has reached the ground limit', async () => {
    getServerSession.mockResolvedValue({ user: { id: 'user123' } });
    prismaMock.organization.count.mockResolvedValue(3); // At the limit

    const request = new NextRequest('http://localhost/api/ground', {
      method: 'POST',
      body: JSON.stringify({ name: 'Another Ground', userId: 'user123' }),
    });

    const response = await POST(request);

    expect(response.body).toEqual({
      message: "You have reached your limit of free grounds. Please upgrade to create more.",
    });
    expect(response.status).toBe(403);
  });

  // Add more tests here for other scenarios, like invalid input
});