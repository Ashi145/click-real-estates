import PropertyDetailPageClient from "./PropertyDetailPageClient";

export function generateStaticParams() {
  return [
    { slug: "modern-4-bedroom-villa-kira" },
    { slug: "luxury-3-bed-apartment-kololo" },
    { slug: "50-acre-prime-land-mukono" },
    { slug: "commercial-building-cbd-kampala" },
    { slug: "2-bedroom-family-home-entebbe" },
    { slug: "modern-office-space-nakawa" },
    { slug: "warehouse-industrial-area" },
    { slug: "10-acre-farm-land-jinja" },
    { slug: "luxury-villa-munyonyo" },
  ];
}

export default function Page() {
  return <PropertyDetailPageClient />;
}
