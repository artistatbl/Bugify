import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/client";
import { createIssueSchema } from "@/app/validationSchemas";

export async function POST(request: NextRequest){
	console.log('POST request received', request.method);

	const body =  await request.json();
	console.log('Request body:', body);

	 const validation = createIssueSchema.safeParse(body);
	 console.log('Validation result:', validation);

	 if (!validation.success)
	//  console.log('Validation failed', validation.error.format());

	 return NextResponse.json(validation.error.format, {status: 400})

	const newIssue = await prisma.issue.create({
		data: {title: body.title, description: body.description}
	})
	return NextResponse.json(newIssue, {status: 201});
}