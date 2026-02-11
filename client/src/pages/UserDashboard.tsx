import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Settings, Building2, UserCircle, Bell, Briefcase, CloudSun, Fuel, Sun, Moon, Cloud, CloudRain } from "lucide-react";
import type { AppUser } from "@shared/schema";

function DashboardSidebar({ active }: { active: string }) {
  return (
    <aside className="w-56 min-h-screen bg-neutral-100 dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 flex flex-col" data-testid="sidebar">
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
        <Link href="/">
          <span
            className="text-xl font-extrabold text-orange-500 cursor-pointer tracking-wide"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            data-testid="text-sidebar-brand"
          >
            PCT
          </span>
        </Link>
        <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest mt-0.5">Basic</p>
      </div>
      <nav className="flex-1 py-4 space-y-1 px-2">
        <Link href="/dashboard">
          <div
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer text-sm font-medium transition-colors ${
              active === "settlements"
                ? "bg-orange-500 text-white"
                : "text-neutral-700 dark:text-neutral-300"
            }`}
            data-testid="nav-settlements"
          >
            <Settings className="w-4 h-4" />
            <span>Settlements</span>
            <span className="ml-auto text-[8px] font-bold bg-orange-600 text-white px-1.5 py-0.5 rounded-md uppercase">Beta</span>
          </div>
        </Link>
        <Link href="/dashboard/company">
          <div
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer text-sm font-medium transition-colors ${
              active === "company"
                ? "bg-orange-500 text-white"
                : "text-neutral-700 dark:text-neutral-300"
            }`}
            data-testid="nav-company"
          >
            <Building2 className="w-4 h-4" />
            <span>Company</span>
          </div>
        </Link>
        <Link href="/dashboard/profile">
          <div
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer text-sm font-medium transition-colors ${
              active === "profile"
                ? "bg-orange-500 text-white"
                : "text-neutral-700 dark:text-neutral-300"
            }`}
            data-testid="nav-profile"
          >
            <UserCircle className="w-4 h-4" />
            <span>Profile</span>
          </div>
        </Link>
      </nav>
      <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
        <p className="text-[10px] text-neutral-400">&copy; {new Date().getFullYear()} Prime Cut Timber, Inc.</p>
      </div>
    </aside>
  );
}

export { DashboardSidebar };

export default function UserDashboard() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/user/me", { credentials: "include" });
      if (res.ok) {
        const userData = await res.json();
        if (!userData.isRegistered) {
          setLocation("/app-login");
          return;
        }
        setUser(userData);
      } else {
        setLocation("/app-login");
      }
    } catch {
      setLocation("/app-login");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
        <div className="w-8 h-8 border-3 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const now = new Date();
  const hours = now.getHours();
  const weatherData = [
    { time: "3:00 PM", temp: "58", icon: Cloud },
    { time: "9:00 PM", temp: "49", icon: Moon },
    { time: "3:00 AM", temp: "39", icon: CloudRain },
    { time: "9:00 AM", temp: "42", icon: Sun },
  ];

  return (
    <div className="flex min-h-screen bg-neutral-100 dark:bg-neutral-900" data-testid="page-dashboard">
      <DashboardSidebar active="settlements" />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
            <h1
              className="text-3xl font-extrabold text-neutral-900 dark:text-white"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              data-testid="text-welcome"
            >
              Welcome Back, {user.firstName}!
            </h1>
            <Button
              variant="default"
              className="bg-orange-500 border-orange-500 text-white font-semibold"
              data-testid="button-customize"
            >
              <Settings className="w-4 h-4 mr-2" />
              Customize Dashboard
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="p-6" data-testid="card-weather">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-md flex items-center justify-center">
                  <CloudSun className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-neutral-900 dark:text-white">Today's Weather</h3>
                  <p className="text-xs text-neutral-500">Details about today's weather below</p>
                </div>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-700 rounded-md p-4 mb-4">
                <div className="flex items-center justify-center gap-8 mb-4">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-neutral-400" />
                    <div>
                      <p className="text-xs font-bold text-neutral-900 dark:text-white">7:26 AM</p>
                      <p className="text-[10px] text-neutral-500 uppercase">Sunrise</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Moon className="w-4 h-4 text-neutral-400" />
                    <div>
                      <p className="text-xs font-bold text-neutral-900 dark:text-white">6:18 PM</p>
                      <p className="text-[10px] text-neutral-500 uppercase">Sunset</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 text-center">
                  {weatherData.map((w, i) => (
                    <div key={i}>
                      <w.icon className="w-5 h-5 mx-auto mb-1 text-neutral-500" />
                      <p className="text-[10px] text-neutral-500">{w.time}</p>
                      <p className="text-sm font-bold text-neutral-900 dark:text-white">{w.temp}&deg;F</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-6" data-testid="card-diesel">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-md flex items-center justify-center">
                  <Fuel className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-neutral-900 dark:text-white">Today's Diesel Price</h3>
                  <p className="text-xs text-neutral-500">Details about diesel price below</p>
                </div>
              </div>

              <div className="flex items-end justify-around py-6">
                <div className="text-center">
                  <p className="text-4xl font-extrabold text-neutral-900 dark:text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    $3.76
                  </p>
                  <p className="text-xs text-neutral-500 uppercase mt-1">Per Gallon</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-500">
                    <span className="text-sm">&#9650;</span> $0.00
                  </p>
                  <p className="text-xs text-neutral-500 uppercase mt-1">From Week Earlier</p>
                </div>
              </div>

              <p className="text-xs text-neutral-400 text-right mt-2">
                For your area as of {now.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "2-digit" })}
              </p>
            </Card>
          </div>

          <Card className="p-6 mb-6" data-testid="card-notifications">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-md flex items-center justify-center">
                <Bell className="w-4 h-4 text-orange-500" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-neutral-900 dark:text-white">Notifications</h3>
                <p className="text-xs text-neutral-500">Pending notifications/actions that require your attention</p>
              </div>
            </div>
            <div className="py-8 text-center">
              <p className="text-sm text-neutral-500" data-testid="text-no-notifications">No notifications at this time</p>
            </div>
          </Card>

          <Card className="p-6" data-testid="card-pinned-jobs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-md flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-orange-500" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-neutral-900 dark:text-white">Pinned Jobs</h3>
                <p className="text-xs text-neutral-500">Jobs that you have pinned to your dashboard</p>
              </div>
            </div>
            <div className="py-8 text-center">
              <p className="text-sm text-neutral-500" data-testid="text-no-jobs">No pinned jobs yet</p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
