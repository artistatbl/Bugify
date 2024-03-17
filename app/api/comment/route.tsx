import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/client";
import { getServerSession } from "next-auth";
import { createCommentSchema } from "../../../app/validationSchemas";
import authOptions from "@/app/auth/authOptions";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = createCommentSchema.safeParse(body);

    // Correctly passing the request to getServerSession
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, { status: 401 });

    if (!validation.success) {
      const formattedErrors = validation.error.flatten();
      return NextResponse.json({ errors: formattedErrors }, { status: 400 });
    }

    const { text, issueId, replyToId } = body;

    // Ensure you have proper null/undefined handling for optional fields
    const commentData = {
      text,
      issueId,
      userId: session.user.id,
      replyToId: replyToId || null,
      // Make sure session.user.id exists and is correct
    };
    if (replyToId) commentData.replyToId = replyToId;

    const comment = await prisma.comment.create({
      data: commentData,
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error('API Error:', error);
    // Returning a general error message, consider logging the error for debugging
    return NextResponse.json({ message: 'An error occurred on the server.' }, { status: 500 });
  }
}
