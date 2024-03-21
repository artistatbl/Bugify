// Import dependencies

const { getServerSession } = require('next-auth');
const { NextResponse } = require('next/server'); 


jest.mock('@next-auth/prisma-adapter', () => ({
  PrismaAdapter: jest.fn(),
}));



  // jest.mock('../../app/validationSchemas', () => ({
  //   createGroundSchema: {
  //     safeParse: jest.fn(),
  //   },
  // }));
  
  jest.mock('next/server', () => ({
    NextRequest: jest.fn(),
    NextResponse: {
      json: jest.fn((body, options) => ({ body, options }))
    }
  }));
  
  jest.mock('next-auth', () => ({
    getServerSession: jest.fn()
  }));
  
  jest.mock('next-auth/jwt', () => ({
    getToken: jest.fn()
  }))

  const mockGetServerSession = require('next-auth').getServerSession;
  const mockNextResponse = require('next/server').NextResponse.json;
  const mockNextRequest = require('next/server').NextRequest.json;
  const { createGroundSchema } = require('@/app/validationSchemas');
  const  {POST}  = require('@/app/api/ground/route');



  test('returns 401 if no session is present', async () => {
    mockGetServerSession.mockResolvedValueOnce(null); // Simulate no session
    const request = { json: () => Promise.resolve({}) }; // Simulate empty request body
  
     await POST(request);
    
    expect(mockNextResponse).toHaveBeenCalledWith({}, { status: 401 });
  });
  
  test('returns 400 if validation fails', async () => {
    const request = { json: () => Promise.resolve({}) }; // Simulate empty request body
    await POST(request);
    
    expect(mockNextResponse).toHaveBeenCalledWith({ errors: ['Invalid request body'] }, { status: 400 });
  })
  
  test('returns 400 if request body is invalid', async () => {
    mockGetServerSession.mockResolvedValueOnce({}); // Simulate session presence
    createGroundSchema.safeParse.mockReturnValueOnce({ success: false, error: { flatten: () => ({ errors: 'Some error' }) } });
  
    const request = { json: () => Promise.resolve({}) }; // Simulate invalid request body
    
    const response = await POST(request);
    
    expect(mockNextResponse).toHaveBeenCalledWith({ errors: 'Some error' }, { status: 400 });
  });
  



