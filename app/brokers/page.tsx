"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  Building2,
  Users,
  Star,
  CheckCircle2,
  ArrowRight,
  Filter,
  Shield,
  Phone,
  Mail,
  Globe,
  Eye,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { cn, getProviderTypeLabel, UGANDA_DISTRICTS } from "@/lib/utils";

const DEMO_PROVIDERS = [
  {
    id: "p1",
    name: "Jioni Properties",
    type: "AGENCY",
    description:
      "Helping clients find residential and commercial property across Central Uganda since 2018. We specialize in verified properties with clear documentation.",
    location: "Kampala, Uganda",
    areas: ["Kampala", "Wakiso", "Entebbe", "Mukono"],
    categories: ["Residential", "Commercial", "Land"],
    listings: 124,
    rating: 4.8,
    reviewCount: 45,
    responseRate: 95,
    isVerified: true,
    isFeatured: true,
    website: "www.jioniproperties.ug",
    phone: "+256 700 123 456",
    email: "info@jioniproperties.ug",
  },
  {
    id: "p2",
    name: "Nile Real Estate",
    type: "COMPANY",
    description:
      "One of Uganda's leading property companies specializing in luxury and commercial properties across major cities.",
    location: "Kampala, Uganda",
    areas: ["Kampala", "Mukono", "Jinja"],
    categories: ["Luxury", "Commercial", "Apartments"],
    listings: 89,
    rating: 4.6,
    reviewCount: 32,
    responseRate: 88,
    isVerified: true,
    isFeatured: true,
    website: "www.nilerealestate.ug",
    phone: "+256 700 234 567",
    email: "info@nilerealestate.ug",
  },
  {
    id: "p3",
    name: "Alpha Land Consultants",
    type: "BROKER",
    description:
      "Uganda's premier land brokerage with verified plots across the country. Specializing in clean-title land for development and investment.",
    location: "Wakiso, Uganda",
    areas: ["Wakiso", "Mukono", "Luweero", "Mpigi"],
    categories: ["Land", "Farms", "Residential"],
    listings: 256,
    rating: 4.9,
    reviewCount: 78,
    responseRate: 92,
    isVerified: true,
    isFeatured: false,
    phone: "+256 700 345 678",
    email: "info@alphaland.ug",
  },
  {
    id: "p4",
    name: "Capital Properties",
    type: "COMPANY",
    description:
      "Commercial and residential property experts in Kampala CBD and surrounding areas. Trusted by businesses and families alike.",
    location: "Kampala, Uganda",
    areas: ["Kampala"],
    categories: ["Commercial", "Offices", "Residential"],
    listings: 67,
    rating: 4.5,
    reviewCount: 28,
    responseRate: 85,
    isVerified: true,
    isFeatured: false,
    phone: "+256 700 456 789",
    email: "info@capitalproperties.ug",
  },
  {
    id: "p5",
    name: "Hjion Properties",
    type: "BROKER",
    description:
      "Independent property broker serving Kampala and Wakiso. Known for honest dealings and quick response times.",
    location: "Kampala, Uganda",
    areas: ["Kampala", "Wakiso"],
    categories: ["Residential", "Apartments"],
    listings: 45,
    rating: 4.7,
    reviewCount: 22,
    responseRate: 98,
    isVerified: true,
    isFeatured: false,
    phone: "+256 700 567 890",
    email: "hjionproperties@gmail.com",
  },
  {
    id: "p6",
    name: "Eastern Properties Ltd",
    type: "AGENCY",
    description:
      "The leading property agency in Eastern Uganda, covering Jinja, Mbale, and surrounding districts.",
    location: "Jinja, Uganda",
    areas: ["Jinja", "Mbale", "Iganga", "Tororo"],
    categories: ["Residential", "Commercial", "Land"],
    listings: 78,
    rating: 4.4,
    reviewCount: 19,
    responseRate: 80,
    isVerified: false,
    isFeatured: false,
    phone: "+256 700 678 901",
    email: "info@easternproperties.ug",
  },
  {
    id: "p7",
    name: "Western Uganda Estates",
    type: "COMPANY",
    description:
      "Property company specializing in Western Uganda real estate. From Mbarara to Fort Portal, we cover it all.",
    location: "Mbarara, Uganda",
    areas: ["Mbarara", "Fort Portal", "Kasese", "Kabale"],
    categories: ["Residential", "Land", "Farms"],
    listings: 93,
    rating: 4.3,
    reviewCount: 15,
    responseRate: 75,
    isVerified: true,
    isFeatured: false,
    phone: "+256 700 789 012",
    email: "info@westernestates.ug",
  },
  {
    id: "p8",
    name: "Northern Property Network",
    type: "AGENCY",
    description:
      "Connecting buyers with properties across Northern Uganda. Gulu, Lira, Arua and beyond.",
    location: "Gulu, Uganda",
    areas: ["Gulu", "Lira", "Arua", "Soroti"],
    categories: ["Residential", "Commercial", "Land"],
    listings: 52,
    rating: 4.2,
    reviewCount: 11,
    responseRate: 70,
    isVerified: false,
    isFeatured: false,
    phone: "+256 700 890 123",
    email: "info@northernproperty.ug",
  },
];

