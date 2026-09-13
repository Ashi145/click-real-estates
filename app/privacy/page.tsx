"use client";

import { Lock, Shield, Eye, Database, Users, Mail } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Lock className="w-12 h-12 text-orange-400 mx-auto mb-4" />
          <h1 className="font-display text-4xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-white/70">Last updated: January 2024</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-gray max-w-none">
          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-gray-600 mb-4">
              We collect information you provide directly, including account
              details, property information, and communication data. We also
              collect usage data such as pages viewed, searches performed, and
              device information.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>To provide and improve our services</li>
              <li>To facilitate connections between buyers and providers</li>
              <li>To send notifications about your activity</li>
              <li>To prevent fraud and ensure platform security</li>
              <li>To analyze usage patterns and improve user experience</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
              3. Information Sharing
            </h2>
            <p className="text-gray-600 mb-4">
              We share your information only as necessary to provide our
              services. Contact information is shared with providers only after
              authorized connection. We do not sell personal data to third
              parties.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
              4. Data Security
            </h2>
            <p className="text-gray-600 mb-4">
              We implement industry-standard security measures to protect your
              data, including encryption, secure servers, and access controls.
              However, no method of transmission over the Internet is 100%
              secure.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
              5. Your Rights
            </h2>
            <p className="text-gray-600 mb-4">
              You have the right to access, correct, or delete your personal
              data. You can manage your preferences through your account
              settings or contact us directly.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
              6. Contact Us
            </h2>
            <p className="text-gray-600">
              For privacy-related inquiries, contact us at privacy@click.ug
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
