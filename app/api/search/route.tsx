import prisma from '../../../prisma/client';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import { NextResponse } from 'next/server'; // Ensure you have imported NextResponse

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions); // Adjusted to pass request

    if (!session) return new NextResponse(JSON.stringify({}), { status: 401 });

    const url = new URL(request.url);
    const q = url.searchParams.get('q');
    console.log(`Search query received: ${q}`);

    if (!q) {
      console.log('No query provided.');
      return new Response(JSON.stringify([]), { status: 400 });
    }

    // Use the user's ID from the session to filter the search results
    const userId = session.user.id; // Assuming your session object has a user object with an id
    const results = await prisma.issue.findMany({
      where: {
        AND: [
          { title: { startsWith: q } },
          { userId: userId } // Filter by userId to ensure users can only search their own issues
        ]
      },
      include: { _count: true },
      take: 3,
    });

    console.log(`Found ${results.length} results.`);
    return new Response(JSON.stringify(results));
  } catch (error) {
    console.error('Error fetching search results:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}