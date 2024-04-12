// api/invitation/join/route.ts
import { NextResponse, NextRequest } from 'next/server';

import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
 

  // Ensure the user is authenticated
  const session  = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Extract the invitation code from the request body
  const requestBody = await request.json();
  const { invitationCode } = requestBody;
  if (!invitationCode) {
    return NextResponse.json({ error: 'Invitation code is required' }, { status: 400 });
  }

  try {
    // Find the invitation by code
    const invitation = await prisma.invitation.findUnique({
      where: {
        code: invitationCode,
      },
    });

    if (!invitation || invitation.accepted) {
      return NextResponse.json({ error: 'Invalid or already used invitation code' }, { status: 400 });
    }

    // Associate the user with the organization
    await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
      },
    });

    // Optionally, mark the invitation as used
    await prisma.invitation.update({
      where: {
        code: invitationCode,
      },
      data: {
	   accepted: true,
      },
    });

    return NextResponse.json({ message: 'Successfully joined the organization.' });
  } catch (error) {
    console.error('Error joining organization:', error);
    return NextResponse.json({ error: 'Failed to join organization' }, { status: 500 });
  }
}

