"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { cn, PROPERTY_TYPES, UGANDA_DISTRICTS } from "@/lib/utils";

interface SearchFiltersProps {
  onSearch?: (filters: SearchFilters) => void;
  className?: string;
  variant?: "hero" | "page" | "compact";
  initialFilters?: Partial<SearchFilters>;
}

export interface SearchFilters {
  query: string;
  listingType: string;
  propertyType: string;
  district: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  bathrooms: string;
}

const defaultFilters: SearchFilters = {
  query: "",
  listingType: "",
  propertyType: "",
  district: "",
  minPrice: "",
  maxPrice: "",
  bedrooms: "",
  bathrooms: "",
};

const listingTypes = [
  { value: "", label: "All Types" },
  { value: "SALE", label: "Buy" },
  { value: "RENT", label: "Rent" },
  { value: "LEASE", label: "Lease" },
];

const bedroomOptions = [
  { value: "", label: "Any" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
  { value: "5", label: "5+" },
];

const priceRanges = {
  SALE: [
    { value: "", label: "Any Price" },
    { value: "0-50000000", label: "Under UGX 50M" },
    { value: "50000000-100000000", label: "UGX 50M - 100M" },
    { value: "100000000-200000000", label: "UGX 100M - 200M" },
    { value: "200000000-500000000", label: "UGX 200M - 500M" },
    { value: "500000000-1000000000", label: "UGX 500M - 1B" },
    { value: "1000000000-", label: "Above UGX 1B" },
  ],
  RENT: [
    { value: "", label: "Any Price" },
    { value: "0-500000", label: "Under UGX 500K" },
    { value: "500000-1000000", label: "UGX 500K - 1M" },
    { value: "1000000-2000000", label: "UGX 1M - 2M" },
    { value: "2000000-5000000", label: "UGX 2M - 5M" },
    { value: "5000000-", label: "Above UGX 5M" },
  ],
  default: [
    { value: "", label: "Any Price" },
    { value: "0-50000000", label: "Under UGX 50M" },
    { value: "50000000-200000000", label: "UGX 50M - 200M" },
    { value: "200000000-500000000", label: "UGX 200M - 500M" },
    { value: "500000000-", label: "Above UGX 500M" },
  ],
};

export function SearchFilters({
  onSearch,
  className,
  variant = "page",
  initialFilters,
}: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    ...defaultFilters,
    ...initialFilters,
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearch = () => {
    onSearch?.(filters);
  };

  const updateFilter = (key: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const propertyTypeOptions = [
    { value: "", label: "All Property Types" },
    ...PROPERTY_TYPES.map((t) => ({ value: t.value, label: t.label })),
  ];

  const districtOptions = [
    { value: "", label: "All Uganda" },
    ...UGANDA_DISTRICTS.map((d) => ({ value: d, label: d })),
  ];

  if (variant === "hero") {
    return (
      <div className={cn("space-y-4", className)}>
        {/* Listing Type Tabs */}
        <div className="flex gap-2 flex-wrap">
          {listingTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => updateFilter("listingType", type.value)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all",
                filters.listingType === type.value
                  ? "bg-white text-navy-900 shadow-lg"
                  : "bg-white/20 text-white hover:bg-white/30"
              )}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl p-2 shadow-2xl shadow-black/20">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Location, district, area or property"
                value={filters.query}
                onChange={(e) => updateFilter("query", e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full pl-12 pr-4 py-3.5 text-sm bg-transparent border-0 focus:outline-none text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filters.propertyType}
                onChange={(e) => updateFilter("propertyType", e.target.value)}
                className="px-4 py-3.5 text-sm bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-click-orange/20 text-gray-700 min-w-[160px]"
              >
                {propertyTypeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <select
                value={filters.bedrooms}
                onChange={(e) => updateFilter("bedrooms", e.target.value)}
                className="px-4 py-3.5 text-sm bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-click-orange/20 text-gray-700 min-w-[100px]"
              >
                {bedroomOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label} Beds
                  </option>
                ))}
              </select>
              <Button
                onClick={handleSearch}
                size="lg"
                className="px-8 rounded-xl"
                leftIcon={<Search className="w-5 h-5" />}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn("flex gap-2", className)}>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search properties..."
            value={filters.query}
            onChange={(e) => updateFilter("query", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-click-orange focus:ring-2 focus:ring-click-orange/20"
          />
        </div>
        <Button onClick={handleSearch} size="md">
          Search
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("bg-white rounded-2xl border border-gray-100 shadow-sm p-6", className)}>
      {/* Main Search */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <div className="flex-1 relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by location, district, area or property name..."
            value={filters.query}
            onChange={(e) => updateFilter("query", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full pl-12 pr-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-click-orange focus:ring-2 focus:ring-click-orange/20"
          />
        </div>
        <Button
          onClick={handleSearch}
          size="lg"
          className="px-8"
          leftIcon={<Search className="w-5 h-5" />}
        >
          Search
        </Button>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {listingTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => updateFilter("listingType", type.value)}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all",
                filters.listingType === type.value
                  ? "bg-white text-navy-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              {type.label}
            </button>
          ))}
        </div>
        <Select
          options={propertyTypeOptions}
          value={filters.propertyType}
          onChange={(e) => updateFilter("propertyType", e.target.value)}
          className="min-w-[180px]"
        />
        <Select
          options={districtOptions}
          value={filters.district}
          onChange={(e) => updateFilter("district", e.target.value)}
          className="min-w-[160px]"
        />
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-click-orange border border-gray-200 rounded-lg hover:border-orange-200 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-gray-100">
          <Select
            label="Price Range"
            options={
              priceRanges[
                (filters.listingType as keyof typeof priceRanges) || "default"
              ] || priceRanges.default
            }
            value={filters.minPrice + (filters.maxPrice ? "-" + filters.maxPrice : "")}
            onChange={(e) => {
              const [min, max] = e.target.value.split("-");
              updateFilter("minPrice", min || "");
              updateFilter("maxPrice", max || "");
            }}
          />
          <Select
            label="Bedrooms"
            options={bedroomOptions}
            value={filters.bedrooms}
            onChange={(e) => updateFilter("bedrooms", e.target.value)}
          />
          <Select
            label="Bathrooms"
            options={bedroomOptions}
            value={filters.bathrooms}
            onChange={(e) => updateFilter("bathrooms", e.target.value)}
          />
          <div className="flex items-end">
            <Button
              variant="ghost"
              onClick={() => setFilters(defaultFilters)}
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
