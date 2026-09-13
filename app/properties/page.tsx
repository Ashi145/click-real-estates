"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Grid3X3,
  Map,
  ChevronDown,
  X,
  ArrowUpDown,
  Loader2,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Select";
import { PropertyCard } from "@/components/properties/PropertyCard";
import {
  cn,
  formatPrice,
  PROPERTY_TYPES,
  UGANDA_DISTRICTS,
  calculateDistance,
  formatDistance,
} from "@/lib/utils";

// Demo properties data
const ALL_PROPERTIES = [
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
    buildingSize: 3200,
    area: "Kira",
    city: "Kira",
    district: "Wakiso",
    latitude: 0.3833,
    longitude: 32.6333,
    isVerified: true,
    isFeatured: true,
    viewCount: 245,
    description: "Beautiful modern villa in Kira with spacious rooms and a large compound.",
    features: JSON.stringify(["Swimming Pool", "Garden", "Security", "Parking"]),
    provider: {
      businessName: "Jioni Properties",
      providerType: "AGENCY",
      verificationStatus: "VERIFIED",
    },
  },
  {
    id: "2",
    title: "Luxury 3 Bed Apartment in Kololo",
    slug: "luxury-3-bed-apartment-kololo",
    price: 3500000,
    currency: "UGX",
    propertyType: "APARTMENT",
    listingType: "RENT",
    bedrooms: 3,
    bathrooms: 2,
    buildingSize: 1800,
    area: "Kololo",
    city: "Kampala",
    district: "Kampala",
    latitude: 0.325,
    longitude: 32.585,
    isVerified: true,
    isFeatured: false,
    viewCount: 189,
    description: "Luxurious apartment in the heart of Kololo with modern finishes.",
    features: JSON.stringify(["Gym", "Pool", "24/7 Security", "Backup Power"]),
    provider: {
      businessName: "Nile Real Estate",
      providerType: "COMPANY",
      verificationStatus: "VERIFIED",
    },
  },
  {
    id: "3",
    title: "50 Acre Prime Land in Mukono",
    slug: "50-acre-prime-land-mukono",
    price: 2500000000,
    currency: "UGX",
    propertyType: "LAND",
    listingType: "SALE",
    bedrooms: null,
    bathrooms: null,
    landSize: 50,
    buildingSize: null,
    area: "Seeta",
    city: "Mukono",
    district: "Mukono",
    latitude: 0.2833,
    longitude: 32.7167,
    isVerified: true,
    isFeatured: true,
    viewCount: 567,
    description: "Prime land with road access and clean title. Ideal for development.",
    features: JSON.stringify(["Road Access", "Clean Title", "Water", "Electricity Nearby"]),
    provider: {
      businessName: "Alpha Land Consultants",
      providerType: "BROKER",
      verificationStatus: "VERIFIED",
    },
  },
  {
    id: "4",
    title: "Commercial Building in CBD",
    slug: "commercial-building-cbd-kampala",
    price: 4500000000,
    currency: "UGX",
    propertyType: "COMMERCIAL",
    listingType: "SALE",
    bedrooms: null,
    bathrooms: 8,
    buildingSize: 15000,
    area: "City Centre",
    city: "Kampala",
    district: "Kampala",
    latitude: 0.3136,
    longitude: 32.5811,
    isVerified: true,
    isFeatured: false,
    viewCount: 321,
    description: "Prime commercial building in Kampala CBD with multiple floors.",
    features: JSON.stringify(["Lift", "Generator", "Security", "Parking"]),
    provider: {
      businessName: "Capital Properties",
      providerType: "COMPANY",
      verificationStatus: "VERIFIED",
    },
  },
  {
    id: "5",
    title: "2 Bedroom Family Home in Entebbe",
    slug: "2-bedroom-family-home-entebbe",
    price: 1800000,
    currency: "UGX",
    propertyType: "HOUSE",
    listingType: "RENT",
    bedrooms: 2,
    bathrooms: 2,
    landSize: 0.25,
    buildingSize: 1200,
    area: "Kitoro",
    city: "Entebbe",
    district: "Wakiso",
    latitude: 0.0562,
    longitude: 32.4633,
    isVerified: false,
    isFeatured: false,
    viewCount: 98,
    description: "Cozy family home in quiet neighborhood in Entebbe.",
    features: JSON.stringify(["Garden", "Parking", "Water Tank"]),
    provider: {
      businessName: null,
      providerType: "INDIVIDUAL_OWNER",
      verificationStatus: "PENDING",
    },
  },
  {
    id: "6",
    title: "Modern Office Space in Nakawa",
    slug: "modern-office-space-nakawa",
    price: 5000000,
    currency: "UGX",
    propertyType: "OFFICE",
    listingType: "RENT",
    bedrooms: null,
    bathrooms: 2,
    buildingSize: 2500,
    area: "Nakawa",
    city: "Kampala",
    district: "Kampala",
    latitude: 0.3297,
    longitude: 32.6133,
    isVerified: true,
    isFeatured: false,
    viewCount: 156,
    description: "Modern office space in Nakawa Business Park.",
    features: JSON.stringify(["AC", "Internet", "Security", "Parking"]),
    provider: {
      businessName: "Hjion Properties",
      providerType: "BROKER",
      verificationStatus: "VERIFIED",
    },
  },
  {
    id: "7",
    title: "Warehouse in Industrial Area",
    slug: "warehouse-industrial-area",
    price: 8000000,
    currency: "UGX",
    propertyType: "WAREHOUSE",
    listingType: "RENT",
    bedrooms: null,
    bathrooms: 2,
    buildingSize: 10000,
    area: "Industrial Area",
    city: "Kampala",
    district: "Kampala",
    latitude: 0.295,
    longitude: 32.605,
    isVerified: true,
    isFeatured: false,
    viewCount: 87,
    description: "Large warehouse space with loading dock and office area.",
    features: JSON.stringify(["Loading Dock", "High Ceiling", "Security", "Power"]),
    provider: {
      businessName: "Capital Properties",
      providerType: "COMPANY",
      verificationStatus: "VERIFIED",
    },
  },
  {
    id: "8",
    title: "10 Acre Farm Land in Jinja",
    slug: "10-acre-farm-land-jinja",
    price: 350000000,
    currency: "UGX",
    propertyType: "FARM",
    listingType: "SALE",
    bedrooms: null,
    bathrooms: null,
    landSize: 10,
    buildingSize: null,
    area: "Bugembe",
    city: "Jinja",
    district: "Jinja",
    latitude: 0.4478,
    longitude: 33.175,
    isVerified: true,
    isFeatured: false,
    viewCount: 234,
    description: "Fertile farm land with water source near Jinja.",
    features: JSON.stringify(["Water Source", "Fertile Soil", "Road Access"]),
    provider: {
      businessName: "Alpha Land Consultants",
      providerType: "BROKER",
      verificationStatus: "VERIFIED",
    },
  },
  {
    id: "9",
    title: "Luxury Villa in Munyonyo",
    slug: "luxury-villa-munyonyo",
    price: 2800000000,
    currency: "UGX",
    propertyType: "LUXURY",
    listingType: "SALE",
    bedrooms: 6,
    bathrooms: 5,
    landSize: 1.2,
    buildingSize: 6000,
    area: "Munyonyo",
    city: "Kampala",
    district: "Kampala",
    latitude: 0.255,
    longitude: 32.625,
    isVerified: true,
    isFeatured: true,
    viewCount: 678,
    description: "Exclusive lakefront villa with stunning views and premium finishes.",
    features: JSON.stringify(["Lake View", "Pool", "Gym", "Smart Home", "Cinema"]),
    provider: {
      businessName: "Nile Real Estate",
      providerType: "COMPANY",
      verificationStatus: "VERIFIED",
    },
  },
];

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
];

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Filters
  const [filters, setFilters] = useState({
    query: searchParams.get("q") || "",
    listingType: searchParams.get("type") || "",
    propertyType: searchParams.get("category") || "",
    district: searchParams.get("district") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedrooms: searchParams.get("bedrooms") || "",
    bathrooms: searchParams.get("bathrooms") || "",
  });

  // Try to get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          // Location access denied - that's okay
        }
      );
    }
  }, []);

  // Filter properties
  const filteredProperties = ALL_PROPERTIES.filter((property) => {
    if (
      filters.listingType &&
      property.listingType !== filters.listingType
    ) {
      return false;
    }
    if (
      filters.propertyType &&
      property.propertyType !== filters.propertyType
    ) {
      return false;
    }
    if (
      filters.district &&
      property.district !== filters.district
    ) {
      return false;
    }
    if (filters.bedrooms && property.bedrooms !== null) {
      if (property.bedrooms < parseInt(filters.bedrooms)) return false;
    }
    if (filters.query) {
      const q = filters.query.toLowerCase();
      const searchable = [
        property.title,
        property.area,
        property.city,
        property.district,
        property.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!searchable.includes(q)) return false;
    }
    return true;
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "popular":
        return b.viewCount - a.viewCount;
      default:
        return 0;
    }
  });

  // Calculate distances
  const propertiesWithDistance = sortedProperties.map((property) => ({
    ...property,
    distance:
      userLocation && property.latitude && property.longitude
        ? calculateDistance(
            userLocation.lat,
            userLocation.lng,
            property.latitude,
            property.longitude
          )
        : null,
  }));

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-16 lg:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Search bar */}
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search properties by name, location, district..."
                value={filters.query}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, query: e.target.value }))
                }
                className="w-full pl-12 pr-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-click-orange focus:ring-2 focus:ring-click-orange/20"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filters.listingType}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    listingType: e.target.value,
                  }))
                }
                className="px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-click-orange focus:ring-2 focus:ring-click-orange/20 min-w-[120px]"
              >
                <option value="">All Types</option>
                <option value="SALE">Buy</option>
                <option value="RENT">Rent</option>
                <option value="LEASE">Lease</option>
              </select>
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant={showFilters ? "primary" : "outline"}
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 bg-white text-click-orange rounded-full text-xs flex items-center justify-center font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Filters panel */}
          {showFilters && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-gray-100 animate-slide-down">
              <Select
                options={[
                  { value: "", label: "All Property Types" },
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
                  ...UGANDA_DISTRICTS.map((d) => ({ value: d, label: d })),
                ]}
                value={filters.district}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, district: e.target.value }))
                }
              />
              <Select
                options={[
                  { value: "", label: "Any Bedrooms" },
                  { value: "1", label: "1+" },
                  { value: "2", label: "2+" },
                  { value: "3", label: "3+" },
                  { value: "4", label: "4+" },
                  { value: "5", label: "5+" },
                ]}
                value={filters.bedrooms}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, bedrooms: e.target.value }))
                }
              />
              <Button
                variant="ghost"
                onClick={() =>
                  setFilters({
                    query: "",
                    listingType: "",
                    propertyType: "",
                    district: "",
                    minPrice: "",
                    maxPrice: "",
                    bedrooms: "",
                    bathrooms: "",
                  })
                }
              >
                Clear All
              </Button>
            </div>
          )}

          {/* Results bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-navy-900">
                  {sortedProperties.length}
                </span>{" "}
                properties found
              </p>
              {activeFilterCount > 0 && (
                <button
                  onClick={() =>
                    setFilters({
                      query: "",
                      listingType: "",
                      propertyType: "",
                      district: "",
                      minPrice: "",
                      maxPrice: "",
                      bedrooms: "",
                      bathrooms: "",
                    })
                  }
                  className="text-xs text-click-orange hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-click-orange"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="hidden sm:flex items-center bg-white border border-gray-200 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-1.5 rounded-md transition-colors",
                    viewMode === "grid"
                      ? "bg-navy-800 text-white"
                      : "text-gray-400 hover:text-gray-600"
                  )}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={cn(
                    "p-1.5 rounded-md transition-colors",
                    viewMode === "map"
                      ? "bg-navy-800 text-white"
                      : "text-gray-400 hover:text-gray-600"
                  )}
                >
                  <Map className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {sortedProperties.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Home className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No properties found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Try adjusting your filters or search terms to discover more
              properties.
            </p>
            <Button
              onClick={() =>
                setFilters({
                  query: "",
                  listingType: "",
                  propertyType: "",
                  district: "",
                  minPrice: "",
                  maxPrice: "",
                  bedrooms: "",
                  bathrooms: "",
                })
              }
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {propertiesWithDistance.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                distance={property.distance}
                userLocation={userLocation}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
