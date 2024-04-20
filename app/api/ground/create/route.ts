import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { createIssueSchema } from "../../../validationSchemas";
import { v4 as uuidv4 } from 'uuid';
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { z } from 'zod'



export async function POST(request: NextRequest) {

	try {
		const body = await request.json();
		const {title, description, organizationId} = createIssueSchema.parse(body);
		const session = await getServerSession(authOptions);
		if(!session?.user){
			return NextResponse.json({error: 'Unauthorized'}, {status: 401});
		}
		const userSubscription = await prisma.subscription.findFirst({
			where: {
				userId: session.user.id,
				organizationId,
			},
		});

		if (!userSubscription) {
			return NextResponse.json({ error: 'User is not subscribed to the specified organization' }, { status: 403 });
		}
		
		await prisma.issue.create({
			data: {
				id: uuidv4(),
				title,
				description,
				organizationId,
				userId: session.user.id,
			},
		});
		return new Response('OK')
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      'Could not post to subreddit at this time. Please try later',
      { status: 500 }
    )
  }
}

