import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import prisma from '../../../../prisma/client'; // Adjust this import path to where your Prisma client is initialized

export  async function handler( request: NextRequest,) {

 

  // Get the user session
  const session = await getServerSession(authOptions);

	if (!session) return NextResponse.json({}, { status: 401 });
 
	const groundName = request.nextUrl.searchParams.get('groundName');

  try {
    // Assuming you have a relation where grounds are linked to users through a subscription model
    // Adjust the query according to your actual data model
    const subscription = await prisma.subscription.findFirst({
      where: {
        organization: {
          name: groundName as string,
        },
        userId: session.user.id, // Assuming your session object includes the user ID
      },
      include: {
        organization: true, // Include ground details if needed
      },
    });

    if (!subscription) {
      // Subscription not found means user is not part of this ground
      return NextResponse.json({ message: 'Not part of the ground' }, { status: 404 }); // Adjust the status code as neededson({ message: 'Not part of the ground' });
    }

    // User is part of the ground
    return NextResponse.json({ message: 'User is part of the ground', ground: subscription.organization }, { status: 200 });
  } catch (error) {
    console.error('Request error', error);
    return NextResponse.json({ error: 'Error fetching subscription data', details: error }, { status: 500 });
  }
}

