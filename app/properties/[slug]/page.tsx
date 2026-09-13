"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  Calendar,
  CheckCircle2,
  Heart,
  Share2,
  Navigation,
  Phone,
  Mail,
  MessageSquare,
  ArrowLeft,
  Eye,
  Flag,
  ChevronRight,
  Home,
  Building2,
  Shield,
  Star,
  Clock,
  Wifi,
  Car,
  Zap,
  Droplets,
  TreePine,
  Lock,
  Camera,
  Play,
  ExternalLink,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import {
  cn,
  formatPrice,
  formatFullPrice,
  formatDistance,
  calculateDistance,
  getPropertyTypeLabel,
  getListingTypeLabel,
  getProviderTypeLabel,
  timeAgo,
} from "@/lib/utils";

// Demo property data
const PROPERTY_DATA: Record<string, any> = {
  "modern-4-bedroom-villa-kira": {
    id: "1",
    title: "Modern 4 Bedroom Villa with Swimming Pool",
    slug: "modern-4-bedroom-villa-kira",
    description:
      "Beautiful modern villa located in the serene Kira neighborhood of Wakiso district. This stunning property features spacious rooms with high ceilings, modern finishes throughout, a large swimming pool, well-maintained garden, and 24/7 security. The property is conveniently located near schools, shopping centers, and major roads. Perfect for families looking for a peaceful yet accessible home.",
    propertyType: "HOUSE",
    listingType: "SALE",
    price: 850000000,
    currency: "UGX",
    priceNegotiable: true,
    bedrooms: 4,
    bathrooms: 3,
    toilets: 4,
    parkingSpaces: 3,
    landSize: 0.5,
    landSizeUnit: "ACRES",
    buildingSize: 3200,
    buildingSizeUnit: "SQFT",
    yearBuilt: 2022,
    floors: 2,
    furnishing: "PARTIALLY_FURNISHED",
    condition: "NEW",
    area: "Kira",
    city: "Kira",
    district: "Wakiso",
    region: "Central",
    address: "Plot 45, Kira-Namugongo Road, Wakiso District",
    latitude: 0.3833,
    longitude: 32.6333,
    isVerified: true,
    isFeatured: true,
    viewCount: 245,
    saveCount: 34,
    inquiryCount: 12,
    createdAt: "2024-01-15",
    features: [
      "Swimming Pool",
      "Garden",
      "24/7 Security",
      "Backup Generator",
      "Water Tank",
      "Perimeter Wall",
      "Electric Fence",
      "CCTV",
      "Servant Quarter",
      "Study Room",
      "Balcony",
      "Modern Kitchen",
    ],
    amenities: [
      "Schools Nearby",
      "Shopping Centers",
      "Hospital Nearby",
      "Public Transport",
      "Church/Mosque",
      "Market",
    ],
    nearbyPlaces: [
      { name: "Kira Primary School", distance: "0.5 km", type: "School" },
      { name: "Quality Shopping Mall", distance: "1.2 km", type: "Shopping" },
      { name: "Kira Health Center", distance: "0.8 km", type: "Hospital" },
      { name: "Namugongo Road", distance: "0.3 km", type: "Road" },
    ],
    provider: {
      id: "p1",
      name: "Jioni Properties",
      type: "AGENCY",
      logo: null,
      description:
        "Jioni Properties is a leading real estate agency in Central Uganda, helping clients find residential and commercial property since 2018.",
      verificationStatus: "VERIFIED",
      rating: 4.8,
      reviewCount: 45,
      totalListings: 124,
      responseRate: 95,
      location: "Kampala, Uganda",
      phone: "+256 700 123 456",
      email: "info@jioniproperties.ug",
      website: "www.jioniproperties.ug",
    },
  },
};

const DEFAULT_PROPERTY = {
  id: "default",
  title: "Property Details",
  slug: "property",
  description: "Contact the provider for more details about this property.",
  propertyType: "HOUSE",
  listingType: "SALE",
  price: 0,
  currency: "UGX",
  priceNegotiable: false,
  bedrooms: null,
  bathrooms: null,
  area: null,
  city: null,
  district: null,
  region: null,
  latitude: null,
  longitude: null,
  isVerified: false,
  isFeatured: false,
  viewCount: 0,
  saveCount: 0,
  features: [],
  amenities: [],
  nearbyPlaces: [],
  provider: null,
};

