import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("q") || "";
    const listingType = searchParams.get("type") || "";
    const propertyType = searchParams.get("category") || "";
    const district = searchParams.get("district") || "";
    const minPrice = searchParams.get("minPrice")
      ? parseFloat(searchParams.get("minPrice")!)
      : undefined;
    const maxPrice = searchParams.get("maxPrice")
      ? parseFloat(searchParams.get("maxPrice")!)
      : undefined;
    const bedrooms = searchParams.get("bedrooms")
      ? parseInt(searchParams.get("bedrooms")!)
      : undefined;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const sort = searchParams.get("sort") || "newest";

    // Build where clause
    const where: any = {
      status: "ACTIVE",
      isActive: true,
    };

    if (listingType) where.listingType = listingType;
    if (propertyType) where.propertyType = propertyType;
    if (district) where.district = district;
    if (bedrooms) where.bedrooms = { gte: bedrooms };

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    if (query) {
      where.OR = [
        { title: { contains: query } },
        { description: { contains: query } },
        { area: { contains: query } },
        { city: { contains: query } },
        { district: { contains: query } },
      ];
    }

    // Build orderBy
    let orderBy: any = { createdAt: "desc" };
    switch (sort) {
      case "price-asc":
        orderBy = { price: "asc" };
        break;
      case "price-desc":
        orderBy = { price: "desc" };
        break;
      case "popular":
        orderBy = { viewCount: "desc" };
        break;
    }

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        include: {
          provider: {
            select: {
              businessName: true,
              providerType: true,
              verificationStatus: true,
            },
          },
        },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.property.count({ where }),
    ]);

    return NextResponse.json({
      properties,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // In production, verify authentication and authorization here
    const property = await prisma.property.create({
      data: {
        providerId: body.providerId,
        title: body.title,
        slug: body.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
        description: body.description,
        propertyType: body.propertyType,
        listingType: body.listingType,
        price: body.price,
        currency: body.currency || "UGX",
        latitude: body.latitude,
        longitude: body.longitude,
        address: body.address,
        area: body.area,
        city: body.city,
        district: body.district,
        region: body.region,
        bedrooms: body.bedrooms,
        bathrooms: body.bathrooms,
        landSize: body.landSize,
        buildingSize: body.buildingSize,
        features: body.features ? JSON.stringify(body.features) : null,
        status: "PENDING",
      },
    });

    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error("Error creating property:", error);
    return NextResponse.json(
      { error: "Failed to create property" },
      { status: 500 }
    );
  }
}
