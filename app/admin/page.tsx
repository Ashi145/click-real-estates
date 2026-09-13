"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  Users,
  Building2,
  Shield,
  DollarSign,
  TrendingUp,
  BarChart3,
  Settings,
  Bell,
  Flag,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Search,
  Filter,
  Download,
  Calendar,
  MapPin,
  Star,
  AlertTriangle,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { cn, formatPrice, timeAgo } from "@/lib/utils";

const adminSidebar = [
  { icon: Home, label: "Overview", href: "/admin", active: true },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: Building2, label: "Properties", href: "/admin/properties" },
  { icon: Shield, label: "Providers", href: "/admin/providers" },
  { icon: Flag, label: "Reports", href: "/admin/reports", badge: 8 },
  { icon: DollarSign, label: "Finance", href: "/admin/finance" },
  { icon: Package, label: "Marketing", href: "/admin/marketing" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

const pendingProviders = [
  {
    id: "1",
    name: "Kampala Homes Ltd",
    type: "COMPANY",
    email: "info@kampalahomes.ug",
    date: "2024-01-15",
    status: "PENDING",
  },
  {
    id: "2",
    name: "Peter Okello",
    type: "BROKER",
    email: "peter@gmail.com",
    date: "2024-01-14",
    status: "PENDING",
  },
  {
    id: "3",
    name: "Lakeside Properties",
    type: "AGENCY",
    email: "info@lakeside.ug",
    date: "2024-01-13",
    status: "UNDER_REVIEW",
  },
];

const recentProperties = [
  {
    id: "1",
    title: "4BR Villa in Kira",
    provider: "Jioni Properties",
    price: 850000000,
    status: "ACTIVE",
    date: "2024-01-15",
  },
  {
    id: "2",
    title: "Land - 10 Acres Mukono",
    provider: "Alpha Land",
    price: 350000000,
    status: "PENDING",
    date: "2024-01-14",
  },
  {
    id: "3",
    title: "Office Space Nakawa",
    provider: "Hjion Properties",
    price: 5000000,
    status: "ACTIVE",
    date: "2024-01-13",
  },
];

const reports = [
  {
    id: "1",
    type: "SUSPECTED_SCAM",
    property: "Cheap Land in Wakiso",
    reporter: "john@email.com",
    date: "2024-01-15",
    status: "PENDING",
  },
  {
    id: "2",
    type: "FALSE_INFO",
    property: "Luxury Apartment Kololo",
    reporter: "jane@email.com",
    date: "2024-01-14",
    status: "UNDER_REVIEW",
  },
];

export default function AdminPage() {
  const [dateRange, setDateRange] = useState("7d");

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden sticky top-28">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Admin Panel</h3>
                    <p className="text-xs text-gray-500">CLICK Platform</p>
                  </div>
                </div>
              </div>

              <nav className="p-3">
                {adminSidebar.map((item) => (
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
                      <span className="w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-display text-2xl font-bold text-navy-900">
                  Admin Dashboard
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  Platform overview and management
                </p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-click-orange"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="all">All time</option>
                </select>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                {
                  icon: Users,
                  label: "Total Users",
                  value: "2,847",
                  change: "+124",
                  trend: "up",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: Building2,
                  label: "Properties",
                  value: "9,234",
                  change: "+456",
                  trend: "up",
                  color: "from-purple-500 to-violet-500",
                },
                {
                  icon: Shield,
                  label: "Providers",
                  value: "567",
                  change: "+34",
                  trend: "up",
                  color: "from-emerald-500 to-green-500",
                },
                {
                  icon: DollarSign,
                  label: "Revenue",
                  value: "UGX 12.5M",
                  change: "+18%",
                  trend: "up",
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
                    <div
                      className={cn(
                        "flex items-center gap-1 text-xs font-medium",
                        stat.trend === "up"
                          ? "text-emerald-600"
                          : "text-red-600"
                      )}
                    >
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-navy-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </Card>
              ))}
            </div>

            {/* Pending Provider Approvals */}
            <Card className="p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-lg font-bold text-navy-900">
                    Pending Provider Approvals
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Review and verify new provider applications
                  </p>
                </div>
                <Link href="/admin/providers">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-100">
                      <th className="pb-3 text-xs font-semibold text-gray-500 uppercase">
                        Provider
                      </th>
                      <th className="pb-3 text-xs font-semibold text-gray-500 uppercase">
                        Type
                      </th>
                      <th className="pb-3 text-xs font-semibold text-gray-500 uppercase">
                        Date
                      </th>
                      <th className="pb-3 text-xs font-semibold text-gray-500 uppercase">
                        Status
                      </th>
                      <th className="pb-3 text-xs font-semibold text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingProviders.map((provider) => (
                      <tr
                        key={provider.id}
                        className="border-b border-gray-50"
                      >
                        <td className="py-4">
                          <div>
                            <p className="font-medium text-gray-900">
                              {provider.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {provider.email}
                            </p>
                          </div>
                        </td>
                        <td className="py-4">
                          <Badge variant="default" size="sm">
                            {provider.type}
                          </Badge>
                        </td>
                        <td className="py-4 text-sm text-gray-500">
                          {provider.date}
                        </td>
                        <td className="py-4">
                          <Badge
                            variant={
                              provider.status === "PENDING"
                                ? "warning"
                                : "info"
                            }
                            size="sm"
                          >
                            {provider.status}
                          </Badge>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-emerald-600 hover:text-emerald-700"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-600 hover:text-red-700"
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Properties */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-lg font-bold text-navy-900">
                    Recent Properties
                  </h2>
                  <Link href="/admin/properties">
                    <Button variant="ghost" size="sm">
                      View All →
                    </Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  {recentProperties.map((property) => (
                    <div
                      key={property.id}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {property.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {property.provider} · {property.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm text-navy-900">
                          {formatPrice(property.price)}
                        </p>
                        <Badge
                          variant={
                            property.status === "ACTIVE"
                              ? "success"
                              : "warning"
                          }
                          size="sm"
                        >
                          {property.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Reports */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-lg font-bold text-navy-900">
                      Reports
                    </h2>
                    <Badge variant="danger" size="sm">
                      8 pending
                    </Badge>
                  </div>
                  <Link href="/admin/reports">
                    <Button variant="ghost" size="sm">
                      View All →
                    </Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-start gap-3 p-3 rounded-xl bg-red-50 border border-red-100"
                    >
                      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">
                          {report.property}
                        </p>
                        <p className="text-xs text-gray-500">
                          {report.type} · Reported by {report.reporter}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {report.date}
                        </p>
                      </div>
                      <Badge
                        variant={
                          report.status === "PENDING"
                            ? "warning"
                            : "info"
                        }
                        size="sm"
                      >
                        {report.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Quick Stats Grid */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Verified Properties", value: "6,890", icon: CheckCircle2 },
                { label: "Pending Reviews", value: "234", icon: Clock },
                { label: "Active Leads", value: "1,234", icon: TrendingUp },
                { label: "Reports Today", value: "8", icon: Flag },
              ].map((stat) => (
                <Card key={stat.label} className="p-4 text-center">
                  <stat.icon className="w-5 h-5 text-gray-400 mx-auto mb-2" />
                  <p className="text-xl font-bold text-navy-900">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