export default function PropertyDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [property, setProperty] = useState<any>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    // Load property data
    const data = PROPERTY_DATA[slug] || { ...DEFAULT_PROPERTY, slug, title: slug.replace(/-/g, " ") };
    setProperty(data);

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(loc);
          if (data.latitude && data.longitude) {
            setDistance(
              calculateDistance(loc.lat, loc.lng, data.latitude, data.longitude)
            );
          }
        },
        () => {}
      );
    }
  }, [slug]);

  if (!property) return null;

  const location = [property.area, property.city, property.district]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-click-orange">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/properties" className="hover:text-click-orange">
              Properties
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 truncate">{property.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
              <div className="relative aspect-[16/10] bg-gradient-to-br from-navy-100 to-blue-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-navy-200 rounded-3xl flex items-center justify-center mx-auto mb-4">
                      <Home className="w-12 h-12 text-navy-500" />
                    </div>
                    <p className="text-navy-500 font-medium">
                      {getPropertyTypeLabel(property.propertyType)}
                    </p>
                    <p className="text-navy-400 text-sm mt-1">
                      Property Images
                    </p>
                  </div>
                </div>

                {/* Image count badge */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/60 text-white px-3 py-1.5 rounded-lg text-sm">
                  <Camera className="w-4 h-4" />
                  <span>12 Photos</span>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {property.isVerified && (
                    <div className="flex items-center gap-1.5 bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4" />
                      CLICK Verified
                    </div>
                  )}
                  {property.isFeatured && (
                    <div className="flex items-center gap-1.5 bg-click-orange text-white px-3 py-1.5 rounded-lg text-sm font-medium">
                      <Star className="w-4 h-4" />
                      Featured
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Property Header */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <Badge
                    variant={
                      property.listingType === "SALE" ? "primary" : "success"
                    }
                    size="md"
                    className="mb-2"
                  >
                    {getListingTypeLabel(property.listingType)}
                  </Badge>
                  <h1 className="font-display text-2xl sm:text-3xl font-bold text-navy-900">
                    {property.title}
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsFavorited(!isFavorited)}
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all border",
                      isFavorited
                        ? "bg-red-50 border-red-200 text-red-500"
                        : "bg-white border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200"
                    )}
                  >
                    <Heart
                      className={cn(
                        "w-5 h-5",
                        isFavorited && "fill-current"
                      )}
                    />
                  </button>
                  <button className="w-10 h-10 rounded-xl flex items-center justify-center border border-gray-200 text-gray-400 hover:text-blue-500 hover:border-blue-200 transition-all">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setShowReportModal(true)}
                    className="w-10 h-10 rounded-xl flex items-center justify-center border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-all"
                  >
                    <Flag className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-bold text-navy-900">
                  {formatFullPrice(property.price, property.currency)}
                </span>
                {property.listingType === "RENT" && (
                  <span className="text-gray-500">/month</span>
                )}
                {property.priceNegotiable && (
                  <Badge variant="warning" size="sm">
                    Negotiable
                  </Badge>
                )}
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="w-5 h-5 text-click-orange" />
                <span>{property.address || location || "Uganda"}</span>
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-4">
                {property.bedrooms !== null && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                    <BedDouble className="w-5 h-5 text-navy-600" />
                    <div>
                      <p className="font-semibold text-navy-900">
                        {property.bedrooms}
                      </p>
                      <p className="text-xs text-gray-500">Bedrooms</p>
                    </div>
                  </div>
                )}
                {property.bathrooms !== null && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                    <Bath className="w-5 h-5 text-navy-600" />
                    <div>
                      <p className="font-semibold text-navy-900">
                        {property.bathrooms}
                      </p>
                      <p className="text-xs text-gray-500">Bathrooms</p>
                    </div>
                  </div>
                )}
                {property.landSize && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                    <Maximize className="w-5 h-5 text-navy-600" />
                    <div>
                      <p className="font-semibold text-navy-900">
                        {property.landSize}
                      </p>
                      <p className="text-xs text-gray-500">Acres</p>
                    </div>
                  </div>
                )}
                {property.buildingSize && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                    <Home className="w-5 h-5 text-navy-600" />
                    <div>
                      <p className="font-semibold text-navy-900">
                        {property.buildingSize?.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">Sq Ft</p>
                    </div>
                  </div>
                )}
                {property.yearBuilt && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-navy-600" />
                    <div>
                      <p className="font-semibold text-navy-900">
                        {property.yearBuilt}
                      </p>
                      <p className="text-xs text-gray-500">Year Built</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {property.description && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 className="font-display text-xl font-bold text-navy-900 mb-4">
                  Description
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {property.description}
                </p>
              </div>
            )}

            {/* Features & Amenities */}
            {property.features && property.features.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 className="font-display text-xl font-bold text-navy-900 mb-4">
                  Features & Amenities
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.features.map((feature: string) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nearby Places */}
            {property.nearbyPlaces && property.nearbyPlaces.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 className="font-display text-xl font-bold text-navy-900 mb-4">
                  Nearby Places
                </h2>
                <div className="space-y-3">
                  {property.nearbyPlaces.map(
                    (place: { name: string; distance: string; type: string }) => (
                      <div
                        key={place.name}
                        className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-blue-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {place.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {place.type}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {place.distance}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Location & Map */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="font-display text-xl font-bold text-navy-900 mb-4">
                Location
              </h2>

              {/* Map placeholder */}
              <div className="relative bg-gradient-to-br from-navy-100 to-blue-100 rounded-xl h-64 mb-4 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-navy-400 mx-auto mb-2" />
                    <p className="text-navy-600 font-medium">Interactive Map</p>
                    <p className="text-navy-400 text-sm">
                      {property.latitude && property.longitude
                        ? `${property.latitude.toFixed(4)}, ${property.longitude.toFixed(4)}`
                        : location}
                    </p>
                  </div>
                </div>
                {/* Decorative pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
                  <div className="w-8 h-8 bg-click-orange rounded-full flex items-center justify-center shadow-lg">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Distance & Directions */}
              {distance !== null && (
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Navigation className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-blue-900">
                      {formatDistance(distance)} away
                    </p>
                    <p className="text-sm text-blue-600">
                      From your current location
                    </p>
                  </div>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${property.latitude},${property.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-100">
                      <Navigation className="w-4 h-4 mr-1" />
                      Get Directions
                    </Button>
                  </a>
                </div>
              )}

              {/* Address */}
              <div className="mt-4 flex items-start gap-2 text-gray-600">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{property.address || location}</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Connect CTA */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-36">
              <h3 className="font-display text-lg font-bold text-navy-900 mb-2">
                Connect with Provider
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Get in touch with the owner, broker, agent or property company
                through CLICK.
              </p>

              <Button
                onClick={() => setShowContactModal(true)}
                size="lg"
                className="w-full mb-3"
              >
                <Phone className="w-5 h-5 mr-2" />
                Connect Now
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full mb-6"
                leftIcon={<MessageSquare className="w-5 h-5" />}
              >
                Send Message
              </Button>

              {/* Provider info */}
              {property.provider && (
                <div className="border-t border-gray-100 pt-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-navy-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-white">
                        {property.provider.name[0]}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900">
                          {property.provider.name}
                        </h4>
                        {property.provider.verificationStatus ===
                          "VERIFIED" && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {getProviderTypeLabel(property.provider.type)}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {property.provider.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{property.provider.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Star className="w-4 h-4 text-amber-400" />
                      <span>
                        {property.provider.rating} (
                        {property.provider.reviewCount} reviews)
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span>
                        {property.provider.totalListings} active listings
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>
                        {property.provider.responseRate}% response rate
                      </span>
                    </div>
                  </div>

                  <Link href={`/brokers/${property.provider.id}`}>
                    <Button variant="ghost" className="w-full" size="sm">
                      View Provider Profile
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Property Stats */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">
                Property Stats
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Eye className="w-4 h-4 text-gray-400" />
                    <span>Views</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {property.viewCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Heart className="w-4 h-4 text-gray-400" />
                    <span>Saves</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {property.saveCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MessageSquare className="w-4 h-4 text-gray-400" />
                    <span>Inquiries</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {property.inquiryCount}
                  </span>
                </div>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-amber-600" />
                <h3 className="font-semibold text-amber-900">Safety Tips</h3>
              </div>
              <ul className="space-y-2 text-sm text-amber-800">
                <li>• Verify property ownership before payment</li>
                <li>• Visit the property in person</li>
                <li>• Don&apos;t send money before seeing the property</li>
                <li>• Use CLICK&apos;s secure connection system</li>
                <li>
                  •{" "}
                  <Link href="/trust" className="underline font-medium">
                    Learn more about staying safe
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <Modal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        title="Connect with Provider"
      >
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-gradient-to-br from-click-orange to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-bold text-navy-900 mb-2">
            Get Provider Contact
          </h3>
          <p className="text-gray-500 text-sm mb-6">
            To protect our providers, contact information is shared after a
            small connection fee. This helps us maintain a quality platform.
          </p>

          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Connection Fee</p>
            <p className="text-2xl font-bold text-navy-900">UGX 10,000</p>
            <p className="text-xs text-gray-500 mt-1">
              One-time payment for this property
            </p>
          </div>

          <Button size="lg" className="w-full mb-3">
            Pay & Connect
          </Button>

          <p className="text-xs text-gray-400">
            By proceeding, you agree to our{" "}
            <Link href="/terms" className="underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </Modal>

      {/* Report Modal */}
      <Modal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        title="Report Property"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Help us maintain a safe platform. Select a reason for reporting:
          </p>
          {[
            "Suspected scam",
            "False information",
            "Duplicate listing",
            "Wrong location",
            "Fake photos",
            "Suspicious payment request",
            "Other",
          ].map((reason) => (
            <label
              key={reason}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-orange-200 hover:bg-orange-50 transition-colors"
            >
              <input
                type="radio"
                name="report-reason"
                value={reason}
                className="text-click-orange focus:ring-click-orange"
              />
              <span className="text-sm text-gray-700">{reason}</span>
            </label>
          ))}
          <textarea
            placeholder="Additional details (optional)"
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-click-orange focus:ring-2 focus:ring-click-orange/20 resize-none"
            rows={3}
          />
          <Button variant="danger" className="w-full">
            Submit Report
          </Button>
        </div>
      </Modal>
    </div>
  );
}
