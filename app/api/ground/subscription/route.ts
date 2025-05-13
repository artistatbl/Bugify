import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../../prisma/client'; // Adjust the import path as necessary
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions'; // Adjust the import path as necessary

// Explicitly mark this route as dynamic to prevent the static rendering error
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Get the user session
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({}, { status: 401 });
    }

    // Fetch organizations that the user has created or joined
    const organizations = await prisma.organization.findMany({
      where: {
        OR: [
          { creatorId: session.user.id }, // Organizations created by the user
          { // Organizations the user has joined
            subscribers: {
              some: {
                userId: session.user.id,
              },
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        slug: true,
        // Determine if the user is subscribed to the organization
        subscribers: {
          where: {
            userId: session.user.id,
          },
          select: {
            userId: true,
          },
        },
      },
    });

    // Map through organizations to add isSubscribed property
    const organizationsWithSubscriptionStatus = organizations.map((org) => ({
      ...org,
      isSubscribed: org.subscribers.length > 0,
      subscribers: undefined, // Optionally remove subscribers from the final response
    }));

    return NextResponse.json(organizationsWithSubscriptionStatus);
  } catch (error) {
    console.error('Failed to fetch organizations with subscription status:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
