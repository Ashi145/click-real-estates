"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  MapPin,
  Search,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  Navigation,
  Home,
  Filter,
  List,
  MapIcon,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Select";
import { PropertyCard } from "@/components/properties/PropertyCard";
import {
  cn,
  formatPrice,
  formatDistance,
  calculateDistance,
  PROPERTY_TYPES,
  UGANDA_DISTRICTS,
  MAP_CENTER,
  MAP_ZOOM,
} from "@/lib/utils";

// Demo properties with coordinates
const MAP_PROPERTIES = [
  {
    id: "1",
    title: "Modern 4 Bedroom Villa",
    slug: "modern-4-bedroom-villa-kira",
    price: 850000000,
    currency: "UGX",
    propertyType: "HOUSE",
    listingType: "SALE",
    bedrooms: 4,
    bathrooms: 3,
    landSize: 0.5,
    area: "Kira",
    district: "Wakiso",
    latitude: 0.3833,
    longitude: 32.6333,
    isVerified: true,
    isFeatured: true,
    viewCount: 245,
    provider: { businessName: "Jioni Properties", providerType: "AGENCY", verificationStatus: "VERIFIED" },
  },
  {
    id: "2",
    title: "Luxury 3 Bed Apartment",
    slug: "luxury-3-bed-apartment-kololo",
    price: 3500000,
    currency: "UGX",
    propertyType: "APARTMENT",
    listingType: "RENT",
    bedrooms: 3,
    bathrooms: 2,
    area: "Kololo",
    district: "Kampala",
    latitude: 0.325,
    longitude: 32.585,
    isVerified: true,
    viewCount: 189,
    provider: { businessName: "Nile Real Estate", providerType: "COMPANY", verificationStatus: "VERIFIED" },
  },
  {
    id: "3",
    title: "50 Acre Prime Land",
    slug: "50-acre-prime-land-mukono",
    price: 2500000000,
    currency: "UGX",
    propertyType: "LAND",
    listingType: "SALE",
    landSize: 50,
    area: "Seeta",
    district: "Mukono",
    latitude: 0.2833,
    longitude: 32.7167,
    isVerified: true,
    isFeatured: true,
    viewCount: 567,
    provider: { businessName: "Alpha Land Consultants", providerType: "BROKER", verificationStatus: "VERIFIED" },
  },
  {
    id: "4",
    title: "Commercial Building CBD",
    slug: "commercial-building-cbd-kampala",
    price: 4500000000,
    currency: "UGX",
    propertyType: "COMMERCIAL",
    listingType: "SALE",
    buildingSize: 15000,
    area: "City Centre",
    district: "Kampala",
    latitude: 0.3136,
    longitude: 32.5811,
    isVerified: true,
    viewCount: 321,
    provider: { businessName: "Capital Properties", providerType: "COMPANY", verificationStatus: "VERIFIED" },
  },
  {
    id: "5",
    title: "2 Bedroom Family Home",
    slug: "2-bedroom-family-home-entebbe",
    price: 1800000,
    currency: "UGX",
    propertyType: "HOUSE",
    listingType: "RENT",
    bedrooms: 2,
    bathrooms: 2,
    area: "Kitoro",
    district: "Wakiso",
    latitude: 0.0562,
    longitude: 32.4633,
    isVerified: false,
    viewCount: 98,
    provider: { businessName: null, providerType: "INDIVIDUAL_OWNER", verificationStatus: "PENDING" },
  },
  {
    id: "6",
    title: "Modern Office Space",
    slug: "modern-office-space-nakawa",
    price: 5000000,
    currency: "UGX",
    propertyType: "OFFICE",
    listingType: "RENT",
    buildingSize: 2500,
    area: "Nakawa",
    district: "Kampala",
    latitude: 0.3297,
    longitude: 32.6133,
    isVerified: true,
    viewCount: 156,
    provider: { businessName: "Hjion Properties", providerType: "BROKER", verificationStatus: "VERIFIED" },
  },
  {
    id: "7",
    title: "Luxury Villa in Munyonyo",
    slug: "luxury-villa-munyonyo",
    price: 2800000000,
    currency: "UGX",
    propertyType: "LUXURY",
    listingType: "SALE",
    bedrooms: 6,
    bathrooms: 5,
    landSize: 1.2,
    area: "Munyonyo",
    district: "Kampala",
    latitude: 0.255,
    longitude: 32.625,
    isVerified: true,
    isFeatured: true,
    viewCount: 678,
    provider: { businessName: "Nile Real Estate", providerType: "COMPANY", verificationStatus: "VERIFIED" },
  },
];

