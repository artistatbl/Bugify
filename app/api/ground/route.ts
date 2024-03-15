import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/client";
import { createGroundSchema } from "../../validationSchemas";
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
	const body = await request.json();
	const validation = createGroundSchema.safeParse(body);
   
	if (!validation.success) {
	    const formattedErrors = validation.error.flatten();
	    return NextResponse.json({ errors: formattedErrors }, { status: 400 });
	}
   
	// Create a new issue with automatic UUID for 'id'
	const newGround = await prisma.organization.create({
	    data: {
		   id: uuidv4(),
		   name: body.name,

	    },
	});
   
	const responsePayload = {
	    id: newGround.id,
	    name: newGround.name,
	   
	
	    
	};
   
	return NextResponse.json(responsePayload, { status: 201 });
 }
 