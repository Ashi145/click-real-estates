import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: string = "UGX"): string {
  if (currency === "UGX") {
    if (price >= 1_000_000_000) {
      return `UGX ${(price / 1_000_000_000).toFixed(1)}B`;
    }
    if (price >= 1_000_000) {
      return `UGX ${(price / 1_000_000).toFixed(1)}M`;
    }
    if (price >= 1_000) {
      return `UGX ${(price / 1_000).toFixed(0)}K`;
    }
    return `UGX ${price.toLocaleString()}`;
  }
  return `${currency} ${price.toLocaleString()}`;
}

export function formatFullPrice(
  price: number,
  currency: string = "UGX"
): string {
  return `${currency} ${price.toLocaleString()}`;
}

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)} m`;
  }
  return `${km.toFixed(1)} km`;
}

export function getPropertyTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    HOUSE: "House",
    APARTMENT: "Apartment",
    LAND: "Land",
    COMMERCIAL: "Commercial",
    OFFICE: "Office",
    WAREHOUSE: "Warehouse",
    FARM: "Farm",
    LUXURY: "Luxury",
    RENTAL: "Rental",
  };
  return labels[type] || type;
}

export function getListingTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    SALE: "For Sale",
    RENT: "For Rent",
    LEASE: "For Lease",
  };
  return labels[type] || type;
}

export function getProviderTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    INDIVIDUAL_OWNER: "Individual Owner",
    BROKER: "Property Broker",
    AGENT: "Real Estate Agent",
    AGENCY: "Real Estate Agency",
    COMPANY: "Property Company",
    DEVELOPER: "Developer",
    LANDLORD: "Landlord",
    PROPERTY_MANAGER: "Property Manager",
  };
  return labels[type] || type;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    ACTIVE: "text-green-600 bg-green-50",
    PENDING: "text-yellow-600 bg-yellow-50",
    VERIFIED: "text-blue-600 bg-blue-50",
    SOLD: "text-purple-600 bg-purple-50",
    RENTED: "text-purple-600 bg-purple-50",
    EXPIRED: "text-gray-600 bg-gray-50",
    SUSPENDED: "text-red-600 bg-red-50",
    REJECTED: "text-red-600 bg-red-50",
    DRAFT: "text-gray-600 bg-gray-100",
  };
  return colors[status] || "text-gray-600 bg-gray-50";
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function timeAgo(date: Date | string): string {
  const now = new Date();
  const d = new Date(date);
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 604800)}w ago`;
  return d.toLocaleDateString("en-UG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export const UGANDA_DISTRICTS = [
  "Kampala",
  "Wakiso",
  "Mukono",
  "Jinja",
  "Entebbe",
  "Mbarara",
  "Gulu",
  "Mbale",
  "Masaka",
  "Fort Portal",
  "Lira",
  "Soroti",
  "Arua",
  "Kabale",
  "Hoima",
  "Busia",
  "Tororo",
  "Iganga",
  "Kasese",
  "Mityana",
  "Mpigi",
  "Luweero",
  "Nakasongola",
  "Masindi",
  "Bushenyi",
  "Rukungiri",
  "Ntungamo",
  "Kabale",
  "Kisoro",
  "Kyenjojo",
  "Kamwenge",
  "Bundibugyo",
  "Kabarole",
  "Bunyangabu",
  "Kyegegwa",
  "Sembabule",
  "Lwengo",
  "Kalungu",
  "Bukomansimbi",
  "Gomba",
  "Butambala",
  "Kalangala",
  "Rakai",
  "Kyotera",
  "Namayingo",
  "Bugiri",
  "Namutumba",
  "Kaliro",
  "Buyende",
  "Kamuli",
  "Serere",
  "Kaberamaido",
  "Amuria",
  "Katakwi",
  "Ngora",
  "Bukedea",
  "Kumi",
  "Pallisa",
  "Budaka",
  "Butaleja",
  "Tororo",
  "Busia",
  "Manafwa",
  "Bududa",
  "Sironko",
  "Kapchorwa",
  "Kween",
  "Bukwo",
  "Amudat",
  "Nakapiripirit",
  "Moroto",
  "Kotido",
  "Abim",
  "Napak",
  "Kaabong",
  "Amuru",
  "Nwoya",
  "Omoro",
  "Pader",
  "Agago",
  "Kitgum",
  "Lamwo",
  "Yumbe",
  "Koboko",
  "Maracha",
  "Terego",
  "Madi-Okollo",
  "Obongi",
  "Adjumani",
  "Moyo",
  "Zombo",
  "Nebbi",
  "Pakwach",
  "Buliisa",
  "Kiryandongo",
  "Kakumiro",
  "Kagadi",
  "Kibaale",
  "Bunyangabu",
];

export const UGANDA_REGIONS = [
  "Central",
  "Eastern",
  "Northern",
  "Western",
];

export const PROPERTY_TYPES = [
  { value: "HOUSE", label: "Houses", icon: "🏠" },
  { value: "APARTMENT", label: "Apartments", icon: "🏢" },
  { value: "LAND", label: "Land", icon: "🌍" },
  { value: "COMMERCIAL", label: "Commercial", icon: "🏪" },
  { value: "OFFICE", label: "Offices", icon: "🏢" },
  { value: "WAREHOUSE", label: "Warehouses", icon: "🏭" },
  { value: "FARM", label: "Farms", icon: "🌾" },
  { value: "LUXURY", label: "Luxury", icon: "✨" },
  { value: "RENTAL", label: "Rentals", icon: "🔑" },
];

export const PROVIDER_TYPES = [
  {
    value: "INDIVIDUAL_OWNER",
    label: "Individual Owner",
    description: "Listing your own property",
  },
  {
    value: "BROKER",
    label: "Property Broker",
    description: "Independent property broker",
  },
  {
    value: "AGENT",
    label: "Real Estate Agent",
    description: "Professional agent for clients",
  },
  {
    value: "AGENCY",
    label: "Real Estate Agency",
    description: "Company with multiple agents",
  },
  {
    value: "COMPANY",
    label: "Property Company",
    description: "Established property business",
  },
  {
    value: "DEVELOPER",
    label: "Developer",
    description: "Property development company",
  },
  {
    value: "LANDLORD",
    label: "Landlord",
    description: "Renting out properties",
  },
  {
    value: "PROPERTY_MANAGER",
    label: "Property Manager",
    description: "Managing property portfolios",
  },
];
