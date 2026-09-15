import BrokerDetailPageClient from "./BrokerDetailPageClient";

export function generateStaticParams() {
  return [
    { id: "p1" },
    { id: "p2" },
    { id: "p3" },
    { id: "p4" },
    { id: "p5" },
    { id: "p6" },
    { id: "p7" },
    { id: "p8" },
  ];
}

export default function Page() {
  return <BrokerDetailPageClient />;
}
