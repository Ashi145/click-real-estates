import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("q") || "";
    const type = searchParams.get("type") || "";
    const district = searchParams.get("district") || "";
    const verified = searchParams.get("verified") === "true";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const where: any = {
      isActive: true,
    };

    if (type) where.providerType = type;
    if (district) where.district = district;
    if (verified) where.verificationStatus = "VERIFIED";

    if (query) {
      where.OR = [
        { businessName: { contains: query } },
        { description: { contains: query } },
        { city: { contains: query } },
        { district: { contains: query } },
      ];
    }

    const [providers, total] = await Promise.all([
      prisma.provider.findMany({
        where,
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              avatar: true,
            },
          },
          _count: {
            select: {
              properties: {
                where: { status: "ACTIVE", isActive: true },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.provider.count({ where }),
    ]);

    return NextResponse.json({
      providers: providers.map((p) => ({
        ...p,
        activeListings: p._count.properties,
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching providers:", error);
    return NextResponse.json(
      { error: "Failed to fetch providers" },
      { status: 500 }
    );
  }
}
