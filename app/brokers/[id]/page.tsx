"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Building2,
  Users,
  Star,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  Globe,
  Eye,
  MessageSquare,
  Heart,
  Shield,
  Clock,
  TrendingUp,
  ChevronRight,
  ExternalLink,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import {
  cn,
  formatPrice,
  getProviderTypeLabel,
  getPropertyTypeLabel,
} from "@/lib/utils";

const BROKER_DATA: Record<string, any> = {
  p1: {
    id: "p1",
    name: "Jioni Properties",
    type: "AGENCY",
    description:
      "Jioni Properties is a leading real estate agency in Central Uganda, helping clients find residential and commercial property since 2018. We specialize in verified properties with clear documentation and provide end-to-end support from property search to completion.",
    location: "Kampala, Uganda",
    address: "Plot 12, Parliament Avenue, Kampala",
    areas: ["Kampala", "Wakiso", "Entebbe", "Mukono"],
    categories: ["Residential", "Commercial", "Land"],
    listings: 124,
    activeListings: 98,
    rating: 4.8,
    reviewCount: 45,
    responseRate: 95,
    memberSince: "2018",
    isVerified: true,
    website: "www.jioniproperties.ug",
    phone: "+256 700 123 456",
    email: "info@jioniproperties.ug",
    socialLinks: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
    properties: [
      {
        id: "1",
        title: "Modern 4 Bedroom Villa",
        slug: "modern-4-bedroom-villa-kira",
        price: 850000000,
        type: "SALE",
        propertyType: "HOUSE",
        location: "Kira, Wakiso",
        bedrooms: 4,
        bathrooms: 3,
      },
      {
        id: "2",
        title: "3 Bedroom Bungalow",
        slug: "3-bedroom-bungalow-ntinda",
        price: 2500000,
        type: "RENT",
        propertyType: "HOUSE",
        location: "Ntinda, Kampala",
        bedrooms: 3,
        bathrooms: 2,
      },
      {
        id: "3",
        title: "Commercial Plot 2 Acres",
        slug: "commercial-plot-2-acres",
        price: 800000000,
        type: "SALE",
        propertyType: "LAND",
        location: "Kira, Wakiso",
      },
      {
        id: "4",
        title: "Luxury Apartment Kololo",
        slug: "luxury-apartment-kololo",
        price: 4500000,
        type: "RENT",
        propertyType: "APARTMENT",
        location: "Kololo, Kampala",
        bedrooms: 2,
        bathrooms: 2,
      },
    ],
    reviews: [
      {
        id: "1",
        author: "Sarah K.",
        rating: 5,
        date: "2024-01-10",
        content:
          "Excellent service! They helped me find my dream home in Wakiso. Very professional and responsive.",
      },
      {
        id: "2",
        author: "James O.",
        rating: 5,
        date: "2024-01-05",
        content:
          "Great experience working with Jioni Properties. They were transparent throughout the entire process.",
      },
      {
        id: "3",
        author: "Grace M.",
        rating: 4,
        date: "2023-12-20",
        content:
          "Good properties and professional service. Would recommend for anyone looking in Central Uganda.",
      },
    ],
  },
};

const DEFAULT_BROKER = {
  id: "default",
  name: "Property Provider",
  type: "BROKER",
  description: "Contact this provider for more information about their services.",
  location: "Uganda",
  areas: [],
  categories: [],
  listings: 0,
  rating: 0,
  reviewCount: 0,
  responseRate: 0,
  isVerified: false,
  properties: [],
  reviews: [],
};

