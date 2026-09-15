"use client";

import { FileText, Shield, Users, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FileText className="w-12 h-12 text-orange-400 mx-auto mb-4" />
          <h1 className="font-display text-4xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-white/70">
            Last updated: January 2024
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-gray max-w-none">
          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600 mb-4">
              By accessing and using CLICK Real Estate Connectors (&quot;the Platform&quot;), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
              2. Description of Service
            </h2>
            <p className="text-gray-600 mb-4">
              CLICK is a property connection platform that connects property seekers with property providers (owners, brokers, agents, agencies, and companies) in Uganda. We facilitate connections but are not a party to any property transaction.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
              3. User Accounts
            </h2>
            <p className="text-gray-600 mb-4">
              To use certain features, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
              4. Provider Responsibilities
            </h2>
            <p className="text-gray-600 mb-4">
              Property providers must ensure that all information provided is accurate and up-to-date. Providers must have legal authority to list properties. False or misleading information may result in account suspension.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
              5. Connection Fees & Commissions
            </h2>
            <p className="text-gray-600 mb-4">
              CLICK may charge connection fees for facilitating contact between buyers and providers. Commission structures are configured by administrators and may vary. All fees are clearly displayed before any transaction.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
              6. Limitation of Liability
            </h2>
            <p className="text-gray-600 mb-4">
              CLICK acts as a connection platform only. We are not responsible for the accuracy of property listings, the conduct of users, or the outcome of any property transaction. Users should conduct their own due diligence.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800">
                  <strong>Important:</strong> Always verify property ownership and documentation independently before making any payment or commitment.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
              7. Privacy
            </h2>
            <p className="text-gray-600 mb-4">
              Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
              8. Prohibited Activities
            </h2>
            <p className="text-gray-600 mb-4">
              Users may not: post false or misleading information, engage in fraudulent activities, scrape or copy platform data, harass other users, or violate any applicable laws.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
              9. Changes to Terms
            </h2>
            <p className="text-gray-600 mb-4">
              We may update these terms from time to time. Continued use of the platform after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
              10. Contact
            </h2>
            <p className="text-gray-600 mb-4">
              For questions about these terms, contact us at legal@click.ug or +256 700 000 000.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
