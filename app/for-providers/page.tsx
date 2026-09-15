"use client";

import Link from "next/link";
import {
  Building2,
  Users,
  Shield,
  TrendingUp,
  Eye,
  MessageSquare,
  BarChart3,
  Star,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Globe,
  Zap,
  Target,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export default function ForProvidersPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="orange" size="md" className="mb-4">
            For Providers
          </Badge>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
            Grow Your Property Business
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            Join Uganda&apos;s fastest-growing property connection platform.
            List properties, reach serious buyers, and grow your business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/register">
              <Button size="xl" className="px-10">
                Register Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/brokers">
              <Button
                variant="outline"
                size="xl"
                className="px-10 border-white/30 text-white hover:bg-white/10"
              >
                View Directory
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-4">
              Why Join CLICK?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Everything you need to manage and grow your property business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Eye,
                title: "Maximum Visibility",
                description:
                  "Your properties reach thousands of buyers and renters across Uganda through our platform.",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Shield,
                title: "Verified Badge",
                description:
                  "Get the CLICK Verified badge to build trust with potential buyers and stand out from competition.",
                color: "from-emerald-500 to-green-500",
              },
              {
                icon: Users,
                title: "Quality Leads",
                description:
                  "Receive genuine inquiries from serious buyers. Our platform filters out time-wasters.",
                color: "from-purple-500 to-violet-500",
              },
              {
                icon: BarChart3,
                title: "Analytics Dashboard",
                description:
                  "Track property views, inquiries, and performance with detailed analytics.",
                color: "from-orange-500 to-amber-500",
              },
              {
                icon: TrendingUp,
                title: "Marketing Tools",
                description:
                  "Promote your listings with featured placement, social promotion, and more.",
                color: "from-rose-500 to-pink-500",
              },
              {
                icon: MessageSquare,
                title: "Lead Management",
                description:
                  "Manage all your inquiries and leads in one place with our dashboard.",
                color: "from-indigo-500 to-blue-500",
              },
            ].map((benefit) => (
              <Card key={benefit.title} hover className="p-6">
                <div
                  className={cn(
                    "w-12 h-12 bg-gradient-to-br rounded-xl flex items-center justify-center mb-4",
                    benefit.color
                  )}
                >
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-500">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Provider Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-4">
              Who Can Join?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              CLICK supports all types of property providers
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Individual Owners",
                description: "Listing your own property",
                icon: "👤",
              },
              {
                title: "Property Brokers",
                description: "Independent property brokers",
                icon: "🤝",
              },
              {
                title: "Real Estate Agents",
                description: "Professional agents",
                icon: "🏠",
              },
              {
                title: "Real Estate Agencies",
                description: "Companies with agents",
                icon: "🏢",
              },
              {
                title: "Property Companies",
                description: "Established businesses",
                icon: "🏗️",
              },
              {
                title: "Developers",
                description: "Property development",
                icon: "🔨",
              },
              {
                title: "Landlords",
                description: "Renting out properties",
                icon: "🔑",
              },
              {
                title: "Property Managers",
                description: "Managing portfolios",
                icon: "📊",
              },
            ].map((type) => (
              <Card key={type.title} hover className="p-5 text-center">
                <span className="text-3xl mb-3 block">{type.icon}</span>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {type.title}
                </h3>
                <p className="text-sm text-gray-500">{type.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-click-orange to-orange-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Ready to Grow Your Business?
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Join hundreds of property providers already using CLICK to connect
            with buyers across Uganda.
          </p>
          <Link href="/auth/register">
            <Button
              size="xl"
              className="bg-white text-click-orange hover:bg-gray-100 px-10"
            >
              Register as Provider
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