export default function BrokerDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [activeTab, setActiveTab] = useState<"properties" | "reviews" | "about">("properties");
  const [showContactModal, setShowContactModal] = useState(false);

  const broker = BROKER_DATA[id] || { ...DEFAULT_BROKER, id };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero */}
      <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 py-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/brokers" className="hover:text-white">
              Providers
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{broker.name}</span>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Logo */}
            <div className="w-20 h-20 bg-gradient-to-br from-navy-600 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-3xl font-bold text-white">
                {broker.name[0]}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="font-display text-3xl font-bold text-white">
                  {broker.name}
                </h1>
                {broker.isVerified && (
                  <div className="flex items-center gap-1.5 bg-emerald-500/20 px-3 py-1 rounded-full">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-medium text-emerald-300">
                      CLICK Verified
                    </span>
                  </div>
                )}
              </div>

              <p className="text-white/70 text-lg mb-4">
                {getProviderTypeLabel(broker.type)}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>{broker.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" />
                  <span>{broker.activeListings || broker.listings} active listings</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400" />
                  <span>
                    {broker.rating} ({broker.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{broker.responseRate}% response rate</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <Button
                onClick={() => setShowContactModal(true)}
                size="lg"
                className="w-full md:w-auto"
              >
                <Phone className="w-5 h-5 mr-2" />
                Connect
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full md:w-auto border-white/30 text-white hover:bg-white/10"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Message
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="flex gap-1 bg-white rounded-xl p-1 border border-gray-100">
              {[
                { key: "properties", label: "Properties", count: broker.listings },
                { key: "reviews", label: "Reviews", count: broker.reviewCount },
                { key: "about", label: "About" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={cn(
                    "flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    activeTab === tab.key
                      ? "bg-navy-800 text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  {tab.label}
                  {tab.count !== undefined && (
                    <span className="ml-2 text-xs opacity-70">
                      ({tab.count})
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Properties Tab */}
            {activeTab === "properties" && (
              <div className="space-y-4">
                {broker.properties.length > 0 ? (
                  broker.properties.map((property: any) => (
                    <Link
                      key={property.id}
                      href={`/properties/${property.slug}`}
                      className="block bg-white rounded-xl p-4 border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-navy-100 to-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-8 h-8 text-navy-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {property.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{property.location}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-bold text-navy-900">
                              {formatPrice(property.price)}
                            </span>
                            <Badge
                              variant={
                                property.type === "SALE"
                                  ? "primary"
                                  : "success"
                              }
                              size="sm"
                            >
                              {property.type === "SALE" ? "Sale" : "Rent"}
                            </Badge>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                    <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No active listings</p>
                  </div>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div className="space-y-4">
                {broker.reviews.length > 0 ? (
                  broker.reviews.map((review: any) => (
                    <Card key={review.id} className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {review.author}
                          </h4>
                          <p className="text-xs text-gray-500">{review.date}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-4 h-4",
                                i < review.rating
                                  ? "text-amber-400 fill-current"
                                  : "text-gray-200"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{review.content}</p>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                    <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No reviews yet</p>
                  </div>
                )}
              </div>
            )}

            {/* About Tab */}
            {activeTab === "about" && (
              <Card className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    About {broker.name}
                  </h3>
                  <p className="text-gray-600">{broker.description}</p>
                </div>

                {broker.areas.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Areas Served
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {broker.areas.map((area: string) => (
                        <Badge key={area} variant="default">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {broker.categories.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Property Categories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {broker.categories.map((cat: string) => (
                        <Badge key={cat} variant="info">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {broker.address && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Address
                    </h3>
                    <p className="text-gray-600">{broker.address}</p>
                  </div>
                )}
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="p-6 sticky top-28">
              <h3 className="font-semibold text-gray-900 mb-4">
                Contact Information
              </h3>
              <div className="space-y-3 mb-6">
                {broker.phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{broker.phone}</span>
                  </div>
                )}
                {broker.email && (
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{broker.email}</span>
                  </div>
                )}
                {broker.website && (
                  <div className="flex items-center gap-3 text-sm">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <a
                      href={`https://${broker.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-click-orange hover:underline"
                    >
                      {broker.website}
                    </a>
                  </div>
                )}
              </div>

              <Button
                onClick={() => setShowContactModal(true)}
                className="w-full mb-3"
              >
                Connect with {broker.name}
              </Button>

              <Button variant="outline" className="w-full">
                Send Message
              </Button>

              {/* Social Links */}
              {broker.socialLinks && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Follow Us
                  </p>
                  <div className="flex gap-2">
                    {broker.socialLinks.facebook && (
                      <a
                        href={broker.socialLinks.facebook}
                        className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors"
                      >
                        <Facebook className="w-4 h-4" />
                      </a>
                    )}
                    {broker.socialLinks.twitter && (
                      <a
                        href={broker.socialLinks.twitter}
                        className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600 hover:bg-sky-200 transition-colors"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {broker.socialLinks.instagram && (
                      <a
                        href={broker.socialLinks.instagram}
                        className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600 hover:bg-pink-200 transition-colors"
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                    )}
                    {broker.socialLinks.linkedin && (
                      <a
                        href={broker.socialLinks.linkedin}
                        className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-700 hover:bg-blue-200 transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </Card>

            {/* Stats */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="font-semibold text-gray-900">
                    {broker.memberSince || "2024"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Total Listings
                  </span>
                  <span className="font-semibold text-gray-900">
                    {broker.listings}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-current" />
                    <span className="font-semibold text-gray-900">
                      {broker.rating}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Response Rate</span>
                  <span className="font-semibold text-gray-900">
                    {broker.responseRate}%
                  </span>
                </div>
              </div>
            </Card>
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
            Connect with {broker.name}
          </h3>
          <p className="text-gray-500 text-sm mb-6">
            Get in touch to discuss your property needs.
          </p>
          <Button size="lg" className="w-full">
            Connect Now
          </Button>
        </div>
      </Modal>
    </div>
  );
}
