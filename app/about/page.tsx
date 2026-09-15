"use client";

import Link from "next/link";
import {
  MapPin,
  Shield,
  Users,
  Building2,
  Target,
  Heart,
  Globe,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-click-orange to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
            About CLICK
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Uganda&apos;s property connection platform — connecting buyers with
            the right owners, brokers, agents and property companies.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="orange" size="md" className="mb-4">
              Our Mission
            </Badge>
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">
              Making Property Discovery Easy & Trustworthy
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              CLICK was founded with a simple mission: to make property
              discovery in Uganda visual, easy, trustworthy, local, and
              connected. We believe everyone deserves access to reliable
              property information and trustworthy connections.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Our Vision",
                description:
                  "To become Uganda&apos;s most trusted property connection platform, serving every district in the country.",
              },
              {
                icon: Heart,
                title: "Our Values",
                description:
                  "Trust, transparency, and connection. We verify providers and protect buyers to build a safe marketplace.",
              },
              {
                icon: Globe,
                title: "Our Reach",
                description:
                  "Covering all 100+ districts of Uganda, from Kampala to Gulu, Jinja to Mbarara.",
              },
            ].map((item) => (
              <Card key={item.title} className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Started */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="info" size="md" className="mb-4">
                Our Story
              </Badge>
              <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">
                Born from a Real Need
              </h2>
              <p className="text-gray-600 mb-4">
                CLICK was created because finding property in Uganda shouldn&apos;t
                be a gamble. Too many buyers have been scammed, too many
                sellers struggle to reach serious buyers, and too many
                property searches end in frustration.
              </p>
              <p className="text-gray-600 mb-4">
                We built CLICK to change that — a platform where property
                discovery is visual, connections are verified, and every user
                can make informed decisions with confidence.
              </p>
              <p className="text-gray-600">
                Today, CLICK connects thousands of property seekers with
                verified providers across Uganda, making property transactions
                safer and more efficient.
              </p>
            </div>
            <div className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-3xl p-8 text-white">
              <h3 className="font-display text-xl font-bold mb-6">
                What Makes Us Different
              </h3>
              <div className="space-y-4">
                {[
                  "Location-aware property discovery",
                  "Real distance calculations",
                  "Verified provider system",
                  "Secure connection workflow",
                  "Commission-based model",
                  "Nationwide coverage",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0" />
                    <span className="text-white/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="success" size="md" className="mb-4">
            Our Team
          </Badge>
          <h2 className="font-display text-3xl font-bold text-navy-900 mb-4">
            Built by Ugandans, for Uganda
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Our team combines deep knowledge of Uganda&apos;s property market
            with modern technology expertise.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Engineering", count: "5+", icon: "💻" },
              { name: "Design", count: "2+", icon: "🎨" },
              { name: "Operations", count: "3+", icon: "⚙️" },
              { name: "Support", count: "4+", icon: "🤝" },
            ].map((team) => (
              <Card key={team.name} className="p-6 text-center">
                <span className="text-3xl mb-3 block">{team.icon}</span>
                <p className="font-bold text-navy-900 text-xl">{team.count}</p>
                <p className="text-sm text-gray-500">{team.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-click-orange to-orange-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Join thousands of Ugandans who trust CLICK for their property
            needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/properties">
              <Button
                size="lg"
                className="bg-white text-click-orange hover:bg-gray-100 px-8"
              >
                Search Properties
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 px-8"
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
