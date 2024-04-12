import  prisma  from '../../../../prisma/client'
import  authOptions  from '@/app/auth/authOptions'
import { organizationSubscriptionSchema } from '@/app/validationSchemas'
import { z } from 'zod'
import { getServerSession } from 'next-auth'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { organizationId } = organizationSubscriptionSchema.parse(body)

    // check if user has already subscribed to subreddit
    const subscriptionExists = await prisma.subscription.findFirst({
      where: {
        organizationId,
        userId: session.user.id,
      },
    })

    if (subscriptionExists) {
      return new Response("You've already subscribed to this subreddit", {
        status: 400,
      })
    }

    // create subreddit and associate it with the user
    await prisma.subscription.create({
      data: {
		organizationId,
        userId: session.user.id,
      },
    })

    return new Response(organizationId)
  } catch (error) {
    (error)
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      'Could not subscribe to subreddit at this time. Please try later',
      { status: 500 }
    )
  }
}