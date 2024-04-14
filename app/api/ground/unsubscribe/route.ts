import prisma from '../../../../prisma/client';
import authOptions from '@/app/auth/authOptions';
import { organizationSubscriptionSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import { getServerSession } from 'next-auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { organizationSlug } = organizationSubscriptionSchema.parse(body);

    // Find the organization by slug to get its ID
    const organization = await prisma.organization.findUnique({
      where: {
        slug: organizationSlug,
      },
    });

    if (!organization) {
      return new Response("Organization not found", { status: 404 });
    }

    // Check if the user has already subscribed or not
    const subscriptionExists = await prisma.subscription.findFirst({
      where: {
        organizationId: organization.id,
        userId: session.user.id,
      },
    });

    if (!subscriptionExists) {
      return new Response(
        "You've not been subscribed to this organization, yet.",
        { status: 400 }
      );
    }

    // Delete the subscription
    await prisma.subscription.delete({
      where: {
        organizationId_userId: {
          organizationId: organization.id,
          userId: session.user.id,
        },
      },
    });

    return new Response(`Successfully unsubscribed from ${organizationSlug}`, { status: 200 });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      'Could not unsubscribe from the organization at this time. Please try later',
      { status: 500 }
    );
  }
}