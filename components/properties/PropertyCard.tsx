"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  CheckCircle2,
  Eye,
  Navigation,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn, formatPrice, formatDistance, getPropertyTypeLabel } from "@/lib/utils";

interface PropertyCardProps {
  property: {
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
  };
  distance?: number | null;
  userLocation?: { lat: number; lng: number } | null;
  className?: string;
}

export function PropertyCard({
  property,
  distance,
  className,
}: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageError, setImageError] = useState(false);

  const images = property.images ? JSON.parse(property.images) : [];
  const imageUrl =
    property.primaryImage || images[0] || "/images/property-placeholder.jpg";

  const location = [property.area, property.city, property.district]
    .filter(Boolean)
    .join(", ");

  return (
    <div
      className={cn(
        "group bg-white rounded-2xl border border-gray-100 overflow-hidden property-card",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {!imageError ? (
          <Image
            src={imageUrl}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-navy-100 to-blue-100 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-navy-200 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <MapPin className="w-8 h-8 text-navy-500" />
              </div>
              <p className="text-sm text-navy-500 font-medium">
                {getPropertyTypeLabel(property.propertyType)}
              </p>
            </div>
          </div>
        )}

        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge
            variant={property.listingType === "SALE" ? "primary" : "success"}
            className="shadow-sm"
          >
            {property.listingType === "SALE"
              ? "For Sale"
              : property.listingType === "RENT"
              ? "For Rent"
              : "For Lease"}
          </Badge>
          {property.isFeatured && (
            <Badge variant="orange" className="shadow-sm">
              ⭐ Featured
            </Badge>
          )}
        </div>

        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsFavorited(!isFavorited);
          }}
          className={cn(
            "absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all",
            isFavorited
              ? "bg-red-500 text-white shadow-lg"
              : "bg-white/90 text-gray-600 hover:bg-white hover:text-red-500 shadow-sm"
          )}
        >
          <Heart
            className={cn("w-4 h-4", isFavorited && "fill-current")}
          />
        </button>

        {/* Verification badge */}
        {property.isVerified && (
          <div className="absolute bottom-3 left-3">
            <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-[10px] font-semibold text-emerald-700">
                Verified
              </span>
            </div>
          </div>
        )}

        {/* Distance badge */}
        {distance !== null && distance !== undefined && (
          <div className="absolute bottom-3 right-3">
            <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
              <Navigation className="w-3 h-3 text-blue-500" />
              <span className="text-[10px] font-semibold text-blue-700">
                {formatDistance(distance)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <Link href={`/properties/${property.slug}`}>
        <div className="p-4">
          {/* Price */}
          <div className="mb-2">
            <span className="text-xl font-bold text-navy-900">
              {formatPrice(property.price, property.currency || "UGX")}
            </span>
            {property.listingType === "RENT" && (
              <span className="text-sm text-gray-500 ml-1">/month</span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-click-orange transition-colors">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-gray-500 mb-3">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-sm truncate">{location || "Uganda"}</span>
          </div>

          {/* Features */}
          <div className="flex items-center gap-4 text-sm text-gray-600 pb-3 border-b border-gray-100">
            {property.bedrooms !== null && property.bedrooms !== undefined && (
              <div className="flex items-center gap-1.5">
                <BedDouble className="w-4 h-4 text-gray-400" />
                <span>{property.bedrooms} Beds</span>
              </div>
            )}
            {property.bathrooms !== null && property.bathrooms !== undefined && (
              <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-gray-400" />
                <span>{property.bathrooms} Baths</span>
              </div>
            )}
            {(property.landSize || property.buildingSize) && (
              <div className="flex items-center gap-1.5">
                <Maximize className="w-4 h-4 text-gray-400" />
                <span>
                  {property.landSize
                    ? `${property.landSize} acres`
                    : `${property.buildingSize} sqft`}
                </span>
              </div>
            )}
          </div>

          {/* Provider */}
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-2">
              {property.provider && (
                <>
                  <div className="w-6 h-6 bg-gradient-to-br from-navy-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-[8px] font-bold text-white">
                      {property.provider.businessName?.[0] || "P"}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 truncate max-w-[120px]">
                    {property.provider.businessName || "Property Owner"}
                  </span>
                  {property.provider.verificationStatus === "VERIFIED" && (
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                  )}
                </>
              )}
            </div>
            {property.viewCount !== undefined && property.viewCount > 0 && (
              <div className="flex items-center gap-1 text-gray-400">
                <Eye className="w-3 h-3" />
                <span className="text-[10px]">{property.viewCount}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
