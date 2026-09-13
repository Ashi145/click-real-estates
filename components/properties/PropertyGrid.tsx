"use client";

import { PropertyCard } from "./PropertyCard";
import { cn } from "@/lib/utils";

interface Property {
  id: string;
  title: string;
  slug: string;
  price: number;
  currency?: string;
  propertyType: string;
  listingType: string;
  bedrooms?: number | null;
  bathrooms?: number | null;
  landSize?: number | null;
  buildingSize?: number | null;
  address?: string | null;
  area?: string | null;
  city?: string | null;
  district?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  primaryImage?: string | null;
  images?: string | null;
  isVerified?: boolean;
  isFeatured?: boolean;
  viewCount?: number;
  provider?: {
    businessName?: string | null;
    providerType: string;
    verificationStatus: string;
  } | null;
}

interface PropertyGridProps {
  properties: Property[];
  userLocation?: { lat: number; lng: number } | null;
  className?: string;
  columns?: 2 | 3 | 4;
}

export function PropertyGrid({
  properties,
  userLocation,
  className,
  columns = 3,
}: PropertyGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  if (properties.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No properties found
        </h3>
        <p className="text-gray-500 max-w-sm mx-auto">
          Try expanding your search area or changing your filters to discover
          more properties.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-6", gridCols[columns], className)}>
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          userLocation={userLocation}
        />
      ))}
    </div>
  );
}
