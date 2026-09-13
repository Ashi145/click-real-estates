"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Menu,
  X,
  User,
  Heart,
  Bell,
  ChevronDown,
  MapPin,
  Building2,
  Home,
  LogIn,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Buy", href: "/properties?type=SALE" },
  { name: "Rent", href: "/properties?type=RENT" },
  { name: "Land", href: "/properties?type=LAND" },
  { name: "Commercial", href: "/properties?type=COMMERCIAL" },
  { name: "Map", href: "/map" },
  { name: "Brokers", href: "/brokers" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-click-orange to-click-orange-dark rounded-xl flex items-center justify-center shadow-lg shadow-orange-200 group-hover:shadow-orange-300 transition-shadow">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
            </div>
            <div className="flex flex-col">
              <span
                className={cn(
                  "font-display font-bold text-lg leading-tight tracking-tight transition-colors",
                  isScrolled ? "text-navy-900" : "text-white"
                )}
              >
                CLICK
              </span>
              <span
                className={cn(
                  "text-[9px] font-medium tracking-wider uppercase transition-colors",
                  isScrolled ? "text-gray-500" : "text-white/70"
                )}
              >
                Real Estate
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  pathname === item.href
                    ? isScrolled
                      ? "text-click-orange bg-orange-50"
                      : "text-white bg-white/20"
                    : isScrolled
                    ? "text-gray-700 hover:text-click-orange hover:bg-gray-50"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/properties"
              className={cn(
                "hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all",
                isScrolled
                  ? "text-gray-600 hover:text-click-orange hover:bg-gray-50"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              )}
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline">Search</span>
            </Link>

            <Link
              href="/dashboard"
              className={cn(
                "hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all",
                isScrolled
                  ? "text-gray-600 hover:text-click-orange hover:bg-gray-50"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              )}
            >
              <Heart className="w-4 h-4" />
              <span className="hidden md:inline">Saved</span>
            </Link>

            <Link
              href="/auth/login"
              className={cn(
                "hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                isScrolled
                  ? "text-gray-700 hover:text-click-orange border border-gray-200 hover:border-orange-200"
                  : "text-white border border-white/30 hover:bg-white/10"
              )}
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </Link>

            <Link
              href="/auth/register"
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-click-orange to-orange-500 text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-orange-200 transition-all"
            >
              List Property
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "lg:hidden p-2 rounded-lg transition-colors",
                isScrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              )}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl animate-slide-down">
            <div className="px-4 py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                    pathname === item.href
                      ? "text-click-orange bg-orange-50"
                      : "text-gray-700 hover:text-click-orange hover:bg-gray-50"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-100 pt-4 mt-4 space-y-2">
                <Link
                  href="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-center text-gray-700 border border-gray-200 rounded-lg font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-center text-white bg-gradient-to-r from-click-orange to-orange-500 rounded-lg font-semibold"
                >
                  List Property
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
