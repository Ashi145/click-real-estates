"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Mail,
  Lock,
  User,
  Phone,
  Building2,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { cn, PROVIDER_TYPES } from "@/lib/utils";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<"buyer" | "provider">("buyer");
  const [providerType, setProviderType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    agreeTerms: false,
  });

  const updateForm = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 flex relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-2/5 items-center justify-center relative z-10 p-12">
        <div className="max-w-md">
          <Link href="/" className="flex items-center gap-3 mb-12">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-click-orange to-orange-500 rounded-2xl flex items-center justify-center">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-navy-900" />
            </div>
            <div>
              <span className="font-display font-bold text-3xl text-white">
                CLICK
              </span>
              <p className="text-xs text-white/60 tracking-wider uppercase">
                Real Estate Connectors
              </p>
            </div>
          </Link>

          <h1 className="font-display text-4xl font-bold text-white mb-6 leading-tight">
            Join Uganda&apos;s
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-300">
              property platform
            </span>
          </h1>
          <p className="text-white/70 text-lg mb-8">
            Whether you&apos;re looking to buy, sell, or rent — CLICK connects
            you with the right people.
          </p>

          {/* Steps indicator */}
          <div className="space-y-6">
            {[
              { step: 1, label: "Choose account type" },
              { step: 2, label: "Enter your details" },
              { step: 3, label: "Start connecting" },
            ].map((s) => (
              <div key={s.step} className="flex items-center gap-4">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                    step >= s.step
                      ? "bg-click-orange text-white"
                      : "bg-white/10 text-white/50"
                  )}
                >
                  {step > s.step ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    s.step
                  )}
                </div>
                <span
                  className={cn(
                    "text-sm",
                    step >= s.step ? "text-white" : "text-white/50"
                  )}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-3/5 flex items-center justify-center relative z-10 p-8">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-click-orange to-orange-500 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-navy-900">
                CLICK
              </span>
            </div>

            {/* Step 1: Account Type */}
            {step === 1 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-navy-900 mb-2">
                  Create Account
                </h2>
                <p className="text-gray-500 text-sm mb-8">
                  Choose how you want to use CLICK
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <button
                    onClick={() => setAccountType("buyer")}
                    className={cn(
                      "p-6 rounded-2xl border-2 text-left transition-all",
                      accountType === "buyer"
                        ? "border-click-orange bg-orange-50"
                        : "border-gray-200 hover:border-orange-200"
                    )}
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Property Buyer
                    </h3>
                    <p className="text-sm text-gray-500">
                      Looking to buy, rent or lease property
                    </p>
                  </button>

                  <button
                    onClick={() => setAccountType("provider")}
                    className={cn(
                      "p-6 rounded-2xl border-2 text-left transition-all",
                      accountType === "provider"
                        ? "border-click-orange bg-orange-50"
                        : "border-gray-200 hover:border-orange-200"
                    )}
                  >
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                      <Building2 className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Property Provider
                    </h3>
                    <p className="text-sm text-gray-500">
                      Selling, renting or managing property
                    </p>
                  </button>
                </div>

                {/* Provider type selection */}
                {accountType === "provider" && (
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      I am a...
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {PROVIDER_TYPES.map((type) => (
                        <button
                          key={type.value}
                          onClick={() => setProviderType(type.value)}
                          className={cn(
                            "p-3 rounded-xl border text-left text-sm transition-all",
                            providerType === type.value
                              ? "border-click-orange bg-orange-50"
                              : "border-gray-200 hover:border-orange-200"
                          )}
                        >
                          <p className="font-medium text-gray-900">
                            {type.label}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  onClick={() => setStep(2)}
                  size="lg"
                  className="w-full"
                  disabled={
                    accountType === "provider" && !providerType
                  }
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {/* Step 2: Details */}
            {step === 2 && (
              <div>
                <button
                  onClick={() => setStep(1)}
                  className="text-sm text-gray-500 hover:text-click-orange mb-4 flex items-center gap-1"
                >
                  ← Back
                </button>

                <h2 className="font-display text-2xl font-bold text-navy-900 mb-2">
                  Your Details
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  {accountType === "provider"
                    ? "Set up your provider profile"
                    : "Create your buyer account"}
                </p>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) =>
                        updateForm("firstName", e.target.value)
                      }
                      leftIcon={<User className="w-4 h-4" />}
                      required
                    />
                    <Input
                      label="Last Name"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) =>
                        updateForm("lastName", e.target.value)
                      }
                      required
                    />
                  </div>

                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                    leftIcon={<Mail className="w-4 h-4" />}
                    required
                  />

                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+256 700 000 000"
                    value={formData.phone}
                    onChange={(e) => updateForm("phone", e.target.value)}
                    leftIcon={<Phone className="w-4 h-4" />}
                  />

                  {accountType === "provider" && (
                    <Input
                      label="Business Name"
                      placeholder="Your company or business name"
                      value={formData.businessName}
                      onChange={(e) =>
                        updateForm("businessName", e.target.value)
                      }
                      leftIcon={<Building2 className="w-4 h-4" />}
                    />
                  )}

                  <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) =>
                      updateForm("password", e.target.value)
                    }
                    leftIcon={<Lock className="w-4 h-4" />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    }
                    required
                  />

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={(e) =>
                        updateForm("agreeTerms", e.target.checked)
                      }
                      className="mt-1 text-click-orange focus:ring-click-orange rounded"
                    />
                    <span className="text-sm text-gray-600">
                      I agree to CLICK&apos;s{" "}
                      <Link
                        href="/terms"
                        className="text-click-orange hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-click-orange hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </span>
                  </label>

                  <Button
                    onClick={handleSubmit}
                    size="lg"
                    className="w-full"
                    isLoading={isLoading}
                    disabled={!formData.agreeTerms}
                  >
                    Create Account
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                <p className="text-center text-sm text-gray-500 mt-6">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="text-click-orange font-semibold hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
