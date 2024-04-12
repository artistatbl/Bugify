import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/client";
import { createGroundSchema } from "../../validationSchemas";
import { v4 as uuidv4 } from 'uuid';
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function POST(request: NextRequest) {


	const session = await getServerSession(authOptions);

	if (!session) return NextResponse.json({}, { status: 401 });


    const body = await request.json();
    const validation = createGroundSchema.safeParse(body);

    if (!validation.success) {
        const formattedErrors = validation.error.flatten();
        return NextResponse.json({ errors: formattedErrors }, { status: 400 });
    }
    // const userId = session?.user?.id; // This needs to be obtained from your authentication logic
    // if (!userId) return NextResponse.json({}, { status: 401 });

    // First, count the existing grounds created by this user
    const count = await prisma.organization.count({
        where: {
            creatorId: session.user.id,
        },
    });

    const FREE_GROUND_LIMIT = 3;
    if (count >= FREE_GROUND_LIMIT) {
        // User has reached the limit of free grounds
        return NextResponse.json({
            message: "You have reached your limit of free grounds. Please upgrade to create more.",
        }, { status: 403 });
    }

    // Proceed to create a new ground if under the limit
    const newGround = await prisma.organization.create({
        data: {
            id: uuidv4(),
            name: body.name,
            // Make sure to associate the ground with its creator
            creatorId: session.user.id, // This should match the column name in your database
        },
    });
    // create aslo has to be subscribe to the ground
    await prisma.subscription.create({
        data: {
            organizationId: newGround.id,
            userId: session.user.id,
        },
    })

   

    const responsePayload = {
        id: newGround.id,
        name: newGround.name,
    };

    return NextResponse.json(responsePayload, { status: 201 });
}

