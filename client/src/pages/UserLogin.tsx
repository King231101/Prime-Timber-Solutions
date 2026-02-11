import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { motion, AnimatePresence } from "framer-motion";
import { SiApple, SiGoogleplay } from "react-icons/si";

type LoginStep = "phone" | "code" | "register";

export default function UserLogin() {
  const [step, setStep] = useState<LoginStep>("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [devCode, setDevCode] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast({ title: "Please agree to receive SMS messages", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      const res = await apiRequest("POST", "/api/auth/send-code", { phone });
      const data = await res.json();
      if (data.success) {
        setDevCode(data.devCode || "");
        setStep("code");
        toast({ title: "Code sent", description: "Check your messages for the verification code." });
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to send code", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await apiRequest("POST", "/api/auth/verify-code", { phone, code });
      const data = await res.json();
      if (data.success) {
        if (data.isNewUser) {
          setStep("register");
        } else {
          setLocation("/dashboard");
        }
      }
    } catch (error: any) {
      toast({ title: "Invalid code", description: error.message || "Please try again", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await apiRequest("POST", "/api/auth/register", {
        phone,
        firstName,
        lastName,
        dateOfBirth,
      });
      const data = await res.json();
      if (data.success) {
        toast({ title: "Welcome!", description: "Your account has been created." });
        setLocation("/dashboard");
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Registration failed", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative"
      data-testid="page-user-login"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/forest-bg.png)" }}
      />
      <div className="absolute inset-0 bg-neutral-900/75" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-md px-4">
        <h1
          className="text-4xl font-extrabold text-orange-500 mb-10 tracking-wide"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
          data-testid="text-brand-title"
        >
          PRIME CUT TIMBER
        </h1>

        <AnimatePresence mode="wait">
          {step === "phone" && (
            <motion.div
              key="phone"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full"
            >
              <div className="bg-white rounded-md p-8 w-full" data-testid="card-phone-login">
                <h2 className="text-lg font-bold text-neutral-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Phone Number
                </h2>
                <form onSubmit={handleSendCode} className="space-y-4">
                  <Input
                    type="tel"
                    placeholder="(555) 555-5555"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="text-neutral-900 bg-white border-neutral-300"
                    data-testid="input-phone"
                  />
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="sms-agree"
                      checked={agreed}
                      onCheckedChange={(checked) => setAgreed(checked === true)}
                      data-testid="checkbox-sms-agree"
                    />
                    <label htmlFor="sms-agree" className="text-xs text-neutral-600 leading-tight cursor-pointer">
                      By checking this box you agree to receive SMS messages from Prime Cut Timber for account validation purposes, messaging fees may apply.
                    </label>
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading || !agreed}
                    className="bg-orange-500 border-orange-500 text-white font-semibold w-auto px-8"
                    data-testid="button-send-code"
                  >
                    {isLoading ? "Sending..." : "Send Code"}
                  </Button>
                </form>
              </div>
            </motion.div>
          )}

          {step === "code" && (
            <motion.div
              key="code"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full"
            >
              <div className="bg-white rounded-md p-8 w-full" data-testid="card-verify-code">
                <h2 className="text-lg font-bold text-neutral-900 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Enter Verification Code
                </h2>
                <p className="text-sm text-neutral-500 mb-4">
                  We sent a 6-digit code to {phone}
                </p>
                {devCode && (
                  <div className="bg-orange-50 border border-orange-200 rounded-md p-3 mb-4">
                    <p className="text-xs text-orange-700 font-medium">
                      Demo code: <span className="font-bold text-orange-900" data-testid="text-dev-code">{devCode}</span>
                    </p>
                  </div>
                )}
                <form onSubmit={handleVerifyCode} className="space-y-4">
                  <Input
                    type="text"
                    placeholder="000000"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    maxLength={6}
                    required
                    className="text-neutral-900 bg-white border-neutral-300 text-center text-2xl tracking-[0.5em] font-mono"
                    data-testid="input-code"
                  />
                  <div className="flex items-center gap-3">
                    <Button
                      type="submit"
                      disabled={isLoading || code.length !== 6}
                      className="bg-orange-500 border-orange-500 text-white font-semibold px-8"
                      data-testid="button-verify-code"
                    >
                      {isLoading ? "Verifying..." : "Verify"}
                    </Button>
                    <button
                      type="button"
                      className="text-sm text-orange-600 font-medium"
                      onClick={() => { setStep("phone"); setCode(""); }}
                      data-testid="button-back-phone"
                    >
                      Change number
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {step === "register" && (
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full"
            >
              <div className="bg-white rounded-md p-8 w-full" data-testid="card-register">
                <h2 className="text-lg font-bold text-neutral-900 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Complete Your Profile
                </h2>
                <p className="text-sm text-neutral-500 mb-4">
                  Tell us a bit about yourself to get started.
                </p>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-neutral-700 mb-1 block">First Name</label>
                    <Input
                      type="text"
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="text-neutral-900 bg-white border-neutral-300"
                      data-testid="input-first-name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-neutral-700 mb-1 block">Last Name</label>
                    <Input
                      type="text"
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="text-neutral-900 bg-white border-neutral-300"
                      data-testid="input-last-name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-neutral-700 mb-1 block">Date of Birth</label>
                    <Input
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      required
                      className="text-neutral-900 bg-white border-neutral-300"
                      data-testid="input-dob"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-orange-500 border-orange-500 text-white font-semibold px-8"
                    data-testid="button-register"
                  >
                    {isLoading ? "Creating account..." : "Get Started"}
                  </Button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-4 mt-8">
          <div className="flex items-center gap-1 bg-neutral-800/80 rounded-md px-3 py-2 cursor-pointer" data-testid="badge-app-store">
            <SiApple className="w-4 h-4 text-white" />
            <div className="text-left">
              <p className="text-[7px] text-neutral-400 leading-none">Download on the</p>
              <p className="text-[10px] text-white font-semibold leading-tight">App Store</p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-neutral-800/80 rounded-md px-3 py-2 cursor-pointer" data-testid="badge-google-play">
            <SiGoogleplay className="w-4 h-4 text-white" />
            <div className="text-left">
              <p className="text-[7px] text-neutral-400 leading-none">GET IT ON</p>
              <p className="text-[10px] text-white font-semibold leading-tight">Google Play</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
