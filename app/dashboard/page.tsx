"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  Heart,
  Search,
  Bell,
  MessageSquare,
  Eye,
  TrendingUp,
  Clock,
  MapPin,
  Building2,
  Users,
  Star,
  ChevronRight,
  Plus,
  Settings,
  LogOut,
  BarChart3,
  DollarSign,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { cn, formatPrice, timeAgo } from "@/lib/utils";

const sidebarItems = [
  { icon: Home, label: "Overview", href: "/dashboard", active: true },
  { icon: Building2, label: "Properties", href: "/dashboard/properties" },
  { icon: Heart, label: "Saved", href: "/dashboard/saved" },
  { icon: Search, label: "Searches", href: "/dashboard/searches" },
  { icon: MessageSquare, label: "Messages", href: "/dashboard/messages", badge: 3 },
  { icon: Users, label: "Connections", href: "/dashboard/connections" },
  { icon: Bell, label: "Notifications", href: "/dashboard/notifications", badge: 5 },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

const recentActivity = [
  {
    id: "1",
    type: "inquiry",
    title: "New inquiry for 4BR Villa in Kira",
    time: "2 hours ago",
    icon: MessageSquare,
  },
  {
    id: "2",
    type: "view",
    title: "Your property was viewed 23 times",
    time: "5 hours ago",
    icon: Eye,
  },
  {
    id: "3",
    type: "connection",
    title: "Connection request from buyer",
    time: "1 day ago",
    icon: Users,
  },
  {
    id: "4",
    type: "saved",
    title: "Property saved to favorites",
    time: "2 days ago",
    icon: Heart,
  },
];

const savedProperties = [
  {
    id: "1",
    title: "Modern 4 Bedroom Villa",
    location: "Kira, Wakiso",
    price: 850000000,
    type: "SALE",
  },
  {
    id: "2",
    title: "Luxury 3 Bed Apartment",
    location: "Kololo, Kampala",
    price: 3500000,
    type: "RENT",
  },
  {
    id: "3",
    title: "50 Acre Prime Land",
    location: "Seeta, Mukono",
    price: 2500000000,
    type: "SALE",
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden sticky top-28">
              {/* User info */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-navy-600 to-blue-600 rounded-xl flex items-center justify-center">
                    <span className="text-lg font-bold text-white">JD</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">John Doe</h3>
                    <p className="text-xs text-gray-500">Buyer Account</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="p-3">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                      item.active
                        ? "bg-orange-50 text-click-orange"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="w-5 h-5 bg-click-orange text-white rounded-full text-xs flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}

                <div className="border-t border-gray-100 mt-3 pt-3">
                  <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-display text-2xl font-bold text-navy-900">
                  Dashboard
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  Welcome back, John! Here&apos;s your activity overview.
                </p>
              </div>
              <Link href="/properties">
                <Button leftIcon={<Search className="w-4 h-4" />}>
                  Browse Properties
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                {
                  icon: Heart,
                  label: "Saved Properties",
                  value: "12",
                  change: "+3 this week",
                  color: "from-red-500 to-pink-500",
                },
                {
                  icon: Eye,
                  label: "Properties Viewed",
                  value: "48",
                  change: "+12 this week",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: MessageSquare,
                  label: "Connections",
                  value: "5",
                  change: "+2 this week",
                  color: "from-purple-500 to-violet-500",
                },
                {
                  icon: Search,
                  label: "Saved Searches",
                  value: "3",
                  change: "2 active alerts",
                  color: "from-orange-500 to-amber-500",
                },
              ].map((stat) => (
                <Card key={stat.label} className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={cn(
                        "w-10 h-10 bg-gradient-to-br rounded-xl flex items-center justify-center",
                        stat.color
                      )}
                    >
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                  </div>
                  <p className="text-2xl font-bold text-navy-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-xs text-emerald-600 mt-1">
                    {stat.change}
                  </p>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-lg font-bold text-navy-900">
                    Recent Activity
                  </h2>
                  <Link
                    href="/dashboard/activity"
                    className="text-sm text-click-orange hover:underline"
                  >
                    View All
                  </Link>
                </div>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <activity.icon className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 font-medium">
                          {activity.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Saved Properties */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-lg font-bold text-navy-900">
                    Saved Properties
                  </h2>
                  <Link
                    href="/dashboard/saved"
                    className="text-sm text-click-orange hover:underline"
                  >
                    View All
                  </Link>
                </div>
                <div className="space-y-4">
                  {savedProperties.map((property) => (
                    <Link
                      key={property.id}
                      href={`/properties/${property.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-navy-100 to-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Home className="w-6 h-6 text-navy-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                          {property.title}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                          <MapPin className="w-3 h-3" />
                          <span>{property.location}</span>
                        </div>
                        <p className="text-sm font-bold text-navy-900 mt-1">
                          {formatPrice(property.price)}
                        </p>
                      </div>
                      <Badge
                        variant={
                          property.type === "SALE" ? "primary" : "success"
                        }
                        size="sm"
                      >
                        {property.type === "SALE" ? "Sale" : "Rent"}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h2 className="font-display text-lg font-bold text-navy-900 mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  {
                    icon: Search,
                    label: "Search Properties",
                    href: "/properties",
                    color: "from-blue-500 to-blue-600",
                  },
                  {
                    icon: MapPin,
                    label: "Map View",
                    href: "/map",
                    color: "from-emerald-500 to-emerald-600",
                  },
                  {
                    icon: Users,
                    label: "Find Brokers",
                    href: "/brokers",
                    color: "from-purple-500 to-purple-600",
                  },
                  {
                    icon: Plus,
                    label: "List Property",
                    href: "/dashboard/properties/new",
                    color: "from-orange-500 to-orange-600",
                  },
                ].map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="bg-white rounded-xl p-4 border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all text-center"
                  >
                    <div
                      className={cn(
                        "w-10 h-10 bg-gradient-to-br rounded-xl flex items-center justify-center mx-auto mb-2",
                        action.color
                      )}
                    >
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {action.label}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
