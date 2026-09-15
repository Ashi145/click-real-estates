"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  MapPin,
  Building2,
  Users,
  Shield,
  ArrowRight,
  CheckCircle2,
  Star,
  Navigation,
  Eye,
  Heart,
  Phone,
  Mail,
  Globe,
  TrendingUp,
  Award,
  Zap,
  ChevronRight,
  Play,
  Home,
  Landmark,
  Warehouse,
  TreePine,
  Building,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SearchFilters } from "@/components/properties/SearchFilters";
import {
  FEATURED_LOCATIONS,
  PLATFORM_FEATURES,
  HOW_IT_WORKS,
  TESTIMONIALS,
} from "@/lib/constants";
import {
  cn,
  formatPrice,
  getPropertyTypeLabel,
  getProviderTypeLabel,
} from "@/lib/utils";

// Demo property data
const DEMO_PROPERTIES = [
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
    provider: {
      businessName: "Jioni Properties",
      providerType: "AGENCY",
      verificationStatus: "VERIFIED",
    },
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
    buildingSize: 1800,
    area: "Kololo",
    city: "Kampala",
    district: "Kampala",
    latitude: 0.325,
    longitude: 32.585,
    isVerified: true,
    isFeatured: false,
    viewCount: 189,
    provider: {
      businessName: "Nile Real Estate",
      providerType: "COMPANY",
      verificationStatus: "VERIFIED",
    },
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
    city: "Mukono",
    district: "Mukono",
    latitude: 0.2833,
    longitude: 32.7167,
    isVerified: true,
    isFeatured: true,
    viewCount: 567,
    provider: {
      businessName: "Alpha Land Consultants",
      providerType: "BROKER",
      verificationStatus: "VERIFIED",
    },
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
    city: "Kampala",
    district: "Kampala",
    latitude: 0.3136,
    longitude: 32.5811,
    isVerified: true,
    isFeatured: false,
    viewCount: 321,
    provider: {
      businessName: "Capital Properties",
      providerType: "COMPANY",
      verificationStatus: "VERIFIED",
    },
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
    landSize: 0.25,
    area: "Kitoro",
    city: "Entebbe",
    district: "Wakiso",
    latitude: 0.0562,
    longitude: 32.4633,
    isVerified: false,
    isFeatured: false,
    viewCount: 98,
    provider: {
      businessName: null,
      providerType: "INDIVIDUAL_OWNER",
      verificationStatus: "PENDING",
    },
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
    city: "Kampala",
    district: "Kampala",
    latitude: 0.3297,
    longitude: 32.6133,
    isVerified: true,
    isFeatured: false,
    viewCount: 156,
    provider: {
      businessName: "Hjion Properties",
      providerType: "BROKER",
      verificationStatus: "VERIFIED",
    },
  },
];

const DEMO_BROKERS = [
  {
    id: "1",
    name: "Jioni Properties",
    type: "AGENCY",
    location: "Kampala · Wakiso · Entebbe",
    listings: 124,
    rating: 4.8,
    reviewCount: 45,
    isVerified: true,
    description:
      "Helping clients find residential and commercial property across Central Uganda since 2018.",
    categories: ["Residential", "Commercial", "Land"],
  },
  {
    id: "2",
    name: "Nile Real Estate",
    type: "COMPANY",
    location: "Kampala · Mukono · Jinja",
    listings: 89,
    rating: 4.6,
    reviewCount: 32,
    isVerified: true,
    description:
      "One of Uganda's leading property companies specializing in luxury and commercial properties.",
    categories: ["Luxury", "Commercial", "Apartments"],
  },
  {
    id: "3",
    name: "Alpha Land Consultants",
    type: "BROKER",
    location: "Wakiso · Mukono · Luweero",
    listings: 256,
    rating: 4.9,
    reviewCount: 78,
    isVerified: true,
    description:
      "Uganda's premier land brokerage with verified plots across the country.",
    categories: ["Land", "Farms", "Residential"],
  },
];

