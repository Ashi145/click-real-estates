import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { propertyId, buyerId, message, contactName, contactEmail, contactPhone } = body;

    // Validate required fields
    if (!propertyId || !buyerId) {
      return NextResponse.json(
        { error: "Property ID and buyer ID are required" },
        { status: 400 }
      );
    }

    // Get property and provider
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      include: { provider: true },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    // Create inquiry
    const inquiry = await prisma.inquiry.create({
      data: {
        propertyId,
        buyerId,
        providerId: property.providerId,
        message,
        contactName,
        contactEmail,
        contactPhone,
        status: "NEW",
        source: "WEBSITE",
      },
    });

    // Create lead for provider
    await prisma.lead.create({
      data: {
        inquiryId: inquiry.id,
        providerId: property.providerId,
        status: "NEW",
      },
    });

    // Update property inquiry count
    await prisma.property.update({
      where: { id: propertyId },
      data: { inquiryCount: { increment: 1 } },
    });

    // Create notification for provider
    await prisma.notification.create({
      data: {
        userId: property.provider.userId,
        type: "LEAD",
        title: "New Inquiry",
        message: `You have a new inquiry for ${property.title}`,
        link: `/dashboard/leads`,
      },
    });

    return NextResponse.json({
      success: true,
      inquiry,
      message: "Inquiry submitted successfully",
    });
  } catch (error) {
    console.error("Error creating inquiry:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}
