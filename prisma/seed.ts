import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@click.ug" },
    update: {},
    create: {
      email: "admin@click.ug",
      passwordHash: adminPassword,
      firstName: "Admin",
      lastName: "User",
      role: "ADMIN",
      isVerified: true,
      isActive: true,
      emailVerified: new Date(),
    },
  });
  console.log("✅ Admin user created:", admin.email);

  // Create demo buyer
  const buyerPassword = await bcrypt.hash("buyer123", 12);
  const buyer = await prisma.user.upsert({
    where: { email: "buyer@click.ug" },
    update: {},
    create: {
      email: "buyer@click.ug",
      passwordHash: buyerPassword,
      firstName: "John",
      lastName: "Buyer",
      role: "BUYER",
      isVerified: true,
      isActive: true,
      emailVerified: new Date(),
    },
  });
  console.log("✅ Buyer user created:", buyer.email);

  // Create demo provider users and profiles
  const providers = [
    {
      email: "jioni@click.ug",
      firstName: "Sarah",
      lastName: "Nakamya",
      businessName: "Jioni Properties",
      providerType: "AGENCY",
      description: "Helping clients find residential and commercial property across Central Uganda since 2018.",
      city: "Kampala",
      district: "Kampala",
      areasServed: JSON.stringify(["Kampala", "Wakiso", "Entebbe", "Mukono"]),
      categories: JSON.stringify(["Residential", "Commercial", "Land"]),
      verificationStatus: "VERIFIED",
      rating: 4.8,
      reviewCount: 45,
      responseRate: 95,
    },
    {
      email: "nile@click.ug",
      firstName: "James",
      lastName: "Okello",
      businessName: "Nile Real Estate",
      providerType: "COMPANY",
      description: "One of Uganda's leading property companies specializing in luxury and commercial properties.",
      city: "Kampala",
      district: "Kampala",
      areasServed: JSON.stringify(["Kampala", "Mukono", "Jinja"]),
      categories: JSON.stringify(["Luxury", "Commercial", "Apartments"]),
      verificationStatus: "VERIFIED",
      rating: 4.6,
      reviewCount: 32,
      responseRate: 88,
    },
    {
      email: "alpha@click.ug",
      firstName: "Peter",
      lastName: "Ssemakula",
      businessName: "Alpha Land Consultants",
      providerType: "BROKER",
      description: "Uganda's premier land brokerage with verified plots across the country.",
      city: "Wakiso",
      district: "Wakiso",
      areasServed: JSON.stringify(["Wakiso", "Mukono", "Luweero", "Mpigi"]),
      categories: JSON.stringify(["Land", "Farms", "Residential"]),
      verificationStatus: "VERIFIED",
      rating: 4.9,
      reviewCount: 78,
      responseRate: 92,
    },
    {
      email: "capital@click.ug",
      firstName: "Grace",
      lastName: "Auma",
      businessName: "Capital Properties",
      providerType: "COMPANY",
      description: "Commercial and residential property experts in Kampala CBD.",
      city: "Kampala",
      district: "Kampala",
      areasServed: JSON.stringify(["Kampala"]),
      categories: JSON.stringify(["Commercial", "Offices", "Residential"]),
      verificationStatus: "VERIFIED",
      rating: 4.5,
      reviewCount: 28,
      responseRate: 85,
    },
    {
      email: "hjion@click.ug",
      firstName: "David",
      lastName: "Mugisha",
      businessName: "Hjion Properties",
      providerType: "BROKER",
      description: "Independent property broker serving Kampala and Wakiso.",
      city: "Kampala",
      district: "Kampala",
      areasServed: JSON.stringify(["Kampala", "Wakiso"]),
      categories: JSON.stringify(["Residential", "Apartments"]),
      verificationStatus: "VERIFIED",
      rating: 4.7,
      reviewCount: 22,
      responseRate: 98,
    },
  ];

  const providerPassword = await bcrypt.hash("provider123", 12);

  for (const providerData of providers) {
    const user = await prisma.user.upsert({
      where: { email: providerData.email },
      update: {},
      create: {
        email: providerData.email,
        passwordHash: providerPassword,
        firstName: providerData.firstName,
        lastName: providerData.lastName,
        role: "BROKER",
        isVerified: true,
        isActive: true,
        emailVerified: new Date(),
      },
    });

    const slug = providerData.businessName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    await prisma.provider.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        providerType: providerData.providerType,
        businessName: providerData.businessName,
        slug,
        description: providerData.description,
        city: providerData.city,
        district: providerData.district,
        areasServed: providerData.areasServed,
        categories: providerData.categories,
        verificationStatus: providerData.verificationStatus,
        rating: providerData.rating,
        reviewCount: providerData.reviewCount,
        responseRate: providerData.responseRate,
        isActive: true,
      },
    });

    console.log(`✅ Provider created: ${providerData.businessName}`);
  }

  // Get provider IDs for property creation
  const jioniProvider = await prisma.provider.findFirst({
    where: { businessName: "Jioni Properties" },
  });
  const nileProvider = await prisma.provider.findFirst({
    where: { businessName: "Nile Real Estate" },
  });
  const alphaProvider = await prisma.provider.findFirst({
    where: { businessName: "Alpha Land Consultants" },
  });
  const capitalProvider = await prisma.provider.findFirst({
    where: { businessName: "Capital Properties" },
  });
  const hjionProvider = await prisma.provider.findFirst({
    where: { businessName: "Hjion Properties" },
  });

  // Create demo properties
  const properties = [
    {
      providerId: jioniProvider!.id,
      title: "Modern 4 Bedroom Villa with Swimming Pool",
      slug: "modern-4-bedroom-villa-kira",
      description: "Beautiful modern villa in the serene Kira neighborhood. Features spacious rooms, swimming pool, and 24/7 security.",
      propertyType: "HOUSE",
      listingType: "SALE",
      price: 850000000,
      currency: "UGX",
      priceNegotiable: true,
      latitude: 0.3833,
      longitude: 32.6333,
      address: "Plot 45, Kira-Namugongo Road",
      area: "Kira",
      city: "Kira",
      district: "Wakiso",
      region: "Central",
      bedrooms: 4,
      bathrooms: 3,
      landSize: 0.5,
      buildingSize: 3200,
      yearBuilt: 2022,
      features: JSON.stringify(["Swimming Pool", "Garden", "24/7 Security", "Backup Generator", "Water Tank", "Perimeter Wall"]),
      status: "ACTIVE",
      isVerified: true,
      isFeatured: true,
      viewCount: 245,
      saveCount: 34,
      publishedAt: new Date(),
    },
    {
      providerId: nileProvider!.id,
      title: "Luxury 3 Bed Apartment in Kololo",
      slug: "luxury-3-bed-apartment-kololo",
      description: "Luxurious apartment in the heart of Kololo with modern finishes and stunning city views.",
      propertyType: "APARTMENT",
      listingType: "RENT",
      price: 3500000,
      currency: "UGX",
      latitude: 0.325,
      longitude: 32.585,
      area: "Kololo",
      city: "Kampala",
      district: "Kampala",
      region: "Central",
      bedrooms: 3,
      bathrooms: 2,
      buildingSize: 1800,
      features: JSON.stringify(["Gym", "Pool", "24/7 Security", "Backup Power", "Elevator"]),
      status: "ACTIVE",
      isVerified: true,
      viewCount: 189,
      publishedAt: new Date(),
    },
    {
      providerId: alphaProvider!.id,
      title: "50 Acre Prime Land in Mukono",
      slug: "50-acre-prime-land-mukono",
      description: "Prime land with road access and clean title. Ideal for residential or commercial development.",
      propertyType: "LAND",
      listingType: "SALE",
      price: 2500000000,
      currency: "UGX",
      latitude: 0.2833,
      longitude: 32.7167,
      area: "Seeta",
      city: "Mukono",
      district: "Mukono",
      region: "Central",
      landSize: 50,
      features: JSON.stringify(["Road Access", "Clean Title", "Water", "Electricity Nearby"]),
      status: "ACTIVE",
      isVerified: true,
      isFeatured: true,
      viewCount: 567,
      publishedAt: new Date(),
    },
    {
      providerId: capitalProvider!.id,
      title: "Commercial Building in CBD",
      slug: "commercial-building-cbd-kampala",
      description: "Prime commercial building in Kampala CBD with multiple floors and modern amenities.",
      propertyType: "COMMERCIAL",
      listingType: "SALE",
      price: 4500000000,
      currency: "UGX",
      latitude: 0.3136,
      longitude: 32.5811,
      area: "City Centre",
      city: "Kampala",
      district: "Kampala",
      region: "Central",
      bathrooms: 8,
      buildingSize: 15000,
      features: JSON.stringify(["Lift", "Generator", "Security", "Parking"]),
      status: "ACTIVE",
      isVerified: true,
      viewCount: 321,
      publishedAt: new Date(),
    },
    {
      providerId: hjionProvider!.id,
      title: "2 Bedroom Family Home in Entebbe",
      slug: "2-bedroom-family-home-entebbe",
      description: "Cozy family home in quiet neighborhood near Entebbe airport.",
      propertyType: "HOUSE",
      listingType: "RENT",
      price: 1800000,
      currency: "UGX",
      latitude: 0.0562,
      longitude: 32.4633,
      area: "Kitoro",
      city: "Entebbe",
      district: "Wakiso",
      region: "Central",
      bedrooms: 2,
      bathrooms: 2,
      landSize: 0.25,
      buildingSize: 1200,
      features: JSON.stringify(["Garden", "Parking", "Water Tank"]),
      status: "ACTIVE",
      viewCount: 98,
      publishedAt: new Date(),
    },
    {
      providerId: hjionProvider!.id,
      title: "Modern Office Space in Nakawa",
      slug: "modern-office-space-nakawa",
      description: "Modern office space in Nakawa Business Park with all amenities.",
      propertyType: "OFFICE",
      listingType: "RENT",
      price: 5000000,
      currency: "UGX",
      latitude: 0.3297,
      longitude: 32.6133,
      area: "Nakawa",
      city: "Kampala",
      district: "Kampala",
      region: "Central",
      bathrooms: 2,
      buildingSize: 2500,
      features: JSON.stringify(["AC", "Internet", "Security", "Parking"]),
      status: "ACTIVE",
      isVerified: true,
      viewCount: 156,
      publishedAt: new Date(),
    },
  ];

  for (const propertyData of properties) {
    const existing = await prisma.property.findFirst({
      where: { slug: propertyData.slug },
    });

    if (!existing) {
      await prisma.property.create({
        data: propertyData as any,
      });
      console.log(`✅ Property created: ${propertyData.title}`);
    }
  }

  // Create demo blog posts
  const blogPosts = [
    {
      title: "Complete Guide to Buying Land in Uganda",
      slug: "complete-guide-buying-land-uganda",
      excerpt: "Everything you need to know about purchasing land safely in Uganda.",
      content: "Buying land in Uganda can be a great investment, but it requires careful due diligence...",
      category: "Buying Guide",
      tags: JSON.stringify(["land", "buying", "guide"]),
      authorName: "CLICK Team",
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
    {
      title: "How to Avoid Property Scams in Uganda",
      slug: "how-to-avoid-property-scams-uganda",
      excerpt: "Learn the red flags and best practices to protect yourself from common property fraud.",
      content: "Property fraud is unfortunately common in Uganda. Here's how to protect yourself...",
      category: "Safety",
      tags: JSON.stringify(["safety", "fraud", "scams"]),
      authorName: "CLICK Team",
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
    {
      title: "Working with Property Brokers: A Complete Guide",
      slug: "working-with-property-brokers-guide",
      excerpt: "A guide to finding and working with reliable property brokers in Uganda.",
      content: "Finding a reliable property broker can make your property search much easier...",
      category: "Tips",
      tags: JSON.stringify(["brokers", "agents", "guide"]),
      authorName: "CLICK Team",
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
  ];

  for (const post of blogPosts) {
    const existing = await prisma.blogPost.findFirst({
      where: { slug: post.slug },
    });

    if (!existing) {
      await prisma.blogPost.create({ data: post });
      console.log(`✅ Blog post created: ${post.title}`);
    }
  }

  console.log("\n🎉 Database seeded successfully!");
  console.log("\n📋 Demo Accounts:");
  console.log("  Admin:    admin@click.ug / admin123");
  console.log("  Buyer:    buyer@click.ug / buyer123");
  console.log("  Provider: jioni@click.ug / provider123");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