const providerTypes = [
  { value: "", label: "All Provider Types" },
  { value: "BROKER", label: "Property Brokers" },
  { value: "AGENT", label: "Real Estate Agents" },
  { value: "AGENCY", label: "Real Estate Agencies" },
  { value: "COMPANY", label: "Property Companies" },
  { value: "DEVELOPER", label: "Developers" },
];

export default function BrokersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

  const filteredProviders = DEMO_PROVIDERS.filter((provider) => {
    if (selectedType && provider.type !== selectedType) return false;
    if (
      selectedDistrict &&
      !provider.areas.includes(selectedDistrict)
    )
      return false;
    if (showVerifiedOnly && !provider.isVerified) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const searchable = [
        provider.name,
        provider.description,
        provider.location,
        ...provider.areas,
        ...provider.categories,
      ]
        .join(" ")
        .toLowerCase();
      if (!searchable.includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero */}
      <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge variant="orange" size="md" className="mb-4">
              Provider Directory
            </Badge>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              Find a Property Provider
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              Browse verified brokers, agents, agencies and property companies
              across Uganda
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search providers by name, location, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-sm bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-click-orange/30 shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <Select
            options={providerTypes}
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          />
          <Select
            options={[
              { value: "", label: "All Locations" },
              ...UGANDA_DISTRICTS.slice(0, 15).map((d) => ({
                value: d,
                label: d,
              })),
            ]}
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          />
          <button
            onClick={() => setShowVerifiedOnly(!showVerifiedOnly)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all border",
              showVerifiedOnly
                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                : "bg-white border-gray-200 text-gray-600 hover:border-emerald-200"
            )}
          >
            <Shield className="w-4 h-4" />
            Verified Only
          </button>
          <div className="flex-1" />
          <p className="text-sm text-gray-500">
            {filteredProviders.length} providers found
          </p>
        </div>

        {/* Provider Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>

        {filteredProviders.length === 0 && (
          <div className="text-center py-20">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No providers found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function ProviderCard({ provider }: { provider: (typeof DEMO_PROVIDERS)[0] }) {
  return (
    <Card hover className="p-6">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 bg-gradient-to-br from-navy-600 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
          <span className="text-xl font-bold text-white">
            {provider.name[0]}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 truncate">
              {provider.name}
            </h3>
            {provider.isVerified && (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            )}
          </div>
          <p className="text-sm text-gray-500">
            {getProviderTypeLabel(provider.type)}
          </p>
        </div>
        {provider.isFeatured && (
          <Badge variant="orange" size="sm">
            Featured
          </Badge>
        )}
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {provider.description}
      </p>

      <div className="flex items-center gap-2 mb-3">
        <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
        <span className="text-xs text-gray-500">{provider.location}</span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {provider.categories.slice(0, 3).map((cat) => (
          <Badge key={cat} variant="default" size="sm">
            {cat}
          </Badge>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {provider.areas.slice(0, 3).map((area) => (
          <span
            key={area}
            className="text-[10px] text-gray-500 bg-gray-50 px-2 py-0.5 rounded"
          >
            {area}
          </span>
        ))}
        {provider.areas.length > 3 && (
          <span className="text-[10px] text-gray-400">
            +{provider.areas.length - 3} more
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
        <div className="text-center">
          <p className="font-bold text-navy-900">{provider.listings}</p>
          <p className="text-[10px] text-gray-500">Listings</p>
        </div>
        <div className="text-center border-x border-gray-200">
          <div className="flex items-center justify-center gap-1">
            <Star className="w-3 h-3 text-amber-400 fill-current" />
            <p className="font-bold text-navy-900">{provider.rating}</p>
          </div>
          <p className="text-[10px] text-gray-500">
            {provider.reviewCount} reviews
          </p>
        </div>
        <div className="text-center">
          <p className="font-bold text-navy-900">{provider.responseRate}%</p>
          <p className="text-[10px] text-gray-500">Response</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Link href={`/brokers/${provider.id}`} className="flex-1">
          <Button variant="outline" className="w-full" size="sm">
            View Profile
          </Button>
        </Link>
        <Link href={`/brokers/${provider.id}`} className="flex-1">
          <Button className="w-full" size="sm">
            Connect
          </Button>
        </Link>
      </div>
    </Card>
  );
}
