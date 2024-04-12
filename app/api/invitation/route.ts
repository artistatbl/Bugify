import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
	// Get the user session
	const session = await getServerSession(authOptions);
	
	if (!session || !session.user) {
	  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}
   
	// Extract email and organizationId from the session
	const { email, organizationId } = session.user;
   
	// Validate input
	if (!email || !organizationId) {
	  return NextResponse.json({ error: 'Email and organization ID are required.' }, { status: 400 });
	}
   
	// Generate a unique code for the invitation
	const code = uuidv4();
   
	try {
	  const invitation = await prisma.invitation.create({
	    data: {
		 email,
		 organizationId,
		 code,
	    },
	  });
   
	  // Here, you would typically send the invitation code to the user's email
	  // This step depends on your email service provider
   
	  return NextResponse.json({ message: 'Invitation generated successfully.', invitation });
	} catch (error) {
	  console.error('Error generating invitation:', error);
	  return NextResponse.json({ error: 'Failed to generate invitation.' }, { status: 500 });
	}
   }