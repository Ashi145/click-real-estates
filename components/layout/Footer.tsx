import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

const footerLinks = {
  properties: [
    { name: "Houses for Sale", href: "/properties?type=SALE&category=HOUSE" },
    { name: "Apartments", href: "/properties?type=RENT&category=APARTMENT" },
    { name: "Land for Sale", href: "/properties?type=SALE&category=LAND" },
    {
      name: "Commercial Property",
      href: "/properties?type=SALE&category=COMMERCIAL",
    },
    { name: "Luxury Homes", href: "/properties?category=LUXURY" },
    { name: "Rental Properties", href: "/properties?type=RENT" },
  ],
  locations: [
    { name: "Kampala Properties", href: "/properties?district=Kampala" },
    { name: "Wakiso Properties", href: "/properties?district=Wakiso" },
    { name: "Entebbe Properties", href: "/properties?district=Entebbe" },
    { name: "Jinja Properties", href: "/properties?district=Jinja" },
    { name: "Mbarara Properties", href: "/properties?district=Mbarara" },
    { name: "All Uganda", href: "/properties" },
  ],
  company: [
    { name: "About CLICK", href: "/about" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Trust & Safety", href: "/trust" },
    { name: "Blog & Guides", href: "/guides" },
    { name: "Careers", href: "/careers" },
    { name: "Contact Us", href: "/contact" },
  ],
  providers: [
    { name: "List Your Property", href: "/auth/register" },
    { name: "For Brokers", href: "/for-brokers" },
    { name: "For Agents", href: "/for-agents" },
    { name: "For Agencies", href: "/for-agencies" },
    { name: "Marketing Packages", href: "/marketing" },
    { name: "Provider Login", href: "/auth/login" },
  ],
  legal: [
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Buyer Terms", href: "/terms/buyers" },
    { name: "Provider Terms", href: "/terms/providers" },
    { name: "Refund Policy", href: "/refunds" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-click-orange to-orange-500 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-500 rounded-full border-2 border-navy-950" />
              </div>
              <div>
                <span className="font-display font-bold text-2xl tracking-tight">
                  CLICK
                </span>
                <p className="text-xs text-gray-400 tracking-wider uppercase">
                  Real Estate Connectors
                </p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Uganda&apos;s property connection platform. Discover homes, land,
              rentals and commercial properties across Uganda — then connect
              with the right owner, broker, agent or property company.
            </p>
            <div className="space-y-3">
              <a
                href="tel:+256700000000"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">+256 700 000 000</span>
              </a>
              <a
                href="mailto:info@click.ug"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">info@click.ug</span>
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">Kampala, Uganda</span>
              </div>
            </div>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-click-orange transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Properties */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white mb-4">
              Properties
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.properties.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white mb-4">
              Locations
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.locations.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Providers */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white mb-4">
              For Providers
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.providers.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} CLICK Real Estate Connectors. All
              rights reserved. 🇺🇬
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
