"use client";

import Link from "next/link";
import {
  Star,
  TrendingUp,
  Eye,
  Zap,
  MapPin,
  Users,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { cn, formatPrice } from "@/lib/utils";

const packages = [
  {
    id: "featured",
    name: "Featured Listing",
    price: 50000,
    duration: "7 days",
    icon: Star,
    color: "from-amber-500 to-orange-500",
    features: [
      "Featured badge on listing",
      "Priority in search results",
      "Highlighted on homepage",
      "Up to 7 days visibility",
    ],
  },
  {
    id: "premium",
    name: "Premium Listing",
    price: 100000,
    duration: "14 days",
    icon: TrendingUp,
    color: "from-purple-500 to-violet-500",
    popular: true,
    features: [
      "Everything in Featured",
      "Premium badge",
      "Top of search results",
      "Social media promotion",
      "Up to 14 days visibility",
    ],
  },
  {
    id: "spotlight",
    name: "Homepage Spotlight",
    price: 200000,
    duration: "30 days",
    icon: Eye,
    color: "from-blue-500 to-cyan-500",
    features: [
      "Everything in Premium",
      "Homepage spotlight section",
      "District spotlight",
      "Newsletter feature",
      "Up to 30 days visibility",
    ],
  },
  {
    id: "boost",
    name: "Search Boost",
    price: 30000,
    duration: "3 days",
    icon: Zap,
    color: "from-emerald-500 to-green-500",
    features: [
      "Boosted in search results",
      "Quick visibility increase",
      "Up to 3 days boost",
    ],
  },
];

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero */}
      <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="orange" size="md" className="mb-4">
            Marketing
          </Badge>
          <h1 className="font-display text-4xl font-bold text-white mb-4">
            Promote Your Properties
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Get more visibility for your listings with our marketing packages.
            Reach more buyers and renters across Uganda.
          </p>
        </div>
      </div>

      {/* Packages */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className={cn(
                "relative overflow-hidden",
                pkg.popular && "ring-2 ring-click-orange"
              )}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-click-orange text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-6">
                <div
                  className={cn(
                    "w-12 h-12 bg-gradient-to-br rounded-xl flex items-center justify-center mb-4",
                    pkg.color
                  )}
                >
                  <pkg.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="font-display text-lg font-bold text-navy-900 mb-1">
                  {pkg.name}
                </h3>

                <div className="mb-4">
                  <span className="text-3xl font-bold text-navy-900">
                    {formatPrice(pkg.price)}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    / {pkg.duration}
                  </span>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={pkg.popular ? "primary" : "outline"}
                  className="w-full"
                >
                  Get Started
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Custom packages */}
        <div className="mt-16 text-center">
          <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
            Need a Custom Package?
          </h2>
          <p className="text-gray-500 mb-6 max-w-xl mx-auto">
            We offer custom marketing solutions for agencies and property
            companies with multiple listings.
          </p>
          <Link href="/contact">
            <Button variant="outline" size="lg">
              Contact Us
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
