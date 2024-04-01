import { NextResponse, NextRequest } from 'next/server'; // Ensure you have imported NextResponse

import prisma from '../../../prisma/client';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';

export async function GET(request: NextRequest) {
    // Adjusted to pass request correctly to getServerSession
    const session = await getServerSession({ req: request, ...authOptions });

    if (!session) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const url = new URL(request.url);
    const q = url.searchParams.get('q');
    console.log(`Search query received: ${q}`);

    if (!q) {
        console.log('No query provided.');
        return new NextResponse(JSON.stringify({ error: 'No query provided' }), { status: 400 });
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
    return new NextResponse(JSON.stringify(results), { status: 200 });
}