"use client";

import Link from "next/link";
import {
  Shield,
  CheckCircle2,
  AlertTriangle,
  Users,
  Eye,
  Flag,
  Lock,
  FileText,
  Phone,
  Mail,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export default function TrustPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
            Trust & Safety Center
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Your safety is our priority. Learn how CLICK verifies providers,
            protects your data, and helps you avoid property fraud.
          </p>
        </div>
      </div>

      {/* What We Verify */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="success" size="md" className="mb-3">
              Verification
            </Badge>
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-4">
              What CLICK Verifies
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              We have a multi-step verification process for property providers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Users,
                title: "Provider Identity",
                description:
                  "We verify the identity of property providers through business registration, national ID, and other documentation.",
                verified: true,
              },
              {
                icon: FileText,
                title: "Business Documentation",
                description:
                  "For companies, agencies, and brokers, we verify business registration certificates and professional licenses.",
                verified: true,
              },
              {
                icon: MapPin,
                title: "Business Location",
                description:
                  "We verify that providers have a legitimate business presence in their stated location.",
                verified: true,
              },
              {
                icon: Phone,
                title: "Contact Information",
                description:
                  "Provider phone numbers and email addresses are verified during the registration process.",
                verified: true,
              },
            ].map((item) => (
              <Card key={item.title} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      {item.verified && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What We Don't Verify */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="warning" size="md" className="mb-3">
              Important
            </Badge>
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-4">
              What CLICK Does Not Verify
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              It&apos;s important to understand the limits of our verification
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-8">
            <div className="space-y-4">
              {[
                "Property ownership — We don't verify who legally owns a property",
                "Property condition — We don't physically inspect properties",
                "Price accuracy — We don't verify if a listed price is fair market value",
                "Land title authenticity — We don't verify land titles or documentation",
                "Construction permits — We don't verify building permits or approvals",
                "Future development — We don't verify claims about future developments",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-900">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Avoiding Scams */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="danger" size="md" className="mb-3">
              Safety Tips
            </Badge>
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-4">
              How to Avoid Property Scams
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Protect yourself with these essential safety guidelines
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                number: 1,
                title: "Always Visit the Property",
                description:
                  "Never send money for a property you haven't visited in person. Insist on seeing the property before any financial commitment.",
              },
              {
                number: 2,
                title: "Verify Ownership Documents",
                description:
                  "Ask for and verify land titles, sales agreements, and other ownership documents. Consider hiring a lawyer for verification.",
              },
              {
                number: 3,
                title: "Use Secure Payment Methods",
                description:
                  "Avoid cash payments. Use bank transfers or mobile money with proper receipts. Never send money to personal accounts for business transactions.",
              },
              {
                number: 4,
                title: "Be Wary of Too-Good Deals",
                description:
                  "If a property seems significantly underpriced, it may be a scam. Research average prices in the area before committing.",
              },
              {
                number: 5,
                title: "Check Provider Verification",
                description:
                  "Look for the CLICK Verified badge. While we can't guarantee every listing, verified providers have gone through our review process.",
              },
              {
                number: 6,
                title: "Report Suspicious Activity",
                description:
                  "If you encounter suspicious listings or providers, report them immediately. Your report helps protect other users.",
              },
            ].map((tip) => (
              <div
                key={tip.number}
                className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-100"
              >
                <div className="w-10 h-10 bg-navy-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-navy-600">
                    {tip.number}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {tip.title}
                  </h3>
                  <p className="text-sm text-gray-500">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reporting */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-4">
              Report a Problem
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Found something suspicious? Let us know and we&apos;ll investigate.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 text-center">
              <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Flag className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Report a Property
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Flag suspicious listings, false information, or scam attempts.
              </p>
              <Button variant="outline" className="w-full">
                Report Property
              </Button>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Report a Provider
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Report brokers, agents, or companies for misconduct.
              </p>
              <Button variant="outline" className="w-full">
                Report Provider
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-navy-900 mb-4">
            Need Help?
          </h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">
            Our trust and safety team is here to help with any concerns.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:safety@click.ug"
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 hover:border-orange-200 transition-colors"
            >
              <Mail className="w-5 h-5 text-click-orange" />
              safety@click.ug
            </a>
            <a
              href="tel:+256700000000"
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 hover:border-orange-200 transition-colors"
            >
              <Phone className="w-5 h-5 text-click-orange" />
              +256 700 000 000
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
