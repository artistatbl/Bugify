import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/client";
import { createIssueSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
	const body = await request.json();
	const validation = createIssueSchema.safeParse(body);
 
	if (!validation.success) {
	    const formattedErrors = validation.error.flatten();
	    return NextResponse.json({ errors: formattedErrors }, { status: 400 });
	}
 
	// Ensure the 'status' and 'priority' fields are included in the request body
	const newIssue = await prisma.issue.create({
	    data: {
		   title: body.title,
		   description: body.description,
		   status: body.status, // Include 'status' from the request body
		   priority: body.priority, // Include 'priority' from the request body
		   //organizationId: body.organizationId,
		   organizationId: body.organizationId || null,
		   userId: body.userId,
		   

	    },
	});
 
	// Manually serialize the response or selectively pick properties
	const responsePayload = {
	    id: newIssue.id,
	    title: newIssue.title,
	    description: newIssue.description,
	    status: newIssue.status, // Include 'status' in the response
	    priority: newIssue.priority, // Include 'priority' in the response
	    organizationId: newIssue.organizationId,
	    userId: newIssue.userId,
	    
	};
 
	return NextResponse.json(responsePayload, { status: 201 });
 }
 