import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, UserPlus, ArrowLeft } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { motion } from "framer-motion";

const yearsOptions = [
  "Less than 1 year",
  "1-3 years",
  "3-5 years",
  "5-10 years",
  "10-20 years",
  "20+ years",
];

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    yearsInCompany: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      return;
    }

    setIsLoading(true);

    try {
      const { confirmPassword, ...submitData } = formData;
      const res = await apiRequest("POST", "/api/signup", submitData);
      const data = await res.json();
      if (data.success) {
        toast({ title: "Account created!", description: "Welcome to Prime Cut Timber." });
        setLocation("/dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" data-testid="page-signup">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/forest-bg.png)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/80 via-neutral-900/60 to-orange-900/40" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="text-xl font-extrabold text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                PRIME CUT TIMBER
              </span>
              <span className="text-[9px] font-bold tracking-widest text-orange-300 bg-white/10 px-1.5 py-0.5 rounded-md">
                PCT
              </span>
            </div>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Join the Forestry Revolution
            </h1>
            <p className="text-lg text-neutral-300 leading-relaxed max-w-md">
              Create your account and start managing your timber operations with digital precision.
            </p>
          </div>
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} Prime Cut Timber. All rights reserved.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-white dark:bg-neutral-950 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden mb-6">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer mb-6">
                <ArrowLeft className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Back to home</span>
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-orange-600" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                PRIME CUT TIMBER
              </span>
              <span className="text-[9px] font-bold tracking-widest text-orange-500/70 bg-orange-50 px-1.5 py-0.5 rounded-md border border-orange-200">
                PCT
              </span>
            </div>
          </div>

          <div className="hidden lg:block mb-2">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground transition-colors mb-4">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to home</span>
              </div>
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }} data-testid="text-signup-title">
            Create your account
          </h2>
          <p className="text-sm text-muted-foreground mb-6" data-testid="text-signup-subtitle">
            Sign up to access your timber management dashboard
          </p>

          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    required
                    data-testid="input-signup-firstname"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    required
                    data-testid="input-signup-lastname"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="signupEmail" className="text-sm font-medium">Email Address</Label>
                <Input
                  id="signupEmail"
                  type="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                  data-testid="input-signup-email"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="signupPhone" className="text-sm font-medium">Phone Number</Label>
                <Input
                  id="signupPhone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  required
                  data-testid="input-signup-phone"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="companyName" className="text-sm font-medium">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Your Company"
                  value={formData.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                  required
                  data-testid="input-signup-company"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Years in Company</Label>
                <Select
                  value={formData.yearsInCompany}
                  onValueChange={(value) => handleChange("yearsInCompany", value)}
                >
                  <SelectTrigger data-testid="select-signup-years">
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    {yearsOptions.map((opt) => (
                      <SelectItem key={opt} value={opt} data-testid={`select-years-${opt.toLowerCase().replace(/\s+/g, "-")}`}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="signupPassword" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="signupPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 6 characters"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    required
                    minLength={6}
                    className="pr-10"
                    data-testid="input-signup-password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    data-testid="button-toggle-signup-password"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  required
                  minLength={6}
                  data-testid="input-signup-confirm-password"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-600 border-orange-600 text-white font-semibold"
                disabled={isLoading}
                data-testid="button-submit-signup"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    Create Account
                  </span>
                )}
              </Button>
            </form>
          </Card>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Already have an account?{" "}
            <Link href="/login">
              <span className="text-orange-600 font-medium cursor-pointer hover:underline" data-testid="link-go-to-login">
                Sign in
              </span>
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
