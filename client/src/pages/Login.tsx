import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, LogIn, ArrowLeft } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const adminRes = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      if (adminRes.ok) {
        const adminData = await adminRes.json();
        if (adminData.success) {
          toast({ title: "Login successful", description: "Welcome back!" });
          setLocation("/admin");
          return;
        }
      }

      const userRes = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      if (userRes.ok) {
        const userData = await userRes.json();
        if (userData.success) {
          toast({ title: "Login successful", description: "Welcome back!" });
          setLocation("/dashboard");
          return;
        }
      }

      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    } catch {
      toast({
        title: "Login failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" data-testid="page-login">
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
              Digital Load Tickets Built for Forestry
            </h1>
            <p className="text-lg text-neutral-300 leading-relaxed max-w-md">
              Real-time visibility, audit-ready compliance, and control across every load, from stump to mill.
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
          <div className="lg:hidden mb-8">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer mb-8">
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
              <div className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground transition-colors mb-6">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to home</span>
              </div>
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }} data-testid="text-login-title">
            Welcome back
          </h2>
          <p className="text-sm text-muted-foreground mb-8" data-testid="text-login-subtitle">
            Sign in to your admin account
          </p>

          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  data-testid="input-email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10"
                    data-testid="input-password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    data-testid="button-toggle-password"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-600 border-orange-600 text-white font-semibold"
                disabled={isLoading}
                data-testid="button-submit-login"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </span>
                )}
              </Button>
            </form>
          </Card>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Don't have an account?{" "}
            <Link href="/signup">
              <span className="text-orange-600 font-medium cursor-pointer hover:underline" data-testid="link-go-to-signup">
                Sign up
              </span>
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
