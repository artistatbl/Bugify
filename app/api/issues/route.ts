import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/client";
import { createIssueSchema } from "../../validationSchemas";
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
	const body = await request.json();
	const validation = createIssueSchema.safeParse(body);
   
	if (!validation.success) {
	    const formattedErrors = validation.error.flatten();
	    return NextResponse.json({ errors: formattedErrors }, { status: 400 });
	}
   
	// Create a new issue with automatic UUID for 'id'
	const newIssue = await prisma.issue.create({
	    data: {
		   id: uuidv4(),
		   title: body.title,
		   description: body.description,
		   status: body.status, // Assumes 'status' is included in the request body
		   priority: body.priority, // Assumes 'priority' is included in the request body
		   organizationId: body.organizationId || null, // Handle optional organizationId
		   userId: body.userId, 
		   assignedToUserId: body.assignedToUserId, 
		   // Assumes 'userId' is provided in the request body
	    },
	});
   
	// Manually serialize the response or selectively pick properties
	const responsePayload = {
	    id: newIssue.id,
	    title: newIssue.title,
	    description: newIssue.description,
	    status: newIssue.status,
	    priority: newIssue.priority,
	    organizationId: newIssue.organizationId,
	    userId: newIssue.userId,
	    createdAt: newIssue.createdAt,
	    updatedAt: newIssue.updatedAt,
	    assignedToUser: newIssue.assignedToUserId,
	    assignedToUserId: newIssue.assignedToUserId,
	    
	};
   
	return NextResponse.json(responsePayload, { status: 201 });
 }
 