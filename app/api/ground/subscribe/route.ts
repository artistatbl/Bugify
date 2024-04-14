import prisma from '../../../../prisma/client'
import authOptions from '@/app/auth/authOptions'
import { organizationSubscriptionSchema } from '@/app/validationSchemas'
import { z } from 'zod'
import { getServerSession } from 'next-auth'

export async function POST(req: Request) {
  try {
    const session = await getServerSession( authOptions)

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { organizationSlug } = organizationSubscriptionSchema.parse(body)

    // Find the organization by slug
    const organization = await prisma.organization.findUnique({
      where: {
        slug: organizationSlug,
       
    
      },
    });

    if (!organization) {
      return new Response("Organization not found", { status: 404 });
    }
  


    // Check if user has already subscribed to the organization
    const subscriptionExists = await prisma.subscription.findFirst({
      where: {
        organizationId: organization.id, // Use the found organization's ID
        userId: session.user.id,
      },
    })

    if (subscriptionExists) {
      return new Response("You've already subscribed to this organization", {
        status: 400,
      })
    }

    // Create subscription and associate it with the user
    await prisma.subscription.create({
      data: {
        organizationId: organization.id, // Use the found organization's ID
        userId: session.user.id,
      },
    })

    return new Response(organizationSlug, { status: 200 })
  } catch (error) {
    console.error('Subscription error:', error) // Enhanced error logging

    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      `Could not subscribe to the organization at this time. Please try later. Error:`,
      { status: 500 }
    )
  }
}