const PROPERTY_CATEGORIES = [
  { name: "Houses", icon: Home, count: "2,340+", color: "from-blue-500 to-blue-600" },
  { name: "Apartments", icon: Building, count: "1,890+", color: "from-purple-500 to-purple-600" },
  { name: "Land", icon: TreePine, count: "3,450+", color: "from-emerald-500 to-emerald-600" },
  { name: "Commercial", icon: Store, count: "780+", color: "from-orange-500 to-orange-600" },
  { name: "Offices", icon: Building2, count: "450+", color: "from-cyan-500 to-cyan-600" },
  { name: "Warehouses", icon: Warehouse, count: "230+", color: "from-amber-500 to-amber-600" },
  { name: "Farms", icon: TreePine, count: "890+", color: "from-green-500 to-green-600" },
  { name: "Luxury", icon: Star, count: "320+", color: "from-rose-500 to-rose-600" },
];

export default function HomePage() {
  const [searchLocation, setSearchLocation] = useState("");

  return (
    <div className="page-enter">
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 hero-gradient" />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-3xl" />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Floating property cards - decorative */}
        <div className="hidden xl:block absolute right-8 top-32 animate-float">
          <div className="glass-dark rounded-2xl p-4 w-64 shadow-2xl">
            <div className="w-full h-32 bg-gradient-to-br from-navy-700 to-navy-800 rounded-xl mb-3 flex items-center justify-center">
              <Home className="w-10 h-10 text-white/40" />
            </div>
            <p className="text-white/90 text-sm font-semibold">4 Bedroom Villa</p>
            <p className="text-white/60 text-xs">Kira, Wakiso</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-orange-400 font-bold text-sm">
                UGX 850M
              </span>
              <Badge variant="success" size="sm">
                ✓ Verified
              </Badge>
            </div>
          </div>
        </div>

        <div className="hidden xl:block absolute right-40 bottom-32 animate-float-delayed">
          <div className="glass-dark rounded-2xl p-4 w-56 shadow-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Navigation className="w-4 h-4 text-blue-400" />
              <span className="text-white/80 text-xs">7.8 km away</span>
            </div>
            <p className="text-white/90 text-sm font-semibold">Land - 10 Acres</p>
            <p className="text-white/60 text-xs">Mukono</p>
            <span className="text-orange-400 font-bold text-sm">
              UGX 120M
            </span>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium">
                Uganda&apos;s Property Connection Platform
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Find the property.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-300">
                Find the right connection.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl leading-relaxed">
              Discover homes, land, rentals and commercial properties across
              Uganda — then connect with the right owner, broker, agent or
              property company.
            </p>

            {/* Search */}
            <SearchFilters variant="hero" />

            {/* Quick stats */}
            <div className="flex flex-wrap gap-6 mt-10">
              {[
                { label: "Properties", value: "9,000+", icon: Building2 },
                { label: "Verified Providers", value: "500+", icon: Shield },
                { label: "Districts", value: "100+", icon: MapPin },
                { label: "Connections Made", value: "2,500+", icon: Users },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">{stat.value}</p>
                    <p className="text-white/60 text-xs">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ==================== TRUST STRIP ==================== */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                icon: MapPin,
                title: "Properties Across Uganda",
                desc: "From Kampala to Gulu",
              },
              {
                icon: Shield,
                title: "Verified Providers",
                desc: "Trustworthy connections",
              },
              {
                icon: Navigation,
                title: "Location-Aware Search",
                desc: "Real distances & directions",
              },
              {
                icon: Users,
                title: "Direct Connections",
                desc: "Connect with providers",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-12 h-12 bg-navy-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6 text-navy-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURED PROPERTIES ==================== */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12">
            <div>
              <Badge variant="orange" size="md" className="mb-3">
                Featured Properties
              </Badge>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900">
                Premium Properties
              </h2>
              <p className="text-gray-500 mt-2">
                Handpicked properties from verified providers across Uganda
              </p>
            </div>
            <Link
              href="/properties"
              className="flex items-center gap-2 text-click-orange font-semibold text-sm mt-4 sm:mt-0 hover:gap-3 transition-all"
            >
              View All Properties
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEMO_PROPERTIES.slice(0, 6).map((property, index) => (
              <PropertyCardDemo key={property.id} property={property} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== EXPLORE UGANDA ==================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="info" size="md" className="mb-3">
              Explore Uganda
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900">
              Properties by Location
            </h2>
            <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
              Discover properties in Uganda&apos;s most popular cities and
              districts
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {FEATURED_LOCATIONS.slice(0, 10).map((location) => (
              <Link
                key={location.name}
                href={`/properties?district=${location.name}`}
                className="group relative bg-gradient-to-br from-navy-800 to-navy-900 rounded-2xl p-5 overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="relative z-10">
                  <MapPin className="w-5 h-5 text-orange-400 mb-2" />
                  <h3 className="font-semibold text-white text-sm">
                    {location.name}
                  </h3>
                  <p className="text-white/60 text-xs">{location.region}</p>
                </div>
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-4 h-4 text-white/80" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PROPERTY TYPES ==================== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="primary" size="md" className="mb-3">
              Property Types
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900">
              Find Your Perfect Property
            </h2>
            <p className="text-gray-500 mt-2">
              Browse by property type to find exactly what you&apos;re looking
              for
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {PROPERTY_CATEGORIES.map((category) => (
              <Link
                key={category.name}
                href={`/properties?type=${category.name.toLowerCase()}`}
                className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all text-center"
              >
                <div
                  className={cn(
                    "w-14 h-14 bg-gradient-to-br rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform",
                    category.color
                  )}
                >
                  <category.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">{category.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== MAP DISCOVERY ==================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="info" size="md" className="mb-3">
              Map Discovery
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900">
              Explore on the Map
            </h2>
            <p className="text-gray-500 mt-2">
              Find properties near you with real distances and directions
            </p>
          </div>

          <Link href="/map" className="block group">
            <div className="relative bg-gradient-to-br from-navy-900 to-navy-800 rounded-3xl overflow-hidden h-80 lg:h-96">
              {/* Map placeholder */}
              <div className="absolute inset-0 opacity-20">
                <svg viewBox="0 0 800 400" className="w-full h-full">
                  <path
                    d="M100,200 Q200,100 300,200 T500,200 T700,200"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <path
                    d="M150,250 Q250,150 350,250 T550,250 T750,250"
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                    opacity="0.5"
                  />
                </svg>
              </div>

              {/* Map pins */}
              {[
                { top: "25%", left: "30%", price: "850M" },
                { top: "40%", left: "55%", price: "3.5M" },
                { top: "60%", left: "25%", price: "120M" },
                { top: "35%", left: "70%", price: "4.5B" },
                { top: "55%", left: "45%", price: "1.8M" },
              ].map((pin, i) => (
                <div
                  key={i}
                  className="absolute animate-float"
                  style={{
                    top: pin.top,
                    left: pin.left,
                    animationDelay: `${i * 0.5}s`,
                  }}
                >
                  <div className="custom-marker">UGX {pin.price}</div>
                </div>
              ))}

              {/* CTA */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-click-orange rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Open Interactive Map
                  </h3>
                  <p className="text-white/70 text-sm">
                    Explore properties across Uganda
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ==================== BROKERS & COMPANIES ==================== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12">
            <div>
              <Badge variant="success" size="md" className="mb-3">
                Verified Providers
              </Badge>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900">
                Brokers & Property Companies
              </h2>
              <p className="text-gray-500 mt-2">
                Connect with Uganda&apos;s most trusted property providers
              </p>
            </div>
            <Link
              href="/brokers"
              className="flex items-center gap-2 text-click-orange font-semibold text-sm mt-4 sm:mt-0 hover:gap-3 transition-all"
            >
              View All Providers
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEMO_BROKERS.map((broker) => (
              <ProviderCardDemo key={broker.id} broker={broker} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HOW CLICK WORKS ==================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="orange" size="md" className="mb-3">
              How It Works
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900">
              How CLICK Works
            </h2>
            <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
              Five simple steps to find and connect with your perfect property
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {HOW_IT_WORKS.map((step, index) => (
              <div key={step.step} className="text-center relative">
                {/* Connector line */}
                {index < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-orange-200 to-transparent" />
                )}
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-click-orange to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-200">
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-navy-800 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {step.step}
                    </span>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FOR PROPERTY PROVIDERS ==================== */}
      <section className="py-20 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="orange" size="md" className="mb-4">
                For Property Providers
              </Badge>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6">
                Have Property to Sell or Rent?
              </h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Join Uganda&apos;s fastest-growing property connection platform.
                List your properties, reach serious buyers and renters, and grow
                your business with CLICK.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "List unlimited properties",
                  "Reach buyers across Uganda",
                  "Verified provider badge",
                  "Lead management dashboard",
                  "Marketing & promotion tools",
                  "Commission-based earnings",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-white/90"
                  >
                    <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/register">
                  <Button size="lg" className="px-8">
                    Register as Provider
                  </Button>
                </Link>
                <Link href="/for-providers">
                  <Button variant="outline" size="lg" className="px-8 border-white/30 text-white hover:bg-white/10 hover:text-white">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="glass-dark rounded-3xl p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
                      <Building2 className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">
                        Provider Dashboard
                      </h3>
                      <p className="text-white/60 text-sm">
                        Manage your properties
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { label: "Active Listings", value: "124", icon: Building2 },
                      { label: "Total Views", value: "8.5K", icon: Eye },
                      { label: "Inquiries", value: "89", icon: Mail },
                      { label: "Connections", value: "34", icon: Users },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-white/5 rounded-xl p-4"
                      >
                        <stat.icon className="w-4 h-4 text-orange-400 mb-2" />
                        <p className="text-white font-bold text-xl">
                          {stat.value}
                        </p>
                        <p className="text-white/50 text-xs">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white/80 text-sm">
                        Recent Activity
                      </span>
                      <span className="text-orange-400 text-xs">
                        View All
                      </span>
                    </div>
                    {[
                      "New inquiry for 4BR Villa in Kira",
                      "Property viewed 23 times today",
                      "Connection request from buyer",
                    ].map((activity, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 py-2 border-t border-white/5"
                      >
                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                        <span className="text-white/70 text-xs">
                          {activity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SAFETY & TRUST ==================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="success" size="md" className="mb-3">
              Safety & Trust
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900">
              Your Safety Matters
            </h2>
            <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
              CLICK is committed to providing a safe and trustworthy platform
              for property connections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Verified Providers",
                description:
                  "We verify property providers before they can list on our platform. Look for the CLICK Verified badge.",
                color: "from-emerald-500 to-emerald-600",
              },
              {
                icon: CheckCircle2,
                title: "Property Verification",
                description:
                  "Featured properties go through our verification process to ensure accuracy and legitimacy.",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: Users,
                title: "Report & Review",
                description:
                  "Report suspicious properties or providers. Our team reviews all reports promptly.",
                color: "from-purple-500 to-purple-600",
              },
            ].map((item) => (
              <Card key={item.title} hover className="text-center p-8">
                <div
                  className={cn(
                    "w-14 h-14 bg-gradient-to-br rounded-2xl flex items-center justify-center mx-auto mb-4",
                    item.color
                  )}
                >
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/trust">
              <Button variant="outline" size="lg">
                Visit Trust Center
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== BLOG / GUIDES ==================== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12">
            <div>
              <Badge variant="info" size="md" className="mb-3">
                Property Guides
              </Badge>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900">
                Blog & Guides
              </h2>
              <p className="text-gray-500 mt-2">
                Expert guides to help you navigate Uganda&apos;s property market
              </p>
            </div>
            <Link
              href="/guides"
              className="flex items-center gap-2 text-click-orange font-semibold text-sm mt-4 sm:mt-0 hover:gap-3 transition-all"
            >
              View All Guides
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Complete Guide to Buying Land in Uganda",
                excerpt:
                  "Everything you need to know about purchasing land safely in Uganda, from verification to transfer.",
                category: "Buying Guide",
                readTime: "8 min read",
              },
              {
                title: "How to Avoid Property Scams",
                excerpt:
                  "Learn the red flags and best practices to protect yourself from common property fraud.",
                category: "Safety",
                readTime: "6 min read",
              },
              {
                title: "Working with Property Brokers",
                excerpt:
                  "A guide to finding and working with reliable property brokers in Uganda.",
                category: "Tips",
                readTime: "5 min read",
              },
            ].map((post, index) => (
              <Card key={index} hover className="overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-navy-100 to-blue-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-navy-200 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Globe className="w-6 h-6 text-navy-500" />
                    </div>
                    <span className="text-navy-500 text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {post.readTime}
                    </span>
                    <span className="text-click-orange text-sm font-medium">
                      Read More →
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="py-20 bg-gradient-to-r from-click-orange to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Find Your Perfect Property?
          </h2>
          <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of Ugandans who have found their dream properties
            through CLICK. Start your search today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/properties">
              <Button
                size="xl"
                className="bg-white text-click-orange hover:bg-gray-100 shadow-xl px-10"
              >
                Search Properties
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white/10 px-10"
              >
                List Your Property
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Helper components
function PropertyCardDemo({
  property,
  index,
}: {
  property: (typeof DEMO_PROPERTIES)[0];
  index: number;
}) {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden property-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-navy-100 to-blue-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-navy-200 rounded-2xl flex items-center justify-center mx-auto mb-2">
              <Home className="w-8 h-8 text-navy-500" />
            </div>
            <p className="text-sm text-navy-500 font-medium">
              {getPropertyTypeLabel(property.propertyType)}
            </p>
          </div>
        </div>

        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge
            variant={property.listingType === "SALE" ? "primary" : "success"}
            className="shadow-sm"
          >
            {property.listingType === "SALE" ? "For Sale" : "For Rent"}
          </Badge>
          {property.isFeatured && (
            <Badge variant="orange" className="shadow-sm">
              ⭐ Featured
            </Badge>
          )}
        </div>

        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className={cn(
            "absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all",
            isFavorited
              ? "bg-red-500 text-white shadow-lg"
              : "bg-white/90 text-gray-600 hover:bg-white hover:text-red-500 shadow-sm"
          )}
        >
          <Heart className={cn("w-4 h-4", isFavorited && "fill-current")} />
        </button>

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
      </div>

      <Link href={`/properties/${property.slug}`}>
        <div className="p-4">
          <div className="mb-2">
            <span className="text-xl font-bold text-navy-900">
              {formatPrice(property.price, property.currency)}
            </span>
            {property.listingType === "RENT" && (
              <span className="text-sm text-gray-500 ml-1">/month</span>
            )}
          </div>

          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-click-orange transition-colors">
            {property.title}
          </h3>

          <div className="flex items-center gap-1.5 text-gray-500 mb-3">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-sm truncate">
              {[property.area, property.district].filter(Boolean).join(", ")}
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 pb-3 border-b border-gray-100">
            {property.bedrooms && (
              <div className="flex items-center gap-1.5">
                <span>{property.bedrooms} Beds</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-1.5">
                <span>{property.bathrooms} Baths</span>
              </div>
            )}
            {property.landSize && (
              <div className="flex items-center gap-1.5">
                <span>{property.landSize} acres</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-2">
              {property.provider?.businessName && (
                <>
                  <div className="w-6 h-6 bg-gradient-to-br from-navy-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-[8px] font-bold text-white">
                      {property.provider.businessName[0]}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 truncate max-w-[120px]">
                    {property.provider.businessName}
                  </span>
                </>
              )}
            </div>
            {property.viewCount > 0 && (
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

function ProviderCardDemo({
  broker,
}: {
  broker: (typeof DEMO_BROKERS)[0];
}) {
  return (
    <Card hover className="p-6">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 bg-gradient-to-br from-navy-600 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
          <span className="text-xl font-bold text-white">
            {broker.name[0]}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 truncate">
              {broker.name}
            </h3>
            {broker.isVerified && (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            )}
          </div>
          <p className="text-sm text-gray-500">
            {getProviderTypeLabel(broker.type)}
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {broker.description}
      </p>

      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-xs text-gray-500">{broker.location}</span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {broker.categories.map((cat) => (
          <Badge key={cat} variant="default" size="sm">
            {cat}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-current" />
            <span className="text-sm font-semibold">{broker.rating}</span>
            <span className="text-xs text-gray-400">
              ({broker.reviewCount})
            </span>
          </div>
          <div className="text-sm text-gray-500">
            <span className="font-semibold text-navy-900">
              {broker.listings}
            </span>{" "}
            properties
          </div>
        </div>
        <Link
          href={`/brokers/${broker.id}`}
          className="text-click-orange text-sm font-medium hover:underline"
        >
          View →
        </Link>
      </div>
    </Card>
  );
}
