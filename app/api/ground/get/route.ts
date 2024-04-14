import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { v4 as uuidv4 } from 'uuid';
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";


export  async function GET(request: NextRequest) {
  
	const session = await getServerSession(authOptions);
	if (!session) {
	  return NextResponse.json({}, { status: 401 });
	}
 
	const userGrounds = await prisma.organization.findMany({
	  where: {
	    creatorId: session?.user?.id,
	  },
	  include: {
		  issues: true,
	  }
	});
	
	return NextResponse.json(userGrounds, { status: 200 });
 }