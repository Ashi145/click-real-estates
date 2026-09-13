"use client";

import Link from "next/link";
import {
  BookOpen,
  Search,
  MapPin,
  Shield,
  Users,
  TrendingUp,
  Home,
  Landmark,
  ArrowRight,
  Clock,
  Eye,
  Calendar,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const guides = [
  {
    id: "1",
    title: "Complete Guide to Buying Land in Uganda",
    excerpt: "Everything you need to know about purchasing land safely in Uganda, from verification to title transfer.",
    category: "Buying Guide",
    readTime: "8 min read",
    date: "2024-01-15",
    views: 1234,
    icon: Landmark,
    color: "from-emerald-500 to-green-500",
    slug: "complete-guide-buying-land-uganda",
  },
  {
    id: "2",
    title: "How to Avoid Property Scams in Uganda",
    excerpt: "Learn the red flags and best practices to protect yourself from common property fraud schemes.",
    category: "Safety",
    readTime: "6 min read",
    date: "2024-01-10",
    views: 2345,
    icon: Shield,
    color: "from-red-500 to-orange-500",
    slug: "how-to-avoid-property-scams-uganda",
  },
  {
    id: "3",
    title: "Working with Property Brokers: A Complete Guide",
    excerpt: "A comprehensive guide to finding and working with reliable property brokers in Uganda.",
    category: "Tips",
    readTime: "5 min read",
    date: "2024-01-05",
    views: 987,
    icon: Users,
    color: "from-blue-500 to-cyan-500",
    slug: "working-with-property-brokers-guide",
  },
  {
    id: "4",
    title: "Property Investment Guide for Beginners",
    excerpt: "Learn the basics of property investment in Uganda, including market trends and best strategies.",
    category: "Investment",
    readTime: "10 min read",
    date: "2023-12-28",
    views: 1567,
    icon: TrendingUp,
    color: "from-purple-500 to-violet-500",
    slug: "property-investment-guide-beginners",
  },
  {
    id: "5",
    title: "Renting in Kampala: What You Need to Know",
    excerpt: "A practical guide to renting apartments and houses in Kampala, from search to lease signing.",
    category: "Renting",
    readTime: "7 min read",
    date: "2023-12-20",
    views: 3456,
    icon: Home,
    color: "from-orange-500 to-amber-500",
    slug: "renting-in-kampala-guide",
  },
  {
    id: "6",
    title: "Understanding Property Valuation in Uganda",
    excerpt: "Learn how properties are valued in Uganda and what factors affect property prices.",
    category: "Education",
    readTime: "6 min read",
    date: "2023-12-15",
    views: 876,
    icon: BookOpen,
    color: "from-indigo-500 to-blue-500",
    slug: "understanding-property-valuation-uganda",
  },
];

const categories = [
  "All",
  "Buying Guide",
  "Safety",
  "Tips",
  "Investment",
  "Renting",
  "Education",
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero */}
      <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="orange" size="md" className="mb-4">
            Property Guides
          </Badge>
          <h1 className="font-display text-4xl font-bold text-white mb-4">
            Blog & Guides
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Expert guides to help you navigate Uganda&apos;s property market
            safely and successfully
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:border-orange-200 hover:text-click-orange transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Link key={guide.id} href={`/guides/${guide.slug}`}>
              <Card hover className="h-full overflow-hidden">
                <div
                  className={cn(
                    "h-48 bg-gradient-to-br flex items-center justify-center",
                    guide.color
                  )}
                >
                  <guide.icon className="w-16 h-16 text-white/80" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="default" size="sm">
                      {guide.category}
                    </Badge>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {guide.readTime}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {guide.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {guide.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {guide.views}
                      </span>
                    </div>
                    <span className="text-click-orange text-sm font-medium">
                      Read →
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
