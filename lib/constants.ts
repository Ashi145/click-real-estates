export const SITE_NAME = "CLICK Real Estate Connectors";
export const SITE_DESCRIPTION =
  "Uganda's property connection platform. Find homes, land, rentals and commercial properties across Uganda — then connect with the right owner, broker, agent or property company.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const SITE_TAGLINE = "Find It. Know It. Connect.";

export const MAP_CENTER: [number, number] = [1.3733, 32.2903]; // Uganda center
export const MAP_ZOOM = 7;

export const FEATURED_LOCATIONS = [
  { name: "Kampala", region: "Central", lat: 0.3476, lng: 32.5825 },
  { name: "Wakiso", region: "Central", lat: 0.4039, lng: 32.4925 },
  { name: "Mukono", region: "Central", lat: 0.3531, lng: 32.7558 },
  { name: "Entebbe", region: "Central", lat: 0.0562, lng: 32.4633 },
  { name: "Jinja", region: "Eastern", lat: 0.4244, lng: 33.2039 },
  { name: "Mbarara", region: "Western", lat: -0.6072, lng: 30.6545 },
  { name: "Gulu", region: "Northern", lat: 2.7747, lng: 32.299 },
  { name: "Mbale", region: "Eastern", lat: 1.0821, lng: 34.175 },
  { name: "Masaka", region: "Central", lat: -0.3416, lng: 31.7338 },
  { name: "Fort Portal", region: "Western", lat: 0.671, lng: 30.275 },
  { name: "Hoima", region: "Western", lat: 1.4356, lng: 31.3436 },
  { name: "Lira", region: "Northern", lat: 2.2499, lng: 32.8998 },
  { name: "Soroti", region: "Eastern", lat: 1.7229, lng: 33.6072 },
  { name: "Kabale", region: "Western", lat: -1.2486, lng: 29.9797 },
  { name: "Arua", region: "Northern", lat: 3.0201, lng: 30.9111 },
];

export const COMMISSION_DEFAULTS = {
  connectionFee: 10000, // UGX
  commissionPercentage: 5, // 5%
  marketingPackagePrices: {
    featured: 50000,
    premium: 100000,
    homepageSpotlight: 200000,
    searchBoost: 30000,
  },
};

export const PLATFORM_FEATURES = [
  {
    icon: "🔍",
    title: "Search Properties",
    description:
      "Find properties across Uganda with powerful search and filters",
  },
  {
    icon: "📍",
    title: "Location Aware",
    description:
      "Discover properties near you with real distance calculations",
  },
  {
    icon: "✅",
    title: "Verified Providers",
    description: "Connect with verified brokers, agents and property companies",
  },
  {
    icon: "🤝",
    title: "Direct Connections",
    description: "Connect directly with property owners and providers",
  },
  {
    icon: "🗺️",
    title: "Map Discovery",
    description: "Explore properties on interactive maps with directions",
  },
  {
    icon: "🔒",
    title: "Secure Platform",
    description: "Your data is protected with enterprise-grade security",
  },
];

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Search",
    description: "Browse thousands of properties across Uganda",
    icon: "🔍",
  },
  {
    step: 2,
    title: "Explore",
    description: "View photos, details, maps and distances",
    icon: "🏠",
  },
  {
    step: 3,
    title: "Locate",
    description: "Get real directions and distance to properties",
    icon: "📍",
  },
  {
    step: 4,
    title: "Verify",
    description: "Check provider verification and reviews",
    icon: "✅",
  },
  {
    step: 5,
    title: "Connect",
    description: "Contact providers through our secure platform",
    icon: "🤝",
  },
];

export const TESTIMONIALS = [
  {
    name: "Sarah Nakamya",
    role: "Home Buyer",
    location: "Kampala",
    content:
      "CLICK helped me find my dream home in Wakiso. The map feature made it easy to understand the exact location and distance from my workplace.",
    rating: 5,
  },
  {
    name: "James Okello",
    role: "Property Broker",
    location: "Jinja",
    content:
      "As a broker, CLICK has transformed my business. I've connected with serious buyers and my listings get great visibility.",
    rating: 5,
  },
  {
    name: "Grace Auma",
    role: "Land Buyer",
    location: "Gulu",
    content:
      "I was able to find and verify land for sale in Gulu through CLICK. The verification system gave me confidence in my purchase.",
    rating: 4,
  },
];
