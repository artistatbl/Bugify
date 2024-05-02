import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET(request: NextRequest, { params }: { params?: { orgId?: string } }) {
  try {
    if (!params?.orgId) {
      return NextResponse.json({
        error: "Invalid request: Missing organization ID parameter",
      }, { status: 400 });
    }

    // Check if there are any subscriptions for the given organization
    const subscriptions = await prisma.subscription.findMany({
      where: { organizationId: params.orgId },
      include: { user: true }
    });

    if (!subscriptions.length) {
      return NextResponse.json({
        error: `No subscribed users found for the specified organization`,
      }, { status: 404 });
    }

    // Extract users from the subscriptions
    const users = subscriptions.map(subscription => subscription.user);

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching subscribed users:', error);
    return NextResponse.json({
      error: "Internal server error.",
    }, { status: 500 });
  }
}