export default function MapPage() {
  const [viewMode, setViewMode] = useState<"split" | "map" | "list">("split");
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [filters, setFilters] = useState({
    listingType: "",
    propertyType: "",
    district: "",
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {}
      );
    }
  }, []);

  // Filter properties
  const filteredProperties = MAP_PROPERTIES.filter((p) => {
    if (filters.listingType && p.listingType !== filters.listingType) return false;
    if (filters.propertyType && p.propertyType !== filters.propertyType) return false;
    if (filters.district && p.district !== filters.district) return false;
    return true;
  });

  // Calculate distances
  const propertiesWithDistance = filteredProperties.map((p) => ({
    ...p,
    distance:
      userLocation && p.latitude && p.longitude
        ? calculateDistance(userLocation.lat, userLocation.lng, p.latitude, p.longitude)
        : null,
  }));

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-16 lg:top-20 z-40">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <h1 className="font-display font-bold text-lg text-navy-900 hidden sm:block">
                Map Discovery
              </h1>
              <Badge variant="info" size="sm">
                {filteredProperties.length} properties
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={showFilters ? "primary" : "ghost"}
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-1" />
                Filters
              </Button>

              <div className="hidden md:flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-1.5 rounded-md transition-colors",
                    viewMode === "list"
                      ? "bg-white text-navy-900 shadow-sm"
                      : "text-gray-500"
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("split")}
                  className={cn(
                    "p-1.5 rounded-md transition-colors",
                    viewMode === "split"
                      ? "bg-white text-navy-900 shadow-sm"
                      : "text-gray-500"
                  )}
                >
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                    <rect x="0" y="0" width="7" height="16" rx="1" />
                    <rect x="9" y="0" width="7" height="16" rx="1" opacity="0.4" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={cn(
                    "p-1.5 rounded-md transition-colors",
                    viewMode === "map"
                      ? "bg-white text-navy-900 shadow-sm"
                      : "text-gray-500"
                  )}
                >
                  <MapIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-gray-100 animate-slide-down">
              <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                {[
                  { value: "", label: "All" },
                  { value: "SALE", label: "Buy" },
                  { value: "RENT", label: "Rent" },
                ].map((type) => (
                  <button
                    key={type.value}
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        listingType: type.value,
                      }))
                    }
                    className={cn(
                      "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                      filters.listingType === type.value
                        ? "bg-white text-navy-900 shadow-sm"
                        : "text-gray-600"
                    )}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
              <Select
                options={[
                  { value: "", label: "All Types" },
                  ...PROPERTY_TYPES.map((t) => ({
                    value: t.value,
                    label: t.label,
                  })),
                ]}
                value={filters.propertyType}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    propertyType: e.target.value,
                  }))
                }
              />
              <Select
                options={[
                  { value: "", label: "All Districts" },
                  ...UGANDA_DISTRICTS.slice(0, 20).map((d) => ({
                    value: d,
                    label: d,
                  })),
                ]}
                value={filters.district}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, district: e.target.value }))
                }
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setFilters({ listingType: "", propertyType: "", district: "" })
                }
              >
                Clear
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1600px] mx-auto flex h-[calc(100vh-140px)]">
        {/* Property List */}
        {(viewMode === "list" || viewMode === "split") && (
          <div
            className={cn(
              "overflow-y-auto bg-white border-r border-gray-100",
              viewMode === "split" ? "w-full md:w-[420px]" : "w-full"
            )}
          >
            <div className="p-4 space-y-4">
              {propertiesWithDistance.length === 0 ? (
                <div className="text-center py-12">
                  <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No properties in this area</p>
                </div>
              ) : (
                propertiesWithDistance.map((property) => (
                  <div
                    key={property.id}
                    onClick={() => setSelectedProperty(property.id)}
                    className={cn(
                      "cursor-pointer transition-all rounded-xl",
                      selectedProperty === property.id
                        ? "ring-2 ring-click-orange"
                        : "hover:shadow-md"
                    )}
                  >
                    <PropertyCard
                      property={property}
                      distance={property.distance}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Map */}
        {(viewMode === "map" || viewMode === "split") && (
          <div className={cn("flex-1 relative", viewMode === "split" && "hidden md:block")}>
            {/* Map placeholder with property pins */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-navy-50">
              {/* Grid pattern */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(30,58,95,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(30,58,95,.1) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Property pins */}
              {propertiesWithDistance.map((property, index) => {
                const positions = [
                  { top: "25%", left: "30%" },
                  { top: "40%", left: "55%" },
                  { top: "55%", left: "25%" },
                  { top: "35%", left: "70%" },
                  { top: "65%", left: "45%" },
                  { top: "30%", left: "40%" },
                  { top: "50%", left: "60%" },
                ];
                const pos = positions[index % positions.length];

                return (
                  <div
                    key={property.id}
                    className="absolute transition-all duration-300"
                    style={{ top: pos.top, left: pos.left }}
                    onClick={() => setSelectedProperty(property.id)}
                  >
                    <div
                      className={cn(
                        "custom-marker cursor-pointer transition-transform hover:scale-110",
                        selectedProperty === property.id &&
                          "scale-125 ring-2 ring-white"
                      )}
                    >
                      {formatPrice(property.price, property.currency)}
                    </div>
                    {selectedProperty === property.id && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-xl shadow-xl p-3 z-10 animate-scale-in">
                        <p className="font-semibold text-sm text-gray-900 mb-1">
                          {property.title}
                        </p>
                        <p className="text-xs text-gray-500 mb-2">
                          {[property.area, property.district]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                        <Link
                          href={`/properties/${property.slug}`}
                          className="text-xs text-click-orange font-medium"
                        >
                          View Details →
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* User location */}
              {userLocation && (
                <div
                  className="absolute"
                  style={{ top: "45%", left: "48%" }}
                >
                  <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
                </div>
              )}

              {/* Map legend */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                <p className="text-xs font-semibold text-gray-700 mb-2">
                  Map Legend
                </p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="custom-marker text-[8px] py-0.5 px-1.5">
                      UGX
                    </div>
                    <span className="text-[10px] text-gray-600">
                      Property Price
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full border border-white" />
                    <span className="text-[10px] text-gray-600">
                      Your Location
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
